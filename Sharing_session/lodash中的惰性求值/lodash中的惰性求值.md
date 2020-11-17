# lodash中的惰性求值原理与简单实现

> 惰性求值，是lodash源码中很大的闪光点

## 惰性求值

- 惰性求值（Lazy Evaluation），又译为惰性计算、懒惰求值，也称为传需求调用（call-by-need），是计算机编程中的一个概念，它的目的是要最小化计算机要做的工作。

- 惰性函数模式是一种将对函数或请求的处理延时到真正需要结果时进行的通用概念。

- 惰性求值有显著的优化潜力，它可以重新调整代码段以求更高的效率。其中的参数是直到需要时**从末尾开始反向执行的**。它会判断自己需要返回什么，并继续向后执行来确定要这样做需要哪些值。

- 其他函数式编程 compose pipe（对要嵌套执行的函数进行平铺，核心思想是专注于函数执行过程，隔离数据的影响。）

```js
// 需求
let testArr = [4, 15, 20, 7, 3, 13, 2, 20];
let testRes = lazy(testArr).filter(item => {console.log('filter: item =' + item); return item < 10 }).take(3).value();
console.log(testRes);

// filter: item =4
// filter: item =15
// filter: item =20
// filter: item =7
// filter: item =3
// [4, 7, 3]
```

### 传统实现

> 总共遍历的次数为：8+3 （参见动图）

### 惰性求值的方法

> 只执行了5次

- **延迟计算** （拿到数据集，缓存起来）

- **数据管道**（遇到filter方法，先记下来； 遇到take方法，先记下来）

- **触发时机** （遇到value方法，说明时机到了。把小本本拿出来，看下要求：要取出3个数，price<10， 使用filter方法里的判断方法priceLt对数据进行逐个裁决）

### 惰性求值的实现

- filter take value

```js
// 简化版实现

function lazy(value) {
    return new lazyWrapper(value);
}

var MAX_ARRAY_LENGTH = 999;
var LAZY_FILTER_FLAG = 1;

function lazyWrapper(value) {
    this.__wrapper__ = value;
    this.__iteratees__ = [];
    this.__takeCounts__ = MAX_ARRAY_LENGTH;
}

// filter
function filter(iteratee) {
    this.__iteratees__.push({
        iteratee: iteratee,
        type: LAZY_FILTER_FLAG
    })
    return this;
}
lazyWrapper.prototype.filter = filter;

// take
function take(n) {
    this.__takeCounts__ = n;
    return this;
}
lazyWrapper.prototype.take = take;

// value
function value(){
    // [1,30,19,2,5,6,7,] ==> [1,2]
    let array = this.__wrapper__; // 当前传入的数组
    let result = [];
    let resultIndex = 0;
    let index = 0;
    let length = array.length;

    // 遍历数据
    outer: // 标签语句 
    while((length)-- && resultIndex < this.__takeCounts__){

        let cur_value = array[index++];

        let interIndex = -1;
        // 🌈 3个index array iteratees result

        while(++interIndex < this.__iteratees__.length){ // 循环处理链上的方法
            let data = this.__iteratees__[interIndex]; // 拿着每一个数走遍历方法 不满足的就退圈儿！
            // let iteratee = data.iteratee;
            // let type = data.type;
            let {iteratee, type} = data;
            let computed = iteratee(cur_value);

            // 1 通过，所以继续循环下一个方法
            // 30 不通过，走下一个方法

            if(!computed) continue outer; // [1,2,3].map(i=> i<1) [false false false]

            // map value = computed
            // type 为了处理不同方法的后续操作而定
            // 🌈 break默认是结束当前循环，有时我们在使用循环时，想通过内层循环里的语句直接跳出外层循环。。return也可以结束一个循环，但与continue和break不同的是，return直接结束整个方法，不管这个return处于多少层循环之内
        }

        result[resultIndex++] = cur_value;

        // 这里不能写index
    }
    return result;
}
lazyWrapper.prototype.value = value;

let testArr = [10,30,19,2,5,6,7,99];
let testRes = lazy(testArr).filter(i => i< 10).take(2).value();
console.log(testRes);

```