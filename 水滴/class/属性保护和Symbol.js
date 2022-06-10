// _tmp 一般这种命名代表局域变量，但是防君子防小人，奈何还是有人要去改，所以如何私有属性呢，利用js的新属性Symbol
let _sym = Symbol();
const HOST = Symbol('1'); // 其实我理解的symbol就是个特殊的字符串
let PATH = Symbol();
// 子类可以继承父类的symbol
class Common {
    // _common = '_common';
    [HOST] = 'http://host.com';
    constructor() {}
    set host(data){
        console.log(this)
        this[HOST] = data;
    }
    get host() {
        return this[HOST];
    }
    set path(data) {
        this[PATH] = {}; // 注意当前就挂载到this上了 并且预设为对象，区别于[HOST]在public中挂载
        this[PATH].path = data;
    }
    get path() {
        return this[PATH].path;
    }
}
class Child extends Common{
    // public 非保护的变量 可以任意修改
    // _child = '_child'; // 类的实例属性，注意 node环境会报错
    _url = 'http://baidu.com';
    constructor() {
        super(); // 继承父类，即使啥都没有也必须得写
    }
    set url(url) {
        this._url = url; // 如此一来_url变量就被保护下来,但是命名规则只能防君子不防小人，想要直接修改依然可以直接修改
    }
    get url() {
        return this._url;
    }
    set sym(data) {
        [_sym] = data;
    }
    get sym() {
        return _sym;
    }
}
let l = new Child();
console.dir(l);
// // l._child = 1; // node环境会报错，chrome可以解析，成功修改了这个实例属性
// l.sym = '赋值';
// console.log(l.sym);
// l.url = 'http://gaode.com';
// console.log(l.url);
// console.log(l._common);
// l._url = 'http://xiugai.com';
l.host = 'http://set.host.com';
// console.log(l.host);
// l.path = 'mypath';
// console.log(l.path);
// 使用场景 常用作key唯一性
// 早期 Redux 推荐的实践中就有吧，用作 Reducer、Action 名称

// export const SOME_ACTION = Symbol('some_action')
// import { SOME_ACTION } from 'xxxx'
// dispatch(SOME_ACTION)
//用 Symbol 的最常见场景就是可以用来模拟私有属性或方法了，弥补了 JS 没有 OOP 语言常见的 private、public 这种可见性修饰符的不足。
//不过绝大部分 JS 开发者，根本也不写 OOP，你管它什么可见性呢？非要写带可见性的开发者，早就用上 TS 了，何必用个半残的 Symbol。

levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
};
// console.log(levels.DEBUG, 'debug message');
// console.log(levels.INFO, 'info message');
// const key = levels.DEBUG;
// console.log(key);
