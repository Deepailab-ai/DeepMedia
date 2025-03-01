interface Window {
  va?: {
    track: (eventName: string, properties?: Record<string, any>) => void;
  };
}