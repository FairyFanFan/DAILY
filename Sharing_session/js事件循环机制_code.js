console.log(1)
// process.nextTick(() => {
//   console.log(8)
//   setTimeout(() => {
//     console.log(9)
//   })
// })
function fn1() {
  setTimeout(()=> {
    console.log(999)
  })
}
let promise = new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log(10)
  })
  resolve(console.log(888))
  console.log(4)
}).then(() => { // ？？？
  console.log(12)
})
promise.then(() => { // ？？？
  console.log(12)
})
var observer = new MutationObserver(function(mutations) { // 设定监听回调函数
  console.log('Iframe was closed')
});
// observer.observe(target, {
//   childList: true,


// promise.then(() => { // ？？？
//   console.log(12)
// })
setTimeout(() => {
  console.log(2)
  new Promise(() => {
    console.log(11)
  })
})
// requestIdleCallback(() => { // ?
//   console.log(7)
// })
// let promise = new Promise((resolve,reject) => {
//   setTimeout(() => {
//     console.log(10)
//   })
//   resolve(console.log(888))
//   console.log(4)
// }).then(() => { // ？？？
//   console.log(12)
// })
fn()
console.log(3)
// promise.then(() => { // ？？？
//   console.log(12)
// })
observer.observe(target, {
  childList: true,
})
function fn(){
  console.log(6)
}
// process.nextTick(() => {
//  console.log('nextTick1')
//  process.nextTick(() => {
//    console.log('nextTick2')
//    process.nextTick(() => {
//      console.log('nextTick3')
//    })
//  })
// })
// 1、4、6、3、12、8、2、11、10、9、7