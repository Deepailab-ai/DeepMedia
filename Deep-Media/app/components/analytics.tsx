'use client';

import { Analytics } from '@vercel/analytics/react';
// import { useEffect } from 'react';

export function AnalyticsWrapper() {

  // 添加错误边界
  try {
    return (
      <>
        <div id="analytics-debug" style={{ display: 'none' }}>
          Analytics Loaded
        </div>
        <Analytics/>
      </>
    );
  } catch (error) {
    console.error('Error rendering Analytics:', error);
    return null;
  }
}
