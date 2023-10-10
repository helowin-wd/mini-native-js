# 正确的学习方式：理解原理+原生实现

## css变量的妙用

js和css巧妙结合，通过js设置变量的值，然后引发后续css的正常操作

涉及知识点

* [css自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)

* [setProperty](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

## 图片转 base64

> 目的: 不需要网络传输，直接本地预览上传的图片

涉及知识点：

[readAsDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)

url地址叫做统一资源定位符,通过一个字符串获取资源的数据

[data url](https://en.wikipedia.org/wiki/Data_URI_scheme) 地址里面包含数据

MIME类型有（使用字符串描述资源格式）

* text/plain 表示纯文本
* application/json 表示json格式的数据
* application/javascript js代码的MIME类型

base64指可以将任何二进制数据转换成纯文本的格式，有一套算法来运算的，至于为啥是64呢？是因为这个纯文本可能出现的字符有64个，js提供了一些方法实现：base64和纯文本之间的转换

* 编码: base64格式

```js
btoa('alert(123)') // 'YWxlcnQoMTIzKQ=='
```

* 解码: base64格式

```js
atob('YWxlcnQoMTIzKQ==') // 'alert(123)'
```

## 面向对象购物车

* 面向对象编程
* 添加购物车的动画效果：商品以抛物线的形式加入购物车

## 参数归一化思想

## 进入/退出全屏
