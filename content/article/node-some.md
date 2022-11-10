# 杂记1

研究了下`vue-cli`配置

- `webpack-merge`:使用webpack配置合并插件
- `html-webpack-plugin`：这个插件自动生成HTML，并注入到.html文件中
- `new webpack.HotModuleReplacementPlugin()`：hotModule插件让页面变动时，只重绘对应的模块，不会重绘整个HTML文件
- `new webpack.NoEmitOnErrorsPlugin()`：在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
- `new FriendlyErrorsPlugin()`:`friendly-errors-webpack-plugin`用于更友好地输出webpack的警告、错误等信息
- `extract-text-webpack-plugin`:`extract-text-webpack-plugin`该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
- `ora`:在终端显示的旋转器插件
- `rimraf`：用于删除文件夹
- `chalk`：终端文字颜色插件

1. build主要的工作是：检测node和npm版本，删除dist包，webpack构建打包，在终端输出构建信息并结束，如果报错，则输出报错信息。
2. `build.js`用到了`webpack.prod.conf.js`,他与`webpack.base.conf.js`, `merge`之后，作为`webpack`配置文件
3. `webpack.prod.conf.js`做的主要工作：
    - 提取webpack生成的bundle中的文本，到特定的文件，使得css，js文件与webpack输出的bundle分离。

    - 合并基本的webpack配置

    - 配置webpack的输出，包括输出路径，文件名格式。

    - 配置webpack插件，包括丑化代码。

    - gzip下引入compression插件进行压缩。

执行npm run dev或者npm run start，实际是在node环境执行build/dev-server.js, dev-server.js会去拿到config中的端口等配置，通过express起一个服务，通过插件自动打开浏览器，加载webpack编译后放在内存的bundle。

执行npm run build，实际上执行了build/build.js,通过webpack的一系列配置及插件，将文件打包合并丑化，并创建dist目录，放置编译打包后的文件，这将是未来用在生产环境的包。

[参考链接1](https://www.cnblogs.com/tjyoung/p/7652930.html)
[参考链接2](https://blog.csdn.net/hongchh/article/details/55113751)

# 杂记2

 express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。

## webpack--devtool中的7种模式

模式 | 解释
---|---
eval | 每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.
source-map | 生成一个SourceMap文件.
hidden-source-map|和 source-map 一样，但不会在 bundle 末尾追加注释.
inline-source-map|生成一个 DataUrl 形式的 SourceMap 文件.
eval-source-map|每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap.
cheap-source-map|生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的 sourcemap）
cheap-module-source-map|生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。

- 注1：
  - webpack 不仅支持这 7 种，而且它们还是可以任意组合上面的eval、inline、hidden关键字，就如文档所说，你可以设置 souremap 选项为 cheap-module-inline-source-map。
- 注2：
  - 如果你的modules里面已经包含了SourceMaps，你需要用source-map-loader 来和合并生成一个新的 SourceMaps。

### 7种模式的结果

#### eval

``` js{4}
webpackJsonp([1],[  
function(module,exports,__webpack_require__){
eval(
      ...
//# sourceURL=webpack:///./src/js/index.js?'
    )
  },  
function(module,exports,__webpack_require__){
eval(
      ...
//# sourceURL=webpack:///./src/static/css/app.less?./~/.npminstall/css-loader/0.23.1/css-loader!./~/.npminstall/postcss-loader/1.1.1/postcss-loader!./~/.npminstall/less-loader/2.2.3/less-loader'
    )
  },  
function(module,exports,__webpack_require__){
 eval(
      ...
 //# sourceURL=webpack:///./src/tmpl/appTemplate.tpl?"
    )
  },
...])
```

eval 模式会把每个 module 封装到 eval 里包裹起来执行，并且会在末尾追加注释。

Each module is executed with eval and //@ sourceURL.

#### source-map

``` js{4}
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])//# sourceMappingURL=index.js.map
```

与此同时，你会发现你的 output 目录下多了一个 index.js.map 文件。

index.js.map文件：

``` js{4}
{  
"version":3,  
"sources":[
    "webpack:///js/index.js","webpack:///./src/js/index.js",
    "webpack:///./~/.npminstall/css-loader/0.23.1/css-loader/lib/css-base.js",
    ...
],  
"names":["webpackJsonp","module","exports"...],
"mappings":"AAAAA,cAAc,IAER,SAASC...",  
"file":"js/index.js",  
"sourcesContent":[...],  
"sourceRoot":""
}
```

#### hidden-source-map

``` js{4}
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])

```

与 source-map 相比少了末尾注释，

但 output 目录下的 index.js.map 没有少

#### inline-source-map

``` js{4}
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9...
```

可以看到末尾的注释 sourceMap 作为 DataURL 的形式被内嵌进了 bundle中，由于 sourceMap 的所有信息都被加到了bundle中，整个 bundle 文件变得硕大无比。

#### eval-source-map

``` js{4}
webpackJsonp([1],[  
function(module,exports,__webpack_require__){
eval(
      ...
//# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },  function(module,exports,__webpack_require__){
eval(
      ...
//# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },  
  function(module,exports,__webpack_require__){
eval(
      ...
//# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },
  ...
]);
```

和 eval 类似，但是把注释里的 sourceMap 都转为了 DataURL。

#### cheap-source-map

和 source-map 生成结果差不多。output 目录下的index.js内容一样。

但是 cheap-source-map 生成的 index.js.map 的内容却比 source-map 生成的 index.js.map 要少很多代码，我们对比一下上文 source-map 生成的 index.js.map 的结果，发现 source 属性里面少了列信息，只剩一个"webpack:///js/index.js"。

``` js{4}
// index.js.map
{  
"version":3,  "file":"js/index.js",  
"sources":["webpack:///js/index.js"],  
"sourcesContent":[...],  
"mappings":"AAAA",  
"sourceRoot":""
}
```

#### cheap-module-source-map

``` js{4}
// index.js.map
{  
"version":3,  "file":"js/index.js",  
"sources":["webpack:///js/index.js"],  
"mappings":"AAAA",  "sourceRoot":""
}
```

在 cheap-module-source-map 下 sourceMap 的内容更少了，sourceMap的列信息减少了，可以看到 sourcesContent 也没有了。

### 模式选择

- 开发环境推荐：cheap-module-eval-source-map
- 生产环境推荐：cheap-module-source-map

原因：

1. 使用 cheap 模式可以大幅提高 souremap 生成的效率。大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息。

2. 使用 eval 方式可大幅提高持续构建效率。官方文档提供的速度对比表格可以看到 eval 模式的编译速度很快。

3. 使用 module 可支持 babel 这种预编译工具（在 webpack 里做为 loader 使用）。

4. 使用 eval-source-map 模式可以减少网络请求。这种模式开启 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率。而生产环境中则不宜用 eval，这样会让文件变得极大。

# 杂记3

vue-cli官方为我们提供了5种模板

- `webpack`：一个最常见的`webpack`模板，官方推荐的。
- `webpack-simple`：一个简单`webpack+vue-loader`的模板，不包含其他功能。

- `browserify`：一个全面的`Browserify+vueify` 的模板，功能包括热加载，`linting`,单元检测。

- `browserify-simple`：一个简单`Browserify+vueify`的模板，不包含其他功能。

- `simple`：一个最简单的单页应用模板。

# 杂记4

## NODE_ENV

> 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
> 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

## process进程

process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。

### 属性

process对象提供一系列属性，用于返回系统信息。

- process.pid：当前进程的进程号。
- process.version：Node的版本，比如v0.10.18。
- process.platform：当前系统平台，比如Linux。
- process.title：默认值为“node”，可以自定义该值。
- process.argv：当前进程的命令行参数数组。
- process.env：指向当前shell的环境变量，比如process.env.HOME。
- process.execPath：运行当前进程的可执行文件的绝对路径。
- process.stdout：指向标准输出。
- process.stdin：指向标准输入。
- process.stderr：指向标准错误。

#### 1. `stdout`

process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log。

```js{4}

exports.log = function() {
    process.stdout.write(format.apply(this, arguments) + '\n');
};

```

#### 2. `argv`

process.argv返回命令行脚本的各个参数组成的数组。

先新建一个脚本文件argv.js。

``` js{4}
// argv.js

console.log("argv: ",process.argv);
console.log("argc: ",process.argc);
```

在命令行下调用这个脚本，会得到以下结果。

``` js{4}
node argv.js a b c
# [ 'node', '/path/to/argv.js', 'a', 'b', 'c' ]
```

## 方法

`process`对象提供以下方法：

- `process.exit()`：退出当前进程。
- `process.cwd()`：返回运行当前脚本的工作目录的路径。_
- `process.chdir()`：改变工作目录。
- `process.nextTick()`：将一个回调函数放在下次事件循环的顶部。

### process.chdir()改变工作目录的例子

``` js{4}
process.cwd()
# '/home/aaa'

process.chdir('/home/bbb')

process.cwd()
# '/home/bbb'
```

### process.nextTick()的例子，指定下次事件循环首先运行的任务

```js{4}

process.nextTick(function () {
    console.log('Next event loop!');
});
```

上面代码可以用setTimeout改写，但是nextTick的效果更高、描述更准确。

``` js{4}

setTimeout(function () {
   console.log('Next event loop!');
}, 0)
```

## 事件

### `exit`事件

当前进程退出时，会触发exit事件，可以对该事件指定回调函数。这一个用来定时检查模块的状态的好钩子(hook)(例如单元测试),当主事件循环在执行完’exit’的回调函数后将不再执行,所以在exit事件中定义的定时器可能不会被加入事件列表.

```js{4}

process.on('exit', function () {
  fs.writeFileSync('/tmp/myfile', 'This MUST be saved on exit.');
});
```

### `uncaughtException`事件

当前进程抛出一个没有被捕捉的意外时，会触发uncaughtException事件。

``` js{4}

 process.on('uncaughtException', function (err) {
   console.error('An uncaught error occurred!');
   console.error(err.stack);
 });
```
