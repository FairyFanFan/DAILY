// 001 耗时代码
// let startTime = Date.now();
// setTimeout(_ => {
//     let endTime = Date.now();
//     console.log(endTime - startTime);
// }, 50)
// for(var i = 0; i < 20000; i++) {
//     console.log(0);
// }

// 002
// let redBox = document.querySelector('.red-box');
// let blueBox = document.querySelector('.blue-box');

// let i = 0;

// setInterval(_ => {
//     blueBox.style.width = `${i++}px`
// }, 70)

// function loop() {
//   redBox.style.width = `${i++}px`;
//   requestAnimationFrame(loop);
// }
// requestAnimationFrame(loop);

// 003
// let count = 0;
// let timer = setInterval(() => {
//   if (count < 20) {
//     count++;
//     console.log(count);
//   }
// }, 1000);
// let count = 0;
// function requestAnimation() {
//   if (count < 100) {
//     count++;
//     console.log(count);
//     requestAnimationFrame(requestAnimation);
//   }
// }
// requestAnimationFrame(requestAnimation);