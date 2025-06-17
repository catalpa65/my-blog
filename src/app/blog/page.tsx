'use client'

import React from 'react'
import Link from 'next/link'
import SampleBlogs from '@/config/sampleblogs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'

const Blog = () => {
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
        <MaxWidthWrapper className="py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Latest Articles
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Discover the latest insights in web development, programming techniques, and cutting-edge technology trends.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SampleBlogs.map((blog, index) => {
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
                                        src={blog.imageUrl || `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Blog+${index+1}`}
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
                                    <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
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

                {/* Call to Action */}
                <div className="text-center mt-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 text-muted-foreground">
                        <span>Want to stay updated with the latest posts?</span>
                    </div>
                    <Button variant="outline" size="lg">
                        Subscribe to Newsletter
                    </Button>
                </div>

                {/* Empty State */}
                {SampleBlogs.length === 0 && (
                    <div className="text-center py-16 space-y-4">
                        <div className="text-6xl">📝</div>
                        <h3 className="text-xl font-semibold">
                            No blog posts yet
                        </h3>
                        <p className="text-muted-foreground">
                            Check back later for new content!
                        </p>
                    </div>
                )}
            </div>
        </MaxWidthWrapper>
    )
}

export default Blog