# JavaScript 代码插桩

代码插桩（Code Instrumentation）是软件开发中一种重要的动态程序分析技术，它通过在源代码中添加额外的代码来收集运行时信息。这种技术广泛应用于性能监控、调试、测试覆盖率分析等领域。Babel 作为一个现代 JavaScript 编译器，提供了一系列的包来帮助开发者对代码进行解析、遍历、修改和生成，非常适合用来实现代码插桩。

## Babel 工具链

在进行代码插桩之前，我们需要了解几个 Babel 的核心包：

- `@babel/core`: Babel 编译器的核心 API，用于执行代码转换。
- `@babel/parser`: 将 JavaScript 代码解析成 AST（抽象语法树）。
- `@babel/traverse`: 用于对 AST 进行遍历，访问节点并对其进行修改。
- `@babel/types`: 用于构建 AST 节点。
- `@babel/generator`: 将修改后的 AST 转换回 JavaScript 代码。

## 实现原理

代码插桩的实现过程大致可以分为以下几个步骤：

1. **解析（Parsing）**: 使用 `@babel/parser` 将源代码解析成 AST。AST 是代码的树形表示，每个节点对应代码中的一部分结构，如声明、表达式等。
2. **遍历（Traversal）**: 使用 `@babel/traverse` 遍历 AST。在遍历过程中，我们可以访问到各种类型的节点，并根据需要插入、修改或删除节点。
3. **插桩（Instrumentation）**: 在遍历的过程中，我们可以根据特定的逻辑在函数入口、循环开始、异常捕获等关键位置插入我们的监控代码。这通常涉及到使用 `@babel/types` 来创建新的 AST 节点，并将它们插入到合适的位置。
4. **生成（Generation）**: 最后，使用 `@babel/generator` 将修改后的 AST 转换回 JavaScript 代码。这段代码将包含我们插入的监控逻辑。

## Babel

Babel 基础知识可以查阅各种资料，后续如果需要，再进行系统化补全。

AST 相关可以在 https://astexplorer.net/ 了解。


## 代码实现

本仓库的代码使用 Babel 实现代码插桩，控制 JS 代码中，循环的执行上限，具体代码实现见 `src/index.js`。
