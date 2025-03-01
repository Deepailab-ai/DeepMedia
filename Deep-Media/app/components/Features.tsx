'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const FeatureCard = dynamic(() => import('./FeatureCard'), {
  ssr: false,
});

export default function Features() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI智能创作</h3>
              <p className="text-gray-600">一键生成原创内容，告别写作困扰</p>
            </div>
          </FeatureCard>
          <FeatureCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">专业排版</h3>
              <p className="text-gray-600">多种精选字体和背景，打造精美文案</p>
            </div>
          </FeatureCard>
          <FeatureCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">便捷导出</h3>
              <p className="text-gray-600">一键复制文本或下载图片</p>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
} 