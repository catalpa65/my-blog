"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './thme-toggle'
import { HamburgerMenuIcon, Cross2Icon, HomeIcon, ReaderIcon, ChatBubbleIcon } from '@radix-ui/react-icons'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LoadingBar from "react-top-loading-bar";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const [progress, setProgress] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setProgress(0)
    }, [])

    useEffect(() => {
        setProgress(30)
        setTimeout(() => {
            setProgress(100)
        }, 100)
    }, [pathname])

    // Close menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const menuItems = [
        { href: '/', label: 'Home', icon: HomeIcon },
        { href: '/blog', label: 'Blog', icon: ReaderIcon },
        { href: '/contact', label: 'Contact', icon: ChatBubbleIcon },
    ];

    return (
        <nav className='h-16 bg-background/50 sticky top-0 z-50 border-b border-border/50 px-6 backdrop-blur-xl flex items-center justify-between'>
            <LoadingBar
                color="#3b82f6"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <div className='font-bold text-lg'>
                <Link href="/" className="hover:text-primary transition-colors">
                    ProgrammingWithJason
                </Link>
            </div>
            
            {/* Desktop Menu */}
            <ul className='hidden md:flex w-full justify-end space-x-6 items-center'>
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link 
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li className='flex items-center space-x-2 pl-4 border-l border-border/50'>
                    <ModeToggle />
                    <Link href="/">
                        <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/">
                        <Button size="sm">Sign Up</Button>
                    </Link>
                </li>
            </ul>
            
            {/* Mobile Menu */}
            <div className='flex gap-3 items-center md:hidden'>
                <ModeToggle />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2">
                            <HamburgerMenuIcon className='size-5' />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64 sm:w-64 p-0 [&>button]:hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                            <h2 className="text-sm font-semibold text-foreground">Menu</h2>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 hover:bg-muted"
                                onClick={() => setIsOpen(false)}
                            >
                                <Cross2Icon className="size-3.5" />
                            </Button>
                        </div>
                        
                        <div className='px-4 py-3'>
                            {/* Navigation Links */}
                            <div className="space-y-0.5">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link 
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                isActive 
                                                    ? 'bg-primary/10 text-primary' 
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Icon className="size-4 flex-shrink-0" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className='mt-4 pt-3 border-t border-border/50'>
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" size="sm" className="w-full h-8 text-sm font-medium mb-3">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    <Button size="sm" className="w-full h-8 text-sm font-medium">
                                        Sign Up
                                    </Button>
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
