---
title: "Introduction to Next.js"
description: "Get started with Next.js, a powerful React framework for building web applications."
date: "2024-02-05"
slug: "introduction-to-nextjs"
image: "https://picsum.photos/400/300?random=5"
tags: ["Next.js", "React", "Framework", "SSR"]
category: "Tutorial"
author: "Developer"
---

# Introduction to Next.js

Next.js is a powerful React framework that makes building production-ready web applications easier and more efficient. Created by Vercel, it provides a complete solution for React applications with features like server-site rendering, static site generation, API routes, and much more out of the box.

This comprehensive guide will take you through everything you need to know to get started with Next.js, from basic concepts to advanced features. Let's dive in!

## What is Next.js?

Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

### Why Choose Next.js?

1. **Zero Configuration**: Works out of the box with sensible defaults
2. **Performance**: Built-in optimizations for speed and SEO
3. **Developer Experience**: Hot reloading, error reporting, and more
4. **Production Ready**: Handles code splitting, optimization, and deployment
5. **Full-Stack**: Can build both frontend and backend in one project

## Key Features

### 1. **Rendering Methods**
- **Static Site Generation (SSG)**: Pages generated at build time
- **Server-Side Rendering (SSR)**: Pages generated on each request
- **Client-Side Rendering (CSR)**: Traditional React rendering
- **Incremental Static Regeneration (ISR)**: Update static pages after deployment

### 2. **File-Based Routing**
Create pages by adding files to the `pages` directory - no configuration needed!

### 3. **API Routes**
Build API endpoints directly in your Next.js application

### 4. **Built-in Optimizations**
- Automatic code splitting
- Image optimization
- Font optimization
- Script optimization

## Getting Started

### Installation

Create a new Next.js project:

```bash
# Using create-next-app (recommended)
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

# Or with TypeScript
npx create-next-app@latest my-nextjs-app --typescript

# Or with Tailwind CSS
npx create-next-app@latest my-nextjs-app --tailwind
```

### Project Structure

```
my-nextjs-app/
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── api/
│       └── hello.js
├── public/
├── styles/
├── components/
├── lib/
├── package.json
└── next.config.js
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your application.

## File-Based Routing

Next.js uses the file system for routing. Files in the `pages` directory automatically become routes.

### Basic Routing

```
pages/
├── index.js          → /
├── about.js          → /about
├── contact.js        → /contact
└── blog/
    ├── index.js      → /blog
    └── first-post.js → /blog/first-post
```

### Dynamic Routes

Use square brackets for dynamic segments:

```
pages/
├── blog/
│   ├── [slug].js     → /blog/:slug
│   └── [...all].js   → /blog/* (catch-all)
└── user/
    └── [id].js       → /user/:id
```

Example dynamic page:

```javascript
// pages/blog/[slug].js
import { useRouter } from 'next/router'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>This is the blog post for {slug}</p>
    </div>
  )
}
```

### Nested Routes

```
pages/
└── dashboard/
    ├── index.js        → /dashboard
    ├── settings.js     → /dashboard/settings
    └── users/
        ├── index.js    → /dashboard/users
        └── [id].js     → /dashboard/users/:id
```

## Data Fetching Methods

Next.js provides several methods for fetching data:

### 1. getStaticProps (SSG)

Fetch data at build time for static generation:

```javascript
// pages/blog.js
export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Regenerate the page at most once every hour
    revalidate: 3600,
  }
}
```

### 2. getStaticPaths (SSG with Dynamic Routes)

Generate static pages for dynamic routes:

```javascript
// pages/blog/[slug].js
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export async function getStaticPaths() {
  // Get all possible slug values
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false, // false = 404 for non-existing paths
  }
}

export async function getStaticProps({ params }) {
  // Fetch data for specific post
  const res = await fetch(`https://api.example.com/posts/${params.slug}`)
  const post = await res.json()

  return {
    props: {
      post,
    },
  }
}
```

### 3. getServerSideProps (SSR)

Fetch data on each request:

```javascript
// pages/profile.js
export default function Profile({ user }) {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  
  // Get user from session/cookie
  const session = await getSession(req)
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const user = await fetchUser(session.userId)

  return {
    props: {
      user,
    },
  }
}
```

### 4. Client-Side Data Fetching

Use SWR or React Query for client-side data fetching:

```javascript
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Posts() {
  const { data: posts, error, isLoading } = useSWR('/api/posts', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  )
}
```

## API Routes

Build API endpoints directly in your Next.js application:

### Basic API Route

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, World!' })
}
```

### Dynamic API Routes

```javascript
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query
  const { method } = req

  switch (method) {
    case 'GET':
      // Get user by ID
      res.status(200).json({ id, name: `User ${id}` })
      break
    case 'PUT':
      // Update user
      res.status(200).json({ id, message: 'User updated' })
      break
    case 'DELETE':
      // Delete user
      res.status(200).json({ id, message: 'User deleted' })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
```

### Advanced API Example

```javascript
// pages/api/posts.js
import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {
  const { method } = req

  const { db } = await connectToDatabase()

  switch (method) {
    case 'GET':
      try {
        const posts = await db.collection('posts').find({}).toArray()
        res.status(200).json(posts)
      } catch (error) {
        res.status(500).json({ error: 'Failed to load posts' })
      }
      break

    case 'POST':
      try {
        const { title, content } = req.body
        const post = await db.collection('posts').insertOne({
          title,
          content,
          createdAt: new Date(),
        })
        res.status(201).json(post)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create post' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
```

## Built-in Components and Optimizations

### Image Optimization

```javascript
import Image from 'next/image'

export default function Profile() {
  return (
    <div>
      <h1>My Profile</h1>
      <Image
        src="/profile-picture.jpg"
        alt="Profile Picture"
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  )
}
```

### Link Component

```javascript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/blog/my-first-post">
        <a>My First Post</a>
      </Link>
    </nav>
  )
}
```

### Head Component

```javascript
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js application" />
        <meta property="og:title" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to my app!</h1>
    </div>
  )
}
```

### Script Component

```javascript
import Script from 'next/script'

export default function Home() {
  return (
    <div>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_TRACKING_ID');
        `}
      </Script>
      <h1>My App</h1>
    </div>
  )
}
```

## Styling Options

### CSS Modules

```css
/* components/Button.module.css */
.primary {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.secondary {
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

```javascript
// components/Button.js
import styles from './Button.module.css'

export default function Button({ children, variant = 'primary' }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  )
}
```

### Styled JSX

```javascript
export default function StyledComponent() {
  return (
    <div>
      <h1>Styled with JSX</h1>
      <style jsx>{`
        h1 {
          color: blue;
          font-size: 2rem;
        }
        div {
          padding: 20px;
          background: #f0f0f0;
        }
      `}</style>
    </div>
  )
}
```

### Tailwind CSS Integration

```javascript
// Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Advanced Features

### Middleware

```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Redirect if not authenticated
  if (!request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}
```

### Custom App and Document

```javascript
// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### Environment Variables

```bash
# .env.local
DATABASE_URL=mongodb://localhost:27017/myapp
API_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=https://api.example.com
```

```javascript
// Usage in API routes
const dbUrl = process.env.DATABASE_URL

// Usage in client-side code (must start with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or connect GitHub repository at vercel.com
```

### Static Export

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
}

module.exports = nextConfig
```

```bash
# Build and export
npm run build
npm run export
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## Best Practices

### 1. **Performance Optimization**

```javascript
// Use dynamic imports for code splitting
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable server-side rendering
})

// Optimize images
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // Load above the fold images first
/>
```

### 2. **SEO Optimization**

```javascript
import Head from 'next/head'

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://myblog.com/blog/${post.slug}`} />
      </Head>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}
```

### 3. **Error Handling**

```javascript
// pages/_error.js
function Error({ statusCode, hasGetInitialPropsRun, err }) {
  if (!hasGetInitialPropsRun && err) {
    // Error was thrown on client side
    // Log error to error reporting service
  }

  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
```

### 4. **TypeScript Integration**

```bash
# Add TypeScript
npm install --save-dev typescript @types/react @types/node

# Rename files to .tsx/.ts
# Next.js will automatically configure TypeScript
```

```typescript
// types/index.ts
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  createdAt: string
}

// pages/blog.tsx
import { GetStaticProps } from 'next'
import { Post } from '../types'

interface Props {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: Post[] = await fetchPosts()
  
  return {
    props: {
      posts,
    },
  }
}
```

## Common Patterns

### Authentication with NextAuth.js

```bash
npm install next-auth
```

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
```

```javascript
// pages/protected.js
import { useSession, getSession } from 'next-auth/react'

export default function Protected() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') return <p>Access Denied</p>

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
```

## Conclusion

Next.js is a powerful framework that simplifies React development while providing enterprise-grade features out of the box. Its key strengths include:

1. **Multiple Rendering Options**: Choose the best rendering method for each page
2. **Excellent Developer Experience**: Fast refresh, great error messages, and zero configuration
3. **Built-in Optimizations**: Automatic code splitting, image optimization, and more
4. **Full-Stack Capabilities**: Build both frontend and API in one project
5. **Production Ready**: Scales from simple websites to complex applications

Whether you're building a simple blog, an e-commerce site, or a complex web application, Next.js provides the tools and optimizations needed to create fast, SEO-friendly, and maintainable applications.

Start with the basics, gradually adopt advanced features as needed, and leverage the extensive ecosystem and community around Next.js. Happy coding! 🚀 