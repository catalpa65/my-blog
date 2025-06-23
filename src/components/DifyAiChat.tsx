'use client'
import { useEffect } from 'react'

const DifyAiChat = () => {
    useEffect(() => {
        console.log('🚀 DifyAiChat component mounted')
        
        let positioningInProgress = false // 防止重复定位
        
        // 智能定位聊天窗口
        const positionChatWindow = () => {
            if (positioningInProgress) return
            positioningInProgress = true
            
            const button = document.getElementById('dify-chatbot-bubble-button')
            const chatWindow = document.getElementById('dify-chatbot-bubble-window')
            
            if (!button || !chatWindow) {
                positioningInProgress = false
                return
            }
            
            // 立即隐藏窗口以避免闪动
            chatWindow.style.transition = 'none' // 暂时禁用过渡动画
            
            const buttonRect = button.getBoundingClientRect()
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight
            
            // 获取聊天窗口的实际尺寸
            const chatRect = chatWindow.getBoundingClientRect()
            const chatWidth = chatRect.width || 384 // 使用实际宽度或默认值
            const chatHeight = chatRect.height || 640 // 使用实际高度或默认值
            const gap = 20 // 增加间距
            
            console.log('🔍 Window positioning debug:', {
                button: { x: buttonRect.left, y: buttonRect.top, width: buttonRect.width, height: buttonRect.height },
                screen: { width: windowWidth, height: windowHeight },
                chat: { width: chatWidth, height: chatHeight, actualRect: chatRect }
            })
            
            let left, top, transformOrigin = 'center center'
            
            // 计算按钮中心点
            const buttonCenterX = buttonRect.left + buttonRect.width / 2
            const buttonCenterY = buttonRect.top + buttonRect.height / 2
            
            // 简化水平定位逻辑 - 尽量靠近按钮
            const spaceOnRight = windowWidth - buttonRect.right
            const spaceOnLeft = buttonRect.left
            
            if (spaceOnRight >= chatWidth + gap) {
                // 右侧有足够空间
                left = buttonRect.right + gap
                transformOrigin = 'left center'
                console.log('✅ Positioning to the RIGHT of button')
            } else if (spaceOnLeft >= chatWidth + gap) {
                // 左侧有足够空间
                left = buttonRect.left - chatWidth - gap
                transformOrigin = 'right center'
                console.log('✅ Positioning to the LEFT of button')
            } else {
                // 水平居中，避免遮挡按钮
                left = Math.max(gap, Math.min(windowWidth - chatWidth - gap, buttonCenterX - chatWidth / 2))
                console.log('✅ Positioning CENTERED horizontally')
            }
            
            // 简化垂直定位逻辑 - 尽量靠近按钮
            const spaceBelow = windowHeight - buttonRect.bottom
            const spaceAbove = buttonRect.top
            
            if (spaceBelow >= chatHeight + gap) {
                // 下方有足够空间
                top = buttonRect.bottom + gap
                transformOrigin = transformOrigin.replace('center', 'top')
                console.log('✅ Positioning BELOW button')
            } else if (spaceAbove >= chatHeight + gap) {
                // 上方有足够空间
                top = buttonRect.top - chatHeight - gap
                transformOrigin = transformOrigin.replace('center', 'bottom')
                console.log('✅ Positioning ABOVE button')
            } else {
                // 垂直居中，避免遮挡按钮
                top = Math.max(gap, Math.min(windowHeight - chatHeight - gap, buttonCenterY - chatHeight / 2))
                console.log('✅ Positioning CENTERED vertically')
            }
            
            // 温和的边界调整
            const finalLeft = Math.max(gap, Math.min(left, windowWidth - chatWidth - gap))
            const finalTop = Math.max(gap, Math.min(top, windowHeight - chatHeight - gap))
            
            console.log('📍 Final position calculation:', {
                calculated: { left, top },
                final: { left: finalLeft, top: finalTop },
                transformOrigin,
                adjustedBy: { x: finalLeft - left, y: finalTop - top }
            })
            
            // 立即应用位置（无动画）
            chatWindow.style.left = finalLeft + 'px'
            chatWindow.style.top = finalTop + 'px'
            chatWindow.style.bottom = 'auto'
            chatWindow.style.right = 'auto'
            chatWindow.style.transformOrigin = transformOrigin
            
            // 恢复显示和过渡动画
            setTimeout(() => {
                chatWindow.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out'
                console.log('✅ Position set, transitions restored')
            }, 10) // 很短的延迟确保位置已设置
            
            // 重置标志
            setTimeout(() => {
                positioningInProgress = false
            }, 300)
        }
        
        // 监听按钮点击事件来定位窗口
        const setupWindowPositioning = () => {
            const button = document.getElementById('dify-chatbot-bubble-button')
            if (!button) return
            
            console.log('🔧 Setting up window positioning observer...')
            
            // 监听窗口变化（窗口打开时）
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                const element = node as Element
                                console.log('🔍 New element added:', element.id, element.className)
                                
                                // 检查是否是聊天窗口
                                if (element.id === 'dify-chatbot-bubble-window' || 
                                    element.className?.includes('dify-chatbot-bubble-window')) {
                                    console.log('🎯 Chat window detected, checking visibility...')
                                    setTimeout(() => {
                                        const chatWindow = document.getElementById('dify-chatbot-bubble-window')
                                        if (chatWindow && chatWindow.style.display !== 'none' && chatWindow.offsetWidth > 0) {
                                            console.log('🎯 Chat window is visible, positioning...')
                                            positionChatWindow()
                                        }
                                    }, 50)
                                }
                            }
                        })
                    }
                    
                    // 监听样式变化（特别是 display 属性）
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target as HTMLElement
                        if (target.id === 'dify-chatbot-bubble-window') {
                            const isVisible = target.style.display !== 'none' && target.offsetWidth > 0
                            console.log('🔍 Chat window style changed:', {
                                display: target.style.display,
                                width: target.offsetWidth,
                                height: target.offsetHeight,
                                visible: isVisible
                            })
                            
                            if (isVisible) {
                                console.log('🎯 Chat window became visible, positioning...')
                                setTimeout(positionChatWindow, 100) // 稍微延迟确保动画完成
                            }
                        }
                    }
                })
            })
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            })
            
            // 也监听按钮点击
            button.addEventListener('click', () => {
                console.log('🖱️ Button clicked, waiting for window to become visible...')
                
                // 轮询检查窗口是否变为可见
                let checkCount = 0
                const checkVisibility = () => {
                    const chatWindow = document.getElementById('dify-chatbot-bubble-window')
                    if (chatWindow) {
                        const isVisible = chatWindow.style.display !== 'none' && chatWindow.offsetWidth > 0
                        console.log(`🔍 Visibility check ${checkCount + 1}:`, {
                            display: chatWindow.style.display,
                            width: chatWindow.offsetWidth,
                            visible: isVisible
                        })
                        
                        if (isVisible) {
                            console.log('🎯 Window is now visible, positioning immediately...')
                            // 立即定位，不等待
                            positionChatWindow()
                            return
                        }
                        
                        // 即使还不可见，也检查是否开始显示过程
                        if (chatWindow.style.display !== 'none') {
                            console.log('🎯 Window display changed to visible, positioning preemptively...')
                            // 预先定位，即使尺寸还是0
                            setTimeout(positionChatWindow, 5)
                            return
                        }
                    }
                    
                    checkCount++
                    if (checkCount < 20) { // 增加检查次数，减少间隔
                        setTimeout(checkVisibility, 50) // 减少到50ms间隔
                    } else {
                        console.log('❌ Window did not become visible after 1 second')
                    }
                }
                
                // 立即开始检查，不等待
                checkVisibility()
            })
            
            console.log('🎯 Smart positioning system activated')
        }
        
        // 等待脚本加载完成后检查按钮
        const checkButton = () => {
            const button = document.getElementById('dify-chatbot-bubble-button')
            
            if (button) {
                console.log('✅ Dify chatbot button found and ready')
                console.log('🎯 Button can be dragged around the screen')
                console.log('💬 Click button to open chat window with smart positioning')
                
                // 检查当前DOM中是否已有聊天窗口
                console.log('🔍 Checking for existing chat windows...')
                const existingWindows = document.querySelectorAll('[id*="dify"], [class*="dify"], [id*="chat"], [class*="chat"]')
                existingWindows.forEach((el, index) => {
                    console.log(`🔍 Found element ${index}:`, {
                        id: el.id,
                        className: el.className,
                        tagName: el.tagName,
                        display: (el as HTMLElement).style.display,
                        visible: (el as HTMLElement).offsetWidth > 0
                    })
                })
                
                setupWindowPositioning()
                
                // 添加手动检查功能
                setTimeout(() => {
                    console.log('🔍 Manual check for chat window after 3 seconds...')
                    const allElements = document.querySelectorAll('*')
                    let chatWindowFound = false
                    
                    allElements.forEach(el => {
                        if (el.id && (el.id.includes('dify') || el.id.includes('chat'))) {
                            console.log('🔍 Found potential chat element:', {
                                id: el.id,
                                className: el.className,
                                display: (el as HTMLElement).style.display,
                                visible: (el as HTMLElement).offsetWidth > 0
                            })
                            
                            if (el.id === 'dify-chatbot-bubble-window' || el.id.includes('bubble-window')) {
                                chatWindowFound = true
                                console.log('🎯 Found chat window, attempting positioning...')
                                positionChatWindow()
                            }
                        }
                    })
                    
                    if (!chatWindowFound) {
                        console.log('❌ No chat window found in manual check')
                    }
                }, 3000)
                
            } else {
                console.log('❌ Dify chatbot button not found, checking again...')
                setTimeout(checkButton, 1000)
            }
        }
        
        // 延迟检查，等待脚本加载和执行
        setTimeout(checkButton, 2000)
        
        // 监听脚本加载事件
        const scriptElement = document.getElementById('O6EVTgacQXFoBFOQ')
        if (scriptElement) {
            scriptElement.addEventListener('load', () => {
                console.log('✅ Dify script loaded successfully')
                setTimeout(checkButton, 500)
            })
            
            scriptElement.addEventListener('error', () => {
                console.error('❌ Dify script failed to load')
            })
        }
        
    }, [])

    return null
}

export default DifyAiChat 