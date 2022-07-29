# [export 和 export default](https://juejin.cn/post/6844903585805762573)

## 隶属于【前端标准/规范】

## [发展历程链接](https://segmentfault.com/a/1190000039375332?utm_source=sf-similar-article)

## 由于多文件方法存在许多问题，并且解决方案很复杂，所以开发人员对把模块化开发的方法引入 JavaScript 语言非常感兴趣。**于是 ECMAScript 2015 开始支持 JavaScript module**

### 1. export 和 export default可以在一个文件内出现

```js
// 片段1
const A = 'a';
const B = 'b';
const C = 'c';
export { B, C }; // 或者分开写export B; export A;
export default A;
// 导入...
import A, {B, C} from '...';
// or
import A, {
  B as BB,
  C as CC
} from './functions.js'

add(1, 2) // 3
```

### 2. export {A as default} 导出的是引用，export default A导出的是值

- export的后面还有修改A = 'aa'，前者导出'aa'， 后者导出'a'

### 3. export var e1='...' 是合法语句，但是export default var e2='...'是不合法的

### 4. 模块中通过export 导出的(属性或者方法)可以修改，但是通过export default导出的不可以修改，见代码片段1

### 5. 使用 * 语法可以将整个模块的内容导入到一个对象中。在这种情况下，B 和 C 将成为 mathFunctions 对象上的方法。

```js
import * as mathFunctions from '...';
mathFunctions.B
```

### 6. 原始值、函数表达式和定义、异步函数、类和实例化的类都可以导出，只要它们有标识符就行