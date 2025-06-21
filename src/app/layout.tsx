import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteConfig from "@/config/site";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import DifyAiChat from "@/components/DifyAiChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SiteConfig.name,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-p-20 scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.difyChatbotConfig = {
                token: 'O6EVTgacQXFoBFOQ',
                isDev: false,
                baseUrl: 'https://udify.app',
                draggable: true,
                dragAxis: 'both',
                inputs: {},
                systemVariables: {},
                userVariables: {}
              };
            `,
          }}
        />
        <script
          src="https://udify.app/embed.min.js"
          id="O6EVTgacQXFoBFOQ"
          defer
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --dify-chatbot-bubble-button-bg-color: #1C64F2;
                --dify-chatbot-bubble-button-bottom: 20px;
                --dify-chatbot-bubble-button-right: 20px;
                --dify-chatbot-bubble-button-width: 50px;
                --dify-chatbot-bubble-button-height: 50px;
                --dify-chatbot-bubble-button-border-radius: 25px;
                --dify-chatbot-bubble-button-box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
                --dify-chatbot-bubble-button-hover-transform: scale(1.05);
              }
              #dify-chatbot-bubble-button {
                z-index: 10000 !important;
                /* 移除可能干扰拖动的样式 */
              }
              #dify-chatbot-bubble-window {
                position: fixed !important;
                width: 24rem !important;
                height: 40rem !important;
                max-height: calc(100vh - 20px) !important;
                max-width: calc(100vw - 20px) !important;
                z-index: 10000 !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                /* 确保窗口可见 */
                visibility: visible !important;
                opacity: 1 !important;
                /* 动画效果 */
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                transform-origin: bottom right !important;
              }
              /* 确保在小屏幕上聊天窗口不会超出屏幕 */
              @media (max-width: 768px) {
                #dify-chatbot-bubble-window {
                  width: calc(100vw - 40px) !important;
                  height: calc(100vh - 120px) !important;
                  max-height: calc(100vh - 120px) !important;
                  bottom: 80px !important;
                  right: 20px !important;
                  left: 20px !important;
                }
              }
              /* 防止聊天窗口内容溢出 */
              #dify-chatbot-bubble-window iframe {
                width: 100% !important;
                height: 100% !important;
                border: none !important;
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <NavBar />
          {children}
          <DifyAiChat />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
