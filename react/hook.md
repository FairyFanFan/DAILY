# HOOK

## useEffect

```js
useEffect(() => {
  B()
}, [a])  // a变化执行B

useEffect(() => {
  props.onChange(props.id)
}, [props.onChange, props.id]) // 如果 id 变化，则调用 onChange
```