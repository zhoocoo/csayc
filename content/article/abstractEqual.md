---
title: js中抽象相等==
categories:
 - 前端
tags:
 - js基础
---

## Javascript中抽象相等比较算法

``` js{4}
undefined==null
//true
[]==[]
//false
[]==![]
//true
{}==!{}
//false
![]=={}
//false
[]==!{}
//true
[1,2]==![1]
//false
```

## 大致介绍一下JS的数据类型

ES5的数据类型分为6种：`Undefined` `Null` `String` `Number` `Boolean` `Object`,如果再加上ES6`Symbol`数据类型，一共7种；

`null`与`undefined`的区别：

1. `null`描述一个空值（空的对象引用即空指针），`null`被当做一个对象，`typeOf null`输出为`'Object'`（算是一个bug吧），`Number(null)`输出为`0`。`undefined`是预定义的全局变量，表示“缺少值”，`typeOf undefined`输出为`'undefined'`，`Number(undefined)`输出为`NaN`；
2. `null`是一个关键字，而`undefined`并不是一个关键字；

## 原始值概念

js的数据类型其实可以分为两种：`原始类型`和`引用类型`。`原始类型`又称`简单类型`和`基本类型`，包括`Undefined`、`Null`、`Boolean`、`Number`和`String`五种。`引用类型`又称`复杂类型`,即`Object`；`原始类型`和`引用类型`分别称为`原始值`和`复杂值`；

简单的说：`原始值`是固定而简单的值,是存放在栈(stack)中的简单数据段,也就是说,它们的值直接存储在变量访问的位置，`原始类型`的值被称为`原始值`

`原始类型(primitive type)`有以下五种类型:`Undefined`,`Null`,`Boolean`,`Number`,`String`

`typeOf`运算符:

条件 | 返回值
---|---
如果变量是`undefined`类型 | `undefined`
如果变量是`Boolean`类型 | `boolean`
如果变量是`Number`类型 | `number`
如果变量是`String`类型 | `string`
如果变量是`Null`类型 | `object`
如果变量是引用类型 | `object`

## 抽象相等算法

``` js
用Type(z)代表z的数据类型，比较运算 x==y，其中x和y是值，产生true或false。
    1.Type(x)与Type(y)相同：
        a.如果Type(x)为Undefined或Null,则返回true

        b.如果Type(x)为Number,则：
            i.若x为NaN，返回false
            ii.若y为NaN，返回false
            iii.若x与y数值相等，返回true
            iiii.若x为+0，y为-0，返回true
            iv.若x为-0，y为+0，返回true
            v.返回false

        c.如果Type(x)为String,则x和y对应位置的字符完全一样才返回true,否则返回false,

        d.如果Type(x)为Boolean,则相同值返回true,否则false

        f.当x和y引用同一对象时，返回true，否则，返回false

    2.x为undefined,y为null,返回true，反之亦然

    3. Type(x)为String,Type(y)为Number,则返回比较ToNumber(x) == y，反之亦然

    4.Type(x)为Boolean,则返回比较ToNumber(x)==y的结果，反之亦然

    5.Type(x)为String或Number,Type(y)为Object,则返回比较ToPrimitive(y) == x

    6.返回false
```

再来看看`ToBoolean`，`ToNumber`，`ToPrimitive`三个运算符的定义：

### ToBoolean

输入类型 | 结果
---|---
`Undefined` | `false`
`Null` | `false`
`Boolean`|不转换
`Number`|如果参数是`-0`，`+0`或`NaN`，结果为`false`，否则为`true`
`String`|如果参数是空字符串（长度为零），结果为`false`，否则为`true`
`Object`|`true`

### ToNumber

输入类型 | 结果
---|---
`Undefined` | `NaN`
`Null` | `+0`
`Boolean`|参数为`true`，结果为`1`，参数为`false`，结果为`+0`
`Number`|不转换
`String`|参见下文的文法和注释
`Object`|应用下步骤：1、设原始值为ToPrimitive(输入参数，暗示，数值类型)。2、返回ToNumber(原始值)

### ToPrimitive

ToPrimitive运算符接收一个值，和一个可选的期望类型作参数。ToPrimitive运算符把其值参数转换为非类型对象。如果对象有能力被转换为不止一种原语类型，可以使用可选的 期望类型 来暗示那个类型。

输入类型 | 结果
---|---
`Undefined` | 不转换
`Null` | 不转换
`Boolean`|不转换
`Number`|不转换
`String`|不转换
`Object`|返回该对象的默认值。对象的默认值由期望类型传入作为`hint`参数调用对象内部方法[DefaultValue]得到

** `ToPrimitive`这个方法，参照火狐MDN上的文档介绍，大致意思如下：

> ToPrimitive(obj,preferredType)
>
> JS引擎内部转换为原始值ToPrimitive(obj,preferredType)函数接受两个参数，第一个obj为被转换的对象，第二个
> preferredType为希望转换成的类型（默认为空，接受的值为Number或String）
>
> 在执行ToPrimitive(obj,preferredType)时如果第二个参数为空并且obj为Date的实例时，此时preferredType会
> 被设置为String，其他情况下preferredType都会被设置为Number如果preferredType为Number，ToPrimitive执
> 行过程如
> 下：
>
> 1. 如果obj为原始值，直接返回；
> 2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
> 3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
> 4. 否则抛异常。
>
> 如果preferredType为String，将上面的第2步和第3步调换，即：
>
> 1. 如果obj为原始值，直接返回；
> 2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
> 3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
> 4. 否则抛异常

Ok,到现在，我们需要了解,`toString`方法和`valueOf`方法；

`toString`用来返回对象的字符串表示。

``` js{4}
    let obj = {name:"Tom"}; //"[object Object]"
    let obj = {}; //"[object Object]"
    let arr = [1,2];    //"1,2"
    let arr = [];    //""
    let str = "1";      //"1"
    let num = 1;        //"1"
    let boo = true;     //"true"
    let date = new Date();      //"date Sat Mar 24 2018 00:23:12 GMT+0800 (CST)"
    let nul = null;     //报错
    let und;            //报错
```

`valueOf`方法返回对象的原始值，可能是`字符串`、`数值`或`bool`值等，看具体的对象。

``` js{4}
    let obj = {name:"Tom"}; //{name:"Tom"}
    let arr = [1,2];    //[1,2]
    let str = "1";      //"1"
    let num = 1;        //1
    let boo = true;     //true
    let date = new Date();      //1521822331609
    let nul = null;     //报错
    let und;            //报错
```

简单理解：原始值指的是['Null','Undefined','String','Boolean','Number']五种基本数据类型之一

## 总结一下`==`运算的规则

``` js

1. undefined == null，结果是true。且它俩与所有其他值比较的结果都是false。

2. String == Boolean，需要两个操作数同时转为Number。

3. String/Boolean == Number，需要String/Boolean转为Number。

4. Object == Primitive(原始值)，需要Object转为Primitive(具体通过valueOf和toString方法)。
```

## 栗子

``` js{4}
undefined==null
//true
[]==[]
//false
[]==![]
//true
{}==!{}
//false
![]=={}
//false
[]==!{}
//true
[1,2]==![1]
//false
```

### `undefined==null`

结果为true，不用解释了，记住就行了

### `[]==[]`

1. 先看这两个的类型，`typeOf([])`得到的是`'object'`
2. 抽象相等算法`1-f`,引用同一类型的才算相等
3. 返回`false`

### `[]==![]`

1. `!`取反运算符的优先级高于`==`,因此先算出`![]`这个得值，再去使用抽象相等算法进行比较
2. 取反运算符会先调用方法`ToBoolean`，再去取反
3. `ToBoolean([])`返回的是`true`，因此`![]`应该为`false`
4. `[]==![]`转换为了`[]==false`
5. 根据抽象相等算法`4`条，则我们可以比较`[]==ToNumber[false]`的值，则可以得到`[]==0`
6. 再根据抽象相等算法`5`条，比较`ToPrimitive([])==0`
7. 由于`[]`不是`Date`类型，所以先得到`[].valueOf()`的值，为`[]`
8. 再得到`[].toString()`的值，为`""`的字符串
9. 以上7,8部可合并为一步即比较`[].valueOf().toString()`,得到`""`字符串，此时`[]`转换为了原始值类型（即五种基本类型中的一种）了。
10. 根据抽象相等算法`3`，则可以比较`ToNumber("")==0`，到这里`[]==![]`转化为了`0==0`
11. 返回`true`

### `{}==![]`

1. 表达式右侧，重复上一次的`1-5`步，可以得到`{}==0`
2. 根据抽象相等算法`5`条，`ToPrimitive({})==0`，得到`{}.valueOf().toString()`得到一个字符串`"[object Object]"`，是原始类型
3. 根据抽象相等算法`3`，最后比较`ToNumber("[object Object]")==0`，转变为`1==0`
4. 返回`false`

### 其余的栗子自己算一算吧

## 结语

自己重新写了写一遍整理了一下思路，如果什么地方没有讲清楚，请指出；

参考：

- [从 []==![] 为 true 来剖析 JavaScript 各种蛋疼的类型转换](https://github.com/jawil/blog/issues/1/)
- [Javascript中抽象相等比较算法](https://blog.csdn.net/m0_37288255/article/details/77151903)
- 等...文章
