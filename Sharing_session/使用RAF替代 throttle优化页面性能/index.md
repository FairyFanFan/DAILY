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
// jxc-pc项目中的throttle改写
export function throttle(func, delay, deadline) { // 🍊优化2后
    // 🤔问题一：为啥可以保存变量last 通过引用变量从而阻止该变量被垃圾回收的机制 ???
    // 只要函数里创建了一个函数， 那么就有了一个闭包（has a closure）。
    // 当外部函数被调用时，那么就创建了一个闭包（a closure is created）。
    // 函数里的局部变量没有销毁是因为这个局部变量被闭包罩着。
    let last; // 🍊 优化2后 let last = new Date().getTime();
    let timeId; // 🍊 优化1后
    return function(args) {
        let self = this;
        let now = new Date().getTime();
        clearTimeout(timeId); // 🍊优化1后
        if (last && now < last + delay) { // 🌹 优化2 now - last < deadline;
            // clearTimeout(timeId); // 🌹优化1
            timeId = setTimeout(() => {
                last = now;
                func.apply(self, arguments); // 问题二？？？
            }, delay);
        } else {
            last = now;
            func.apply(self, arguments);
        }
    };
}
// 实际想绑定在 scroll 事件上的 handler
function realFunc(test){
    console.log("Success");
}
window.addEventListener('scroll',throttle(realFunc(1,2,3),500,1000));

// 闭包案例
function createCounter() {
 let counter = 0
 const myFunction = function () {
   counter = counter + 1
  return counter
 }
return myFunction
 }
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
console.log('example increment', c1, c2, c3)
```

## 改造

- 采用了节流函数requestAnimationFrame

```js

// 2. raf简易版
var locked = false;
window.addEventListener('scroll',function(){
    if(!locked){
        locked = true;
        window.requestAnimationFrame(fAnim);
    }
});

function fAnim(){
    console.log('fAnim');
    locked = false;
    //code
}

throttle(func, xx, 1000/60) //xx 代表 xx ms内不会重复触发事件 handler
var ticking = false; // rAF 触发锁 🍊优化1
function onScroll(){
    console.log('onScroll----');
  if(!ticking) {
    console.log('!ticking--');
    ticking = true;
    requestAnimationFrame(realFunc); // 🍊优化2 关包
  }
}
function realFunc(){
    // do something...
    console.log("Success");
    ticking = false;
}
// 滚动事件监听
window.addEventListener('scroll', onScroll, false);
```

```js
// 优化
let lock = {}
function animationFrame (callback = (time) => {}, key = 'default') {
    console.log('lock[key]--1', lock[key], Boolean(lock[key]))
    if (lock[key]) { console.log('return');return false }
    lock[key] = true
    console.log('lock[key]--2', lock[key])
    window.requestAnimationFrame((time) => {
        console.log('raf');
        lock[key] = false
        callback(time)
    })
    return true
}
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
// 调用
window.addEventListener('scroll', animationFrame((time) => realFunc(time)))

```

- 兼容性写法

```js

(!window.requestAnimationFrame) ? setTimeout(func, 1000 / 60) : requestAnimationFrame(func);

var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();
```