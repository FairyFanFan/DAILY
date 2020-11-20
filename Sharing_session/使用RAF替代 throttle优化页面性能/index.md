# 使用 requestAnimationFrame 替代 throttle 优化页面性能

- https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/
- https://cdflove9426.github.io/js/throttling.html#%E8%8A%82%E6%B5%81%EF%BC%88throttling%EF%BC%89

- 与 _.throttle(dosomething, 16) 等价

## 优点

- 动画保持 60fps（每一帧 16 ms），浏览器内部决定渲染的最佳时机

- 简洁标准的 API，后期维护成本低

## 使用 requestAnimationFrame 对 throttle 优化

- requestAnimationFrame 函数不需要传入时间参数，是根据设备刷新率自动调节的，可以解决节流函数是通过时间管理队列不灵活的问题，很自然会想到下面的写法：

window.addEventListener('scroll', e => {
    window.requestAnimationFrame(timestamp => {
        doAnimation(timestamp)
    })
})

- 但是 requestAnimationFrame 不管理回调函数，即在回调被执行前，多次调用带有同一回调函数的 requestAnimationFrame，会导致回调在同一帧中执行多次。

### 解决重复调用问题

- 可以通过一个 lock 锁变量来保证 requestAnimationFrame 队列里同样的回调函数只有一个：

const onScroll = e => {
    if (lock) { return }
    lock = true
    window.requestAnimationFrame(timestamp => {
        lock = false
        doAnimation(timestamp)
    })
}
window.addEventListener('scroll', onScroll)

- 对上述代码进行封装得到 animationFrame 函数：

## 缺点

- 动画的开始/取消需要开发者自己控制，不像 ‘.debounce’ 或 ‘.throttle’由函数内部处理。

- 浏览器标签未激活时，一切都不会执行。

- 尽管所有的现代浏览器都支持 rAF ，IE9，Opera Mini 和 老的 Android 还是需要打补丁。

- Node.js 不支持，无法在服务器端用于文件系统事件。

## 选用考虑

- 根据经验，如果JS方法需要绘制或者直接改变属性，我会选择 requestAnimationFrame，只要涉及到重新计算元素位置，就可以使用它。

- 涉及到 AJAX 请求，添加/移除 class （可以触发 CSS 动画），我会选择 debounce 或者 throttle，可以设置更低的执行频率16ms。

## 三者比较

- debounce：把触发非常频繁的事件（比如按键）合并成一次执行。

- throttle：保证每 X 毫秒恒定的执行次数，比如每200ms检查下滚动位置，并触发 CSS 动画。

- requestAnimationFrame：可替代 throttle ，函数需要重新计算和渲染屏幕上的元素时，想保证动画或变化的平滑性，可以用它。

```js
// jxc-pc项目中的throttle改写
export function throttle(func, delay, deadline) { // 🍊优化2后
    // 🤔为啥可以保存变量last
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
                func.apply(self, arguments);
            }, delay);
        } else {
            last = now;
            func.apply(self, arguments);
        }
    };
}
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
window.addEventListener('scroll',throttle(realFunc,500,1000));
```

## 改造

- 简单的节流函数

```js
function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
window.addEventListener('scroll',throttle(realFunc,500,1000));

```

- rAF

- 采用了节流函数requestAnimationFrame

```js
throttle(func, xx, 1000/60) //xx 代表 xx ms内不会重复触发事件 handler
var ticking = false; // rAF 触发锁
function onScroll(){
  if(!ticking) {
    requestAnimationFrame(realFunc);
    ticking = true;
  }
}
function realFunc(){
    // do something...
    console.log("Success");
    ticking = false;
}
// 滚动事件监听
window.addEventListener('scroll', onScroll);
```

```js
// 优化
let lock = {}
function animationFrame (callback = (time) => {}, key = 'default') {
    if (lock[key]) { return false }
    lock[key] = true
    window.requestAnimationFrame((time) => {
        lock[key] = false
        callback(time)
    })
    return true
}
// 调用
window.addEventListener('scroll', () => { animationFrame((time) => doAnimation(time)) })
```

- 兼容性写法

```js
var scrolling = false;
$(window).on('scroll', function(){
    if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame)
            ? setTimeout(autoHideHeader, 250)
            : requestAnimationFrame(autoHideHeader);
    }
});
function resize() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();
```