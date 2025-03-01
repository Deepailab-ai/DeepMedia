export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import { checkUsageLimit, decrementUsage } from '@/app/middleware/checkUsageLimit';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    // 获取用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: '未授权访问' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const userId = session.user.id;
    const type = 'ai-card';

    // 检查使用限制
    const { allowed, remaining } = await checkUsageLimit(userId, type);
    if (!allowed) {
      return new Response(JSON.stringify({ error: '已达到使用限制', remaining }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const enhancedMessages = [
      {
        role: 'system',
        content: `你是一位在小红书深耕多年的内容创作者，擅长将任何主题转化为吸引人的生活分享笔记。你的职责是严格围绕用户输入的主题，创作一篇主题相关、真诚自然的小红书笔记。总字数严格控制在200字以内。

重要原则：
- 必须严格围绕用户输入的主题展开，确保内容高度相关
- 如果主题过于宽泛，应该选择该主题下的一个具体方面深入展开
- 确保每个观点和建议都与主题直接相关
- 避免泛泛而谈，注重具体和可操作性
- 直接输出内容，不要包含任何标记性文字

创作格式：
1. 标题创作规范：
   - 字数：16字以内（包含emoji）
   - emoji使用：1-2个，只放在标题开头或结尾
   - 每次创作的标题都要不一样，且必须与主题高度相关
   - 标题示例：
     * "每天5分钟，轻松掌握小红书爆款写作✨"
     * "💡小红书从0到10万粉丝的秘密"
     * "✍️内容创作者必知的5个变现技巧"
   - 标题开头词汇库：
     * 发现类：偶然/意外/惊喜/突然
     * 分享类：分享/安利/推荐/总结
     * 干货类：掌握/技巧/方法/秘诀
     * 情感类：超爱/终于/最爱/必学
     * 价值类：一招/速成/解决/学会

2. 内容结构：
   - 开篇：用与主题高度相关的个人经历或观察快速建立共鸣
   - 分3个核心点展开，每个重点必须紧扣主题：
     * emoji(🔍💡✨📌💫🌟💎🎯⭐️🔆) + 简短的主题相关重点
     * 每个重点需要有具体的、可操作的建议
     * 确保建议与主题直接相关
   - 写作风格：
     * 像跟朋友聊天般自然流畅
     * 用生活化的语言描述
     * 适度分享个人体会和小建议
     * 保持真诚但专业的语气

整体要求：
- 内容必须与用户输入主题高度相关
- 控制在200字以内
- 重点突出实用性和可操作性
- 使用自然的表达方式
- 保持逻辑连贯性` // 你的系统提示词
      },
      ...messages,
    ];

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: enhancedMessages,
        temperature: 0.8,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepseek API error:', response.status, errorText);
      throw new Error(`Deepseek API error: ${response.status} - ${errorText}`);
    }

    // 生成成功后，减少使用次数
    const { success, remaining: updatedRemaining } = await decrementUsage(userId, type);
    if (!success) {
      throw new Error('更新使用记录失败');
    }

    const transformStream = new TransformStream({
      start(controller) {
        (this as any).buffer = '';
        (this as any).processLine = (line: string) => {
          if (line.trim() === '') return;
          if (line.startsWith('data: ')) {
            const data = line.slice(5).trim();
            if (data === '[DONE]') {
              controller.enqueue(`data: ${JSON.stringify({ done: true, remaining: updatedRemaining })}\n\n`);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(
                  `data: ${JSON.stringify({
                    content,
                    done: false,
                    isPartial: true,
                    remaining: updatedRemaining,
                  })}\n\n`
                );
              }
            } catch (e) {
              console.error('Parse error:', e, 'Line:', line);
            }
          }
        };
      },

      transform(chunk, controller) {
        try {
          const text = new TextDecoder().decode(chunk);
          (this as any).buffer += text;
          const lines = (this as any).buffer.split('\n');
          (this as any).buffer = lines.pop() || '';
          for (const line of lines) {
            (this as any).processLine(line);
          }
        } catch (error) {
          console.error('[Edge] Transform error:', error, new Date().toISOString());
        }
      },

      flush(controller) {
        if ((this as any).buffer) {
          (this as any).processLine((this as any).buffer);
        }
      },
    });

    const stream = response.body?.pipeThrough(transformStream)?.pipeThrough(new TextEncoderStream());

    if (!stream) {
      throw new Error('Failed to create stream');
    }

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[Edge] Generation error:', error);
    return new Response(
      JSON.stringify({
        error: '生成失败，请重试',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
