'use client'
import React, { useEffect, useState } from 'react'

interface LinkType {
    id: string
    text: string
}

const Onthispage = ({ htmlContent }: { htmlContent: string }) => {
    const [links, setLinks] = useState<null | LinkType[]>(null);

    useEffect(() => {
        // 创建一个临时的DOM元素来解析HTML内容
        const temp = document.createElement("div");
        // 将HTML字符串设置为临时元素的innerHTML
        temp.innerHTML = htmlContent

        // 查找所有h2标题元素
        const headings = temp.querySelectorAll('h2');

        // 用于存储生成的链接数组
        const generatedLinks: LinkType[] = [];

        // 遍历每个h2标题元素
        headings.forEach((heading, index) => {
            // 获取标题的id,如果没有则生成一个基于索引的id
            const id = heading.id || `heading-${index}`;
            // 确保标题元素有id属性
            heading.id = id;

            // 将标题信息添加到链接数组
            generatedLinks.push({
                id: id, // 用于锚点链接的id
                text: (heading as HTMLElement).innerText // 标题文本内容
            })
        })

        // 更新状态,存储生成的链接数组
        setLinks(generatedLinks);

    }, [htmlContent]) // 当htmlContent变化时重新执行

    return (
        <div className='hidden xl:block sticky top-20 ml-8 w-56 h-fit z-10'>
            <div className="bg-background border border-border rounded p-3">
                <h3 className="text-base font-semibold text-foreground mb-4">
                    On This Page
                </h3>
                <nav className='not-prose'>
                    <ul className='space-y-1'>
                        {links && links.map((link) => {
                            return (
                                <li key={link.id}>
                                    <a 
                                        href={`#${link.id}`}
                                        className='group block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 truncate'
                                        title={link.text}
                                    >
                                        <span className='block truncate leading-relaxed'>
                                            {link.text}
                                        </span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Onthispage