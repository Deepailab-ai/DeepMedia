'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const GuideCard = dynamic(() => import('./GuideCard'), {
  ssr: false,
});

export default function Guide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="guide" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">使用指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GuideCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">快速开始</h3>
              <p className="text-gray-600">输入主题，一键生成内容</p>
            </div>
          </GuideCard>
          <GuideCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">编辑优化</h3>
              <p className="text-gray-600">根据需要调整内容和样式</p>
            </div>
          </GuideCard>
          <GuideCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">导出使用</h3>
              <p className="text-gray-600">一键导出文本或图片</p>
            </div>
          </GuideCard>
        </div>
      </div>
    </section>
  );
} 