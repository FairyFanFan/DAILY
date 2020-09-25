console.log(1);
process.nextTick(() => {
  console.log(8);
  setTimeout(() => {
    console.log(9);
  });
});
setTimeout(() => {
  console.log(2);
  new Promise(() => {
    console.log(11);
  })
});
// requestIdleCallback(() => {
//   console.log(7);
// });
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(10);
  });
  resolve();
  console.log(4);
});
fn();
console.log(3);
promise.then(() => {
  console.log(12);
})
function fn() {
  console.log(6);
}
setTimeout(() =>{
  console.log(200);
  // process.nextTick(() => {
  //     console.log(300);
  // })
  new Promise((resolve) => {
      console.log(400);
      resolve();
  }).then(() => {
      console.log(500)
  })
})