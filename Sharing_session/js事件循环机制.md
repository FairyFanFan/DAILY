# js事件循环机制

- ❓ 问题一

```js
// 1 4 6 3 12 8 2 11 10 9
// -*12 -8 -+11
// -2 -10 -+9
console.log(1)
process.nextTick(() => {
  console.log(8)
  setTimeout(() => {
    console.log(9)
  })
})
setTimeout(() => {
  console.log(2)
  new Promise(() => {
    console.log(11)
  })
})
requestIdleCallback(() => { // ?
  console.log(7)
})
let promise = new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log(10)
  })
  resolve()
  console.log(4)
})
fn()
console.log(3)
promise.then(() => {
  console.log(12)
})
function fn(){
  console.log(6)
}
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
```

> 关于requestIdleCallback
> 1、4、6、3、12、8、2、11、10、9、7

// 1 6 3 8 4 12 2 11 9 10
// 8 4 12 11（9啥时候放进去的？）
// 2 9 10（11 啥时候放进去的？）

- ❓ 问题二

  - 浏览器的异步执行与js的单线程

> 纠正标题 事件循环不是js的机制，而应该是js运行环境的机制。js的执行引擎里只有堆和栈而已，剩下的任务队列，事件循环都属于执行环境。
> 应该叫浏览器的event loops或者说是javaScript运行环境的event loops，因为ECMAScript中没有event loops，event loops是在HTML Standard定义的。
> event loop就是事件循环，可以理解为实现异步的一种方式，我们来看看event loop在HTML Standard中的定义章节：第一句话：为了协调事件，用户交互，脚本，渲染，网络等，用户代理必须使用本节所述的event loop。事件，用户交互，脚本，渲染，网络这些都是我们所熟悉的东西，他们都是由event loop协调的。触发一个click事件，进行一次ajax请求，背后都有event loop在运作。

## js运行机制

> 主线程类似一个加工厂，它只有一条流水线，待执行的任务就是流水线上的原料，只有前一个加工完，后一个才能进行。event loops就是把原料放上流水线的工人。只要已经放在流水线上的，它们会被依次处理，称为同步任务。一些待处理的原料，工人会按照它们的种类排序，在适当的时机放上流水线，这些称为异步任务。
 ***从event loop规范探究javaScript异步及浏览器更新渲染时机*** 下篇可讲[https://github.com/aooy/blog/issues/5]
 ***之后可讲JavaScript的计时器的工作原理***[https://segmentfault.com/a/1190000002633108]
![avatar](222.png)
　　- 如上图为事件循环示例图（或JS运行机制图），流程如下：
　　　　- step1：主线程读取JS代码，此时为同步环境，形成相应的堆和执行栈；
　　　　- step2:  主线程遇到异步任务，指给对应的异步进程进行处理（WEB API）;
　　　　- step3:  异步进程处理完毕（Ajax返回、DOM事件处罚、Timer到等），将相应的异步任务推入任务队列；
　　　　step4: 主线程执行完毕，查询任务队列，如果存在任务，则取出一个任务推入主线程处理（先进先出）；
　　　　step5: ***重复执行step2、3、4；称为事件循环***。
　　执行的大意：
　　　　同步环境执行(step1) -> 事件循环1(step4) -> 事件循环2(step4的重复)…
　　其中的异步进程有：
　　　　a、类似onclick等，由浏览器内核的DOM binding模块处理，事件触发时，回调函数添加到任务队列中；
　　　　b、setTimeout等，由浏览器内核的Timer模块处理，时间到达时，回调函数添加到任务队列中；
　　　　c、Ajax，由浏览器内核的Network模块处理，网络请求返回后，添加到任务队列中
动图观摩[https://user-gold-cdn.xitu.io/2019/1/12/16841d6392e8f537?imageslim]
### JavaScript执行环境（Runtime）和执行引擎（Engine）的关系

JavaScript引擎的内部运行机制跟Event loop没有半毛钱的关系

引擎指的是虚拟机，对于Node来说是V8、对Chrome来说是V8、对Safari来说JavaScript Core，对Firefox来说是SpiderMonkey

JavaScript的执行环境就是上面所说的浏览器、node、Ringo

[https://github.com/amandakelake/blog/issues/26]

## 事件循环的过程

> 事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务

![avatar](333.png)

检查 Macrotask 队列是否为空,若不为空，则进行下一步，若为空，则跳到3
从 Macrotask 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步
检查 Microtask 队列是否为空，若不为空，则进入下一步，否则，跳到1（开始新的事件循环）
从 Microtask 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3
其中，在执行代码过程中新增的microtask任务会在当前事件循环周期内执行，而新增的macrotask任务只能等到下一个事件循环才能执行了。

```js
// eventLoop队列数组，先进先出
var eventLoop = [], event;
// “永远”执行，事件循环嘛
while(true) {
    // 一次tick
    if (eventLoop.length > 0) {
        event = eventLoop.shift() // 拿到队列中下一个事件
        event() // 执行。这代码里面可能产生新的event放在eventLoop中
    }
}
// 事件循环取macroTaskQueue
// 微任务队列只有一个，而且每一次tick，都会清空微任务队列
for (macroTask of macroTaskQueue) {
    handleMacroTask();

    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}
```

## 微任务 宏任务

> 一个event loop里有一个或者多个task队列（宏任务），只有一个microtask 队列。
> NOTE:Promise的定义在 ECMAScript规范而不是在HTML规范中，但是ECMAScript规范中有一个jobs的概念和microtasks很相似。在Promises/A+规范的Notes 3.1中提及了promise的then方法可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现。所以开头提及的promise在不同浏览器的差异正源于此，有的浏览器将then放入了macro-task队列，有的放入了micro-task 队列。在jake的博文Tasks, microtasks, queues and schedules中提及了一个讨论vague mailing list discussions，一个普遍的共识是promises属于microtasks队列。

HTML Standard没有具体指明哪些是microtask任务源，通常认为是microtask任务源有： promise.then、process.nextTick、Object.observe(已废弃)、MutationObserver(html5新特性)
宏队列（macrotask）： setTimeout、setInterval、setImmediate、I/O、UI rendering