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

### 接口封装的思路