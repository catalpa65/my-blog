interface BlogType {
    slug: string;
    content: string;
    title: string;
    description: string;
    imageUrl?: string;
}

const SampleBlogs: BlogType[] = [
    {
        slug: "vue-fundamentals-guide",
        title: "Vue.js 基础指南：从零开始掌握现代前端框架",
        description: "Vue系列第一期：全面介绍Vue.js基础知识，包括应用创建、模板语法、响应式系统、组件开发等核心概念",
        imageUrl: "https://picsum.photos/400/300?random=10",
        content: `
# Vue.js 基础指南：从零开始掌握现代前端框架

Vue.js是一个渐进式JavaScript框架，以其简洁的语法、出色的性能和丰富的生态系统而广受开发者喜爱。

## 核心特性

- **渐进式**：可以逐步集成到现有项目中
- **响应式**：数据变化自动更新视图
- **组件化**：可复用的UI构建块
- **轻量级**：运行时大小约34KB

## 主要内容包括

### 基础概念
- 创建Vue应用和模板语法
- 响应式数据绑定和计算属性
- 条件渲染和列表渲染

### 交互处理
- 事件处理和表单绑定
- 类与样式的动态绑定
- 侦听器和模板引用

### 组件开发
- 组件定义和使用
- Props传递和事件通信
- 组件生命周期管理

通过系统学习这些核心概念，你将能够构建功能完整的Vue.js应用程序。
        `
    },
    {
        slug: "understanding-dify-ai-platform",
        title: "理解Dify：下一代AI应用开发平台",
        description: "深入了解Dify AI平台，探索其在AI应用开发中的位置和独特价值",
        imageUrl: "https://picsum.photos/400/300?random=9",
        content: `
# 理解Dify：下一代AI应用开发平台

随着人工智能技术的快速发展，我们正处于一个AI应用爆发式增长的时代。

## AI技术发展的现状

### 大语言模型的崛起

- **GPT系列**：OpenAI的GPT-3.5、GPT-4系列引领了对话AI的革命
- **开源模型**：LLaMA、Alpaca、Vicuna等开源模型降低了AI应用的门槛
- **多模态能力**：从纯文本扩展到图像、音频、视频的理解和生成

## Dify在AI生态系统中的位置

Dify是一个开源的LLM应用开发平台，旨在将AI能力民主化，让更多人能够轻松构建AI应用。

### 核心价值定位

- 降低AI应用开发门槛
- 统一的AI模型接入
- 企业级特性和安全保障

通过Dify，开发者可以快速构建各种AI应用，无需深入了解复杂的AI模型细节。
        `
    },
    {
        slug: "mastering-react-components",
        title: "Mastering React Components",
        description: "An in-depth guide to understanding and creating React components.",
        imageUrl: "https://picsum.photos/400/300?random=1",
        content: `
# Mastering React Components

React components are the building blocks of any React application. In this blog, we will dive deep into:

- **Functional vs. Class Components**
- **Lifecycle Methods**
- **State and Props**
- **Hooks**

By the end, you'll have a solid understanding of how to create and manage components effectively.
        `
    },
    {
        slug: "tailwind-css-beginners",
        title: "Tailwind CSS for Beginners",
        description: "Learn how to quickly style your web applications using Tailwind CSS.",
        imageUrl: "https://picsum.photos/400/300?random=2",
        content: `
# Tailwind CSS for Beginners

Tailwind CSS is a utility-first CSS framework that allows you to style your web application directly in your HTML.

## Key Topics Covered:

- Setting up Tailwind CSS
- Using Utility Classes
- Customizing Styles

Tailwind CSS makes it easier to build responsive, custom designs without writing a lot of custom CSS.
        `
    },
    {
        slug: "javascript-closures",
        title: "Understanding JavaScript Closures",
        description: "A comprehensive explanation of closures in JavaScript with examples.",
        imageUrl: "https://picsum.photos/400/300?random=3",
        content: `
# Understanding JavaScript Closures

Closures are one of the most powerful features in JavaScript. This blog will cover:

- **What are Closures?**
- **How Closures Work**
- **Practical Examples**

Closures allow functions to access variables from an enclosing scope even after the outer function has closed.
        `
    },
    {
        slug: "power-of-flexbox",
        title: "The Power of Flexbox in CSS",
        description: "How to use Flexbox to create flexible and responsive layouts.",
        imageUrl: "https://picsum.photos/400/300?random=4",
        content: `
# The Power of Flexbox in CSS

Flexbox is a CSS layout module that makes it easier to design flexible and responsive layouts.

### Topics Include:

- Flex Container and Items
- Flexbox Properties and Alignment
- Real-world Examples

Mastering Flexbox will make your layouts more efficient and easier to manage.
        `
    },
    {
        slug: "introduction-to-nextjs",
        title: "Introduction to Next.js",
        description: "Get started with Next.js, a powerful React framework for building web applications.",
        imageUrl: "https://picsum.photos/400/300?random=5",
        content: `
# Introduction to Next.js

Next.js is a popular React framework that provides server-side rendering and many other features out of the box.

## This Guide Covers:

- Setting up a Next.js Project
- Pages and Routing
- Server-side Rendering vs. Static Generation

Next.js is an excellent choice for building fast and SEO-friendly React applications.
        `
    },
    {
        slug: "advanced-git-tips",
        title: "Advanced Git Tips and Tricks",
        description: "Improve your Git skills with these advanced tips and best practices.",
        imageUrl: "https://picsum.photos/400/300?random=6",
        content: `
# Advanced Git Tips and Tricks

Level up your Git skills with these advanced techniques:

- **Interactive Rebase**
- **Cherry-picking Commits**
- **Git Hooks**

Understanding these advanced features will help you manage your projects more effectively and maintain a cleaner commit history.
        `
    },
    {
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices",
        description: "Essential TypeScript patterns and practices for better code quality.",
        imageUrl: "https://picsum.photos/400/300?random=7",
        content: `
# TypeScript Best Practices

TypeScript brings type safety to JavaScript development. Learn the best practices:

- **Type Definitions**
- **Generic Types**
- **Interface vs Type**
- **Utility Types**

Following these practices will make your TypeScript code more maintainable and robust.
        `
    },
    {
        slug: "api-design-principles",
        title: "RESTful API Design Principles",
        description: "Learn how to design clean, maintainable, and scalable REST APIs.",
        imageUrl: "https://picsum.photos/400/300?random=8",
        content: `
# RESTful API Design Principles

Building robust APIs is crucial for modern applications. This guide covers:

- **HTTP Methods and Status Codes**
- **Resource Naming Conventions**
- **Error Handling**
- **Authentication and Security**

Well-designed APIs make your applications more scalable and maintainable.
        `
    }
];

export default SampleBlogs