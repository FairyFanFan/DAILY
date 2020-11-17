let MAX_COUNT = 999; // ?大数组优化策略
let FILTER_FLAG = 1;

function lazy(array) {
    return new LazyWrapper(array);
}

// ?
function LazyWrapper(array) {
    this.__wrapper__ = array;
    this.__iteratees__ = [];
    this.__takeCounts__ = MAX_COUNT; // ?
}

// filter
function filter(iteratee) {
    this.__iteratees__.push({ // ❌ 居然写成this.__wrapper__
        iteratee: iteratee,
        type: FILTER_FLAG
    })
    return this;
}
LazyWrapper.prototype.filter = filter;

// take
function take(n) {
    this.__takeCounts__ = n;
    return this;
}
LazyWrapper.prototype.take = take;

// value
function value() {
    let result = [];
    let array = this.__wrapper__;
    let iteratees = this.__iteratees__; // ❌居然写成this.__takeCounts__了
    let resultIndex = 0;
    let length = array.length;

    let index = 0;

    outer:
    while( length-- && resultIndex < this.__takeCounts__) { // ? ❌ ⚠️数组内循环数据的条件：结果数组的长度 没必要 大于我们要的takeCount
        // 保险杠 ：数组走完了还是没找到目标数量takeCount的数据 那就洗洗睡吧
         // ❌ let index = 0; 不能放在循环里
        let cur_value = array[index++]; // ❌ let cur_value = array[index];
        //
        let iterateeIndex = -1;
        while( ++iterateeIndex < iteratees.length){
            let data = iteratees[iterateeIndex];
            let {iteratee, type} = data;
            let computed = iteratee(cur_value);

            // 1
            // 30
            if(!computed) continue outer;
            // type map
        }
        result[resultIndex++] = cur_value;
    }
    return result;
}
LazyWrapper.prototype.value = value;


let testArr = [4, 15, 20, 7, 3, 13, 2, 20];
let testRes = lazy(testArr).filter(item => {console.log('filter: item =' + item); return item < 10 }).take(3).value();
// let testRes = lazy(testArr).filter(item => item < 10).take(3).value();
console.log(testRes);

// filter: item =4
// filter: item =15
// filter: item =20
// filter: item =7
// filter: item =3
// 结果： ----------  [4, 7, 3]