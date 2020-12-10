# bind call apply

- 参考[https://juejin.im/post/6844903567967387656] [https://segmentfault.com/a/1190000018017796] [https://github.com/haizlin/fe-interview/issues/92]

- 目的： 改变函数执行时的上下文，再具体一点就是改变函数运行时的this指向并执行函数，最终是为了***复用***

- 理解：fn.call(obj);
  - fn(即this)绑定到obj，或者说obj『继承』了fn的属性和方法。
  - obj拥有了执行fn方法的能力，并且this是指向obj的.

- 区别： 传参不同，返回值不同, 注意：bind在IE6~8下不兼容。

```js
// e.g.1
function add (a, b) {
    return a + b;
}

function sub (a, b) {
    return a - b;
}

add.bind(sub, 5, 3); // 这时，并不会返回 8
add.bind(sub, 5, 3)(); // 调用后，返回 8
add.apply(sub, [5, 3]);
add.call(sub, 5, 3);
// 个人理解：执行的还是bind apply call前面那个函数，只是this用的是它们后面那个所属的
// e.g.2
var foo = {
    name: 'joker',
    showName: function() {
    console.log(this.name);
    }
}
var bar = {
    name: 'rose'
}
foo.showName.call(bar);
// 个人理解： 执行的其实还是foo方法，但是上下文this变成了bar的
```

## bind

- 注意：bind 方法的***返回值是函数***，并且需要稍后调用，才会执行。而 apply 和 call 则是立即调用。

```js
let obj = {name: 'tony'};
  
  function Child(name){
    this.name = name;
  }
  
  Child.prototype = {
    constructor: Child,
    showName: function(){
      console.log(this.name);
    }
  }
  var child = new Child('thomas');
  child.showName(); // thomas
  
  //  call,apply,bind使用
  child.showName.call(obj);
  child.showName.apply(obj);
  let bind = child.showName.bind(obj); // 注意：这里返回一个函数，必须调用才能有结果
  bind(); // tony
```

## call

- call 的写法:Function.call(obj,[param1[,param2[,…[,paramN]]]])

- 调用 call 的对象，必须是个函数 Function。

- call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。

- 第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。*但是如果将所有的参数作为数组传入，它们会作为一个整体映射到Function对应的第一个参数上，之后参数都为空*

```js
function func (a,b,c) {}
func.call(obj, 1,2,3)
// func 接收到的参数实际上是 1,2,3
func.call(obj, [1,2,3])
// func 接收到的参数实际上是 [1,2,3],undefined,undefined
```

## apply

- apply 的写法Function.apply(obj[,argArray])

- 它的调用者必须是函数 Function，并且只接收两个参数，第一个参数的规则与 call 一致。

- 第二个参数，必须是数组或者类数组，它们会被转换成类数组，传入 Function 中，并且会被映射到 Function 对应的参数上。*这点区别于call*

```js
func.apply(obj, [1,2,3])
// func 接收到的参数实际上是 1,2,3

func.apply(obj, {
    0: 1,
    1: 2,
    2: 3,
    length: 3
})
// func 接收到的参数实际上是 1,2,3
```

## 具体使用场景

- call对象的继承 demo1

- call借用方法 demo2

- apply 数组合并 demo3

```js
// demo1
function superClass () {
    this.a = 1;
    this.print = function () {
        console.log(this.a);
    }
}

function subClass () {
    superClass.call(this);
    this.print();
}

subClass();
// 1
// subClass 通过 call 方法，继承了 superClass 的 print 方法和 a 变量。此外，subClass 还可以扩展自己的其他方法

// demo2
// 类数组 使用 Array 原型链上的方法
let domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
// Math.max。用它来获取数组中最大的一项。
let max = Math.max.apply(null, array);

// demo3
// 在 ES6 的扩展运算符出现之前，我们可以用 Array.prototype.push来实现数组合并。
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

## 伪数组（类数组）

> js中的伪数组(例如通过document.getElementsByTagName获取的元素、含有length属性的对象)具有length属性，并且可以通过0、1、2…下标来访问其中的元素，但是***没有Array中的push、pop等方法***。就可以利用call，apply来转化成真正的数组，就可以使用数组的方法了

```js
case1: dom节点：

<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>

let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性

let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]
```
