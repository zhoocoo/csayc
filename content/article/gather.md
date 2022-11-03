---
title: js中的交集并集差集
categories:
 - 前端
tags:
 - js基础
---

## 前言

总结了一下有关于数组的差集、交集、并集的方法；

## es6的方法实现

### 去重

```js{4}
/**
 * 简单的数组去重
 * @param {Array} a
 */
const uniquelize = function(a) {
  if (a.constructor !== Array) {
    throw TypeError("请传入数组类型");
  }
  return Array.from(new Set(a));
};
```

### 并集

```js{4}
/**
 * 简单数组的并集
 * @param {Array} a
 * @param {Array} b
 */
const getUnion = function(a,b){
    if(a.constructor === Array && b.constructor === Array){
        let set1 = new Set(a);
        let set2 = new Set(b);
        return Array.from(new Set([...set1,...set2]));
    }
    return null;
}
```

### 交集

```js{4}
/**
 * 简单数组的交集
 * @param {Array} a
 * @param {Array} b
 */
const getIntersect = function(a,b){
    if(a.constructor === Array && b.constructor === Array){
        let set1 = new Set(a);
        let set2 = new Set(b);
        return Array.from(new Set([...set1].filter( x => set2.has(x))));
    }
    return null;
}
```

### 差集

```js{4}
/**
 * 简单数组的差集
 * @param {Array} a
 * @param {Array} b
 */
const getDifference = function(a,b){
    if(a.constructor === Array && b.constructor === Array){
        let set1 = new Set(a);
        let set2 = new Set(b);
        return Array.from(new Set([...set1].filter(x => !set2.has(x))));
    }
    return null;
}
```

## es5的方法实现

### es5去重

```js{4}
/**
 * 简单的数组去重
 * @param {Array} a
 */
var uniquelize = function(a) {
  if (a.constructor !== Array) {
    throw TypeError("请传入数组类型");
  }
  var obj = {},
    arr = [];
  for (var i = 0, j = a.length; i < j; i++) {
    if (!obj[a[i]]) {
      obj[a[i]] = 1;
      arr.push(a[i]);
    }
  }
  return arr;
};
```

### es5交集

```js{4}
/**
 * 简单数组的交集
 */
var getIntersect = function(){
    var arr = new Array();
    var obj = new Object();
    var arguLen = arguments.length;
    for(var i = 0; i<arguLen;i++){
        if(arguments[i].constructor !== Array){
            throw TypeError("请都传入数组类型");
        }
        for(var j = 0,length = arguments[i].length;j<length;j++){
            var item = arguments[i][j];
            if(!obj[item]){
                obj[item] = 1;
            }else{
                obj[item]++;
                if(obj[item]===arguLen){
                    arr.push(item);
                }
            }
        }
    }
    return arr;
}
```

### es5并集

```js{4}
/**
 * 简单数组的并集
 */
var getUnion = function(){
    var arr = new Array();
    var obj = new Object();
    var arguLen = arguments.length;
    for(var i = 0; i<arguLen;i++){
        if(arguments[i].constructor !== Array){
            throw TypeError("请都传入数组类型");
        }
        for(var j = 0,length = arguments[i].length;j<length;j++){
            var item = arguments[i][j];
            if(!obj[item]){
                obj[item] = 1;
                arr.push(item);
            }else{
                //统计一下出现了多少次
                obj[item]++;
            }
        }
    }
    return arr;
}
```

### es5差集

```js{4}
/**
 * 简单数组的差集
 */
var getDifference = function(){
    var arr = new Array();
    var obj = new Object();
    var arguLen = arguments.length;
    for(var i = 0; i<arguLen;i++){
        if(arguments[i].constructor !== Array){
            throw TypeError("请都传入数组类型");
        }
        for(var j = 0,length = arguments[i].length;j<length;j++){
            var item = arguments[i][j];
            if(!obj[item]){
                obj[item] = 1;
                arr.push(item);
            }else{
                obj[item]++;
                var index = arr.indexOf(item);
                //存在就删除掉
                if(index !== -1){
                    arr.splice(index,1);
                }
            }
        }
    }
    return arr;
}
```
