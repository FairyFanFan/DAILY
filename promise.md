# promise面试题
https://www.cnblogs.com/lunlunshiwo/p/8852984.html
```js
// e.g.1
fn = new Promise(function (resolve, reject) {
  let num = Math.ceil(Math.random() * 10)
  if (num > 5) {
    resolve(num)
  } else {
    reject(num)
  }
})
// 第一次回调
fn.then((res)=>{
  console.log(`res1==>${res}`)
  return new Promise((resolve,reject)=>{
    if(2*res>15){
      resolve(2*res)
    }else{
      reject(2*res)
    }
  })
},(err)=>{
  console.log(`err1==>${err}`)
}).then((res)=>{ // 第二次回调 promise 的.then/.catch可被多次调用
  console.log(`res2==>${res}`)
},(err)=>{
  console.log(`err2==>${err}`)
})
//  > "err1==>5" "res2==>undefined"
//  > "res1==>10"  "res2==>20"
//  > "res1==>6" "err2==>12"
// -------------------------------------------------

// e.g.2
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve('resolve');
    console.log(2);
    reject('err');
});
promise.then((res) => { // then方法是异步执行的
    console.log(`res ==> ${res}`)
    console.log(3);
}),((err)=>{ // Promise状态一旦改变，无法在发生变更,所以不执行
  console.log(4)
})
console.log(5);
// > 1  2  5 "res ==> resolve"  3
//---------------------------------------------------

//e.g.3
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// 1
// Promise的then方法的参数期望是函数，传入非函数则会发生值穿透。

// e.g.4
setTimeout(()=>{
  console.log('setTimeout')
})
let p1 = new Promise((resolve)=>{
  console.log('Promise1')
  resolve('Promise2')
})
p1.then((res)=>{
  console.log(res)
})
console.log(1)
// 　Promise1 1 Promise2 setTimeout
// 这个牵扯到js的执行队列问题，整个script代码，放在了macrotask queue中，执行到setTimeout时会新建一个macrotask queue。但是，promise.then放到了另一个任务队列microtask queue中。script的执行引擎会取1个macrotask queue中的task，执行之。然后把所有microtask queue顺序执行完，再取setTimeout所在的macrotask queue按顺序开始执行
```