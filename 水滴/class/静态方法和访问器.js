const LESSONS = [
    { name: 'vue', price: 90},
    { name: 'react', price: 190},
    { name: 'flutter', price: 290},
]
class Lesson1 {
    constructor() {
        this.model = LESSONS;
    }
    static price(item) {
        return item.price;
    }
    maxPrice(){
        return this.model.sort((a, b) => b.price - a.price)[0]; 
    }
    static maxPrice(data) {
        return data.sort((a, b) => b.price - a.price)[0];
    }
    totalPrice() {
        return this.model.reduce((t, v) => {return t+v.price},0);
    }
}
// const max = new Lesson1().maxPrice();
// console.log(max);
// console.log(Lesson1.maxPrice(LESSONS));
// let max2 = Lesson1.maxPrice(LESSONS);
// console.log(Lesson1.price(max2));
// console.log(Lesson1.name(max2));
// console.log(new Lesson1().totalPrice());

// 另一种思路 把每一堂课都变成一个Lesson对象
class Lesson2 {
    constructor(data) {
        this.model = data;
        // this.setPrice = data.price;  // 这里的setPrice为什么不执行
    }
    price(data) {
        return data.model.price;
    }
    static price(data) {
        return data.model.price;
    }
    // 针对于某个对象操作的 不使用静态方法
    price2() {
        return this.model.price;
    }
    get price3() { // get访问器
        return this.model.price;
    }
    set price3(price) { // set访问器 验证重名问题
        price = price + 1;
        return price;
    }
    set price(price) {
        return (price++);
    }
    set setPrice(price) {
        return 999;
    }
    // ⚠️不是对某个单个的对象进行操作 可以使用静态方法
    static createBatch() {
        return LESSONS.map(v => new this(v)); // new Lesson2(v) 一样的
    }
    static maxPrice(data) {
        // return data.sort((a, b) => {return b.model.price - a.model.price})[0];
        return data.sort((a, b) => {return Lesson2.price(b) - Lesson2.price(a)})[0];
    }
    static totalPrice(data) {
        return data.reduce((t, v) => {return t+v.model.price}, 0);
    }
}
const l = Lesson2.createBatch();
// console.log(l);
// console.log(Lesson2.maxPrice(l));
const max = Lesson2.maxPrice(l);
console.log(max);
// console.log(new Lesson2().price(max));
// console.log(max.price2());
// console.log(max.price3);
// console.log(Lesson2.totalPrice(l));
console.log(max.price = max.price3 + 2);
console.log(max.price3 = max.price3 + 1); // 可重名
console.log(max.setPrice = max.price3); // 为什么结果不是return的999？

