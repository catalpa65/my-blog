import { cn } from '@/lib/utils'
import React from 'react'

interface MaxWidthWrapperProps {
    className: string
    children: React.ReactNode
}
const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
    return (
        <div className={cn('mx-auto max-w-screen w-full my-12', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper