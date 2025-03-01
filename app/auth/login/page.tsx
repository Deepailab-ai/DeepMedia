'use client';

import dynamic from 'next/dynamic';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => children), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (isRegister) {
      // 注册逻辑
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }

        // 注册成功后自动登录
        const result = await signIn('credentials', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : '注册失败，请重试');
      }
    } else {
      // 登录逻辑
      try {
        const res = await signIn('credentials', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          redirect: false,
        });

        if (res?.error) {
          setError(res.error);
        } else {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        setError('登录失败，请重试');
      }
    }
  };

  return (
    <LoginForm>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* 左侧装饰区域 */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="flex flex-col justify-center items-center w-full text-white p-12">
            <Link href="/" className="mb-8 transition-transform hover:scale-110">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
            <h1 className="text-4xl font-bold mb-4">渡己AI</h1>
            <p className="text-xl text-center text-blue-100 max-w-md">
              智能AI驱动的内容创作助手，让创作更轻松
            </p>
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              {/* Logo - 仅在移动端显示 */}
              <div className="md:hidden flex justify-center mb-8">
                <Link href="/" className="transition-transform hover:scale-110">
                  <Image
                    src="/favicon.ico"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="rounded-xl"
                  />
                </Link>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {isRegister ? '创建账号' : '欢迎回来'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {isRegister ? '已有账号？' : '还没有账号？'}
                  <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="font-medium text-blue-600 hover:text-blue-500 ml-1 transition-colors"
                  >
                    {isRegister ? '去登录' : '去注册'}
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isRegister && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      昵称
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="请输入昵称"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    邮箱
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    密码
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入密码"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {isRegister ? '注册' : '登录'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginForm>
  );
} 