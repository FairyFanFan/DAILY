process.nextTick(() => {
    console.log('nextTick');
    process.nextTick(() => {
      console.log('nextTick1');
      process.nextTick(() => {
        console.log('nextTick2');
        process.nextTick(() => {
          console.log('nextTick3');
        })
      })
    })
})

var eventLoop = [];
while(true) {
  if(!eventLoop.length) return;
  
  var event = eventLoop.shift();

   event();
}

for(mac in macList) {
  handlemac();
  for(mic in micList) {
    handlemic();
  }
}