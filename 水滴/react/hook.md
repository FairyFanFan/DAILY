# hook

## useReducer

- useState就是用useReducer 实现的，useState返回的函数内部封装了一个dispatch

- [手动用useReducer写一个useCustomeState](https://zhuanlan.zhihu.com/p/336837522)

```js
const [notes, dispatch] = useReducer(fn, defaultValue = {})
// const [note, setNote] = useCustomeState('');
const userCustomeState = (default) {
    // let data = default;
    // const fn = (val) => {
    //     data = val;
    // }
    // return [data, fn];
    const fn = (state, action) => {
        
    }
    return useReducer(fn, default)
}
```

- [useReducer详解 掘金](https://juejin.cn/post/6844903869604986888)