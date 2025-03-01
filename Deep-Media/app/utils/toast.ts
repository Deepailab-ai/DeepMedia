export type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToast = (message: string, type: ToastType = 'success') => {
  // 移除已存在的 toast
  const existingToast = document.getElementById('global-toast');
  if (existingToast) {
    document.body.removeChild(existingToast);
  }

  const toast = document.createElement('div');
  toast.id = 'global-toast';
  toast.className = `
    fixed top-6 left-1/2 -translate-x-1/2 z-50
    px-4 py-2 rounded-lg
    ${type === 'success' ? 'bg-gray-800/90' : 'bg-red-500/90'} backdrop-blur-sm
    text-white text-sm font-medium
    shadow-lg
    flex items-center gap-2
    transform transition-all duration-300 ease-out
    opacity-0 translate-y-[-1rem]
  `;

  // 设置图标
  const icon = type === 'success'
    ? `<svg class="w-4 h-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
       </svg>`
    : `<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
       </svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;

  document.body.appendChild(toast);

  // 使用 requestAnimationFrame 确保 DOM 更新后再添加动画
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
  });

  // 创建一个移除函数
  const removeToast = () => {
    const toastElement = document.getElementById('global-toast');
    if (toastElement && toastElement.parentNode) {
      toastElement.style.opacity = '0';
      toastElement.style.transform = 'translate(-50%, -1rem)';

      // 只添加一次事件监听器
      const handleTransitionEnd = () => {
        if (toastElement.parentNode) {
          toastElement.removeEventListener('transitionend', handleTransitionEnd);
          toastElement.parentNode.removeChild(toastElement);
        }
      };

      toastElement.addEventListener('transitionend', handleTransitionEnd);
    }
  };

  // 3秒后移除
  setTimeout(removeToast, 3000);
};