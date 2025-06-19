import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkParseFrontmatter from "remark-parse-frontmatter"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import Onthispage from "@/components/Onthispage"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
    try {
        // Next.js 15 要求await params
        const { slug } = await params
        // 修正文件路径 - 使用正确的 src/content 目录
        const filePath = path.join(process.cwd(), 'src', 'content', `${slug}.md`)

        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            notFound()
        }

        //https://ondrejsevcik.com/blog/building-perfect-markdown-processor-for-my-blog
        const processor = unified()
            // 将 Markdown 作为输入并转换为 MD 语法树
            .use(remarkParse)
            // 添加对 Markdown 中 frontmatter 的支持
            .use(remarkFrontmatter, ["yaml"])
            // 解析并验证 Markdown frontmatter (YAML)
            .use(remarkParseFrontmatter)
            // 从 MD 语法树切换到 HTML 语法树 (remakr -> rehype)
            .use(remarkRehype, {
                // 支持 HTML 嵌入所必需 (参见下一个插件)
                allowDangerousHtml: true,
            })
            // 支持在 markdown 中嵌入 HTML
            .use(rehypeRaw)
            // 改进代码高亮
            .use(rehypeHighlight)
            // 将语法树序列化为 HTML
            .use(rehypeStringify)
            .use(rehypeSlug)
            // 为标题添加可点击的链接图标
            .use(rehypeAutolinkHeadings)

        const fileContent = fs.readFileSync(filePath, "utf-8")
        const { data, content } = matter(fileContent)
        const htmlContent = (await processor.process(content)).toString()

        return (
            <MaxWidthWrapper>
                <div className="flex flex-col xl:flex-row xl:justify-center xl:gap-8 xl:max-w-7xl xl:mx-auto">
                    {/* 文章内容 - 移动端全宽，桌面端居中显示 */}
                    <article className="w-full xl:max-w-4xl xl:flex-shrink-0">
                        <div 
                            className="prose prose-sm sm:prose-base xl:prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-pink-600 dark:prose-code:text-green-400"
                            dangerouslySetInnerHTML={{ __html: htmlContent }} 
                        />
                    </article>
                    
                    {/* On This Page - 只在桌面端显示 */}
                    <aside className="xl:flex-shrink-0 xl:w-64">
                        <Onthispage htmlContent={htmlContent} />
                    </aside>
                </div>
            </MaxWidthWrapper>
        )
    } catch (error) {
        console.error('Error loading blog post:', error)
        notFound()
    }
}

export default BlogPost