// 变量和作用域
// js的全局环境的变量不会被回收掉，也可以被渗透到函数中去

// 函数的变量与作用域原理
// 函数内部的变量 每次会被清理掉,每次调用会存一份变量，他们之间不会共享
// 函数内定义的变量 渗透进子函数，子可以使用父，父不可以使用子的

// 延伸函数环境生命周期
// 如果在被外部使用就会一直保留
// function out() {
//     let n = 1;
//     function show() {
//         console.log(++n);
//     }
//     show();
// }
// out();
// out();
// function out() {
//     let n = 1;
//     console.log('out', this)
//     return function view() { // 返回了一个引用类型
//         console.log('sum')
//         console.log(this) // window 闭包泄漏问题
//         console.log(++n);
//     }
// }
// let a = out(); // 返回的引用类型函数一直被使用，所以不会被回收内存
// console.dir(a)
// a();
// a();
// let b = out();
// b();
// b();

// 构造函数中的作用域的使用形态
// 只要被使用，同作用域下的变量就会被保留
// function User() {
//     let n = 1;
//     this.sum = function() {
//         console.log(++n);
//     }
// }
// let a = new User();
// console.dir(a);
// a.sum();
// a.sum();
// // 以上的构造函数其实就等价于如下
// function user() {
//     let n = 1;
//     function sum() {
//         console.log(++n);
//     }
//     return {
//         sum: sum
//     }
// }
// let b = user();
// console.dir(b); // 打印出来就发现其实是伪造了一个和构造函数长得一毛一样的东西
// b.sum();
// b.sum();

// ----块作用域
// var没有，let const有块级作用域的特性
// {
//     let a = 1;
// }
// {
//     let a = 2;
// }
// console.log(window.a);
// // 以上申明不会报错，在各自的块级作用域内
// let a = 1;
// let a = 2;
// // 以上申明则会报错

// // ----let-const-var在for循环中的使用，图片地址：（./for循环中的var-let.png）
// for(var i = 1; i<=3; i++){}
// console.log(i);
// console.log(window.i) // 4 var没有块级概念，所以这里申明的其实就挂在在window上
// for(let ii = 1; ii<=3; ii++){
//     setTimeout(_ => {
//         console.log(ii)
//     })
// }
// console.log(window.ii) // undefined

// // ----模拟出var的伪块级作用域
// // 利用var有函数作用域这个特性
// for(var i = 1; i<=3; i++){
//     // 用匿名函数 自执行
//     (function(i){ // 这个i是形参。换成其他的字母也可以。
//         console.log(i)
//     })(i) // 这个i是实参
// }
// // let hd = function() {}  //匿名函数没有变量提升
// // function hd() {}　　//实名函数会有变量提升
// // (function(){})()　　//立即执行函数

// // ----多级作用域嵌套详解
// // 内存的优化是程序设计首要要考虑的问题
// let arr = [];
// // for(var i = 1; i<=3; i++){
// //    arr.push(function(){
// //        console.log(i);
// //    })
// // }
// // console.log(arr[0]()) // 4
// // for(let i = 1; i<=3; i++){
// //     arr.push(function(){
// //         console.log(i);
// //     })
// //  }
// // console.log(arr[1]())
// for(var i = 1; i<=3; i++){
//     (function(i) {arr.push(function(){ // 示意图地址（./多级作用域嵌套.png）
//         console.log(i);})
//     })(i)
// }
// console.log(arr[0]()) // 1 


// // -----闭包及其其他语言的对比
// // php子函数不可以访问父函数的变量
// // 使用闭包获取区间商品
// let arr = [1, 23, 4, 5,6,7,8,10];
// // function between(a,b,v) {
// //     return v >= a && v <= b;
// // }
// // console.log(arr.filter(v => between(3,9,v)))
// function between(a,b) {
//     return function(v) {
//         return v >= a && v <= b;
//     }
// }
// console.log(arr.filter(between(3,9)))


// 移动动画的闭包使用
// 见index.html


// // 利用闭包根据字段排序商品
// // 闭包特性 函数访问到其他函数作用域当中的数据
// let goods = [
//     {
//         name: 'soap',
//         click: 12, // 点击数量
//         price: 50
//     },
//     {
//         name: 'soda',
//         click: 15, // 点击数量
//         price: 55
//     },
//     {
//         name: 'paper',
//         click: 5, // 点击数量
//         price: 2
//     },
//     {
//         name: 'coco',
//         click: 3, // 点击数量
//         price: 100
//     }
// ]
// // goodsSort = goods.sort((a,b) => {
// //     // return a.price > b.price ? 1 : -1;
// //     return a.click > b.click ? 1 : -1;
// // });
// // console.table(goods);
// // console.table(goodsSort);
// function order(field, type = 'asc') {
//     return function(a,b){
//         if(type == 'asc') return a[field] > b[field] ? 1 : -1;
//         return a[field] > b[field] ? -1 : 1;
//     }
// }
// console.table(goods.sort(order('price')));
// // console.table(goods);
// console.table(goods.sort(order('click', 'desc')));



// ----闭包的内存泄漏解决方法
// 见index.html

// // -----this在闭包中的遗留问题
// let hd = {
//     user: 'Amy',
//     fn1: function() {
//         console.log(this.user)
//     },
//     fn: function() {
//         console.log('fn-this', this)
//         return function() {
//             console.log('return function-this', this)
//             console.log(this.user)
//         }
//         // 解决方案
//         // 1. 在return function外定义 This = this;
//         // 2. 在return 中使用箭头函数 （如果想使用函数定义时的上下文中的 this，那就使用箭头函数，也可以理解为定义时父作用域中的this）
//         return () => {
//             console.log('箭头函数 this', this)
//         }
//     }
// }
// console.log(hd.fn1()); // this -> hd
// console.log(hd.fn()()); // this -> window
// 函数内部的this指向调用者
// fn1调用者是hd对象，所以this指向hd
// fn的调用者虽然也是hd对象，但是区别在于这次调用并没有打出this而是在全局返回了一个匿名函数
// 而这个匿名函数不是作为某个对象的方法来调用执行，是在全局执行，最后的执行者就是window
// https://segmentfault.com/a/1190000019134359 Js闭包以及匿名函数this指向（调用模式分析）
// var name = 'window'
// var person = {
//     name :'one',
//     wrap: function(){
//         (function (){
//             console.log(this.name)// window
//         })()
//         function sum(){
//             console.log(this.name)// window
//         }
//         sum()
//     }
// }
// person.wrap()
// wrap内部是一个自执行的匿名函数，
// this.name 打出来是 window那根据那句老话：this指向最后一个调用者；感觉无法分析，因为是自己执行自己。

// 调用模式的转化
// 其实我们常用调用模式如下：
// func(p1, p2)
// obj.child.method(p1, p2)
// 其实两种都是语法糖，可以等价地变为 call 形式
// func.call(undefined, p1, p2)
// obj.child.method.call(obj.child, p1, p2);
// 再加上浏览器里有一条规则：
// 如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined）
// 所以上面person.wrap()里匿名函数的this指向window


