import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './thme-toggle'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const NavBar = () => {
    return (
        <nav className='h-16 bg-background/40 sticky top-0 z-50 border-b px-8 backdrop-blur-2xl flex items-center justify-between'>
            <div className='font-bold text-xl'>
                ProgrammingWithJason
            </div>
            <ul className='hidden md:flex w-full justify-end space-x-4 items-center '>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li className='buttons space-x-2 px-4'>
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline">Sign Up</Button>
                    </Link>
                </li>
            </ul>
            <div className='flex gap-2 items-center'>
                <ModeToggle />
                <Sheet>
                    <SheetTrigger><HamburgerMenuIcon className='size-7 md:hidden' /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>
                                Navigate to different sections of the website.
                            </SheetDescription>
                        </SheetHeader>
                        <div className='flex flex-col space-y-4 mt-4'>
                            <Link href="/" className="text-lg">Home</Link>
                            <Link href="/about" className="text-lg">About</Link>
                            <Link href="/blog" className="text-lg">Blog</Link>
                            <Link href="/contact" className="text-lg">Contact</Link>
                            <div className='space-y-2 pt-4'>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full">Sign Up</Button>
                                </Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}

export default NavBar