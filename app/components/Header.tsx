'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowBackground = window.scrollY > 0;
      setIsScrolled(shouldShowBackground);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  // 等待认证状态加载完成
  if (status === 'loading') {
    return null; // 或者显示加载状态
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset + 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-sm bg-gradient-to-br from-rose-50/80 via-purple-50/80 to-blue-50/80 border-b border-gray-100'
          : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧 Logo 区域 */}
          <div className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Logo" width={24} height={24} className="w-6 h-6" />
            <span className="text-lg font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              渡己AI
            </span>
          </div>

          {/* 右侧导航区域 */}
          <nav className="flex items-center gap-3 sm:gap-8">
            <button
              onClick={() => scrollToSection('user-examples')}
              className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors">
              案例
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors">
              功能
            </button>
            <button
              onClick={() => scrollToSection('guide')}
              className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors">
              说明
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors">
              价格
            </button>

            {/* 用户头像和下拉菜单 */}
            {session ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-gray-100 text-sm focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {session.user.name || session.user.email}
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                        >
                          退出登录
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <a
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors"
              >
                登录
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
