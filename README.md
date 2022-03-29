😃😃😃 本人能力有限，欢迎大佬指正改进~

---

## 1. 前言

最近写了一款基于`React`脚手架开发的 TodoList 网页应用，主要记录自己的代办事务，方便查看、管理、安排时间，提升效率。

PC Web 端 + 移动端 + 黑暗模式，可日常使用。

没有复杂的界面，没有繁琐的设置，开箱即用，专注于任务管理。

😛**应用网址**：<a href="https://lzxtodo.top" target="_blank">TodoList</a>

😜**源码仓库**：<a href="https://github.com/lzxjack/React-TodoList" target="_blank">[GitHub]</a>

## 2. 食用指南

`fork`本项目后，需要在<a href="https://console.cloud.tencent.com/tcb/env" target="_blank">腾讯云开发 CloudBase</a>创建一个云开发环境，选择`空模板`即可：

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20210602191232.png)

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20210602191349.png)

创建完成后，将`/src/utils/constant.ts`下的`env`改成自己的**环境 ID**：

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20220101180722.png)

在`登录授权`模块中，打开`邮箱登录`和`用户名密码登录`，并根据提示，**配置邮箱登录**：

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20210602191714.png)

在`数据库`模块中，新建一个名为`config`的集合，如下所示：

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20220101181147.png)

为了能在**React 脚手架**中本地预览项目，需要将`localhost:3000`添加到`安全配置`中的`WEB安全域名`中。如果有自定义域名，也将自定义域名添加进来。否则会产生跨域问题。

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20210602192040.png)

这样下来，本地**安装完依赖包**之后，就可以`yarn start`或者`npm start`启动项目啦~

## 3. 刷新后可能出现 404 的问题

### 方法一：

使用`HashRouter`

```js
<HashRouter>
  <App />
</HashRouter>
```

### 方法二：

继续使用`BrowserRouter`，但腾讯云 CloudBase 需要做一些设置。

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20220101185931.png)

点击`静态网站托管`中的`基础配置`，在`路由配置`中添加一条重定向规则如下：

![](https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/20220101185943.png)

错误码`404`时重定向到` /index.html`即可解决问题。

## 4. 应用简介

### 1. 主要功能

- 邮箱注册、登录
- 注册邮箱地址、密码的验证
- 退出功能
- 黑暗模式、白天模式切换
- 用户累计完成的任务计数
- 添加、修改近期任务、长期任务
- 完成任务
- 删除任务
- 近期任务转为长期任务
- 长期任务转为近期任务
- 清空所有已完成任务
- 适配移动端

### 2. 主要用到的技术

#### 前端

- `React`脚手架`Create-React-App`
- 状态集中管理工具`Redux`
- 前端路由`React-Router`、路由鉴权
- 少量使用`AntD`组件库 （`Icon`图标、`Notification`通知提醒框、`Message`全局提示）
- `LocalStorage`客户端存储

#### 后端

后端使用腾讯云`CloudBase`云端一体化后端云服务，包括：

- 用户管理：注册、登录
- 数据库：存放用户任务数据
- 网站托管
