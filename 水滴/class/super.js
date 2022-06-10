// 1. class属性和方法继承原理

    // 1.1 class是构造函数的语法糖(class核心仍然是原型继承)，所以先从js构造函数属性继承原理开始
    // function Pro(name) {
    //     this.name = name;
    // }
    // function ChildPro(name) {
    //     Pro.call(this, name); // 属性继承
    // }
    // console.dir(Pro)
    // ChildPro.prototype = Object.create(Pro.prototype); // TODO⚠️ 为什么要创造出prototype
    // Pro.prototype.show = function() {console.log(124)};
    // console.dir(ChildPro)
    // const childPro = new ChildPro();
    // childPro.show(); // 方法的继承
    // console.log("new ChildPro('后盾人')::: ", new ChildPro('后盾人'));

    // 1.2 class属性方法继承
    // class Pro {
    //     constructor(name) {
    //         this.name = name;
    //     }
    //     // 属性是属于新实例化出来的对象的
    //     // 和属性不同，方法是所有对象共享的，始终在原型对象上
    //     show() {
    //         console.log('后盾人');
    //     }
    // }
    // class ChildPro extends Pro{
    //     // Pro.call(this, name); // 属性继承
    //     constructor(name) {
    //         super(name);
    //     }
    // }
    // console.dir(ChildPro)
    // const childPro = new ChildPro();
    // childPro.show();
    // console.log("new ChildPro('后盾人')::: ", new ChildPro('属性是属于新实例出来的对象的'));

// 2. super的原理
    // class Common {
    //     name = 'common-name'
    //     show() {
    //         console.log('common', this.name)
    //         return this.name;
    //     }
    // }
    // class Admin extends Common {
    //     // constructor() {
    //     //     super();
    //     // }
    //     name = 'admin-name';
    //     show() {
    //         console.log('admin', this.name)
    //         return this.name;
    //     }
    // }

    // const admin = new Admin();
    // // 目标是要调用父类的class
    // admin.show();
    // console.dir(admin);