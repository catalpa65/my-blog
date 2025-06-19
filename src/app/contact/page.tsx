import React from 'react'

const page = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-muted/20 to-background pt-16 pb-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            联系我
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            有任何技术问题或合作意向，欢迎与我联系
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 min-h-[500px]">
                    
                    {/* Contact Form */}
                    <div className="lg:col-span-2 order-2 lg:order-2">
                        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                            <h2 className="text-2xl font-semibold text-foreground mb-6">
                                发送消息
                            </h2>
                            
                            <form className="space-y-5 flex-1">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                        姓名
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="请输入您的姓名"
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        邮箱
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="请输入您的邮箱地址"
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        消息内容
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="请输入您想要发送的消息..."
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none flex-1 min-h-[120px]"
                                    />
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-colors duration-200 mt-auto"
                                >
                                    发送消息
                                </button>
                            </form>
                            
                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                您的信息安全受到保护，我们承诺不会向第三方分享您的联系信息
                            </p>
                        </div>
                    </div>

                    {/* Map and Contact Info */}
                    <div className="lg:col-span-3 order-1 lg:order-1">
                        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                            {/* Map */}
                            <div className="relative flex-1">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full"
                                    frameBorder={0}
                                    title="map"
                                    marginHeight={0}
                                    marginWidth={0}
                                    scrolling="no"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115473.95!2d121.5!3d31.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b27040b1f53c33%3A0x295129423c364a1!2z5Lit5Zu95LiK5rW35biC5rWm5Lic5paw5Yy6!5e0!3m2!1szh-CN!2scn!4v1635000000000!5m2!1szh-CN!2scn&z=11"
                                    style={{ filter: "contrast(1.05) opacity(0.9)" }}
                                />
                            </div>
                            
                            {/* Contact Information */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    联系信息
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary/10 p-3 rounded-xl">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground mb-1">地址</h4>
                                            <p className="text-sm text-muted-foreground">
                                                中国上海市
                                                <br />
                                                浦东新区
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary/10 p-3 rounded-xl">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground mb-1">邮箱</h4>
                                            <a 
                                                href="mailto:catalpa65@163.com" 
                                                className="text-sm text-primary hover:text-primary/80 transition-colors"
                                            >
                                                catalpa65@163.com
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary/10 p-3 rounded-xl">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground mb-1">微信</h4>
                                            <p className="text-sm text-muted-foreground">
                                                DirtyHands2025
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Additional Contact Methods */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-6 bg-card border border-border/50 rounded-2xl px-8 py-6 shadow-sm">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                            </svg>
                        </a>
                        <div className="w-px h-6 bg-border"></div>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <div className="w-px h-6 bg-border"></div>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        也可以通过社交媒体与我联系
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page