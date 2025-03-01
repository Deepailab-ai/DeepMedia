'use client';

import React from 'react';

export default function FeatureCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6">
      {children}
    </div>
  );
} 