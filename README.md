# Logger (TypeScript)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

一个可维护、可扩展的日志系统示例实现，专为现代TypeScript应用设计。

## ✨ 特性

- 🎯 **统一日志接口** - 提供一致的日志记录API
- 📊 **多级别日志** - 支持 `verbose`、`info`、`warning`、`error` 四种日志等级
- 🔧 **灵活数据类型** - 支持字符串和可序列化对象
- 🚀 **可扩展传输** - 支持控制台、文件等多种输出方式
- 🎨 **结构化日志** - 内置时间戳、上下文和元数据
- 📦 **零依赖** - 轻量级实现，无外部依赖

## 📁 项目结构

```
src/
├── index.ts              # 主入口文件，导出所有组件
├── example.ts            # 使用示例演示
└── logger/
    ├── Logger.ts         # 核心Logger类
    ├── types.ts          # 类型定义
    ├── format.ts         # 日志格式化工具
    ├── native-file.ts    # 文件写入模拟
    └── transports/       # 输出传输实现
        ├── ConsoleTransport.ts  # 控制台输出
        └── FileTransport.ts     # 文件输出
```

## 🚀 快速开始

### 安装依赖

```bash
# 确保安装了TypeScript
npm install -g typescript
```

### 编译项目

```bash
# 编译TypeScript到JavaScript
tsc
```

### 运行示例

```bash
# 运行演示代码
node dist/example.js
```

## 📖 使用指南

### 基本用法

```typescript
import { Logger, ConsoleTransport } from './src';

// 创建Logger实例
const logger = new Logger({
  minLevel: 'info',        // 最低日志级别
  context: 'MyApp',        // 日志上下文标识
  transports: [new ConsoleTransport()]
});

// 记录不同级别的日志
logger.verbose('调试信息');           // 详细调试信息
logger.info('用户登录成功');          // 一般信息
logger.warning('需要注意的问题');     // 警告信息
logger.error('发生错误');            // 错误信息
```

### 多传输输出

```typescript
import { Logger, ConsoleTransport, FileTransport } from './src';

const logger = new Logger({
  minLevel: 'info',
  context: 'UserService',
  transports: [
    new ConsoleTransport(),                    // 输出到控制台
    new FileTransport('./logs/app.log')        // 输出到文件
  ]
});

logger.info('服务启动');
logger.error({ code: 'DB_ERROR', message: '数据库连接失败' });
```

### 结构化日志数据

```typescript
logger.info({
  event: 'user_action',
  userId: '12345',
  action: 'login',
  timestamp: new Date().toISOString(),
  metadata: {
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0...'
  }
});
```

## 🔧 配置选项

### LoggerOptions

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `minLevel` | `'verbose' \| 'info' \| 'warning' \| 'error'` | `'info'` | 最低日志输出级别 |
| `context` | `string` | `undefined` | 日志上下文标识 |
| `transports` | `LogTransport[]` | `[new ConsoleTransport()]` | 输出传输列表 |

### 日志级别

- **`verbose`** - 详细调试信息，通常在开发环境使用
- **`info`** - 一般信息，如用户操作、服务状态
- **`warning`** - 警告信息，需要注意但不影响运行
- **`error`** - 错误信息，需要立即处理

## 🏗️ 架构设计

### 设计理念

1. **单一职责原则**
   - `Logger` - 处理日志记录逻辑和级别过滤
   - `Transport` - 负责日志输出到不同目标
   - `Format` - 处理日志消息的格式化和序列化

2. **面向接口编程**
   - 通过 `LogTransport` 接口解耦输出实现
   - 核心逻辑不依赖具体输出方式

3. **可维护性**
   - 模块化设计，避免单文件过大
   - 清晰的职责分离，便于后续扩展

### 核心接口

```typescript
interface LogTransport {
  log(record: LogRecord): void;
}

interface LogRecord {
  level: LogLevel;
  message: string | object;
  context?: string;
  timestamp: Date;
}
```

## 🔮 扩展指南

### 添加新的传输方式

1. 实现 `LogTransport` 接口：

```typescript
import { LogTransport, LogRecord } from '../types';

export class HttpTransport implements LogTransport {
  constructor(private url: string) {}

  log(record: LogRecord): void {
    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
  }
}
```

2. 在Logger中使用：

```typescript
const logger = new Logger({
  transports: [new HttpTransport('https://api.example.com/logs')]
});
```

### 替换文件写入实现

当前 `native-file.ts` 使用模拟实现：

```typescript
export function NativeFileWriteSync(filePath: string, buffer: string): void {
  console.log(`[File IO ${filePath}] ${buffer}`);
}
```

在Node.js环境中可以替换为：

```typescript
import { appendFileSync } from 'fs';

export function NativeFileWriteSync(filePath: string, buffer: string): void {
  appendFileSync(filePath, buffer + '\n', 'utf8');
}
```

## 📋 示例输出

```
[2026-04-15T06:45:51.213Z] [INFO] [UserModule] User login success.
[File IO ./app.log] [2026-04-15T06:45:51.213Z] [INFO] [UserModule] User login success.
[2026-04-15T06:45:51.229Z] [WARNING] [UserModule] {"event":"PasswordRetry","count":3}
[2026-04-15T06:45:51.231Z] [ERROR] [UserModule] {"event":"DBConnectionFailed","retryAfterMs":5000}
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 开发环境设置

```bash
# 克隆项目
git clone <repository-url>
cd logger

# 安装TypeScript（如果还没有）
npm install -g typescript

# 编译
tsc

# 运行测试
node dist/example.js
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**注意**: 当前实现为示例代码，生产环境使用时请根据具体需求进行安全性和性能优化。

