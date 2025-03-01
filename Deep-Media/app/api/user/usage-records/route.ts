import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      )
    }

    const usageRecords = await prisma.usageRecord.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        type: true,
        remaining: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ usageRecords })
  } catch (error) {
    console.error('获取使用记录时出错:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
} 