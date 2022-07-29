# React

## [https://zh-hans.reactjs.org/docs/thinking-in-react.html]

### 【核心概念】

#### 2.JSX 简介

- **因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。** 例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。

#### 4.组件 & Props

- 如果子组件是一个函数组件，那么父组件传参时<child value="父组件传给子组件的值" />

- Props 的只读性：**组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

  - 父子组件数据交互中，子修改了父的值并需要把这个值传回父，参见10.状态提升（this.props.Fn(params)）

#### 5.State与生命周期

- 函数组件没有state(**state 是私有的，并且完全受控于当前组件** state只能在constructor中初始化)，没有生命周期，有传参props，但是在React 16.8之后利用hook函数组件可以使用state生命周期以及react的其他特性

- class组件上述都有

- **不要直接修改 State**

  - this.state.comment = 'Hello'; // Wrong 此代码不会重新渲染组件

  - this.setState({comment: 'Hello'}); // Correct

- **出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用**

- **this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态**

    ```js
        // Wrong
        this.setState({
            counter: this.state.counter + this.props.increment,
        });
        // Correct 使用普通函数也可以
        this.setState((state, props) => ({
            counter: state.counter + props.increment
        }));
    ```

#### 6.事件处理

- [https://segmentfault.com/a/1190000038167700] 绑定this的原因

- **“如果觉得使用bind 很麻烦，这里有两种方式可以解决。你可以使用 public class fields 语法 to correctly bind callbacks，或Create React App 默认启用此语法。”**

#### 7.条件渲染

- 与运算符 &&

- 三目运算符

#### 8.列表 & Key

- **"JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果"**

#### 10.状态提升

- 子组件$emit('Fn', params) =》 this.props.Fn(params)

- computed计算属性 =》render(){ const xxx = xxx; return (<div><div/>) }

#### 11.组合和继承

- **"组件可以接受任意 props，包括基本数据类型，React 元素以及函数"**

- slot =》 {props.children} 是某标签内所有的都换成props.children，如果想单独传比如a就{props.a}

- **"如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。"**

### 【高级指引】

#### Fragments

- 类似于vue中的template

- 简写<></>，看起来像空标签，但它并不支持 key 或属性

#### 代码分割

- React.lazy(() => import()) **React.lazy接受一个需要动态调用import()的函数。它必须返回一个Promise，该Promise需要resolve一个default export的 React 组件**

- **Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）**

 ```js
    import React, { Suspense } from 'react';

    const OtherComponent = React.lazy(() => import('./OtherComponent'));

    function MyComponent() {
        return (
            <div>
            <Suspense fallback={<div>Loading...</div>}>  {/*fallback 属性接受任何在组件加载过程中你想展示的 React 元素*/}
                <OtherComponent />
            </Suspense>
            </div>
        );
    }
 ```

- 避免兜底

  - 比如切换tab过程，方案一：fallback中的加载过程中展示的元素， 方案二：startTransition

- 异常捕获边界（Error boundaries）

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

- 基于路由的代码分割

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

- 命名导出（Named Exports）**React.lazy 目前只支持默认导出（default exports）**

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js"; // 曲线救国
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

#### Context  [React context 理解 跳转链接](https://segmentfault.com/a/1190000022958335)

- **使用context, 可以避免通过中间元素传递props**

- **另一种无需context的解决方案** 是将孙子或其他子子孙孙组件自身传递下去，因为中间组件无需知道props中的具体数据

- vue provide => <ThemeContext.Provider value="dark"><Toolbar /></ThemeContext.Provider>

  - 问题：[Context.Provider下的所有消费组件，在value变化后，都会重新渲染.解决方案UserMemo/UseSelector](https://juejin.cn/post/7056696289559314446)
  - 多个Provider 也可以嵌套使用，里层的会覆盖外层的数据。就近原则
  - 复杂的非父子组件通信在react中很难处理,多组件间的数据共享也不好处理,在实际的工作中我们会使用flux、redux、mobx来实现

- 函数式组件只能使用 Context.Consumer来访问 Context对象的值，就是在函数组件外面裹一层<Context.Consumer><Context.Consumer/>

- React.createContext

  - const MyContext = React.createContext(defaultValue); **只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效** [案例](https://blog.csdn.net/weixin_45774322/article/details/109074242)


