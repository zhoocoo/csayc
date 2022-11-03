---
title: 谈一谈js中的遍历
categories:
 - 前端
tags:
 - js基础
---

### 实例属性和原型属性

- JavaScript中对象的属性分为两种： ***数据属性*** 和 ***访问器属性*** 。
- 根据具体的上下文环境的不同，又可以将属性分为： ***原型属性*** 和 ***实例属性*** 。
- ***原型属性*** 是定义在对象的原型`prototype` 中的属性，
- ***实例属性*** 一方面来自构造的函数中，然后就是构造函数实例化后添加的新属性。

### js的枚举

JavaScript中遍历一个对象的属性并不太简单，主要有两个原因：

- JavaScript中的对象通常都处在某个原型链中，它会从一个或多个的上层原型上继承一些属性
- JavaScript中的属性不光有值，它还有一些除了值以外的其他特性，其中一个影响属性遍历的特性就是`Enumerable`(一个属性描述符) ，如果该值为 `true` ，则这个属性是可枚举的，否则反之

#### 属性描述符

- `属性描述符` 主要有两种形式：`数据描述符`和`存取描述符`。
- 使用`Object.getOwnPropertyDescriptor` 与 `Object.getOwnPropertyDescriptors`两个方法获取对象的`属性描述符`。

``` js
var obj = {
  name: '10',
  _age: 25,
  get age(){
    return this._age;
  },
  set age(age){
    if(age<1){
      throw new Error('Age must be more than 0');
    }else{
      this._age = age;
    }
  }
};

var des = Object.getOwnPropertyDescriptors(obj);
console.log(des);
/**
 * des: {
 *  name: {
 *    configurable: true,
 *    enumerable: true,
 *    value: "10",
 *    writable: true,
 *    __proto__: Object
 *  },
 *  _age: {
 *    configurable: true,
 *    enumerable: true,
 *    value: 25,
 *    writable: true,
 *    __proto__: Object
 *  },
 *  age: {
 *    configurable: true,
 *    enumerable: true,
 *    get: f age(),
 *    set: f age(age),
 *    __proto__: Object
 *  },
 *  __proto__: Object
 * }
*/
```

#### value

该属性的值(仅针对数据属性描述符有效)

##### writable

当`writable`属性设置为`false`时，该属性被称为“不可写”。它不能被重新分配。

##### get

获取该属性的访问器函数（`getter`）。如果没有访问器， 该值为`undefined`。(仅针对包含访问器或设置器的属性描述有效)

##### set

获取该属性的设置器函数（`setter`）。 如果没有设置器， 该值为`undefined`。(仅针对包含访问器或设置器的属性描述有效)

##### configurable

`configurable`特性表示对象的属性是否可以被删除，以及除`writable`特性外的其他特性是否可以被修改。

##### enumerable

`enumerable`定义了对象的属性是否可以在 `for...in` 循环和 `Object.keys()` 中被枚举。

- name、_age拥有 `'configurable'`、`'enumerable'`、`'value'`、`'writable'`四个属性描述符，统称`数据描述符`
- age拥有`'configurable'`、`'enumerable'`、`'get'`、`'set'`四个属性描述符，统称`存取描述符`

 分类 | 'configurable' | 'enumerable' | 'value'| 'writable' | 'get' | 'set'
---|---|---|---|---|---|---
数据描述符 | yes | yes|yes|yes|no|no
存取描述符 | yes | yes|no|no|yes|yes

对象的属性描述符，可以通过`Object.defineProperty`和`Object.defineProperties`来修改(`configurable`为`true`的条件下)

### 常用的遍历方法

#### `for...in...`遍历

- 遍历自身及原型链上所有可枚举的属性
- 使用 for...in 循环遍历对象属性时返回的属性会因为各个 *浏览器不同* 导致对象属性遍历的顺序有可能不是当初构建时的顺序。

> Chrome Opera 的 JavaScript 解析引擎遵循的是新版 ECMA-262 第五版规范。因此，使用 for-in 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6 IE7 IE8 Firefox Safari 的 JavaScript 解析引擎遵循的是较老的 ECMA-262 第三版规范，属性遍历顺序由属性构建的顺序决定。
>for-in 语句无法保证遍历顺序，应尽量避免编写依赖对象属性顺序的代码。如果想顺序遍历一组数据，请使用数组并使用 for 语句遍历。

``` js
var Animal = function({name='none', age=3, weight=80}={}){
  this.name = name;
  this.age = age;
  this.weight = weight;
}

Animal.prototype = {
  color: 'red'
}

var dog = new Animal()

// 将weight属性设置为 不可枚举
Object.defineProperty(dog, 'weight', {
  enumerable: false
})

for(let i in dog){
  console.log(n);
}

//原型链上的color同样被遍历出来了，并且由于weight属性被设置成了enumerable:false，所以不可被遍历
//name
//age
//color
```

#### `for...of`遍历

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 `iterator` 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

`for...of`循环可以使用的范围包括数组、`Set` 和 `Map` 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串。

如果不太清楚`iterator`，请去看看阮一峰大神的这篇[文章](http://es6.ruanyifeng.com/#docs/iterator)，里面关于`for...of`以及`iterator`都讲的非常详细！

其实`for...of`和`for...in`都是迭代一些东西，它们之间的主要区别在于它们的迭代方式。

- `for...in`语句以原始插入顺序迭代对象的可枚举属性。
- `for...of` 语句遍历可迭代对象定义要迭代的数据。

请仔细看以下实例，理解其中的区别

``` js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); //  0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); //  3, 5, 7
}
```

``` js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';
```

在这段代码里面，由于继承和原型链，对象`iterable`继承属性`objCustom`和`arrCustom`。

``` js
for (let i in iterable) {
  console.log(i); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}
```

在这段代码里面，此循环仅以原始插入顺序记录`iterable` 对象的可枚举属性。它不记录数组元素`3, 5, 7` 或`hello`，因为这些不是枚举属性。但是它记录了数组索引以及`arrCustom`和`objCustom`（为何记录`arrCustom`和`objCustom`在本文`for...in`里面有讲过）。

``` js
for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0, 1, 2, "foo"
  }
}
```

`hasOwnProperty()`用来检查找到的枚举属性是不是对象自己的（即是不是继承的）

``` js
for (let i of iterable) {
  console.log(i); //  3, 5, 7
}
```

该循环迭代并记录iterable作为可迭代对象定义的迭代值，这些是数组元素 3, 5, 7，而不是任何对象的属性。

#### `Object.keys`遍历

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 `for-in` 循环还会枚举其原型链上的属性）。

#### `Object.getOwnPropertyNames()`遍历

`Object.getOwnPropertyNames()`方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组,此方法不会获取原型链上的属性。

``` js
var Animal = function({name='', age=1, weight=70}={}){
  this.name = name;
  this.age = age;
  this.weight = weight;
}

Animal.prototype = {
  type: 'Animal'
}

var dog = new Animal()

// 将height属性设置为 不可枚举
Object.defineProperty(dog, 'weight', {
  enumerable: false
})

var keys = Object.getOwnPropertyNames(dog);
console.log(keys)
// ['name', 'age', 'weight']
```

### 结语

这篇文章希望能让大家更加理解js中的遍历，写的不好多多见谅并指出！
