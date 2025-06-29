---
title: "Vue.js 基础指南：从零开始掌握现代前端框架"
description: "Vue系列第一期：全面介绍Vue.js基础知识，包括应用创建、模板语法、响应式系统、组件开发等核心概念"
date: "2024-12-28"
slug: "vue-fundamentals-guide"
image: "https://picsum.photos/400/300?random=10"
tags: ["Vue.js", "JavaScript", "Frontend", "Web Development", "Framework"]
category: "Vue"
author: "Developer"
---

# Vue.js 基础指南：从零开始掌握现代前端框架

Vue.js是一个渐进式JavaScript框架，以其简洁的语法、出色的性能和丰富的生态系统而广受开发者喜爱。本文将带你系统地学习Vue.js的核心概念，为后续的深入学习打下坚实基础。

## 什么是Vue.js？

Vue.js是一个用于构建用户界面的渐进式框架。与传统的DOM操作不同，Vue采用声明式渲染，让开发者专注于描述UI应该是什么样子，而不是如何操作DOM。

### 核心特性

- **渐进式**：可以逐步集成到现有项目中
- **响应式**：数据变化自动更新视图
- **组件化**：可复用的UI构建块
- **轻量级**：运行时大小约34KB

## 创建一个Vue应用

### 方式一：CDN引入

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Vue.js 快速开始</title>
</head>
<body>
    <div id="app">{{ message }}</div>
    
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue
        
        createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).mount('#app')
    </script>
</body>
</html>
```

### 方式二：使用Vite创建项目

```bash
# 使用npm
npm create vue@latest my-vue-app

# 使用yarn  
yarn create vue my-vue-app

# 使用pnpm
pnpm create vue my-vue-app
```

### 基本应用结构

```javascript
import { createApp } from 'vue'

const app = createApp({
    data() {
        return {
            message: 'Hello Vue 3!'
        }
    }
})

app.mount('#app')
```

## 模板语法

Vue使用基于HTML的模板语法，允许你声明式地将DOM与组件实例的数据绑定。

### 文本插值

```html
<template>
    <div>
        <!-- 基本插值 -->
        <p>{{ message }}</p>
        
        <!-- 一次性插值 -->
        <p v-once>{{ message }}</p>
        
        <!-- 原始HTML -->
        <p v-html="rawHtml"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello Vue!',
            rawHtml: '<span style="color: red">这是红色文字</span>'
        }
    }
}
</script>
```

### 属性绑定

```html
<template>
    <div>
        <!-- 动态属性 -->
        <img v-bind:src="imageSrc" v-bind:alt="imageAlt">
        
        <!-- 简写语法 -->
        <img :src="imageSrc" :alt="imageAlt">
        
        <!-- 动态属性名 -->
        <a :[attributeName]="url">链接</a>
        
        <!-- 布尔属性 -->
        <button :disabled="isButtonDisabled">按钮</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageSrc: '/path/to/image.jpg',
            imageAlt: '图片描述',
            attributeName: 'href',
            url: 'https://vuejs.org',
            isButtonDisabled: false
        }
    }
}
</script>
```

### JavaScript表达式

```html
<template>
    <div>
        <!-- 表达式计算 -->
        <p>{{ number + 1 }}</p>
        <p>{{ ok ? 'YES' : 'NO' }}</p>
        <p>{{ message.split('').reverse().join('') }}</p>
        
        <!-- 在属性中使用 -->
        <div :id="`list-${id}`"></div>
    </div>
</template>
```

## 响应式基础

Vue的响应式系统是其核心特性，能够自动追踪数据变化并更新相关的DOM。

### data选项

```javascript
export default {
    data() {
        return {
            // 基本数据类型
            count: 0,
            message: 'Hello',
            isVisible: true,
            
            // 对象
            user: {
                name: '张三',
                age: 25
            },
            
            // 数组
            items: ['苹果', '香蕉', '橙子']
        }
    }
}
```

### 响应式原理

```html
<template>
    <div>
        <p>计数器: {{ count }}</p>
        <button @click="increment">+1</button>
        
        <p>用户: {{ user.name }} ({{ user.age }}岁)</p>
        <button @click="updateUser">更新用户</button>
        
        <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
        <button @click="addItem">添加项目</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            user: { name: '张三', age: 25 },
            items: ['苹果', '香蕉']
        }
    },
    methods: {
        increment() {
            this.count++ // 自动触发视图更新
        },
        updateUser() {
            this.user.age++ // 嵌套对象也是响应式的
        },
        addItem() {
            this.items.push('新水果') // 数组变化也会触发更新
        }
    }
}
</script>
```

## 计算属性

计算属性基于它们的响应式依赖进行缓存，只在相关响应式依赖发生改变时重新求值。

### 基本用法

```html
<template>
    <div>
        <p>原始消息: {{ message }}</p>
        <p>反转消息: {{ reversedMessage }}</p>
        
        <p>全名: {{ fullName }}</p>
        
        <p>购物车总价: ¥{{ totalPrice }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello Vue',
            firstName: '张',
            lastName: '三',
            cart: [
                { name: '商品1', price: 100, quantity: 2 },
                { name: '商品2', price: 50, quantity: 1 }
            ]
        }
    },
    computed: {
        // 简单计算属性
        reversedMessage() {
            return this.message.split('').reverse().join('')
        },
        
        // 依赖多个数据
        fullName() {
            return this.firstName + this.lastName
        },
        
        // 复杂计算
        totalPrice() {
            return this.cart.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        }
    }
}
</script>
```

### 计算属性 vs 方法

```html
<template>
    <div>
        <!-- 计算属性：有缓存 -->
        <p>{{ expensiveCalculation }}</p>
        <p>{{ expensiveCalculation }}</p> <!-- 不会重新计算 -->
        
        <!-- 方法：每次都会执行 -->
        <p>{{ expensiveMethod() }}</p>
        <p>{{ expensiveMethod() }}</p> <!-- 会重新执行 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: Array.from({length: 10000}, (_, i) => i)
        }
    },
    computed: {
        expensiveCalculation() {
            console.log('计算属性执行了') // 只会打印一次
            return this.items.reduce((sum, item) => sum + item, 0)
        }
    },
    methods: {
        expensiveMethod() {
            console.log('方法执行了') // 会打印两次
            return this.items.reduce((sum, item) => sum + item, 0)
        }
    }
}
</script>
```

### 可写计算属性

```javascript
computed: {
    fullName: {
        get() {
            return this.firstName + ' ' + this.lastName
        },
        set(newValue) {
            const names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
        }
    }
}
```

## 类与样式绑定

Vue提供了专门的增强功能来绑定class和style，因为它们都是attribute，所以可以用v-bind处理。

### Class绑定

```html
<template>
    <div>
        <!-- 对象语法 -->
        <div :class="{ active: isActive, 'text-danger': hasError }">
            对象语法
        </div>
        
        <!-- 数组语法 -->
        <div :class="[activeClass, errorClass]">
            数组语法
        </div>
        
        <!-- 在数组中使用对象 -->
        <div :class="[{ active: isActive }, errorClass]">
            混合语法
        </div>
        
        <!-- 绑定计算属性 -->
        <div :class="classObject">
            计算属性
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            hasError: false,
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    },
    computed: {
        classObject() {
            return {
                active: this.isActive && !this.hasError,
                'text-danger': this.hasError && this.hasError.type === 'fatal'
            }
        }
    }
}
</script>

<style>
.active { background-color: green; }
.text-danger { color: red; }
</style>
```

### Style绑定

```html
<template>
    <div>
        <!-- 对象语法 -->
        <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
            对象语法
        </div>
        
        <!-- 绑定样式对象 -->
        <div :style="styleObject">
            样式对象
        </div>
        
        <!-- 数组语法 -->
        <div :style="[baseStyles, overridingStyles]">
            数组语法
        </div>
        
        <!-- 自动添加前缀 -->
        <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
            自动前缀
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeColor: 'red',
            fontSize: 30,
            styleObject: {
                color: 'blue',
                fontSize: '16px'
            },
            baseStyles: {
                backgroundColor: 'lightgray'
            },
            overridingStyles: {
                color: 'purple'
            }
        }
    }
}
</script>
```

## 条件渲染

Vue提供了v-if、v-else-if、v-else和v-show指令来条件性地渲染元素。

### v-if 指令

```html
<template>
    <div>
        <!-- 基本条件渲染 -->
        <h1 v-if="awesome">Vue 太棒了！</h1>
        <h1 v-else>哦不</h1>
        
        <!-- 多个条件 -->
        <div v-if="type === 'A'">A</div>
        <div v-else-if="type === 'B'">B</div>
        <div v-else-if="type === 'C'">C</div>
        <div v-else>Not A/B/C</div>
        
        <!-- 条件渲染组 -->
        <template v-if="loginType === 'username'">
            <label>用户名</label>
            <input placeholder="输入用户名" key="username-input">
        </template>
        <template v-else>
            <label>邮箱</label>
            <input placeholder="输入邮箱地址" key="email-input">
        </template>
        
        <button @click="toggleLoginType">切换登录类型</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            awesome: true,
            type: 'A',
            loginType: 'username'
        }
    },
    methods: {
        toggleLoginType() {
            this.loginType = this.loginType === 'username' ? 'email' : 'username'
        }
    }
}
</script>
```

### v-show 指令

```html
<template>
    <div>
        <h1 v-show="ok">Hello!</h1>
        
        <!-- v-if vs v-show 比较 -->
        <div>
            <p v-if="showWithIf">使用 v-if（{{ ifToggleCount }}）</p>
            <p v-show="showWithShow">使用 v-show（{{ showToggleCount }}）</p>
            
            <button @click="toggleIf">切换 v-if</button>
            <button @click="toggleShow">切换 v-show</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ok: true,
            showWithIf: true,
            showWithShow: true,
            ifToggleCount: 0,
            showToggleCount: 0
        }
    },
    methods: {
        toggleIf() {
            this.showWithIf = !this.showWithIf
            this.ifToggleCount++
        },
        toggleShow() {
            this.showWithShow = !this.showWithShow
            this.showToggleCount++
        }
    }
}
</script>
```

## 列表渲染

使用v-for指令基于一个数组来渲染一个列表。

### 基本列表渲染

```html
<template>
    <div>
        <!-- 渲染数组 -->
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.message }}
            </li>
        </ul>
        
        <!-- 带索引的渲染 -->
        <ul>
            <li v-for="(item, index) in items" :key="item.id">
                {{ index }} - {{ item.message }}
            </li>
        </ul>
        
        <!-- 渲染对象 -->
        <ul>
            <li v-for="(value, key) in object" :key="key">
                {{ key }}: {{ value }}
            </li>
        </ul>
        
        <!-- 渲染对象（带索引） -->
        <ul>
            <li v-for="(value, name, index) in object" :key="name">
                {{ index }}. {{ name }}: {{ value }}
            </li>
        </ul>
        
        <!-- 渲染数字 -->
        <span v-for="n in 10" :key="n">{{ n }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 1, message: 'Foo' },
                { id: 2, message: 'Bar' }
            ],
            object: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            }
        }
    }
}
</script>
```

### 列表更新检测

```html
<template>
    <div>
        <ul>
            <li v-for="item in filteredItems" :key="item.id">
                {{ item.name }} - ¥{{ item.price }}
            </li>
        </ul>
        
        <button @click="addItem">添加商品</button>
        <button @click="removeItem">删除商品</button>
        <button @click="sortItems">排序</button>
        <button @click="filterExpensive">只显示贵的</button>
        <button @click="showAll">显示全部</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 1, name: '苹果', price: 5 },
                { id: 2, name: '香蕉', price: 3 },
                { id: 3, name: '橙子', price: 8 }
            ],
            filter: 'all'
        }
    },
    computed: {
        filteredItems() {
            if (this.filter === 'expensive') {
                return this.items.filter(item => item.price > 5)
            }
            return this.items
        }
    },
    methods: {
        addItem() {
            const newId = Math.max(...this.items.map(item => item.id)) + 1
            this.items.push({
                id: newId,
                name: `商品${newId}`,
                price: Math.floor(Math.random() * 20) + 1
            })
        },
        removeItem() {
            if (this.items.length > 0) {
                this.items.pop()
            }
        },
        sortItems() {
            this.items.sort((a, b) => a.price - b.price)
        },
        filterExpensive() {
            this.filter = 'expensive'
        },
        showAll() {
            this.filter = 'all'
        }
    }
}
</script>
```

## 事件处理

可以使用v-on指令（简写为@）来监听DOM事件，并在触发事件时执行JavaScript代码。

### 基本事件处理

```html
<template>
    <div>
        <!-- 内联事件处理器 -->
        <button @click="count++">Add 1</button>
        <p>计数: {{ count }}</p>
        
        <!-- 方法事件处理器 -->
        <button @click="greet">问候</button>
        
        <!-- 在内联处理器中调用方法 -->
        <button @click="say('hello')">说 hello</button>
        <button @click="say('bye')">说 bye</button>
        
        <!-- 访问事件对象 -->
        <button @click="warn('Form cannot be submitted yet.', $event)">
            提交
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            name: 'Vue.js'
        }
    },
    methods: {
        greet(event) {
            alert('Hello ' + this.name + '!')
            if (event) {
                alert(event.target.tagName)
            }
        },
        say(message) {
            alert(message)
        },
        warn(message, event) {
            if (event) {
                event.preventDefault()
            }
            alert(message)
        }
    }
}
</script>
```

### 事件修饰符

```html
<template>
    <div>
        <!-- 阻止单击事件继续传播 -->
        <a @click.stop="doThis">停止传播</a>
        
        <!-- 提交事件不再重载页面 -->
        <form @submit.prevent="onSubmit">
            <input type="submit" value="提交">
        </form>
        
        <!-- 修饰符可以串联 -->
        <a @click.stop.prevent="doThat">串联修饰符</a>
        
        <!-- 只有修饰符 -->
        <form @submit.prevent></form>
        
        <!-- 添加事件监听器时使用事件捕获模式 -->
        <div @click.capture="doThis">...</div>
        
        <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
        <div @click.self="doThat">...</div>
        
        <!-- 点击事件将只会触发一次 -->
        <a @click.once="doThis">只触发一次</a>
        
        <!-- 滚动事件的默认行为将会立即触发 -->
        <div @scroll.passive="onScroll">...</div>
    </div>
</template>

<script>
export default {
    methods: {
        doThis() {
            console.log('doThis')
        },
        doThat() {
            console.log('doThat')
        },
        onSubmit() {
            console.log('表单提交')
        },
        onScroll() {
            console.log('滚动事件')
        }
    }
}
</script>
```

### 按键修饰符

```html
<template>
    <div>
        <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
        <input @keyup.enter="submit">
        
        <!-- Alt + Enter -->
        <input @keyup.alt.enter="clear">
        
        <!-- Ctrl + Click -->
        <div @click.ctrl="doSomething">Do something</div>
        
        <!-- 按键别名 -->
        <input @keyup.page-down="onPageDown">
        
        <!-- 使用 keyCode -->
        <input @keyup.13="submit">
        
        <!-- 鼠标按钮修饰符 -->
        <button @click.left="leftClick">左键</button>
        <button @click.right="rightClick">右键</button>
        <button @click.middle="middleClick">中键</button>
    </div>
</template>

<script>
export default {
    methods: {
        submit() {
            console.log('提交')
        },
        clear() {
            console.log('清空')
        },
        doSomething() {
            console.log('做一些事情')
        },
        onPageDown() {
            console.log('翻页')
        },
        leftClick() {
            console.log('左键点击')
        },
        rightClick() {
            console.log('右键点击')
        },
        middleClick() {
            console.log('中键点击')
        }
    }
}
</script>
```

## 表单输入绑定

可以用v-model指令在表单input、textarea以及select元素上创建双向数据绑定。

### 基础用法

```html
<template>
    <div>
        <!-- 文本输入 -->
        <input v-model="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>
        
        <!-- 多行文本 -->
        <textarea v-model="textarea" placeholder="add multiple lines"></textarea>
        <p>Multiline message is:</p>
        <p style="white-space: pre-line;">{{ textarea }}</p>
        
        <!-- 复选框 -->
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
        
        <!-- 多个复选框 -->
        <div>
            <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
            <label for="jack">Jack</label>
            
            <input type="checkbox" id="john" value="John" v-model="checkedNames">
            <label for="john">John</label>
            
            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
            <label for="mike">Mike</label>
        </div>
        <span>Checked names: {{ checkedNames }}</span>
        
        <!-- 单选按钮 -->
        <div>
            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            
            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
        </div>
        <span>Picked: {{ picked }}</span>
        
        <!-- 选择框 -->
        <select v-model="selected">
            <option disabled value="">请选择</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
        
        <!-- 多选 -->
        <select v-model="multiSelected" multiple style="width: 50px;">
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ multiSelected }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            textarea: '',
            checked: false,
            checkedNames: [],
            picked: '',
            selected: '',
            multiSelected: []
        }
    }
}
</script>
```

### 修饰符

```html
<template>
    <div>
        <!-- lazy：在 change 时而非 input 时更新 -->
        <input v-model.lazy="msg">
        
        <!-- number：自动将用户的输入值转为数值类型 -->
        <input v-model.number="age" type="number">
        
        <!-- trim：自动过滤用户输入的首尾空白字符 -->
        <input v-model.trim="msg">
        
        <!-- 自定义组件的 v-model -->
        <custom-input v-model="searchText"></custom-input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            age: 0,
            searchText: ''
        }
    }
}
</script>
```

## 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

### 基本侦听器

```html
<template>
    <div>
        <p>
            Ask a yes/no question:
            <input v-model="question">
        </p>
        <p>{{ answer }}</p>
        
        <div>
            <p>深度监听对象:</p>
            <input v-model="user.name" placeholder="姓名">
            <input v-model="user.age" type="number" placeholder="年龄">
            <p>用户信息: {{ user.name }}, {{ user.age }}岁</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            question: '',
            answer: '还没有提问呢！',
            user: {
                name: '张三',
                age: 25
            }
        }
    },
    watch: {
        // 基本侦听器
        question(newQuestion, oldQuestion) {
            if (newQuestion.indexOf('?') > -1) {
                this.getAnswer()
            }
        },
        
        // 深度侦听
        user: {
            handler(newVal, oldVal) {
                console.log('用户信息变化了', newVal)
            },
            deep: true
        },
        
        // 立即执行
        immediate: {
            handler(val) {
                console.log('立即执行', val)
            },
            immediate: true
        }
    },
    methods: {
        async getAnswer() {
            this.answer = '思考中...'
            try {
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1000))
                this.answer = Math.random() > 0.5 ? 'Yes' : 'No'
            } catch (error) {
                this.answer = '错误! 无法访问API. ' + error
            }
        }
    }
}
</script>
```

### 侦听器选项

```javascript
export default {
    data() {
        return {
            a: 1,
            b: 2,
            c: {
                d: 4
            },
            e: 'test'
        }
    },
    watch: {
        // 侦听单个属性
        a(val, oldVal) {
            console.log(`a changed: ${oldVal} -> ${val}`)
        },
        
        // 方法名
        b: 'someMethod',
        
        // 深度侦听
        c: {
            handler(val, oldVal) {
                console.log('c changed')
            },
            deep: true
        },
        
        // 立即执行
        d: {
            handler(val, oldVal) {
                console.log('d changed')
            },
            immediate: true
        },
        
        // 传入回调数组，它们会被逐一调用
        e: [
            'handle1',
            function handle2(val, oldVal) {
                console.log('handle2 triggered')
            },
            {
                handler: function handle3(val, oldVal) {
                    console.log('handle3 triggered')
                }
            }
        ]
    },
    methods: {
        someMethod() {
            console.log('someMethod triggered')
        },
        handle1() {
            console.log('handle1 triggered')
        }
    }
}
```

## 模板引用

虽然Vue的声明性渲染模型为你抽象了大部分对DOM的直接操作，但是在某些情况下，我们仍然需要直接访问底层DOM元素。

### 基本用法

```html
<template>
    <div>
        <!-- 基本引用 -->
        <input ref="input" />
        <button @click="focusInput">聚焦输入框</button>
        
        <!-- v-for 中的引用 -->
        <ul>
            <li v-for="(item, i) in list" :ref="el => { if (el) itemRefs[i] = el }">
                {{ item }}
            </li>
        </ul>
        <button @click="highlightFirst">高亮第一项</button>
        
        <!-- 组件引用 -->
        <child-component ref="child"></child-component>
        <button @click="callChildMethod">调用子组件方法</button>
    </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
    components: {
        ChildComponent
    },
    data() {
        return {
            list: ['item1', 'item2', 'item3'],
            itemRefs: []
        }
    },
    methods: {
        focusInput() {
            this.$refs.input.focus()
        },
        highlightFirst() {
            if (this.itemRefs[0]) {
                this.itemRefs[0].style.backgroundColor = 'yellow'
            }
        },
        callChildMethod() {
            this.$refs.child.someMethod()
        }
    }
}
</script>
```

### 组合式API中的模板引用

```html
<template>
    <input ref="inputRef" />
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const inputRef = ref(null)
        
        onMounted(() => {
            inputRef.value.focus()
        })
        
        return {
            inputRef
        }
    }
}
</script>
```

## 组件基础

组件允许我们将UI划分为独立、可复用的片段，并且可以对每个片段进行单独的思考。

### 定义组件

```html
<!-- ButtonCounter.vue -->
<template>
    <button @click="increment">You clicked me {{ count }} times.</button>
</template>

<script>
export default {
    name: 'ButtonCounter',
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            this.count++
        }
    }
}
</script>
```

### 使用组件

```html
<template>
    <div>
        <h1>Here is a child component!</h1>
        <ButtonCounter />
        <ButtonCounter />
        <ButtonCounter />
    </div>
</template>

<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
    components: {
        ButtonCounter
    }
}
</script>
```

### Props传递数据

```html
<!-- BlogPost.vue -->
<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <p>{{ content }}</p>
        <div class="meta">
            <span>作者: {{ author }}</span>
            <span>发布时间: {{ publishDate }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogPost',
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: '暂无内容'
        },
        author: String,
        publishDate: {
            type: Date,
            default: () => new Date()
        }
    }
}
</script>
```

### 监听事件

```html
<!-- 父组件 -->
<template>
    <div>
        <div :style="{ fontSize: postFontSize + 'em' }">
            <BlogPost
                v-for="post in posts"
                :key="post.id"
                :title="post.title"
                :content="post.content"
                @enlarge-text="postFontSize += 0.1"
            ></BlogPost>
        </div>
    </div>
</template>

<!-- 子组件 BlogPost.vue -->
<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <button @click="$emit('enlarge-text')">放大文字</button>
    </div>
</template>

<script>
export default {
    props: ['title'],
    emits: ['enlarge-text']
}
</script>
```

### 插槽

```html
<!-- AlertBox.vue -->
<template>
    <div class="alert-box">
        <strong>This is an Error for Demo Purposes</strong>
        <slot></slot>
    </div>
</template>

<style>
.alert-box {
    padding: 20px;
    background: #f3beb8;
    border: 1px solid #f09898;
}
</style>

<!-- 使用组件 -->
<template>
    <AlertBox>
        Something bad happened.
    </AlertBox>
</template>
```

## 生命周期

每个Vue组件实例在被创建时都要经过一系列的初始化过程，同时在这个过程中也会运行一些叫做生命周期钩子的函数。

### 生命周期图示

```javascript
export default {
    // 创建阶段
    beforeCreate() {
        console.log('beforeCreate: 组件实例刚被创建')
        // 此时 data 和 methods 还未初始化
    },
    
    created() {
        console.log('created: 组件实例创建完成')
        // data 和 methods 已初始化，但DOM还未挂载
        // 适合进行数据获取
    },
    
    // 挂载阶段
    beforeMount() {
        console.log('beforeMount: 组件即将挂载到DOM')
    },
    
    mounted() {
        console.log('mounted: 组件已挂载到DOM')
        // DOM已创建，可以访问DOM元素
        // 适合进行DOM操作、启动定时器等
    },
    
    // 更新阶段
    beforeUpdate() {
        console.log('beforeUpdate: 组件数据更新前')
    },
    
    updated() {
        console.log('updated: 组件数据更新后')
        // DOM已更新，但要避免在此更改状态
    },
    
    // 销毁阶段
    beforeDestroy() {
        console.log('beforeDestroy: 组件即将销毁')
        // 适合进行清理工作：清除定时器、取消网络请求等
    },
    
    destroyed() {
        console.log('destroyed: 组件已销毁')
    }
}
```

### 实际应用示例

```html
<template>
    <div>
        <h2>用户列表</h2>
        <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }}
            </li>
        </ul>
        <p v-else-if="loading">加载中...</p>
        <p v-else>暂无用户数据</p>
        
        <div>当前时间: {{ currentTime }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            loading: true,
            currentTime: new Date().toLocaleTimeString(),
            timer: null
        }
    },
    
    async created() {
        // 组件创建时获取数据
        try {
            await this.fetchUsers()
        } catch (error) {
            console.error('获取用户数据失败:', error)
        }
    },
    
    mounted() {
        // 挂载后启动定时器
        this.timer = setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString()
        }, 1000)
    },
    
    beforeDestroy() {
        // 销毁前清理定时器
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
    
    methods: {
        async fetchUsers() {
            this.loading = true
            try {
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1000))
                this.users = [
                    { id: 1, name: '张三', email: 'zhangsan@example.com' },
                    { id: 2, name: '李四', email: 'lisi@example.com' }
                ]
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
```

## 总结

通过本文的学习，你已经掌握了Vue.js的核心基础知识：

### 🎯 关键概念
- **声明式渲染**：描述UI应该是什么样子
- **响应式系统**：数据变化自动更新视图
- **组件化开发**：可复用的UI构建块
- **指令系统**：扩展HTML的功能

### 🛠️ 核心技能
- 创建Vue应用和组件
- 使用模板语法绑定数据
- 处理用户交互和事件
- 管理组件状态和生命周期
- 组件间通信（props和events）

### 📈 最佳实践
1. **合理使用计算属性**：对于复杂逻辑优先使用计算属性而不是方法
2. **正确使用v-if和v-show**：频繁切换用v-show，条件很少改变用v-if
3. **为列表项提供key**：确保列表渲染的性能和正确性
4. **组件化思维**：将复杂UI拆分为小的、可复用的组件
5. **生命周期管理**：在合适的生命周期钩子中进行相应操作

Vue.js的设计理念是渐进式，你可以从简单的数据绑定开始，逐步深入到复杂的组件系统。掌握了这些基础概念后，你就可以开始构建实际的Vue应用了。

在下一期Vue系列文章中，我们将深入探讨Vue的高级特性，包括组合式API、状态管理、路由系统等内容。敬请期待！

## 延伸阅读

- [Vue.js 官方文档](https://vuejs.org/)
- [Vue.js 风格指南](https://vuejs.org/style-guide/)
- [Vue DevTools](https://devtools.vuejs.org/)
- [Awesome Vue](https://github.com/vuejs/awesome-vue) 