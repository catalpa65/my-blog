'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import SampleBlogs from '@/config/sampleblogs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'

const BlogContent = () => {
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const search = searchParams.get('search')
        if (search) {
            setSearchTerm(search)
        }
    }, [searchParams])

    const filteredBlogs = useMemo(() => {
        if (!searchTerm) return SampleBlogs

        return SampleBlogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])
    const getCategory = (slug: string) => {
        if (slug.includes('react')) return { name: 'React', color: 'bg-blue-500' }
        if (slug.includes('css') || slug.includes('tailwind')) return { name: 'CSS', color: 'bg-purple-500' }
        if (slug.includes('javascript')) return { name: 'JavaScript', color: 'bg-yellow-500' }
        if (slug.includes('git')) return { name: 'Git', color: 'bg-orange-500' }
        if (slug.includes('typescript')) return { name: 'TypeScript', color: 'bg-blue-600' }
        if (slug.includes('api')) return { name: 'API', color: 'bg-green-500' }
        if (slug.includes('next')) return { name: 'Next.js', color: 'bg-gray-900' }
        return { name: 'Tutorial', color: 'bg-gray-500' }
    }

    return (
        <MaxWidthWrapper className="py-8 sm:py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {searchTerm ? `搜索结果` : 'Latest Articles'}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {searchTerm ?
                            `找到 ${filteredBlogs.length} 篇关于 "${searchTerm}" 的文章` :
                            'Discover the latest insights in web development, programming techniques, and cutting-edge technology trends.'
                        }
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="搜索博客文章..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-10 pr-4 text-foreground bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog, index) => {
                        const category = getCategory(blog.slug)
                        return (
                            <div
                                key={blog.slug}
                                className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Section */}
                                <div style={{
                                    position: 'relative',
                                    height: '220px',
                                    overflow: 'hidden'
                                }}>
                                    {/* Main Image */}
                                    <img
                                        src={blog.imageUrl || `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Blog+${index + 1}`}
                                        alt={blog.title}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            zIndex: 1,
                                            transition: 'transform 0.5s ease-out'
                                        }}
                                        className="group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Image+Error`;
                                        }}
                                    />

                                    {/* Category Badge */}
                                    <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3 }}>
                                        <span className={`${category.color} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg`}>
                                            {category.name}
                                        </span>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '40%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                        zIndex: 2
                                    }} />
                                </div>

                                {/* Content Section */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                                            {blog.title}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
                                            {blog.description}
                                        </p>
                                    </div>

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Dec 2024
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                5 min read
                                            </span>
                                        </div>
                                    </div>

                                    {/* Read More Button */}
                                    <Button asChild variant="ghost" className="w-full justify-between group/btn h-auto p-3 mt-4">
                                        <Link href={`/blogpost/${blog.slug}`}>
                                            <span className="font-medium">Read Article</span>
                                            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Empty State */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-16 space-y-6">
                        <div className="text-6xl">
                            {searchTerm ? '🔍' : '📝'}
                        </div>
                        <h3 className="text-xl font-semibold">
                            {searchTerm ? '未找到相关文章' : 'No blog posts yet'}
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            {searchTerm ?
                                `很抱歉，没有找到包含 "${searchTerm}" 的文章。试试其他关键词吧！` :
                                'Check back later for new content!'
                            }
                        </p>
                        {searchTerm && (
                            <Button
                                onClick={() => setSearchTerm('')}
                                variant="outline"
                                className="mt-4"
                            >
                                清空搜索
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </MaxWidthWrapper>
    )
}

const Blog = () => {
    return (
        <Suspense fallback={
            <MaxWidthWrapper className="py-8 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Loading...
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Loading blog articles...
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        }>
            <BlogContent />
        </Suspense>
    )
}

export default Blog