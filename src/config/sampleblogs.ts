interface BlogType {
    slug: string;
    content: string;
    title: string;
    description: string;
    imageUrl?: string;
}

const SampleBlogs: BlogType[] = [
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