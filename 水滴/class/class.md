# class

## protoType fun 上海  __proto__ fun 北京

## static 静态函数 __proto__

使用场景：对于输出-输出非常固定且也不需要和类里面其他的数据绑定的应用场景，没有必要使用实例化方法。
eg. Number.isNaN(),Array.isArray()
如果想在静态方法中拿到类中constructor的值 new this(...args)即可，静态方法中的new this 就是当前静态方法所属class