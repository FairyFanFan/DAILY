# TypeScript

## 基础

- 安装ts

  - npm i typescript

  - tsc \-version

- 编译

  - tsc index.ts可生成index.js

  - 自动编译tsc --init 可生成tsconfig.json -> vscode 终端 运行任务 tsc监视

## 数据类型

> 变量后面加:type

- 布尔类型

  - var a:Boolean = true;

- 数字类型

- 字符串类型

- 数组类型

  - 第一种定义方式： let arr:number [] = [1,2,3];

  - 第二种定义方式： let arr:Array<number> = [1,2,3];

- 元祖类型 let arr:[string, number] = ['1',2];

- 枚举类型

    ```ts
    enum Flag = {success = 1, error = -1, reject = 5};

    var f:Flag = Flag.success; //1

    enum Flag = {success, error, reject = 5, refuse};

    var f:Flag = Flag.success; // 0 注意： 类型不赋值的情况下默认输出的是索引值。

    var f1:Flag = Flag.refuse; // 6 因为它没有值并且它前面的为5

    ```

- 任意类型 any

- null 和 undefined
  > 其他类型（never类型）的子类型

  - var num0:undefined;

  - var num:number | undefined | null

- never类型 代表从不会出现的值，一般不用 (也包括null undefined 类型)

- void 类型

  > 该方法没有任何返回值

## 函数

- 函数的定义

  - 不同之处，定义传入和返回的变量的类型

  - 函数申明法

    ```ts
    // 一般函数
    function getInfo():string {return '123'};

    // 匿名函数
    var f = function():number {return 123};

    // 定义方法传参
    function getInfo(name:string):string{
      return name + '真棒'
    };
    getInfo('You'); // You 真棒

    // 没有返回值的方法:void

    //可选参数 age?:number，必须放在所有参数的最后面

    // 默认参数 age:number = 20

    // 剩余参数
    function sum(a:number, b:number, c:number):void{
      return a+b+c;
    }
    sum(1,2,3);
    // 优化成下面方法
    function sum1(...result:number):void{
      var sum = 0;
      for(var i = 0; i<result.length; i++){
        sum += i;
      }
      return sum;
    }
    sum1(1,2,3);
    // 转变成下面方法
    function sum2(a:number, ...result:number):void{
      var sum = 0;
      for(var i = 0; i<result.length; i++){
        sum += i;
      }
      return sum;
    }
    sum(1,2,3);
    ```

- 函数重载（后面覆盖前面的）

  > 为了兼容es5 es6 ,ts的重载有别于Java

  - 函数重载的意义在于能够让你知道传入不同的参数得到不同的结果。
  - **如果传入的参数不同，但是得到的结果（类型）却相同，那么这里就不要使用函数重载（没有意义）。**
  - **如果函数的返回值类型相同，那么就不需要使用函数重载。**

  ```ts
  // e.g 1
  function getInfo(name:string):string;

  function getInfo(age:number):number;

  function getInfo(info:any):any {
    if(typeof info == 'string'){
      return 'my name is' + info;
    } else {
      return 'age is' + info;
    }  
  }

  getInfo('Amy'); // my name is Amy
  getInfo(1); // age is 1
  getInfo(true); // 🙅错误写法

  // e.g 2

  function getInfo1(name:string):string;

  function getInfo1(name:string, age:number):number;

  function getInfo1(info:any, age?:number):any {
    if(age) {
      return 'age is' + info;
    } else {
      return 'my name is' + info;
    }  
  }

  getInfo1('Amy'); // my name is Amy
  getInfo1(1); // 🙅错误写法
  ```

- 箭头函数

  > this指向上下文

## es5中的类

```ts
// 最简单的类
function Person() {
  this.name = 'name';
}
var p = new Person();
p.name; // name
// 构造函数和原型链增加方法
function Person1() {
  this.name = 'hua';
  this.run = function() {
    console.log('hh');
  }
}
// 原型链扩展属性
Person1.prototype.size = 1;
// 原型链扩展方法
Person1.prototype.work = function() {
  console.log('hard');
}
var p1 = new Person1();
p1.run();
p1.work(); //也可以用原型链中的方法
// ⚠️构造函数和原型链增加方法区别： 原型链增加的属性/方法会被多个属性实例共享
```

- 类中的静态方法

```ts
function Person() {
  this.name = 'hua';
  this.run = function() {
    console.log('hh');
  }
}
Person.getInfo = function(){
  console.log('我是一个静态方法');
}
// 调用静态方法
Person.getInfo();
```

- 继承

  - 原型链
    > 优点：继承构造函数上的属性方法，也能继承原型链上的。
    > 缺点：实例化子类的时候无法给父类传参
  - 组合冒充
    > 对象冒充能继承构造函数上的属性方法，但不能继承原型链上的

  - 原型链+组合冒充

  ```ts
  // 构造函数和原型链增加方法
  function Person(name) {
    this.name = name;
    this.run = function() {
      console.log(this.name + 'hh');
    }
  }
  Person.prototype.work = function() {
    console.log('hard');
  }

  //  对象冒充实现继承
  function Web() {
    Person.call(this);
  }
  var w = new Web();
  w.run();
  // w.work(); 对象冒充不能继承原型链上的方法

  // 原型链实现继承
  function Web1(name) {}
  Web.prototype = Person();
  var w = new Web1(name);
  w.run(); // undefined hh 实例化子类的时候无法给父类传参
  w.work(); // 可

  // 原型链+组合冒充
  function Web2(name) {
    Person.call(this);
  }
  Web.prototype = Person();
  var w = new Web1('You');
  w.run(); // You hh
  w.work(); // 可

  // 原型链+组合冒充 另一种方式
  // 将上一例中的Web.prototype = Person();修改为如下即可
  Web.prototype = Person.prototype;
  ```

## ts中的类

- 定义类
  > 和es6类似

  ```ts
  class Person{
    // 属性，省略了public关键字
    name:string;

    // 构造函数，实例化类的时候触发, n是实例化的时候传进来的
    constructor(n:string){
      this.name = n;
    }

    run:void() {
      console.log(this.name);
    }

    getName():string{
      return this.name;
    }

    setName(newVal):void{
      this.name = newVal;
    }
  }
  var p = Person('I');
  p.run(); // I
  p.getName(); // I
  p.setName('You');
  p.getName(); // You
  ```

- 继承 extends super
  > 必须在继承的类中写constructor

  ```ts
  class Person{
    // 属性，省略了public关键字
    name:string;
    // 构造函数，实例化类的时候触发, n是实例化的时候传进来的
    constructor(n:string){
      this.name = n;
    }
    run:void() {
      console.log(this.name);
    }
    work:void() {
      console.log('父类的work方法');
    }
  }
  class Web extends Person{
    constructor(n:string){
      super(n); // super表示调用父类的构造函数
    }
    work:void() {
      console.log('子类的work方法');
    }
  }  
  var w = Web('II');
  w.run(); // II
  // 子类父类方法相同时 执行子类的方法
  w.work(); // 子类的work方法
  ```

- 类中的修饰符
  > 不加修饰符 默认public
  - public 公有 ————类/子类/类外面都可以访问
  - protected 保护类型 ————类/子类中可访问，类外不可
  - private 私有 ————类中都可以访问，子类/类外面不可

  ```ts
  // 父类
  class Person {
    protected name:string;
    private age:number;
    constructor(name:string, age: number){
      this.name = name;
      this.age = age;
    }
    run:void() {
      console.log(this.name);
    }
    work:void() {
      console.log(this.name);
    }
  }
  var p = Person('You', 1);
  p.name; // protected age在外部不能调用
  p.age; // private age在外部不能调用

  // 子类
  class Web extends Person{
    constructor(name:string, ){
      super(name); // super表示调用父类的构造函数
    }
    run:void() {
      // console.log(this.age); // private age在类Person外不可调用
      console.log(this.name); // 可调用
    }
  }  
  var w = Web('II');
  w.name; // 会报错，不能在Person类外部使用
  w.run(); // II protected 子类可以访问
  w.work()); // II
  ```

- 静态属性 静态方法
  > 静态方法内只可调用静态属性

  ```ts
  // 父类
  class Person {
    public name:string;
    static age:number = 1;
    constructor(name:string, age: number){
      this.name = name;
      this.age = age;
    }
    static getInfo() {
      // console.log(this.name); // ❌静态方法不可调用public
      console.log(this.age); // 静态方法可调用静态属性
      console.log(Person.age); // 另一种写法
    }
  }
  Person.getInfo(); // 1 1
  ```

- 多态
  > 属于继承，是继承的一种表现

  ```ts
  class Animal {
    public name:string;
    constructor(name:string){
      this.name = name;
    }
    // 多态： 父类定义一个方法不去实现，而让子类去实现
    run():void {
      console.log('父类方法');
    }
  }
  class Dogs extends Animal(){
    constructor(name: string) {
      super(name);
    }
    run():void {
      console.log(this.name + 'Dogs run');
    }
  }
  class Cats extends Animal(){
    constructor(name: string) {
      super(name);
    }
    run():void {
      console.log(this.name + 'Cats run');
    }
  }
  console.log(Dogs().run('dog')); // dog Dogs run
  console.log(Cats().run('cat')); // cat Dogs run
  ```

- 抽象类

  - 抽象类抽象方法是用来定义标准，提供其他类的基类，不能直接被实例化

  - 关键字 abstract

  - 抽象类中的抽象方法不包括具体实现，必须在派生类中实现

  - 抽象方法只能出现在抽象类中

  ```ts
  // eg. 定义标准，Dogs子类中必须包含run方法
  abstract class Animal {
    public name:string;
    constructor(name:string){
      this.name = name;
    }
    abstract run():any{}; // 不包含具体实现
  }
  class Dogs extends Animal(){
    constructor(name: string) {
      super(name);
    }
    // 必须实现父类中的abstract run
    run():void {
      console.log(this.name + 'Dogs run');
    }
  }
  console.log(Dogs().run('dog')); // dog Dogs run
  ```

## ts中的接口

- interface

- 用来定义标准，意义类似abstract

- 接口比抽象类更强大，可以规范方法 属性 函数 类等

  ```ts
  // ts自定义方法传入，对json进行约束
  function printLabel(labelInfo:{label:String}):void {
    console.log('printLabel');
  }
  printLabel({label: 'label'});
  printLabel({name: '1'}); // ❌报错

  // 对批量方法传入进行约束
  interface FullName{
    firstName:string; // ⚠️注意：是分号结尾
    secondName:string;
  }
  function  printName(name:FullName){
    console.log(name.firstName, name.secondName);
  }

  var obj = {
    a: 1,
    firstName: 'xiaoqian',
    secondName: 'fan'
  }
  printName(obj); // 传入的obj中必须要有firstName 和sec

  // 接口：可选属性
  interface FullName{
    firstName:string;
    secondName?:string; // 可选属性
  }

  // 函数类型接口 对方法传入的参数和返回值进行批量约束
  // eg. 加密的函数类型接口
  interface encrpty{
    (key:string, value:string):string
  }
  var md5 = function(key:string, value:string):string{
    return key + value;
  }
  console.log(md5(1,1)); // 2

  // 可索引接口：数组 对象的约束（不常用）
  interface UserArr{
    [index:number]:string
  }
  let arr:UserArr = ['1', '2'];
  console.log(arr[0]); // 1

  interface UserObj{
    [index:string]:string // ⚠️注意：和可索引数组约束的区别在于index的类型
  }
  let arr:UserArr = {name: '1'}

  // 类的约束（和abstract类似）
  interface AnimalClass {
    name:string; // ⚠️注意：分号结尾
    eat(str:string):void;
  }
  // 下面完成它的类必须要有name eat()
  class Dog implements AnimalClass {
    name:string;
    constructor(name:string){
      this.name = name
    }
    eat(str?:string):void{
      console.log(this.name + 'mouse');
    }
  }
  console.log(new Dog('WangFu').eat('mouse')); // WangFu eat mouse
  ```

- 扩展接口：接口的继承

  ```ts
  // 扩展接口：接口的继承
  interface Animal {
    eat():void;
  }
  interface Person extends Animal{
    work():void;
  }
  // 接口的继承, Dog的实例中必须要有name work()
  class Programer{
    public name:string;
    constructor(name:string){
      this.name = name;
    }
    coding(code:string){
      console.log(this.name + code);
    }
  }
  // 继承结合接口
  class Web extends Programer implements Person(){
    constructor(name:string){
      super(name);
    }
    // eat work方法必须存在
    eat(){
      console.log(this.name + 'eat');
    }
    work(){
      console.log(this.name + 'work');
    }
  }
  console.log(new Web('li').coding('code')); // li code
  ```

## 泛型

  > 支持不特定的数据类型，要求传入的参数和返回的参数一致

- 泛型函数

```ts
// 用同样的大写字母表示，一般用T
function getInfo<T>(value:T):T{
  return value;
  return '123'; //❌ 不知道传入的是啥类型，但是又要求传入返回一致，所以矛盾
  }
getInfo<number>(123);
```

- 泛型类

```ts
class MainClass<T> {
  public list:T[] = [];
  add(value:T):void{
    this.list.push(value);
  }
  min():T{
    return list[0];
  }
}
new MainClass<Number>().add(1);
console.log(arr.min()); // 1
```

- 泛型接口

```ts
interface Config {
  <T>(value1:T, value2:T):T;
}
var setData:Config = function<T>(value1:T, value2:T):T {
  return value1 + value2;
}
var getData:Config<number> = setData;
getData(1,2); // 3
```

- 泛型类

```ts
// 操作数据库的泛型类
class MysqlDb<T>{
  add(info:T):boolean{
    console.log(info);
    return true;
  }
  update(info:T, id:number){
    console.log(info);
    console.log(number);
    return true;
  }
}
// 1. 定义一个User表和数据库映射
class User{
  username:string|undefined
}
var u = new User(); // eg.60
u.username = '张三';
var db = new MysqlDb<User>(); // 验证数据类型
db.add(u);

// 2. 定义一个ArticleDate类和数据库进行映射
class ArticleCate{
  title:string|undefined;
  desc:string|undefined;
  status:string|undefined;
  // 利用构造函数，在实例化时就添加值 ，优化eg.60
  constructor(params:{
    title:string|undefined;
    desc:string|undefined;
    status?:string|undefined; // status选填
  }){
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }
}

var a = new ArticleCate({
  title: '分类',
  desc: 'desc'
})
a.status = 'status'; //也可以这样
// 类当作参数的泛型类
var Db = new MysqlDb<ArticleCate>();
Db.add(a);
Db.update(a, 11);

```

## 定义一个DB库 支持 mysql mssql , mysql  mssql2个类里面都有add的方法

```ts
interface DBI {
    add(info:T):boolean;
}
// 定义一个操作mysql数据库的类 
// ⚠️注意：要实现泛型接口 这个类也要是一个泛型类
class Mysql<T> implements DBI{
    add(info:T) {
        return true;
    }
}
// 定义一个操作mssql数据库的类
class Mssql<T> implements DBI{
    add(info:T) {
        return true;
    }
}
// 定义一个User类和数据库表做映射
class User{
  username:string|undefined
}

var u = new User();
u.username = "张三";

var oMysql = new MySql<User>();
oMysql.add(u);
```

## module

```ts
import {getData as get} from '';

// export 可以用多次
export function getData(){};
// 或
export{getData}
import {getData} from '';

// export default 可以使用多次
export default getData;
import getData from '';
```

## ts的命名空间

- 组织代码 避免命名空间

- 命名空间内都是默认私有变量

- 如果想让外部访问内部变量 必须要用export导出

```ts
// 默认私有

namespace A {
  name:string;
  constructor(theName:string){
      this.name = theName;
  }
  export class Test{
    eat(){
      console.log(this.name);
    }
  }
}
new A.Test('U'); // U

// 命名空间可以导出
export A;
```

## 装饰器

- 一种特殊类型的申明，可以被附加到类申明、方法、属性、参数上进而改变类的行为

- 装饰器是一个方法，可以注入到类方法属性参数上来拓展它们的功能

- 普通装饰器（无传参）

```ts
// 普通装饰器
function logClass(params:any){
  console.log('params'); // params
  console.log(target); // f HttpClient(){}
  // 动态拓展当前类
  params.prototype.apiUrl = 'apiUrl';
  params.prototype.run = function () {
    console.log('run');
  }
}
@logClass
class HttpClient{
  constructor{}
  getData(){}
}
console.log(new HttpClient().apiUrl); // apiUrl
```

- 装饰器工厂（可传参

```ts
// 装饰器工厂
function logClass(params:string){
  return function(target:any) { // target是指当前的类
    console.log(params); // logClass
    console.log(target); // f HttpClient(){}
    target.prototype.apiUrl = params;
  }
}
@logClass('logClass');
class HttpClient{
  constructor{}
  getData(){}
}
console.log(new HttpClient().apiUrl); // logClass

```

- 类装饰器 重载构造函数

  - 下面是一个类装饰器重载构造函数的列子

  - 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一参数

  - 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的申明

```ts
function logClass(target:any){
    console.log(target);  // f HttpClient(){}
    return class extends target {
      apiUrl:any = '我把值为111的apiUrl修改成222'
      getData(){
        this.apiUrl = this.apiUrl + '我又修改了apiUrl'
        console.log(this.apiUrl); // 我把值为111的apiUrl修改成222 我又修改了apiUrl
      }
    }
}
@logClass
class HttpClient{
  public apiUrl:string | undefinded
  constructor{
    this.apiUrl = '111';
  }
  getData(){
    console.log(this.apiUrl);
  }
}

```

- 属性装饰器

  - 属性装饰器在运行时会被当作函数使用，传入下列的2个参数：

  - 对静态成员来说是类的构造函数，对实例成员来说是类的原型对象

  - 成员的名字

```ts
//类装饰器
function logClass(params:string){
  return function(target:any) { // target是指当前的类
    // console.log(params); // logClass
    // console.log(target); // f HttpClient(){}
  }
}
// 属性装饰器
function logProperty(params:string){
  return function(target:any, attr:any) { // target是指当前的类的原型对象,attr是指当前属性名称
    console.log(attr); // url
    console.log(target); // {getData:f, constructor: f}
    target[attr] = params; // 因为此时的target是类的原型对象，所以可以修改里面的属性
    // ⚠️注意： 不能target.attr = params修改，此时的target相当于target.prototype
  }
}
@logClass('111') // ⚠️注意 装饰器后面不能带分号
class HttpClient{
  @logProperty('baidu.com'); // 用来装饰属性apiUrl  // ⚠️注意 装饰器后面不能带分号
  public apiUrl:any | undefinded;
  constructor{}
  getData(){
    console.log(this.apiUrl); //
  }
}
console.log(new HttpClient().getData()); // baidu.com

```

- 方法装饰器
  - 被应用到方法的属性描述上，用来监视 修改 替换方法定义

  - 传入如下三个参数：

  - **对静态成员来说是类的构造函数，对实例成员来说是类的原型对象**
  - **方法名称**
  - **方法属性描述**

```ts
// 方法装饰器
function get(params:any){
  return function(target:any, methodName:any, desc:any) {
    console.log(methodName); // getData
    // 对静态成员来说是类的构造函数，对实例成员来说是类的原型对象 (getData)
    console.log(target); // {getData:f, constructor: f, __proto__:Object}
    console.log(desc);
    // 用装饰器扩展属性
    target.apiUrl = '1';
    // 用装饰器扩展方法
    target.run = function(){
      console.log('run');
    }
    // 修改getData2
    // 1.保存当前的方法
    var oMethod = desc.value;
    desc.value = function(...args:any[]){
      args = args.map(value => {return String(value)});
    }
    oMethod.apply(this, args); // 组合冒充
  }
}

class HttpClient{
  public apiUrl:any | undefinded;
  constructor{}
  @get('xxx')
  getData(...args:any[]){
    console.log('1');
  }
}
console.log(new HttpClient().getData(123, 'xxx')); // '123' 'xxx' // 1

```

- 方法参数装饰器

  - 参数装饰器在运行时会被当作函数调用，可以使用参数装饰器作为类的原型增加一些元素数据，传入下面3个参数

  - **对静态成员来说是类的构造函数，对实例成员来说是类的原型对象**

  - **方法名称**

  - **参数在函数参数列表中的索引**

```ts
// 方法装饰器
function logParams(params:any){
  return function(target:any, paramsName:any, paramsIndex:any) {
    console.log(params); // xx
    console.log(paramsName); // getData
    console.log(target); // {getData:f, constructor: f}
    console.log(paramsIndex); // 0
  }
}

class HttpClient{
  public apiUrl:any | undefinded;
  constructor{}
  getData(@logParams('xx') uuid:any){
    console.log(uuid);
  }
}
console.log(new HttpClient().getData(123));
// getData
// {getData:f, constructor: f}
// 0
// 123
```

## 装饰器执行的顺序

- 属性装饰器 > 方法装饰器 > 方法参数装饰器 > 类装饰器

- 如果有多个同样类型的装饰器，先执行后面的
