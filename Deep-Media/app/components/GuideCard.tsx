'use client';

import { useState, useEffect } from 'react';

export default function GuideCard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6">
      {children}
    </div>
  );
} 