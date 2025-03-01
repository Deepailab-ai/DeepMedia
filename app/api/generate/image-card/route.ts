import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkUsageLimit, decrementUsage } from '@/app/middleware/checkUsageLimit';
import { createApi } from 'unsplash-js';
import { prisma } from '@/lib/prisma';

// Initialize the Unsplash API client
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

// 用于存储最近使用过的图片ID
let recentImageIds = new Set<string>();
const MAX_RECENT_IMAGES = 10;

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ error: '请先登录' }),
        { status: 401 }
      );
    }

    const { allowed } = await checkUsageLimit(session.user.id, 'image-card');
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: '使用次数已用完' }),
        { status: 403 }
      );
    }

    const { keyword } = await req.json();
    if (!keyword) {
      return new Response(
        JSON.stringify({ error: 'Keyword is required' }),
        { status: 400 }
      );
    }

    const result = await unsplash.search.getPhotos({
      query: keyword,
      perPage: 5,
      orientation: 'portrait',
    });

    if (result.errors) {
      return new Response(
        JSON.stringify({ error: result.errors[0] }),
        { status: 500 }
      );
    }

    const photos = result.response?.results;
    if (!photos || photos.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No image found' }),
        { status: 404 }
      );
    }

    // 过滤掉最近使用过的图片
    const unusedPhotos = photos.filter(photo => !recentImageIds.has(photo.id));

    // 如果所有图片都用过了，就使用原始数组
    const availablePhotos = unusedPhotos.length > 0 ? unusedPhotos : photos;

    // 随机选择一张图片
    const randomIndex = Math.floor(Math.random() * availablePhotos.length);
    const photo = availablePhotos[randomIndex];

    // 更新最近使用的图片记录
    recentImageIds.add(photo.id);
    // 如果记录的图片ID超过限制，删除最早的记录
    if (recentImageIds.size > MAX_RECENT_IMAGES) {
      const [firstId] = recentImageIds;
      recentImageIds.delete(firstId);
    }

    // 记录使用记录
    await prisma.usageRecord.upsert({
      where: {
        userId_type: {
          userId: Number(session.user.id),
          type: 'image-card'
        }
      },
      update: {
        content: keyword,
        imageUrl: photo.urls.regular,
        status: 'success',
      },
      create: {
        userId: Number(session.user.id),
        type: 'image-card',
        content: keyword,
        imageUrl: photo.urls.regular,
        status: 'success',
        remaining: 9, // 新用户默认10次，减1后剩9次
      },
    });

    // 减少使用次数
    await decrementUsage(session.user.id, 'image-card');

    return new Response(
      JSON.stringify({
        url: photo.urls.regular,
        downloadUrl: photo.urls.full,
        author: {
          name: photo.user.name,
          username: photo.user.username,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Image generation error:', error);
    return new Response(
      JSON.stringify({ error: '生成失败，请重试' }),
      { status: 500 }
    );
  }
}
