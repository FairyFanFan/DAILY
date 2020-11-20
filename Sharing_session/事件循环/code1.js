setTimeout(() => {
  console.log(2);
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() =>{
    console.log(666);
  })
});
