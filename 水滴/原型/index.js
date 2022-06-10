// 对象 __proto__
// 函数 prototype

// ------没有原型的对象也可以创造
// let name = {};
// console.dir(name);
// console.log("hasOwnProperty::: ", name.hasOwnProperty('a'));
// name.b = {};
// console.log("hasOwnProperty::: ", name.hasOwnProperty('b'));

// let age = Object.create(null, {test: {}});
// console.dir(age); // 无__proto__

// 原型方法和对象方法的优先级，优先从对象中取，找不到再找长辈

// ------函数拥有多个长辈
// 函数对象的两个父母：__proto__ prototype 
// __proto__ 服务于当前函数对象，专属的，（函数构造对象的原型）
// prototype 服务于实例化出来的对象，（函数对象的原型）
// function User() {};
// console.dir(User);
// let hd = new User();
// console.dir(hd);
// console.log("User.prototype == hd.__proto__::: ", User.prototype == hd.__proto__); //对象的时候用__proto__
// User.prototype.show = function() {console.log("'houdunren'::: ", 'houdunren');}
// User.prototype.view = function() {console.log("'prototype view'::: ", 'prototype view');}
// hd.show()
// // User.show(); // 报错，这样就访问不到，想要把函数当对象用则用__proto__
// User.__proto__.view = function() { console.log("view::: ", 'view');}
// User.view(); // 先调用__proto__上的view,再调用prototype上的view
// hd.view(); //报错

// ------原型关系详解与属性继承实例
Object.prototype.show = function() {console.log("Object.prototype.show");}
function User() {};
console.dir(User);
console.log(User.prototype.__proto__ == User.__proto__.__proto__)
console.dir(new User())

// ------原型中的constructor------
// function User(name) { this.name = name };
// User.prototype.show = function() {console.log(this.name + '1')};
// // 以下写法不能用constructor去实例化对象了，因为会在空间内重新定义一块prototpye地址 从而导致User.prototype.constructor找不到然后报错
// // User.prototype = {
// //     speak() {
// //         console.log(this.name + '2');
// //     }
// // }
// // 但是上述可以优化为
// User.prototype = {
//     constructor: User,
//     speak() {
//         console.log(this.name + '2');
//     }
// }
// console.dir(User);
// console.log(User.prototype.constructor == User);
// let u = new User.prototype.constructor('hellokitty');
// u.speak();
// console.dir(u);

// ------根据某一个实例创建新的实例------
// function User(name, age, sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex
// }
// let u = new User('hd');
// console.log(u)
// function createByObject(obj, ...args) {
//     const constructor = Object.getPrototypeOf(obj).constructor;
//     console.log("constructor::: ", constructor, args);
//     return new constructor(...args);
// }
// console.log(createByObject(u, 'fxq', 12, 'female'));
// // 上述是后盾人老师讲的，以下是自己思考的
// console.log(u.__proto__ == User.prototype, u.__proto__.constructor == User);
// console.dir(User)
// User.prototype.constructor是无限套娃吗？？
// function loopIndex() {
//     let u = User.prototype.constructor;
//     let i = 1;
//     while(u && i < 100000){
//         u = u.prototype.constructor;
//         if (u === User) i++;
//     }
//     console.log('i', i);
// }
// loopIndex()

// let a = {name: 'Diana'};
// let b = {name: 'Jay'};
// Object.setPrototypeOf(a, b);
// console.dir(a);
// function A() {console.log('A')};
// let AA = new A();
// function B() {console.log('B')};
// let BB = new B();
// Object.setPrototypeOf(A, B);
// console.dir(A);
// Object.setPrototypeOf(AA, BB);
// console.dir(AA);



// // 属性检测
// let a = {name: 1};
// let b = {age: 12};
// Object.setPrototypeOf(a, b);
// for(const key in a){
//     console.log("key1::: ", key);
//     if(a.hasOwnProperty(key)) {
//         console.log("key2::: ", key);
//     }
// }


// // 使用call /apply借用原型链
// let hd = {
//     data: [1,2,3,4]
// };
// Object.setPrototypeOf(hd, {
//     max() {
//         return this.data.sort((a,b) => b - a)[0]; // 注意返回的是倒叙数组，取第一个即为最大值
//     },
//     max1(data) {
//         return data.sort((a,b) => b - a)[0];
//     }
// })
// console.log(hd)
// console.log(hd.max());
// console.log(hd.max());
// console.log(hd.max1(hd.data));
// // 需求：借用max方法
// let hd1 = {
//     lesson: {js: 88, css: 99, html: 20},
//     // getter 被借用的方法里访问的是this.data
//     get data() {
//         return Object.values(this.lesson);
//     }
// }
// console.log(hd.max.apply(hd1))
// console.log(hd.max1(Object.values(hd1.lesson))); // 对象转数组
// console.log(hd.max1.call(null, Object.values(hd1.lesson)))
// apply(this,[参数数组]), call(this,参数1,参数2)

// // 利用Math.max()优化上述
// console.log(Math.max(...Object.values(hd1.lesson)));
// console.log(Math.max.apply(null, Object.values(hd1.lesson)));
// console.log(Math.max.call(null, ...Object.values(hd1.lesson)));
// apply(this,[参数数组]), call(this,参数1,参数2)

// DOM伪数组使用数组方法

// // ------Object.create 和 __proto__
// let obj = {};
// let User = {
//     show() {
//         return this.name;
//     } 
// }
// console.dir(obj)
// obj = Object.create(User);
// let u = Object.create(User); // 把u的原型定义为User
// console.dir(obj)
// obj.name = 2
// console.dir(u)
// let u1 = Object.create(User, {
//     name: {
//         value: 1
//     }
// });
// console.log(u1.show());
// console.log(obj.show());
// // 子类续承父类
// Rectangle.prototype = Object.create(Shape.prototype);
// Rectangle.prototype.constructor = Rectangle;
// // create只能创建不能获取，各大厂商造出__proto__
// let u2 = {}
// u2.__proto__ = User;
// u2.name = "u2"
// console.dir(u2)
// console.log(u2.show())
// // 以上是非标准的，W3C标准使用setPrototypeOf getPrototypeOf
// let u3 = {};
// Object.setPrototypeOf(u3, User);
// console.dir(u3)
// console.log(Object.getPrototypeOf(u3));

// ------为啥要用原型，以及合理的构造函数申明方法
// function User(name){
//     this.name =  name,
//     this.show =  function() {
//         return this.name;
//     }
// }
// let a = new User('a');
// let b = new User('b');
// console.dir(a);
// console.dir(b);
// console.log("a.show()::: ", a.show());
// console.log("b.show()::: ", b.show());
// // 造成浪费，因为每一个实例a,b都有一个show方法，空间的浪费
// // 挂载到prototype上只需一次空间内存
// function User(name) {
//     this.name = name
// }
// // User.prototype.show = function() { return this.name } ;
// // User.prototype.view = function() { return 'view' } ;
// // 以上太麻烦整合为下面的,但是记得把constructor属性别漏了
// User.prototype = {
//     constructor: User,
//     show: function() { return this.name },
//     view: function() { return 'view' }
// }
// let a = new User('a');
// let b = new User('b');
// console.dir(a);
// console.dir(b);
// console.log("a.show()::: ", a.show());
// console.log("b.show()::: ", b.show());
// console.log("a.view()::: ", a.view());
// console.log("b.view()::: ", b.view());

// // ----------this和原型没有关系,始终指向调用的那个对象
// function User(name) {
//     this.name = name;
// }
// User.prototype.show = function() { return this.name } ;
// function Class() {
//     name = 'class';
// }
// Class.prototype.view = function() {
//     return this.name;
// }
// let a = new User('a');
// console.dir(a);
// console.log("a.show()::: ", a.show());
// let b = new Class('b');
// console.dir(b);
// console.log("b.view()::: ", b.view()); // undefined并不是'class'
// let h = {name: 'name'};
// let H = {
//     name: '后端人',
//     show() {
//         console.log(this.name)
//     }
// }
// // Object.setPrototypeOf(h, {})
// // console.log(H.show())
// Object.setPrototypeOf(h, H)
// console.log(h.show()) // 不是H里的后端人而是h中的name


// ------不用滥用Object.prototype，因为有可能项目里引用了好多其他的包，也在这上面挂载东西了，导致代码健壮性不好 稳定性不高


// // // -------__proto__不是一个严格意义的属性，而是访问器属性 getter setter 
// // let u = {};
// // u.__proto__ = {
// //     show(){
// //         return 'show()'
// //     }
// // }
// // console.dir(u)
// // console.log(u.show())
// // u.__proto__ = '111'
// // console.dir(u)
// // console.log(u.show()) // 不会打印字符串
// // __proto__原理分析  getter setter
// let hd = {
//     action: {},
//     // proto: null
//     get proto() {
//         return this.action
//     },
//     set proto(obj) {
//         if(obj instanceof Object) this.action = obj; // ❓为什么，instranceof不是构造函数检测吗？
//     }
// }
// hd.proto = 'abc';
// console.log(hd.proto);
// hd.proto = {name: 123}
// hd.proto = 222
// console.log(hd.proto)
// console.dir(hd);
// // 面试题 就要设置字符串上去，那就是把get set 搞掉，不让他继承原型
// let h = Object.create(null);
// h.__proto__ = 111;
// console.log(h)


// --------改变构造函数的原型不是继承
// function User() {};
// User.prototype.name = function() {console.log('User name')};
// console.log(new User())

// 目标：让Admin和Member要继承name属性，不用call，想用继承
// function Admin() {};
// Admin.prototype = User.prototype; // 改变构造函数的原型
// Admin.prototype.role =  function() {console.log('Admin role')};
// function Member() {};
// Member.prototype = User.prototype;
// Member.prototype.role =  function() {console.log('Member role')};
// console.dir(Admin);
// console.dir(Member);
// console.log(new Admin().name()); // User name
// console.log(new Member().name());
// console.log(new Admin().role()); // Admin role被Member role覆盖了，原因是Admin.prototype和Member.prototype都指向User.prototype
// console.log(new Member().role());

// // -------继承是原型的继承（对于以上继承的修正）
// // let f = {};
// // console.log(f.__proto__);
// // console.log(Object.getPrototypeOf(f));
// // console.log(Object.setPrototypeOf(f, {}));
// // console.log(f)
// function Admin() {};
// Admin.prototype.__proto__ = User.prototype; // 之前Admin.prototype指向Object.prototype，现在等于给加了中间一层User.prototype，这样的就可以保留Admin.prototype
// Admin.prototype.role =  function() {console.log('Admin role')}; // 所以说这里的role是挂载在Admin自己的原型上
// function Member() {};
// Member.prototype.__proto__ = User.prototype;
// Member.prototype.role =  function() {console.log('Member role')};
// console.dir(Admin);
// console.dir(Member);
// console.log((new Admin()).name()); // User name
// console.log((new Member()).name());
// console.log((new Admin()).role()); // Admin role被Member role覆盖了，原因是Admin.prototype和Member.prototype都指向User.prototype
// console.log((new Member()).role());
// // 但是注意 
// Admin.prototype = Object.create(User.prototype);  // 等于有两个Admin.prototype 此时role方法会报错
// // 所以定义role方法要在上一句的下一句
// Admin.prototype.role = function() {console.log('Admin role')}

// ------继承对新创建的方法的影响
// // 先实例化后追加一个role方法 这个实例则用不了role方法
// function Admin() {};
// let admin = new Admin();
// Admin.prototype = User.prototype; 
// Admin.prototype.role =  function() {console.log('Admin role')};
// console.log(admin.role()) // 报错 因为实例admin最终等价于指向了User.prototype
// // 优化成一下实例admin指向Admin.prototype，因为此时下面的代码只是改变了原来原型对象的父级而不是原型对象
// function Admin() {};
// let admin = new Admin();
// Admin.prototype.__proto__ = User.prototype;  // 改变原来原型对象的父级
// Admin.prototype.role =  function() {console.log('Admin role')};
// console.log(admin.role())

// // -----继承之后的问题，该加的constructor加上
// function Admin() {};
// Admin.prototype = Object.create(User.prototype);  // 等于有两个Admin.prototype 此时role方法会报错
// Admin.prototype.role =  function() {console.log('Admin role')}; // 所以说这里的role是挂载在Admin自己的原型上
// let admin = new Admin();
// console.log(admin.role()); 
// // console.log(admin.constructor) // 这个constructor其实是User这个构造函数上
// Admin.prototype.constructor = Admin; // 这里的constructor不能忘
// admin.role();
// console.log(admin.constructor); // 这里的就是Admin
// let b = new admin.__proto__.constructor;
// console.log(b)

// // ----- 但是以上还有个问题遍历的时候constructor和role一样会被遍历出来，如何遍历constructor
// console.log(Object.getOwnPropertyDescriptors(Admin.prototype)); // enumerable属性，代表可以遍历
// for(const key in admin) {
//     console.log(key) // role constructor name
// }
// 把 Admin.prototype.constructor = Admin; 修改为以下
// Object.defineProperty(Admin.prototype, 'constructor', {
//     value: Admin,
//     enumerable: false
// })
// function Admin() {};
// Admin.prototype = Object.create(User.prototype);  // 等于有两个Admin.prototype 此时role方法会报错
// Admin.prototype.role =  function() {console.log('Admin role')}; // 所以说这里的role是挂载在Admin自己的原型上
// let admin = new Admin();
// console.log(admin.role()); 
// Object.defineProperty(Admin.prototype, 'constructor', {
//     value: Admin,
//     enumerable: false
// })
// for(const key in admin) {
//     console.log(key) // role constructor name
// }


// // --------方法重写和父级属性的访问
// Admin.prototype.view = function() {
//     console.log(User.prototype.name() + 'Admin.prototype')
// }

// ------面向对象的多态
// function Admin() {};
// Admin.adminDesc = function() {console.log('AdminDesc')};
// function Member() {};
// Member.memberDesc = function() {console.log('MemberDesc')};
// for(const iterate of [new Admin, new Member]) {
//     console.log(iterate)
//     if(iterate instanceof Admin) Admin.adminDesc();
//     if(iterate instanceof Member) Member.memberDesc();
// }
// 上述实现弊端 麻烦 代码不够优雅
// function User() {};
// User.prototype.show = function() {this.desc()};
// function Admin() {};
// Admin.prototype = Object.create(User.prototype);
// Admin.prototype.desc = function() {console.log('我是admin描述')};
// function Member() {};
// Member.prototype = Object.create(User.prototype);
// Member.prototype.desc = function() {console.log('我是Member描述')};
// for(const iterate of [new Admin(), new Member()]) {
//     console.dir(iterate)
//     iterate.show();
// }


// // ----使用父类构造函数初始属性
// // let h = {
// //     name: 'h',
// //     show() {
// //         console.log('h', this.name);
// //     }
// // };
// // h.show()
// // "use strict"; // 使用严格模式时，在Admin中调用User(name, age)此时打印User中的this不是window而是undefined
// function User(name, age) {
//     this.name = name;
//     this.age = age;
//     // console.log('this', this) // 非严格模式下在Admin中调用User(name, age)此时的this是window
// }
// User.prototype.show = function() {
//     console.log(this, this.name, this.age)
// };
// // function Admin(name, age){
// //     this.name = name; // 这样写就很麻烦 毕竟再来一个Member函数继承了User 同样的要再去定义name和age
// //     this.age = age;
// // };
// // function Admin(name, age){
// function Admin(...args){
//     // User(name, age) // 这样写肯定不对，因为把User当函数使用 this在非严格模式下为window
//     // 构造函数User中的this指向属于我属性的对象或者new的新对象 比如上面let h = {}这个例子是属于前者
//     // User.call(this, name, age)
//     User.apply(this, args)
// };
// Admin.prototype = Object.create(User.prototype);
// // console.dir(Admin)
// let a = new Admin('Amy', '18')
// console.dir(a);
// console.log(a.show());


// // ---使用原型工厂封装继承
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// }
// User.prototype.show = function() {
//     console.log(this, this.name, this.age)
// };
// function Admin(...args){
//     User.apply(this, args)
// };
// extend(Admin, User);
// function extend(sub, sup) {
//     sub.prototype = Object.create(sup.prototype);
//     Object.defineProperty(sub.prototype, 'constructor', {
//         value: sub,
//         enumerable: false
//     })
// }
// let a = new Admin('Amy', '18')
// console.dir(a);
// console.log(a.show());

// // ----对象工厂派生对象并实现继承
// // 实现继承的方式，构造函数，申明一个对象用__proto__，用Object.create创建对象继承
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// }
// function admin(...args) {
//     // const instance = {};
//     // instance.__proto__ = User.prototype;
//     // 以上和以下构建instance均可
//     const instance = Object.create(User.prototype);
//     User.apply(instance, args);
//     return instance;
// }
// let a = admin('Amy', 18);
// console.log(a)

// // ------多继承造成的困扰，js没有多继承，就是说只能继承一个，而不能继承多个无关联的构造函数
// // 不推荐的做法，就是把无关联的构造函数串联起来，即让A继承没有关系的B，最终C可以获取到A，B上的所有方法
// // -------使用mixin实现多继承
// // 原理：原型就是个对象，既然是对象，我就可以往里面压进去属性 
// // 关键代码 Admin.prototype = Object.assign(Admin.prototype, Credit, Request);
// // function Credit() {};
// // Credit.prototype.total = function() {console.log('我是积分合计')};
// // function Request() {};
// // Request.prototype.ajax = function() {console.log('我是请求ajax')};
// // function User() {};
// // User.prototype.init = function() {console.log('我是用户初始化')};
// const Credit = {
//     total() {console.log('我是积分合计')}
// };
// const Request = {
//     ajax() {console.log('我是请求ajax')}
// };
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// };
// User.prototype.init = function() {console.log('我是用户初始化')};
// function Admin(...args) {
//     User.apply(this, args);
// };
// extend(Admin, User); // 只需要继承User，其他的通过原型就是个对象这一原则进行改写
// Admin.prototype = Object.assign(Admin.prototype, Credit, Request);
// function extend(sub, sup) {
//     sub.prototype = Object.create(sup.prototype);
//     Object.defineProperty(sub.prototype, 'constructor', {
//         value: sub,
//         enumerable: false
//     })
// }

// let a = new Admin('Amy', 10);
// console.log(a)
// a.total();
// a.ajax();

// // -----mixin的内部继承与super关键字
// // credit 内部有一个计算积分总量的函数，那就是直接在credit中使用request的ajax方法,不需要用实例a去调用ajax了，那么就不需要让Admin再同步去继承request的方法
// const Request = {
//     ajax() { return '后台请求ajax'; }
// };
// const Credit = {
//     __proto__: Request,
//     // total() {console.log('我是积分合计')}
//     // total() {console.log(this, Credit.__proto__.ajax() + '我是积分合计')} // 这样写的话最终的Admin原型中如果没有推入Request就会报错，因为this.__proto__是User.prototype
//     total() {console.log(Credit.__proto__.ajax() + '我是积分合计')} // 改成这样行了
//     // super == Credit.__proto__
//     // total() {console.log(super.ajax() + '我是积分合计')}
//     // 注意super指的是当前这个类的原型，此时的this.__proto__就指的是Credit自己的__proto__,而不是实例化出来的admin的__proto__
// };
// console.log(Credit)
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// };
// User.prototype.init = function() {console.log('我是用户初始化')};
// function Admin(...args) {
//     User.apply(this, args);
// };
// extend(Admin, User); // 只需要继承User，其他的通过原型就是个对象这一原则进行改写

// Admin.prototype = Object.assign(Admin.prototype, Credit); // 把Request放进去Credit的this.__proto__就等价于 Admin.prototype
// function extend(sub, sup) {
//     sub.prototype = Object.create(sup.prototype);
//     Object.defineProperty(sub.prototype, 'constructor', {
//         value: sub,
//         enumerable: false
//     })
// }
// let a = new Admin('Amy', 10);
// console.log(a)
// a.total();


// --------tab选项卡显示效果基类开发
// 见html