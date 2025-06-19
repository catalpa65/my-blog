"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import Typed from 'typed.js';

export default function Home() {
  const el = useRef(null);
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 当用户开始输入时，清除错误状态
    setShowError(false);
    const container = e.currentTarget.closest('div') as HTMLElement;
    if (container) {
      container.style.borderColor = '';
      container.style.boxShadow = '';
    }
    e.currentTarget.classList.remove('animate-pulse');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    if (!searchTerm || searchTerm.trim() === '') {
      // 更稳定的提示逻辑
      const input = e.currentTarget.querySelector('input[name="search"]') as HTMLInputElement;
      const container = e.currentTarget.parentElement as HTMLElement;
      
      if (input && container) {
        input.focus();
        // 显示错误状态
        setShowError(true);
        // 给容器添加错误状态，使用!important确保优先级
        container.style.borderColor = '#ef4444';
        container.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.3)';
        // 给input添加shake动画
        input.classList.add('animate-pulse');
        
        // 3秒后自动清除
        setTimeout(() => {
          setShowError(false);
          if (container) {
            container.style.borderColor = '';
            container.style.boxShadow = '';
          }
          if (input) {
            input.classList.remove('animate-pulse');
          }
        }, 3000);
      }
      return;
    }
    
    router.push(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  useEffect(() => {
    // 确保页面始终从顶部开始
    window.scrollTo(0, 0);

    const typed = new Typed(el.current, {
      strings: ['您好，我是Jason'],
      typeSpeed: 100,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  // 添加额外的滚动到顶部逻辑，确保在组件挂载时立即执行
  useEffect(() => {
    // 立即滚动到顶部
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col lg:overflow-hidden">
      {/* Hero Section - 平衡适中的设计 */}
      <section className="flex-1 lg:flex-1 container px-4 py-5 mx-auto lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:pl-8">
          <h1 className="text-2xl leading-tight text-gray-800 dark:text-gray-200 md:text-3xl lg:text-4xl">
            <span className="font-semibold underline decoration-primary inline-block min-w-[200px] md:min-w-[280px]">
              <span ref={el} />
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-300 lg:text-lg">
            一个致力于创新与分享的个人Blog<br />
            与社区一同打造数字解决方案，分享技术见解！
          </p>
          <div className="mt-5 lg:w-4/5">
            <div className="bg-transparent border rounded-lg dark:border-gray-700 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20 transition-all duration-200 overflow-hidden">
              <form onSubmit={handleSearch} className="flex items-center">
                <input 
                  type="search" 
                  name="search" 
                  placeholder="搜索博客文章..." 
                  onChange={handleInputChange}
                  className="flex-1 h-11 px-4 text-foreground placeholder-muted-foreground bg-transparent border-none appearance-none lg:h-12 focus:outline-none focus:placeholder-transparent focus:ring-0 transition-all duration-200 text-base" 
                />
                <button type="submit" className="flex items-center justify-center h-11 w-12 lg:h-12 lg:w-12 text-muted-foreground hover:text-primary focus:text-primary transition-all duration-200 hover:bg-muted/50 focus:bg-muted/50 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </form>
            </div>
            {/* 预留固定高度的错误消息空间，避免布局跳动 */}
            <div className="h-5 mt-2 transition-all duration-200">
              {showError && (
                <div className="text-sm text-red-500 flex items-center animate-pulse">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  请输入搜索关键词
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2">
          <img 
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" 
            alt="tailwind css components" 
            className="w-full h-auto max-w-sm mx-auto lg:max-w-md" 
          />
        </div>
      </section>

      {/* 滚动指示器 - 仅在移动端显示 */}
      <div className="flex justify-center pb-4 lg:hidden">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-gray-400 dark:text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>

      {/* About Me Section - 适中的现代化设计 */}
      <section className="bg-gray-50/50 dark:bg-gray-900/30 py-6 lg:py-8 lg:flex-shrink-0">
        <div className="container px-4 mx-auto">
          <h2 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-200 lg:text-xl lg:mb-6">About Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">Web Development</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 mb-2 lg:mb-3 leading-relaxed">
                Building robust, scalable web applications using React, Node.js, and modern tech stacks.
              </p>
              <a href="#" className="text-xs lg:text-sm text-primary hover:text-primary/80 inline-flex items-center font-medium">
                Learn More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">Mobile Development</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 mb-2 lg:mb-3 leading-relaxed">
                Crafting seamless mobile experiences for Android and iOS using React Native and Flutter.
              </p>
              <a href="#" className="text-xs lg:text-sm text-primary hover:text-primary/80 inline-flex items-center font-medium">
                Learn More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">Cloud Solutions</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 mb-2 lg:mb-3 leading-relaxed">
                Managing cloud environments with AWS, Alibaba Cloud to ensure applications scale effortlessly.
              </p>
              <a href="#" className="text-xs lg:text-sm text-primary hover:text-primary/80 inline-flex items-center font-medium">
                Learn More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
