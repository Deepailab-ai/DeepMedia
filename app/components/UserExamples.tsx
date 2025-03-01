'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const examples = [
  {
    id: 1,
    image: '/user-examples/xhs-example1.png',
  },
  {
    id: 2,
    image: '/user-examples/xhs-example2.png',
  },
  {
    id: 3,
    image: '/user-examples/xhs-example3.png',
  },
  {
    id: 4,
    image: '/user-examples/xhs-example4.png',
  },
  {
    id: 5,
    image: '/user-examples/xhs-example5.png',
  },
];

export default function UserExamples() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // 克隆第一组图片并添加到末尾，实现无缝循环
    const firstGroup = scrollContainer.children[0].cloneNode(true);
    scrollContainer.appendChild(firstGroup);

    let animationFrameId: number;
    let startTime: number;
    const duration = 30000; // 30秒滚动一轮
    const totalWidth = (320 + 24) * examples.length; // 一组图片的总宽度

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = ((currentTime - startTime) % duration) / duration;
      const translateX = progress * totalWidth;

      scrollContainer.style.transform = `translateX(-${translateX}px)`;

      // 当滚动到克隆组时，瞬间重置到开始位置
      if (progress >= 0.99) {
        startTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden user-examples-container">
      <div
        ref={scrollRef}
        className="flex gap-6 transition-transform duration-[0ms]"
      >
        <div className="flex gap-6">
          {examples.map((example, index) => (
            <div
              key={`${example.id}-${index}`}
              className="w-80 flex-shrink-0"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={example.image}
                  alt="用户案例"
                  fill
                  className="object-contain rounded-lg"
                  priority={index < 4}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
