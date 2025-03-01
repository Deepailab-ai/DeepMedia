import { prisma } from '@/lib/prisma';

export async function checkUsageLimit(
  userId: string | number,
  type: string
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    if (!userId || !type) {
      return { allowed: false, remaining: 0 };
    }

    // 获取或创建用户的使用记录
    let usageRecord = await prisma.usageRecord.findFirst({
      where: {
        userId: Number(userId),
        type,
      },
    });

    if (!usageRecord) {
      // 新用户默认次数
      const DEFAULT_USAGE_LIMIT = 10;
      usageRecord = await prisma.usageRecord.create({
        data: {
          userId: Number(userId),
          type,
          remaining: DEFAULT_USAGE_LIMIT,
        },
      });
    }

    return {
      allowed: usageRecord.remaining > 0,
      remaining: usageRecord.remaining,
    };
  } catch (error) {
    console.error('检查使用限制时出错:', error);
    return { allowed: false, remaining: 0 };
  }
}

export async function decrementUsage(
  userId: string | number,
  type: string
): Promise<{ success: boolean; remaining: number }> {
  try {
    if (!userId || !type) {
      return { success: false, remaining: 0 };
    }

    const updatedRecord = await prisma.usageRecord.upsert({
      where: {
        userId_type: {
          userId: Number(userId),
          type,
        }
      },
      update: {
        remaining: {
          decrement: 1,
        },
      },
      create: {
        userId: Number(userId),
        type,
        remaining: 9, // 新用户默认10次，减1后剩9次
      },
    });

    return {
      success: true,
      remaining: updatedRecord.remaining,
    };
  } catch (error) {
    console.error('减少使用次数时出错:', error);
    return { success: false, remaining: 0 };
  }
} 