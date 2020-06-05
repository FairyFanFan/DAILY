# Dart

## dart数据类型

- 每个变量都是一个对象，。甚至数字，函数，和null都是对象。所有对象都继承自Object 类。这一点和 js 保持一致。
- dynamic 推断类型
- final 类型不可再变
    >惰性初始化，在运行时第一次使用前才初始化 而const是在编译时就确定值了。
- const 类型和值都不可再变

    ```dart
    // dynamic 和 var 区别：
    // Eg1:
    var b = 'cde'; //b is a string, and its type can not change  这里是类似于指定了类型
    b = 123; //this will not compile
    // Eg:2
    var a; //this is actually a dynamic type  这里类似于
    a = 2; //assigned an int to it
    a = 'hello!'; //assigned a string to it
    print(a); //prints out 'hello'
    ```

- 三个引号 测试 ‘’‘11 （回车） 333’‘’可以打印字符串内对应的格式
- double既是整型又是浮点型
- 和js不一样 dart不会进行类型转换。

    ```dart
    var a = 123; var b = ‘123’; a == b
    ```

- List集合类型

    ```dart
    // 两种命名方式var  
    list = [123];
    var list = new List();
    list.add(123);
    //定义list内部的类型
    new List<String>()
    ```

- Maps字典类型，两种命名方式 同List

- 判断类型：is 关键词

## 运算符

### 算数运算符

- a%b 取余
- a~/b 取整

### 关系运算符

- != ==
- a>=b a<=b

### 逻辑运算符

### 赋值运算符

- ??=
- 复合赋值运算符 +=  -=  *=  /=  %=  ~/=

    ```dart
    var a = 10;
    var b = a++;
    print('$a $b'); // 11 10
    // 不赋值的自增自减没有这个本领
    ```

### 条件运算符

- ?? 如果??前面为空 取值则为??后面
- break 只能跳出当前所在的这一层循环 ； 可使用场景switch for while中
- continue 跳过当前循环体 程序继续进行 ；不建议使用场景 while 容易造成死循环

## 类型转换

- String -> number  --------int.parse
- number -> String  --------toString
- String -> double  --------double.parse
- 其他类型 -> Boolean --------xxx.isEmpty  or xxx == null

### 循环

- while
- do {} while(条件)

## dart集合类型

### List

- 常见属性： isNotEmpty isEmpty length reverse(翻转)
- 常见方法：
  - add
  - addAll拼接数组，增加多个，传入数组
  - insert(index, 插入的内容）插入
  - insertAll 插入多个
  - remove 删除
  - removeAt (传入对应索引值) 删除指定位置
  - fillRange(start, end, 可选修改之后的数据) 修改
  - indexOf查找，查找不到返回-1
  - join 数组转字符串
  - split 字符串转数组

### Set

- 没有顺序且不能重复的集合，所以不能通过索引值获取值。主要功能 去重。
- 常见方法
  - add
  - addAll
  - toList 将set转为List

    ```dart
    // 去重
    var a = [1, 2, 2, 3];
    var b = new Set();
    b.addAll(a);
    b.toList();
    ```

### Map

- 常用属性：
  - keys 延伸 keys.toList()
  - values 延伸 values.toList()
  - addAll({a: 1}) 增加属性 ，注意没有add
  - remove(key) 删除
  - containsKey(key) 有没有属性为key的键值对

### 几个遍历的方法

- for 适用于[map,list]
- for(item in list) 适用于[map,list]
- forEach((value) => print('value');) 适用于[map,list] .list中只能传入value，map中可传入key,value
- map
- where(value => 条件) 查找
- any 有无满足条件的，返回Boolean
- every 是否每一个都满足条件，返回Boolean

## dart方法

### 内置方法

### 自定义方法

- **void** 表示没有任何返回值 | eg: void main(){};
- **行参，实参** | eg: void main(形参){}; main(实参){};
- **可选参数** | eg: void main(int age, [String sex]) {};
    >比 js 多一个 可选参数的概念
    >>用 {param1, param2, …} 来定义方法的可选命名参数
    >>位于 [] 中间的参数为可选位置参数
- **带默认值参数** | eg: void main(int age, [String sex = '男', String hobby]){};
- **命名参数** | eg: void main(int age, {String sex, String hobby = 'play'}){}; main(11, sex: '男',hobby: 'study'){}; 注意这里传值的写法,以及这里也可以传带默认值的参数
- **行参里传入方法**
- **匿名方法**

```dart
var log = (){};
log();
```

- **自执行方法**

```dart
((int n){print(n);})(12);
```

- **方法的递归**

```dart
/**
* 利用递归求1到100的和
*/
fn(int n) {
    if(n == 0) return;
    int m = 0;
    m += n;
    fn(n-1);
}
fn(100);
```

### 闭包

- 闭包：函数嵌套函数，内部函数调用外部函数的变量或参数，变量和参数不会被系统回收
- 常驻内存 && 不污染全局。引申：全局变量（常驻内存 污染环境） + 局部变量（被垃圾机制回收 不污染环境）
- 写法：函数嵌套函数，并且return返回内部的函数，就形成了闭包。

    ```dart
    fn() {
        var a = 123; // 常驻内存且不污染环境
        return(){
            a++;
            print(a);
        }
    }
    var b = fn();
    b(); // 124
    b(); // 125
    b(); // 126
    ```

## dart是一种类和单继承的语言

- 类的首字母要大写
- 封装、继承、多态
- 默认属性、类调用内部属性、实例化、构造函数、简写构造函数

```dart
class Person{
    String name = '张三';
    int age = 1;
    void getInfo() { // 这个函数是需要实例去调用的，也叫公用方法
        // 两种访问类重的关键词
        print('$name $age');
        print('${this.name} ${this.age}'); // 推荐这种
    }
    // 默认构造函数
    Person() {
        // 该函数作用有二：
        print('一：默认构造函数里的内容，实例化时自动触发');
        print('二：实例化时动态传入参数的值');
    }
}
// 实例化一个类
var p0 = new Person();
void main(){
    // 实例化可带类型 也可不带 Person p = new Person()
    var p = new Person();
    p.name;
    p.getInfo();
    Person p1 = new Person();
    p1.name;
    p1.getInfo();
}

// 实例化时动态传参例子
class Person1{
    String name;
    int age;
    // 默认构造函数 实例化时动态传入参数的值
    Person1(String name1, int age1) {
        this.name = name1;
        this.age = age1;
        print('默认构造函数里的内容，在实例化时候自动触发');
    }
}

// 构造函数简写
class Person2{
    String name;
    int age;
    Person2(this.name, this.age);
}
```

### 命名构造函数

- 构造函数可以写多个,默认构造函数只能一个，命名构造函数可以多个

```dart
class Person3{
    String name;
    int age;
    Person3(this.name, this.age);
    Person3.setInfo(String name, int age) {
        this.name = name;
        this.age = age;
        print('我是命名构造函数');
    }
    void getInfo() {
        print('${this.name} ${this.age}');
    }
}
var p3 = new Person3.setInfo('李四', 30);
p3.getInfo(); // '李四', 30
```

### Dart私有公有属性方法

> Dart没有public\private\protected这些访问修饰符，这一点和其他面向对西那个语言不一样

- 加下划线的默认为私有属性或方法，只能在当前类中访问
- 必须要单独抽出一个文件里才会发挥私有属性或方法
- 可用公用方法去间接访问私有属性

```dart
class Person() {
    String _name;
    Person(this._name);
    execName() {
        print('从这里拿到私有属性', this._name);
    }
    void _run() {
        print('私有方法');
    }
    execRun() {
        this._run(); // this为当前实例 ——p
    }
}
Person p = new Person('私有属性');
p.execName();
a.execRun(); // 简介访问私有方法
```

- dart类中的getter setter 修饰符的使用

```dart
class Rect() {
    int width;
    int height;
    Rect(this.width, this.height);
    area() {
        return this.width * this.height;
    }
    get area1{ // 没有（），类似于计算属性
        return this.width * this.height;
    }
    set setHeight(value) {
        return this.height = value;
    }
}
Rect r = new Rect(10, 2);
r.area(); // 20
r.area1; // 20
r.setHeight = 6;
r.area(); // 60
```

- 初始化实例变量

```dart
class Rect() {
    int width;
    int height;
    Rect():width = 10, height = 2 {
        print('${this.width}----${this.height}'); // 10 2
    };
    area(){
        return this.width * this.height;
    }
}
var r = new Rect(10, 2);
r.area(); // 20
```

### Dart中的静态成员

```bash {cmd=true}
ls .
```

```javascript {cmd="node"}
const date = Date.now()
console.log(date.toString())
```

- 使用static来实现类级别的变量和函数

    ```dart
    class Person() {
        static String name = '张三';
        static void show() {
            print(name); // 注意：不需要this，因为当前this是实例化之后的
        }
    }
    print(Person.name); // 张三
    Person.show(); // 张三
    ```

- 非静态方法可以访问静态成员的和非静态成员，静态方法只能访问静态成员

    ```dart
    class Person() {
        static String name = '张三';
        int age = 18;
        String name1 = '123';
        static void show() {
            print(name); // 注意：不需要this，因为当前this是实例化之后的
        }
        printInfo() {
            print(name); // 访问静态成员
            print(this.age); // 访问非静态成员
            show(); // 调用静态方法
        }
        static void printUserInfo() {
            print(name); // 访问静态属性
            this.show(); // 调用静态方法
            // 不能访问 name1, printInfo()
        }
    }
    main() {
        Person p = new Person();
        p.printInfo();
    }

    ```

### Dart中的对象操作符

- ? 条件运算符（了解）
- as 类型转换
- is 类型判断
- .. 级连操作/ 连缀 （掌握）

    ```dart
    class Person() {
        int age = 18;
        String name = '张三';
        printInfo() {
            print(this.name);
            print(this.age);
        }
    }
    main() {
        // ？条件运算符
        Person p1;
        p1?.printInfo(); // 此时没有实例化Person 所以p1没有printInfo这个方法。

        // as 类型转换
        p2 = new Person();
        (p2 as Person).printInfo(); // 如果不报错 p2.printInfo()

        // is 类型判断
        p3 = new Person();
        print(p3 is Person); // true

        // ..连缀操作
        p4 = new Person();
        p4.name = '里斯';
        p4.age = 20;
        p4.printInfo(); // 里斯 20
        p4..name= '王武'
          ..age='12'
          ..printInfo(); // 王武 12
    }

    ```

### Dart类的继承

- 子类使用extends来继承父类

    ```Dart
    class Person() {
        String name = '张三';
        int age = 1;
        printInfo() {
            print('${this.name}----${this.age}');
        }
    }
    class Web extends Person{

    }
    main() {
        Web w = new Web();
        w.name;
        w.printInfo(); // 张三 1
    }
    ```

- 子类会访问父类里可见的(Private仅对类本身可见)属性和方法，但构造函数不能被继承
    > super关键词的使用, 通过super给父类传参

- 子类可以复写父类的getter setter
  
    ```Dart
    class Person() {
        String name;
        int age;
        Person(this.name, this.age);
        Person.xxx(this.name, this.age);
        void printInfo() {
            print('${this.name}----${this.age}');
        }
        void work() {
            print('在工作');
        }
    }
    class Web extends Person{
        String sex; // 可以在子类中定义自己的属性
        Web(this.name, this.age, this.sex):super(name, age){this.sex = sex;} // 注意没有this。 :查阅前面的 "初始化实例变量"
        // 注意：可以给父类的命名构造函数传参
        // Web(this.name, this.age, this.sex):super.xxx(name, age) //给命名构造函数

        void run() {
            print(this.sex);
            print(this.name);
            super.work(); // 调用父类的方法。
            // 也可以用this来调用父类的属性方法 ？？？？ 这里有待验证
        }
        // 覆写父类方法
        @override // 可写可不写 建议写
        void printInfo() { // 覆写父类的方法
            print('${this.sex}----${this.name}----${this.age}');
        }
    }
    main() {
        Web w = new Web('张三',1,'女');
        print(w.name); // 张三
        print(w.sex); // 女
        // 注意：子类的方法，都是先找子类自己的方法，如果没有再去父类里找。
        w.run(); // 女 张三
        w.printInfo(); // 女----张三----1
    }
    ```

### Dart中的抽象类

- 关键词abstract

### Dart 一个类实现多个接口implements

> 不能实现多继承

### Dart mixins类似继承

### Dart 泛型

- 解决： 类、接口、方法的复用性，以及 不确定类型的校验

```dart
// 泛型方法
// 泛型类
// 泛型接口
```

### Dart 库

- 自定义库
- 内置库
- 第三方库
