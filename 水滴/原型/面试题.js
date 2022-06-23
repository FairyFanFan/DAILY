// -----------------------------------
// function pro() {
//     this.name = '张三'
// }
// pro.prototype.name = "里斯"
// var a = new pro();
// console.dir(pro);console.dir(a);
// console.log(a.name); // 张三
// console.log(a.__proto__ === pro.prototype); // true


// -----------------------------------
// 1、通过原型来继承
//  function Parent() {
//     this.name = "父"
// }
// Parent.prototype.say = function () {

//     console.log(this.name);

// }
// function Child() {
//     this.age = 18
// }
// Child.prototype = new Parent()

// let child = new Child()
// child.say('child');
// console.log(child.age);


// -----------------------------------
// 2、构造函数继承 只能继承父类构造函数上 的属性和方法, 不能继承父类原型上的属性和方法
// function Parent1() {
//     this.age = 22
//     this.fnInner = function() {
//         console.log(this.age);
//     }
// }
// Parent1.__proto__.fnProto = function() { console.log(this.age) };
// Parent1.prototype.fn = function () {
//     console.log(this.age);
//     // return "parent1"
// }
// function Child1() {
//     Parent1.call(this)
// }
// let child1 = new Child1()
// console.log(child1);
// console.dir(Parent1);
// console.dir(Child1);

// -----------------------------------
// function Animal() {
//     console.log('父类里的 this ------',this);
//     this.name = 'Animal'
// }
// Animal.prototype.speak = function () { // 父类原型上的方法
//     console.log('speak -->');
// };
// // 注意，当前页面中Parent1.__proto__.fnProto方法也被挂载在这里了
// Animal.__proto__.speak2 = function () { // 父类原型上的方法
//     console.log('speak -->');
// };
// console.dir(Animal)
// function Dog() {
//     console.log('子类里的 this --->>>',this);
//     Animal.call(this); // 这时父类里的this是 Dog{}
//     this.type = 'dog'
// }
// var dog = new Dog(); // new 的时候执行 Obj 构造函数, 调用父类
// console.log(dog.name); // Animal
// console.log(dog.speak); // undefined
// console.dir(Dog)
// function Cat() {
//     Animal.call(this) // 这时父类里的this是 Cat{}
// }
// var cat = new Cat(); // new 的时候执行 Obj2 构造函数, 调用父类
// console.log(cat.name); // Animal
// console.log(cat.speak); // undefined
// console.dir(Cat)
// console.dir(new Animal())

// --------------------------------
// 原型继承，上述构造函数继承的优化 
// 关键语句Dog.prototype = new Animal(); 
// 它利用的是原型链向上查找的机制来实现继承, 子类的 prototype 本来是指向 子类构造函数本身的(本例中Dog{}), 而我们通过改变子类原型的指向, 把子类的原型指向父类实例 , 这样就可以在Dog子类的实例 dog1 和 dog2 上, 既能继承父类上的属性和方法, 也能继承父类原型上的属性和方法
// function Animal() { // 父类
//     this.name = '父类name -> Animal';
//     this.arr = [1,2,3];
//     this.speak = function() {
//         console.log('父级 this.speak')
//     }
// }
// Animal.prototype.speak = function () { // 父类原型上的方法
//     return '父类原型的方法 speak --->'
// };
// Animal.__proto__.speak2 = function () { // 父类原型上的方法
//     return '父类原型的方法 speak --->'
// };
// console.dir(Animal)
// function Dog(type) {
//     this.type = type
// }
// console.log('---->>', Dog.prototype); // 未改变指向之前的原型 指向子类函数本身: Dog{}

// Dog.prototype = new Animal(); // 🌟🌟🌟POINT：子类原型指向父类实例
// console.dir(Dog)

// let dog1 = new Dog('dog1');
// let dog2 = new Dog('dog2');
// console.log(dog1.name); // 父类name -> Animal
// dog1.arr.push('又push了一个元素');
// console.log(dog1.speak()); // 父类原型的方法 speak ---> // 注意 属性是属于每个实例化出来的对象，所以先是this.speak
// console.log(dog1.speak2()); // 根本访问不了这个方法
// console.log(dog2.name); // 父类name -> Animal
// console.log(dog2.arr); // [ 1, 2, 3, '又push了一个元素' ]

// ---------------------
// 理解Parent1.call(this)
// function Person(){
//     this.name = "zqq";
//     this.age = 28;
// }
// var p = new Person();
// 当以new调用构造函数(执行var p = new Person())时，函数内部会发生以下情况:

// 1.创建一个空对象

// var p = {};
// 2.this变量指向对象p

// Person.call(p)
// 3.p继承了构造函数Person()的原型

// p.__proto__ = Person.prototype
// 4.执行构造函数Person()内的代码



// ---------------------
// 构造函数首字母可以用小写吗？ （构造函数首字母建议大写；普通函数首字母建议小写）
// function person(name){
//     // 为了防止因为忘记使用new关键字而调用构造函数，可以加一些判断条件强行调用new关键字
//     // if (!(this instanceof person)) {
//     //     return new person(name);
//     // }
//     this.name = name;
//     this.say = function(){
//       return "I am " + this.name;
//     }
//   }

// var person1 = new person('nicole');
// person1.say(); // "I am nicole"
// // 没有new直接调用构造函数可以吗？
// var person2 = person('noNew');
// person2.say(); // 报错，this指向Windows
// 在构造函数内部，this指向的是构造出来的新对象
// 在普通函数内部，this指向的是window全局对象

// -------------
// function P(){
//     var a = 1;
//     this.name = "zqq";
//     this.age = 28;
//     return a;
// }
// var p = new P();//返回this对象
// console.log(p1);
// var p2 = P();
// console.log(p2);
// 构造函数和普通函数的区别 普通函数：不使用new运算符的函数就是普通函数

// return的是五种简单数据类型：String,Number,Boolean,Null,Undefined的话，
// 构造函数会忽略return的值，依然返回this对象，也就是新的实例对象
// 普通函数如果没有return值的话，返回undefined

// return的是引用类型：Array,Date,Object,Function,RegExp,Error的话
// 如果使用了return，那返回值会根据return值的类型而有所不同

// function P2(){
//     var arr = [];
//     this.name = "zqq";
//     this.age = 28;
//     return arr;
// }
// var p12 = new P2();//返回arr空数组，Date,Object,Function,RegExp,Error同理
// console.dir(p12);
// var p11 = new P2();
// console.dir(p11);