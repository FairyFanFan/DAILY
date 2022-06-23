// (function immediateA(a) {
//     return (function immediateB(b) {
//       console.log(a); // => ?
//       console.log(b);
//     })(1);
//   })(0);
// 说明返回自执行函数里面的变量内存a也不会被清理掉

// let count = 0;
// (function immediate() {
//   if (count === 0) {
//     let count = 1;
//     console.log(count); // 输出什么？
//   }
//   console.log(count); // 输出什么？
// })();

// for (var i = 0; i < 3; i++) {
//     setTimeout(function log() {
//       console.log('setTimeout 1000', i); // => ?
//     }, 1000);
//     setTimeout(function log() {
//       console.log('setTimeout 0', i); // => ?
//     });
//     console.log('end', i)
// }
// console.log(i)

// function createIncrement() {
//     let count = 0;
//     function increment() { 
//       console.log('increment count', count)
//       count++;
//     }
//     console.log(count)
//     let message = `Count is ${count}`;
//     console.log('log 外部的message', message);
//     function log() {
//       console.log('log内部message', message);
//     }
    
//     return [increment, log];
// }
  
// const [increment, log] = createIncrement();
// increment(); 
// increment(); 
// increment(); 
// log(); // => ?

// increment() 函数被调用 3 次，将 count 增加到 3。
// message存在于createIncrement()函数的作用域内。其初始值为'Count is 0'。
// 即使 count变量已经增加了几次，message变量的值也始终为 'Count is 0'。
// log() 函数是一个闭包，它从 createIncrement() 作用域中获取 message 变量。 console.log(message) 输出录'Count is 0'到控制台。

//下面的函数 createStack() 用于创建栈结构：
// function createStack() {
//   return {
//     items: [],
//     push(item) {
//       this.items.push(item);
//     },
//     pop() {
//       return this.items.pop();
//     }
//   };
// }

// const stack = createStack();
// stack.push(10);
// stack.push(5);
// stack.pop(); // => 5

// stack.items; // => [10]
// stack.items = [10, 100, 1000]; // 栈结构的封装被破坏了
// 它能正常工作，但有一个小问题，因为暴露了 stack.items 属性，所以任何人都可以直接修改 items 数组。
// 这是一个大问题，因为它破坏了栈的封装：应该只有 push() 和 pop() 方法是公开的，而 stack.items 或其他任何细节都不能被访问。
// 使用闭包的概念重构上面的栈实现，这样就无法在 createStack() 函数作用域之外访问 items 数组：
// function createStack() {
//     // 面试官：把你的代码写在这里
//     console.log('-------------开始改造')
//     let items = [];
//     return {
//         push(item) {
//             items.push(item)
//         },
//         pop(item) {
//             return items.pop(item)
//         }
//     }
// }

// const stack = createStack();
// stack.push(10);
// stack.push(5);
// stack.pop(); // => 5
// console.log(stack.items); // => undefined
// // items 已被移至 createStack() 作用域内,createStack() 作用域的外部无法访问或修改 items 数组


// 编写一个函数 multiply() ，将两个数字相乘：
// 如果只传一个参数num1的话 那么调用之后的返回值并传参则可作为num2
// function multiply(num1, num2) {
//   // 把你的代码写在这里... 
//   if(num1 != undefined && num2 != undefined) return num1 * num2;
//   return function(num2) { //当前闭包可以从multiply中得到变量num1
//       return num1 * num2;
//   }
// }
// console.log(multiply(2,3));
// const double = multiply(3);
// console.log(double(4));


// var aa = 10
// console.log(window)
// function fn(){
//     var aa = 20;
    
//     function f() {
//        aa++;
//        console.log(aa)
//      }
//     f()
//     return f
// }

// var x = fn()
// console.dir(fn)
// console.dir(x); // 真正的闭包 Scopes 下会有 Closure（闭包） 这个属性
// console.log(x.aa) // undefined访问不了
// // 在函数内不加var定义的变量，会扩散到全局环境中，PS：用作递归方法时自增++用，不错，可以直接在全局环境中使用
// x()
// x()
// console.log(aa)
// // // 在函数内，加var定义的变量老实了很多。虽然js写法很宽松，但为了减少全局环境污染，勤快一些加上var总没有坏处。
// // // 此处可调用 carName 变量
// // function myFunction() {
// //     carName = "Volvo"; // 如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量。
// //     // 此处可调用 carName 变量
// // }


// // console.dir中的[[Scopes]]
// function outer () {
//     var a = 1
//     function inner () {
//         var b = 2
        
//         return function innermost () {
//             console.log(a, b)
//         }
//     }
//     return inner()
// }
 
// var innermost = outer()
// innermost() // 此时输出的值是1 2
// console.dir(innermost)
// // 看一下innermost的[[Scopes]]属性，如下图
// //  会发现在 Scopes数组的开头又增加了一个闭包，是按照从内到外的顺序排列的，让我们点开看一下
// //  果然这里的两个闭包对象分别包含了innermost需要访问的所有变量。这就是作用域链的概念，当一个函数被调用的时候，函数内部访问的对象会先从函数自己的作用域内部进行查找，如果没找到对应的变量，就会从 [[Scopes]]数组的第一项 闭包对象进行查找，如果还没找到就继续到下一个 闭包对象查找，以此类推。


// 闭包变量存储的位置
// 直接说明：闭包中的变量存储的位置是堆内存。
// 假如闭包中的变量存储在栈内存中，那么栈的回收 会把处于栈顶的变量自动回收。所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。
// 闭包的作用
// 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
// 保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化


// 函数作为参数
// var a = '林一一'
// function foo(){
//     console.log('foo this', this)
//     var a = 'foo'
//     function fo(){
//         console.log(a)
//     }
//     console.dir(fo)
//     return fo
// }

// function f(p){
//     var a = 'f'
//     console.log('this f', this)
//     p()
// }
// f(foo())

// 闭包的场景
// 节流防抖
// 节流
function throttle(fn, timeout) {
    let timer = null
    return function (...arg) {
        if(timer) return
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
        }, timeout)
    }
}

// 防抖
function debounce(fn, timeout){
    let timer = null
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, timeout)
    }
}
