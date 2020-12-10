# 使用 requestAnimationFrame 替代 throttle 优化页面性能

- 与 _.throttle(dosomething, 16) 等价

## 防抖节流三者比较

- debounce：多 -> 一

- throttle：定时

- requestAnimationFrame：可替代 throttle ，函数需要重新计算和渲染屏幕上的元素时，想保证动画或变化的平滑性，可以用它。

## 优点

- 动画保持 60fps（每一帧 16 ms），浏览器内部决定渲染的最佳时机

- 简洁标准的 API，后期维护成本低

## 缺点

- 动画的开始/取消需要开发者自己控制，不像‘.throttle’由函数内部处理
  > requestAnimationFrame 不管理回调函数，即在回调被执行前，多次调用带有同一回调函数，requestAnimationFrame，会导致回调在同一帧中执行多次。

- 浏览器标签未激活时，一切都不会执行。

- 尽管所有的现代浏览器都支持 rAF ，IE9，Opera Mini 和 老的 Android 还是需要打补丁。

- Node.js 不支持，无法在服务器端用于文件系统事件。

```js
var lock = {};
function throttle(callback = (time) => {}, key = 'default') {
    if (!lock[key]) {
        lock[key] = true;
        window.requestAnimationFrame((time) =>{
            console.log('this3',this);
            lock[key] = false;
            callback(time);
        });
    }
}
function test(time) {
    console.log('test');
    // lock = false;
}
window.addEventListener('scroll', () => {
    console.log('this1',this);
    throttle((time) => {
        test(time);
        console.log('this2',this);
    })
});
//
```