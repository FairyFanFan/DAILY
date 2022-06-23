# 原型

## 对象

- new Object() 有 prototype + __proto__

- 一般定义一个对象都有原型__proto__，但是可以定义一个没有原型的对象

  - Object.create(null, {test: {}});

- 执行优先级：

  - 原型方法和对象方法的优先级，优先从对象中取，找不到再找长辈

  - 函数，实例化出来的对象调用某个方法，先调用__proto__上的view,再调用prototype上的view
  
- 关于(new Object()).__proto__ == Object.prototype

  - let arr = []; // new Array;
  - arr.__proto__ = Array.prototype

  - let str = ''; // new String;
  - str.__proto__ = String.prototype;
 
## 函数

- 一切皆对象，包括函数

- 对象就有__proto__，但是函数多了个prototype，函数对象的两个父母：__proto__ prototype，这两者服务对西那个不同：

  - __proto__ 服务于当前函数对象，专属的，（函数构造对象的原型）

  - prototype 服务于实例化出来的对象，（函数对象的原型）

## 原型 原型链

- 根据一个实例对象去新建一个实例

- 设置原型 setPrototypeOf

- 原型检测

  - instanceof 构造函数

  - Object.isPrototype() 对象原型检测

- 属性检测

  - key in Object 自身属性和原型链上的属性

  - object hasOwnProperty 自身属性

- 使用call/apply借用其他的原型链

  - DOM节点（伪数组）借用数组方法 ./index.html <script>标签内有案例

    - let a = Array.prototype.filter.call(this, 参数回调)

    - let a = [].find.slice(this, 参数回调)

  - 复习数组方法https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries

- Object.create 和 __proto__

  - Object.create只能给一个对象定义原型但是不能获取，所以各大浏览器厂商自主开发出了__proto__

  - 以上是非标准的，W3C标准使用setPrototypeOf getPrototypeOf

- 