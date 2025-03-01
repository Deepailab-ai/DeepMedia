import { useState, useEffect } from 'react'

interface UsageRecord {
  type: string
  remaining: number
  updatedAt: string
}

export function useUsageRecords() {
  const [records, setRecords] = useState<UsageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/usage-records')
      if (!response.ok) {
        throw new Error('获取使用记录失败')
      }
      const data = await response.json()
      setRecords(data.usageRecords)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return { records, loading, error, refetch: fetchRecords }
} 