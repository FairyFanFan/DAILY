// 记录任务开始时间
let now = Date.now();
// 插入十万条数据
const total = 100000;
// 获取容器
let ul = document.querySelector('#list');
// 将数据插入容器中
for (let i = 0; i < total; i++) {
    let li = document.createElement('li');
    li.innerText = i;
    ul.appendChild(li);
}

console.log('JS运行时间：',Date.now() - now);  // xxx 是验证js的运行时间！！！
setTimeout(()=>{
  console.log('总运行时间：',Date.now() - now);
},0)
// print: JS运行时间： 187
// print: 总运行时间： 2844


// setTimeout优化渲染 ----------------------------------------------------
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let pageSize = 20;
//总页数
let pagination = Math.ceil(total/pageSize);
//每条记录的索引
let pageIndex = 0;
function loop() {
    var li = null;

    setTimeout(() => {
        for (var index = 0; index < pageSize; index++) {
            li = document.createElement('li');
            li.innerText = 'item ' + (pageIndex * pageSize + index);
            ul.appendChild(li);
        }
        pageIndex++;

        if (pageIndex < pagination) loop();
    },0);
};
loop();

// 渲染优化RAF ----------------------------------------------------------
function loop() {
    var li = null;

    for (var index = 0; index < pageSize; index++) {
        li = document.createElement('li');
        li.innerText = 'item ' + (pageIndex * pageSize + index);
        ul.appendChild(li);
    }

    pageIndex++;

    if (pageIndex <= pagination) {
        requestAnimationFrame(loop);
    }
};

requestAnimationFrame(loop);

// fragment渲染优化-----------------------------------------
function loop() {
    var li = null;
    let fragment = document.createDocumentFragment();
    for (var index = 0; index < pageSize; index++) {
        li = document.createElement('li');
        li.innerText = 'item ' + (pageIndex * pageSize + index);
        fragment.appendChild(li);
    }

    pageIndex++;
    ul.appendChild(fragment);

    if (pageIndex <= pagination) {
        requestAnimationFrame(loop);
    }
};

requestAnimationFrame(loop);