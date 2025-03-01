'use client';

import React from 'react';

interface ExampleCardProps {
  children: React.ReactNode;
}

export default function ExampleCard({ children }: ExampleCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6">
      {children}
    </div>
  );
} 