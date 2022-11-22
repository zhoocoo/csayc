---
title: 浅谈async和await
categories:
 - 前端
tags:
 - js基础
---

## 前言

这篇文章主要是梳理一下自己对阮一峰大神写的关于`async/await`文章，有写得不对的地方以及理解得不对的地方，各位大佬请指错！

## 对比

简单对比`传统异步`，`promise异步`，`async异步`

下文都会以`setTimeout`来进行异步展示，方便理解。

传统的回调

``` javascript{3}
setTimeout(callback,1000);
function callback(){
    console.log("拿到结果了！");
}
```

`setTimeout`函数传入了两个参数(`1000`/`callback`)，`setTimeout`被调用的时候，主线程不会等待1秒，而是先执行别的任务。`callback`这个函数就是一个回调函数，即当1秒后，主线程会重新调用`callback`（这里也不再啰嗦去说`event Loop方面的知识了`）；

那么，当我们异步函数需要嵌套的时候呢。比如这种情况：

``` js{4}
setTimeout(function(){
    console.log("第一个异步回调了！")
    setTimeout(function(){
        console.log("第二个异步回调了！")
        setTimeout(function(){
            console.log("第三个异步回调了！")
            setTimeout(function(){
                console.log("第四个异步回调了！")
                setTimeout(function(){
                    console.log("第五个异步回调了！")
                },1000);
            },1000);
        },1000);
    },1000);
},1000);
```

OK，想死不？

我们用promise来处理

``` js{4}
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}

timeout(2000)
  .then(value => {
    console.log("第一层" + value);
    return timeout(2000);
  })
  .then(value => {
    console.log("第二层" + value);
    return timeout(2000);
  })
  .then(value => {
    console.log("第三层" + value);
    return timeout(2000);
  })
  .then(value => {
    console.log("第四层" + value);
    return timeout(2000);
  })
  .then(value => {
    console.log("第五层" + value);
    return timeout(2000);
  })
  .catch(err => {
    console.log(err);
  });
```

OK，好看点了！

但是还是不方便！

我们用async/await来处理：

``` js{4}
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}
async function asyncTimeSys(){
    await timeout(1000);
    console.log("第一层异步结束！")
    await timeout(1000);
    console.log("第二层异步结束！")
    await timeout(1000);
    console.log("第三层异步结束！")
    await timeout(1000);
    console.log("第四层异步结束！")
    await timeout(1000);
    console.log("第五层异步结束！")
    return "all finish";
}
asyncTimeSys().then((value)=>{
    console.log(value);
});
```

OK,舒服了！

在这个`asyncTimeSys`函数里面，所有的异步操作，写的跟同步函数没有什么两样！

## async的原型

`async`函数到底是什么？其实他就是Genarator函数（生成器函数）的语法糖而已！

> - 内置执行器。
> Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样。完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
> - 更好的语义。
> async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
> - 更广的适用性。
> co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
> - 返回值是 Promise。
> async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
> 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

其实，async函数就是一个由Generator封装的异步环境，其内部是通过交换函数执行权，以及thunk函数来实现的！

### 用Generator函数封装异步请求

OK，我们简单的封装一个：

``` js{4}
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}

function *times(){
    let result =yield timeout(1000);
    return "second next"
}

let gen = times();    //拿到生成器函数,gen可以理解为指针
let firstYield = gen.next(); //firstYield此时为gen指针指向的第一个yield右边的表达式，此时timeout(1000)被执行
console.log(firstYield);    //   firstYield = {value:Pomise,done:false};

//接下来就是将firstYield中的value里的promise拿出来，作为正常的Promise调用，如下：
firstYield.value.then(()=>{
    //当timeout异步结束之后，执行以下代码，再将gen指针执行下一个yield，由于以下没有yield了，所以gen.next()的value为return里的东西
    console.log("timeout finish");
    console.log(gen.next());    //{value: "second next", done: true}
}).catch((err)=>{

});
```

这样封装有什么用呢，yield返回回来的东西，还是得像promise那样调用。

我们先来看看同步的代码，先让它长得像async和await那样子：

``` js{4}
function* times() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
  return "second next";
}

let gen = times();

let result = gen.next();

while (!result.done) {
    result = gen.next();
}
```

OK，非常像了，但是，这是同步的。异步请求必须得等到第一个yield执行完成之后，才能去执行第二个yield。我们如果改成异步，肯定会造成无限循环。

那么，times生成器里面如果都是异步的话，我们应该怎么调用呢？

``` js{4}
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}

function *times(){
    yield timeout(2000);
    yield timeout(2000);
    yield timeout(2000);
    return "finish all!";
}

let gen = times();

let gen1 = gen.next();
gen1.value.then(function(data){
    console.log(data+" one");

    let gen2 = gen.next();
    gen2.value.then(function(data){
        console.log(data+" two");

        let gen3 = gen.next();
        gen3.value.then(function(data){
            console.log(data+" three");



        })

    })

});

```

仔细观察可以发现，其实每一个value的`.then()`方法都会传入一个相同的回调函数，这意味着我们可以使用递归来流程化管理整个异步流程；

改造一下这个上边的代码；

``` js{4}
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}

function* times() {
  yield timeout(2000);
  yield timeout(2000);
  yield timeout(2000);
  return "finish all!";
}


function run(fn){
    let gen = fn();

    function next(){
        console.log("finish");
        let result = gen.next();
        if(result.done) return;
        result.value.then(next);
    }
    next();
}

run(times);
```

OK，现在我们可以使用`run`函数，使得生成器函数`times`里的异步请求，一步接着一步往下执行。

那么，这个`run`函数里边的next到底是什么呢，它其实是一个`thunk函数`；

### thunk函数

Thunk函数的诞生是源于一个编译器设计的问题：求值策略，即函数的参数到底应该何时求值。

看下边的代码，请思考什么时候进行求值：

``` js{4}
var x = 1;
function f(m) {
    return m * 2;
}
f(x + 5);
```

试问：`x+5`这个表达式应该什么时候求值

- 传值调用(call by value)，即在进入函数体之间，先计算`x+5`的值，再将这个值（`6`）传入函数`f`，例如c语言，这种做法的好处是实现比较简单，但是有可能会造成性能损失。
- 传名调用(call by name)，即直接将表达式(`x+5`)传入函数体，只在用到它的时候求值。

OK，`thunk`函数究竟是什么：

> 编译器的传名调用实现，往往就是将参数放到一个临时函数之中，再将这个临时函数转入函数体，这个临时函数就叫做Thunk函数。

将上边的代码进行改造：

``` js{4}
var thunk = function () {
    return x + 5;
};

function f(thunk) {
    return thunk() * 2;
}
```

js中的传名调用是什么呢，与真正的`thunk`有什么区别呢?

>JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

网上对于`thunk`的演示都是使用的`fs`模块的`readFile`方法来进行演示

``` js{4}
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

其实，任何函数，只要参数有回调函数，就能写成`Thunk`函数的形式。下面是一个简单的`Thunk`函数转换器。

让我们用`setTimeout`来进行一次演示：

``` js{4}
//正常版本的setTimeout;
setTimeout(function(data){
    console.log(data);
},1000,"finish");

//thunk版本的setTimeout
let thunk = function(time){
    return function(callback){
        return setTimeout(callback,time,"finish");
    }
}
let setTimeoutChunk = thunk(1000);
setTimeoutChunk(function(data){
    console.log(data);
});
```

现在回头看一看`用Generator函数封装异步请求`这一节中最后一个实例中，我们封装的`timeout`函数，他其实就是一个`thunk`函数，我在那一节中没有给大家说明这一条：

- yield命令后面的必须是 Thunk 函数。

为什么`Generator`里面必须使用`thunk`函数呢，因为我们需要确保传入的值只有一个，利用其回调函数，来进行递归自动控制`Generator`函数的流程，接收和交还程序的执行权;
