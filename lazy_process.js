function lazy(value) {
    return new lazyWrapper(value);  //❌ ? lazyWrapper类名，小写
}

MAX_ARRAY_LENGTH = 999;
LAZY_FILTER_FLAG = 1;
// let MAX_TAKECOUNT = 9999; // lodash ? 最大多少 ❌ 位置放错了 变量提升 或者放在最上面
// var MAX_TAKECOUNT = 9999;
// let FILTER_FLAG = 1;

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
    return this; // ? 链式调用
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
    // let takeCount = this.__takeCounts__;
    // let iteratees = this.__iteratees__;
    // let index = -1;
    let index = 0;
    // ❌ 忘记申明index length
    
    let length = array.length;

    // 遍历数据
    outer: // 标签语句 
    while((length)-- && resultIndex < this.__takeCounts__){ // 循环外围数组中的数据 // ❌array.length--报错

        let cur_value = array[index++]; // 🌈优化
        // index++;

        let interIndex = -1;
        // let resultIndex = 0; // ❌ 写在这里外层循环报错
        // 🌈 3个index array iteratees result

        // let interIndex = 0; // ❌ while(interIndex++ < iteratees.length){ let data = iteratees[interIndex]; // 这里iteratees[interIndex]中的interIndex已经是1了

        while(++interIndex < this.__iteratees__.length){ // 循环处理链上的方法 ？  // 拿着每一个数走遍历方法 不满足的就退圈儿！
            let data = this.__iteratees__[interIndex];
            // let iteratee = data.iteratee;
            // let type = data.type;
            let {iteratee, type} = data;
            let computed = iteratee(cur_value);

            // 1 通过，所以继续循环下一个方法
            // 30 不通过，走下一个方法

            // ❌忘记申明computed
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

lazyWrapper.prototype.value = value; // ❌漏掉


let testArr = [10,30,19,2,5,6,7,99];
let testRes = lazy(testArr).filter(i => i< 10).take(2).value();
console.log(testRes);


// 标签语句
// loop1:
//     for (var i in set1) {
// loop2:
//         for (var j in set2) {
// loop3:
//             for (var k in set3) {
//                 break loop2;  // breaks out of loop3 and loop2
//             }
//         }
//     }

// 关于最大长度

// else if (length >= LARGE_ARRAY_SIZE) { // 长度超过200后启用，大数组优化策略
//     // 判断是否有迭代器，没有则设为Set类型（支持Set类型的环境直接调用生成Set实例去重）
//     const set = iteratee ? null : createSet(array) 
//     if (set) {
//       return setToArray(set) //Set类型转数组（Set类型中不存在重复元素，相当于去重了）直接返回
//     }
//     isCommon = false // 非普通模式
//     includes = cacheHas // includes 判重方法更换为hash判断
//     seen = new SetCache // 实例化hash缓存容器
// }
