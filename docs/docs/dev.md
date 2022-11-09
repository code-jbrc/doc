#  技巧记录

### ?? 与 ||
我们在取默认值的时候，经常会使用||去取，如下

```
let data = undefined
let text = data || 'default';
// => text = 'default'
```

|| 是根据前面的值转后是否是false来选择后续的值
所以这就会遇到一个问题，如果要取值false，或者‘’，0这种，那么就不太适用了
所以使用??
当前面遇到null或者undefined的时候才会选择后面的值

### 生成字母

```
  for (let i = 0; i < 26; i++) {
    list[i] = {};
    list[i].name = String.fromCharCode(65 + i);
  }
```
比较适合算法吧

### 想要在模板中使用动态的值

```
<div class="indexBar" :style="[{height:'calc(110vh - ' + CustomBar + 'px - 50px)'}]"></div>
```
### 想要在css中使用动态的值

js中定义了然后在css中直接v-bind引入 这是vue3.2新添加的操作

```
.className{
    height:v-bind('jsheight')
}
```

### 不使用for in和 for of

首先for in，会便利出原型链上面所有可枚举的属性，造成不必要的性能浪费，可以使用hasOwnProperty方法来过滤，直接敲for in的时候快捷出来也是这样的代码提示

```
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      
    }
  }
```

虽然但是看起来还是不够优雅，写得好多好恶心
不如直接

```
  Object.keys(object).forEach((key)=>{
    
  })
```

其次for of

```
  let arr = [1,2];
  // for (const item of arr) {
  //   if(item === 1)arr.push(4);
  //   console.log(item);
  // } 
  // 结果是 1 2 4
  arr.forEach((item)=>{
    if(item === 1)arr.push(4);
    console.log(item);
  })
  // 结果是 1 2
```

也就是说forof在便利的过程中会便利到新增的数据，这对于循环来说是一件不太好的事情

### 使用更好的方式判断包含关系

场景:我们经常使用||加computed去判断一个修改和增加的时候弹出对话框
比如:

```
let type = ref<string>('modify')
let canOpenDialog = computed<boolean>(()=>{
    return type.value === 'modify' || type.value === 'add'
})
```

类似于这样的场景，如果type的数量多了，我们还要一遍一遍的写|| 和 ===吗？
答案是不用的，只要稍微改变思路

```
let type = ref<string>('modify')
let canOpenDialog = computed<boolean>(() => {
  return ["add", "modify"].includes(type.value);
});
```

### 取消重复请求

场景：有一个按钮，咱们点击就会触发一次接口请求，但是不希望点击多次造成无关的请求浪费
此时有几种方案

1.  按钮防抖节流+禁用
2. 数据本地缓存
3. 直接封装axios取消请求

### 按钮防抖节流

对于按钮的优化防抖节流代表这个多次点击只执行一次或者在某个时间段内只执行一次，请求发送之后禁用按钮，请求回来的时候再恢复。
不过还是不能完全制止这个问题，因为如果响应的时间过长又到了下一轮节流的时间那么就又会请求一次

### 数据本地缓存

请求的数据可以做本地缓存，然后下次判断有数据就不会在请求，不过这样也是有问题的，首先如果确保这个数据是长久不会更改的，那么无所谓(但为什么不直接写成静态数据呢)，其次，每次刷新需要销毁掉一次数据，然后在去请求做缓存，这样的话，一套代码要写好多次，而且localStorage也有大小上限

### 直接封装axios取消请求

掘金上面有很多文章就不详细谈了，原理是利用cancelId取消
说一下问题，就是一刀式的进行所有的请求重复取消可能最后不一定是一件好事

### 策略模式优化if else

直接看这篇文章就好了https://juejin.cn/post/7091938459589279752
写ifelse之前 先想一想是对应什么情况

### Github代码上传自动转CRLF的问题

LF和CRLF区别

CRLF: "\r\n", windows系统环境下的换行方式

LF: "\n", Linux系统环境下的换行方式

github会自动将上传的代码转化为crlf，即便代码是lf的，所以要添加这条语句

```
git config --global core.autocrlf false
```
否则会引起crlf和lf的eslint报错

### 按需引入插件细节

首先unplugin-auto-import 和 unplugin-vue-template两个插件可以帮助我们去按需引入组件的一些内容
细节在于 vue.config.js的配置

```
/* eslint-disable */
const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  // 构建依赖babel全转换
  transpileDependencies: true,
  publicPath: "/",
  // 构建之后的目录名字
  outputDir: "dist",
  // 构建之后静态资源存放的目录名字
  assetsDir: "static",
  // 生产中禁用eslint报错
  // lintOnSave: process.env.NODE_ENV !== 'production',
  // 生产阶段的sourceMap 加快生产构建
  // productionSourceMap: false,
  //webpack 配置的项目名称
  devServer: {
    hot: true,
    port: 9999,
    host: "localhost",
    open: false,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@': resolve('src'),
    //   }
    // }, 
    plugins: [
      // vue(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar","NButton"],
          },
        ],
        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});

```

注意48行这段代码 设置true的时候重启项目会自动创建需要导入的内容json，然后eslint就会识别到，设置一次之后调为false即可
.eslintrc.js配置

```
      extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    './.eslintrc-auto-import.json',//重点
  ],
```


### 动态引入图片
图片在模板中引入常常会使用到条件插入，例如
```
<img :src=`@/static/xxxx-${picName}.jpg`>
```

但是这样的话 打完包之后就会失效
原因是webpack把他当成了静态资源去处理，所以导致了错误
解决方法有两种
1. 直接import图片
把需要用到的静态图片全部import进来，然后使用映射去弄
2. require图片
直接require里面写映射 适合单图片流


```
    <img alt="jojo" :src="require(`../assets/${name}.png`)">
```

但上面的写法到了waterfall这样的组件中可能会出现问题，所以多图静态渲染建议的话直接使用下面的写法确保完全没问题

```
const imgArray = [
    {img:require('../assets/jojo1.png')},
    {img:require('../assets/jojo2.png')},
    {img:require('../assets/jojo3.png')},
]
```

## 在顶层使用await

**注意：**

仅当 “module” 选项设置为 “es2022”、“esnext”、“system”、“node16” 或 “nodenext”，且 “target” 选项设置为 “es2017” 或更高版本时，才允许使用顶级 “await” 表达式。

`package.json`添加type为module
```json
"type": "module",
```
使用ts-node运行ts脚本以及踩过的坑
应用场景
在代码日常中，经常会需要写各种脚本，今天使用ts写了个脚本，运行的时候各种报错，还是决定写下来。

运行ts脚本需要一个库ts-node，这个库不能全局安装，否则会报错。

yarn add -D ts-node
# 使用ts-node运行ts脚本以及踩过的坑
npm i ts-node -D
使用
安装好后开始添加配置项：

在ts.config.json中添加配置"mudoule": esnext或es2005
在package.json中添加配置"type":"modules"
在文件中的import语句中「包含文件扩展名」，如import data from './data'改为import data from './data.js'，另外.ts后缀也要改为.js
然后就可以使用命令行命令运行ts脚本。

node --loader ts-node/esm ./my-script.ts
报错
在这个过程中报错不少，在网上各种论坛跑来跑去，终于解决了问题。

❝
SyntaxError: Cannot use import statement outside a module

❞
无法在模块外使用import，解决这个问题需要在package.json文件中添加"type":"modules"。

❝
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\1\Desktop\my-project\data' imported from 'C:\Users\1\Desktop\get-data.ts'

❞
找不到导入的模块，是因为没有在导入的文件中添加后缀名。

❝
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"

❞
我收到这条报错的时候，命令行命令使用的是ts-node ./myscripts.ts，改用以下命令时，问题解决。

node --loader ts-node/esm ./my-script.ts
❝
ReferenceError: fetch is not defined

❞
获取数据使用了fetch库，不是标准的Nodejs方法，需要下载node-fetch

yarn add node-fetch