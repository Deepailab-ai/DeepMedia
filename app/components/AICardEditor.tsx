import { useState } from 'react'
import { showToast } from '@/app/utils/toast';

export default function AICardEditor() {
  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generateContent = async () => {
    if (!prompt) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()
      setContent(data.content)
    } catch (error) {
      console.error('Failed to generate content:', error)
      showToast('生成内容失败', 'error');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Style settings */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-medium mb-2">样式设置</h3>
        {/* Add style settings here */}
      </div>

      {/* Background color */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-medium mb-2">背景色</h3>
        {/* Add background color picker here */}
      </div>

      {/* Content generation */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-medium mb-2">内容生成</h3>
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="请输入想要生成的主题..."
            className="w-full p-2 border rounded"
            rows={4}
          />
          <button
            onClick={generateContent}
            disabled={isLoading || !prompt}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? '生成中...' : 'AI生成'}
          </button>
        </div>
      </div>

      {/* Generated content preview */}
      {content && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-medium mb-2">生成内容</h3>
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      )}
    </div>
  )
}