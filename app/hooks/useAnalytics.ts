import { useCallback } from 'react';
import { track } from '@vercel/analytics';

type EventName =
  | 'generate_content'    // AI生成内容
  | 'download_image'      // 下载图片
  | 'change_template'     // 切换模板
  | 'change_style'        // 修改样式
  | 'page_view';          // 页面访问

// Define allowed property value types
type AllowedPropertyValues = string | number | boolean | null;

// Define the properties type
type EventProperties = Record<string, AllowedPropertyValues>;

export function useAnalytics() {
  const trackEvent = useCallback((
    eventName: EventName,
    properties?: EventProperties
  ) => {
    try {
      track(eventName, properties);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, []);

  return {
    trackEvent,
  };
}