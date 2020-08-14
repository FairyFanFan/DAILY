ctrl + shift + v 预览markdown快捷键

1. elements table column formatter (https://www.cnblogs.com/byuc/p/9596827.html)
2. 深拷贝 ![avatar](https://user-gold-cdn.xitu.io/2017/10/12/5fead11352d49dc71029dbcdcf489097?imageslim)
    a = data; b = data; a v-model双向绑定 则会引起b值的变化
3. 注释（https://github.com/fex-team/styleguide/blob/master/javascript.md）
4. 单行注释 
    [强制] 必须独占一行。// 后跟一个空格，缩进与下一行被注释说明的代码一致。
    2.4.2 多行注释
    [建议] 避免使用 /*...*/ 这样的多行注释。有多行注释内容时，使用多个单行注释。
    2.4.3 文档化注释
    [强制] 为了便于代码阅读和自文档化，以下内容必须包含以 /**...*/ 形式的块注释中
5. 替换数组
变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组：

example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})

##20200521 
> 利用hash键值替代多重循环map.set/get/has
```js
/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let dif = target-nums[i]
    if (map.has(dif)) {
      return [map.get(dif), i]
    }
    map.set(nums[i], i);
  }
};
// 遍历一遍哈希表
//  时间复杂度：O(n)，
// 我们只遍历了包含有 nn 个元素的列表一次。在表中进行的每次查找只花费 O(1)O(1) 的时间。

// 空间复杂度：O(n)，
// 所需的额外空间取决于哈希表中存储的元素数量，该表最多需要存储 nn 个元素。
```
> 数组对象去重
https://www.cnblogs.com/wisewrong/p/9642264.html 最后两个可选
```js
function distinct1(a, b) {
    return Array.from(new Set([...a, ...b]))
}
function distinct2(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }

    return result
}
```

##20200522
> 几种排序方式
* 快速排序

##20200525
> 利用ES6 Set去重
```js
/**
 * 判定字符是否唯一
 * @param {string} astr
 * @return {boolean}
 */
var isUnique = function(astr) {
    return new Set(astr).size === astr.length
};
```
> 数组并集、交集、补集
```js
let arr1 = new Set([1,2,3]);
let arr2 = new Set([4,3,2]);
// 并集
let union = new Set([...arr1, ...arr2]); // {1,2,3,4}
// 交集
let intersect = new Set([...arr1].filter(i => arr2.has(i))); // {2,3}
// 差集
let difference = new Set([...arr1].filter(i => !arr2.has(i))); // {1}
```

##20200526
```js
/**
 * 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function(s1, s2) {

};
```

## call apply bind
- [参考连接]https://www.runoob.com/w3cnote/js-call-apply-bind.html

## console 的阻塞行为 
- [参考连接]https://blog.csdn.net/extendworld/article/details/82709777