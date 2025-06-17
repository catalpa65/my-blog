"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Render children without theme provider during SSR to avoid hydration mismatch
    if (!mounted) {
        return <div suppressHydrationWarning>{children}</div>
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}