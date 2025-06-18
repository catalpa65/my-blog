---
title: "TypeScript Best Practices"
description: "Essential TypeScript patterns and practices for better code quality."
date: "2024-02-15"
slug: "typescript-best-practices"
image: "https://picsum.photos/400/300?random=7"
tags: ["TypeScript", "JavaScript", "Best Practices", "Types"]
category: "Tutorial"
author: "Developer"
---

# TypeScript Best Practices

TypeScript has become the go-to language for building scalable JavaScript applications. Its static type system helps catch errors early, improves code documentation, and enhances developer productivity. This comprehensive guide covers essential best practices that will help you write better, more maintainable TypeScript code.

## Type System Fundamentals

### Use Strict Mode

Always enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
```

### Prefer Type Inference

Let TypeScript infer types when possible:

```typescript
// Good: Type inference
const name = "John"; // TypeScript infers string
const age = 30; // TypeScript infers number
const users = [{ id: 1, name: "Alice" }]; // Infers array type

// Avoid: Unnecessary explicit typing
const name: string = "John";
const age: number = 30;
```

### Use Union Types Effectively

```typescript
// Good: Union types for specific values
type Status = "loading" | "success" | "error";
type Theme = "light" | "dark" | "auto";

// Good: Union types for different data shapes
type ApiResponse = 
  | { success: true; data: User[] }
  | { success: false; error: string };

function handleResponse(response: ApiResponse) {
  if (response.success) {
    // TypeScript knows response.data exists
    console.log(response.data);
  } else {
    // TypeScript knows response.error exists
    console.log(response.error);
  }
}
```

## Interface vs Type Aliases

### When to Use Interfaces

Use interfaces for object shapes that might be extended:

```typescript
// Good: Interface for extendable object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

// Interfaces can be merged
interface User {
  createdAt: Date; // Merges with above interface
}
```

### When to Use Type Aliases

Use type aliases for unions, primitives, and computed types:

```typescript
// Good: Type aliases for unions
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// Good: Type aliases for computed types
type UserKeys = keyof User;
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;

// Good: Type aliases for complex types
type EventHandler<T> = (event: T) => void;
type ApiEndpoint<T> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  payload?: T;
};
```

## Generic Programming

### Write Generic Functions

```typescript
// Good: Generic function for reusability
function identity<T>(arg: T): T {
  return arg;
}

// Good: Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Usage
const name = getProperty({ name: "John", age: 30 }, "name"); // string
const age = getProperty({ name: "John", age: 30 }, "age"); // number
```

### Generic Interfaces and Types

```typescript
// Generic interface
interface Repository<T> {
  create(item: Omit<T, 'id'>): Promise<T>;
  findById(id: string): Promise<T | null>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Generic type with constraints
type Validator<T> = {
  [K in keyof T]: (value: T[K]) => string | null;
};

// Usage
const userValidator: Validator<User> = {
  id: (value) => typeof value === 'number' ? null : 'Must be a number',
  name: (value) => value.length > 0 ? null : 'Name is required',
  email: (value) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email'
};
```

### Conditional Types

```typescript
// Conditional type for API responses
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

// Utility type to extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type UserArrayElement = ArrayElement<User[]>; // User
type StringArrayElement = ArrayElement<string[]>; // string
```

## Utility Types

### Built-in Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const updateUser = (id: number, updates: PartialUser) => {
  // Implementation
};

// Pick - select specific properties
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude specific properties
type CreateUserRequest = Omit<User, 'id'>;

// Required - make all properties required
type RequiredUser = Required<User>;

// Record - create object type with specific keys and values
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

### Custom Utility Types

```typescript
// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Create a type with specific keys made optional
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = OptionalFields<User, 'email'>;
```

## Error Handling Patterns

### Result Pattern

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User, string>> {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      return { success: false, error: "User not found" };
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}

// Usage
const result = await fetchUser("123");
if (result.success) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error); // TypeScript knows error exists
}
```

### Option/Maybe Pattern

```typescript
type Option<T> = T | null | undefined;

function safeDivide(a: number, b: number): Option<number> {
  return b === 0 ? null : a / b;
}

function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
  return option ?? defaultValue;
}

// Usage
const result = safeDivide(10, 2);
const safeResult = unwrapOr(result, 0);
```

## Class Best Practices

### Access Modifiers and Readonly

```typescript
class User {
  public readonly id: number;
  private _password: string;
  protected email: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this._password = password;
  }

  // Getter/setter for controlled access
  get password(): string {
    throw new Error("Password is not readable");
  }

  set password(newPassword: string) {
    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    this._password = newPassword;
  }

  // Public method
  public updateEmail(newEmail: string): void {
    this.validateEmail(newEmail);
    this.email = newEmail;
  }

  // Private method
  private validateEmail(email: string): void {
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format");
    }
  }
}
```

### Abstract Classes and Interfaces

```typescript
// Abstract class for common functionality
abstract class Shape {
  abstract calculateArea(): number;
  
  // Common method
  describe(): string {
    return `This shape has an area of ${this.calculateArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// Interface for contracts
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class Rectangle extends Shape implements Drawable, Movable {
  constructor(
    private width: number, 
    private height: number
  ) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  draw(): void {
    console.log("Drawing rectangle");
  }

  move(x: number, y: number): void {
    console.log(`Moving rectangle to (${x}, ${y})`);
  }
}
```

## Function Best Practices

### Function Overloading

```typescript
// Function overloads for different parameter combinations
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

// Usage - TypeScript knows the exact return type
const div = createElement("div"); // HTMLDivElement
const span = createElement("span"); // HTMLSpanElement
```

### Optional and Default Parameters

```typescript
// Good: Optional parameters with defaults
function createUser(
  name: string,
  email: string,
  role: "admin" | "user" = "user",
  isActive: boolean = true
): User {
  return { name, email, role, isActive };
}

// Good: Using object parameter for many options
interface CreateUserOptions {
  name: string;
  email: string;
  role?: "admin" | "user";
  isActive?: boolean;
}

function createUserAdvanced({
  name,
  email,
  role = "user",
  isActive = true
}: CreateUserOptions): User {
  return { name, email, role, isActive };
}
```

### Rest Parameters and Spread

```typescript
// Good: Typed rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Good: Generic rest parameters
function combine<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

// Usage
const result1 = sum(1, 2, 3, 4); // number
const result2 = combine([1, 2], [3, 4], [5, 6]); // number[]
```

## Advanced Type Patterns

### Branded Types

```typescript
// Brand types for type safety
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

function getUser(id: UserId): User {
  // Implementation
}

// This prevents mixing up different ID types
const userId = createUserId("user123");
const productId = createProductId("product456");

getUser(userId); // ✅ Correct
// getUser(productId); // ❌ TypeScript error
```

### Template Literal Types

```typescript
// Template literal types for dynamic string types
type EventName = `on${Capitalize<string>}`;
type CSSProperty = `--${string}`;

// URL building
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = `/api/${string}`;
type ApiCall = `${HttpMethod} ${Endpoint}`;

// Usage
const apiCall: ApiCall = "GET /api/users"; // ✅
// const invalid: ApiCall = "INVALID /api/users"; // ❌ Error
```

### Mapped Types

```typescript
// Create readonly version of type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Create mutable version of type
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Create nullable version of type
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Transform property names
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type UserGetters = Getters<User>;
// Result: { getId(): number; getName(): string; getEmail(): string; }
```

## Module Organization

### Barrel Exports

```typescript
// types/index.ts - Barrel export file
export type { User, CreateUserRequest, UpdateUserRequest } from './user';
export type { Product, ProductCategory } from './product';
export type { ApiResponse, ErrorResponse } from './api';

// services/index.ts
export { UserService } from './user.service';
export { ProductService } from './product.service';
export { default as ApiClient } from './api-client';

// Usage
import { User, UserService, ApiClient } from '@/services';
```

### Declaration Merging

```typescript
// Extend existing interfaces
interface Window {
  myCustomProperty: string;
}

// Extend namespace
declare namespace Express {
  interface Request {
    user?: User;
  }
}

// Module augmentation
declare module "lodash" {
  interface LoDashStatic {
    customMethod(): string;
  }
}
```

## Testing with TypeScript

### Type-Safe Testing

```typescript
import { describe, it, expect } from '@jest/globals';

// Type-safe mock
const mockUserService: jest.Mocked<UserService> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Test with proper typing
describe('UserController', () => {
  it('should create user successfully', async () => {
    const userData: CreateUserRequest = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const expectedUser: User = {
      id: 1,
      ...userData
    };

    mockUserService.create.mockResolvedValue(expectedUser);

    const result = await userController.create(userData);
    
    expect(result).toEqual(expectedUser);
    expect(mockUserService.create).toHaveBeenCalledWith(userData);
  });
});
```

### Custom Matchers

```typescript
// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUser(): R;
      toHaveProperty<T>(property: keyof T): R;
    }
  }
}

expect.extend({
  toBeValidUser(received: any) {
    const pass = received && 
                 typeof received.id === 'number' &&
                 typeof received.name === 'string' &&
                 typeof received.email === 'string';

    return {
      message: () => `expected ${received} to be a valid user`,
      pass,
    };
  },
});
```

## Configuration Best Practices

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"]
    }
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "build",
    "dist"
  ]
}
```

### Environment-specific Types

```typescript
// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      API_URL: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};
```

## Performance Considerations

### Type-only Imports

```typescript
// Use type-only imports when possible
import type { User } from './types/user';
import type { ApiResponse } from './types/api';

// Regular import for runtime values
import { UserService } from './services/user.service';

// Mixed import
import { type CreateUserRequest, validateUser } from './user';
```

### Avoiding Type Assertions

```typescript
// Bad: Type assertion without validation
const user = data as User;

// Good: Type guard with validation
function isUser(obj: any): obj is User {
  return obj && 
         typeof obj.id === 'number' &&
         typeof obj.name === 'string' &&
         typeof obj.email === 'string';
}

const user = isUser(data) ? data : null;

// Good: Using validation library
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

const user = UserSchema.parse(data); // Throws if invalid
```

## Common Pitfalls and Solutions

### Any Type Usage

```typescript
// Bad: Using any defeats the purpose
let data: any = getData();

// Good: Use unknown for uncertain types
let data: unknown = getData();

if (typeof data === 'string') {
  console.log(data.toUpperCase()); // TypeScript knows it's a string
}

// Good: Use specific union types
let data: string | number | boolean = getData();
```

### Enum vs Union Types

```typescript
// Consider union types over enums
type Status = 'pending' | 'approved' | 'rejected';

// Use const assertions for enum-like behavior
const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
```

### Function Return Types

```typescript
// Good: Explicit return types for public APIs
function processUser(user: User): Promise<ProcessedUser> {
  return processUserInternal(user);
}

// Good: Let TypeScript infer for internal functions
function processUserInternal(user: User) {
  // Implementation
  return {
    ...user,
    processed: true,
    timestamp: Date.now()
  };
}
```

## Conclusion

Following these TypeScript best practices will help you write more maintainable, type-safe code:

1. **Enable strict mode** for better type checking
2. **Prefer type inference** over explicit typing when possible
3. **Use interfaces for extensible objects** and type aliases for unions
4. **Leverage generic programming** for reusable code
5. **Use utility types** to transform existing types
6. **Implement proper error handling** patterns
7. **Write type-safe tests** with proper mocking
8. **Organize modules** with barrel exports
9. **Avoid common pitfalls** like any usage and type assertions
10. **Configure TypeScript properly** for your project needs

Remember that TypeScript is a tool to make your JavaScript better. Use it to catch errors early, improve code documentation, and enhance developer experience, but don't over-engineer your types. Start simple and add complexity only when needed.

Happy typing! 🚀 