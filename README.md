# 技术点：

1. react-route-config集中管理路由
2. flex 布局
3. react-route
4. antd+样式按需引入
5. 路由导航守卫（路由鉴权）
6. 编程式导航 history push replace
7. 响应式布局，判断屏幕大小
8. withRouter 加工一般组件，返回新组件，使其具有路由组件的API
9. componentDidMount
10. input 监听回车事件
11. 正则表达式验证
12. CSS 自定义动画
13. 手写导航栏效果
14. 页脚始终固定在底部（min-height、负margin-top、专门填充的div）
15. 渲染数据`<li></li>`之前，先`setState`存放数据，一定要初始化状态！！！`state = { going: [] };`
16. onClick传递参数：`this.deleteTask.bind(this, taskObj._id)`，`bind(this,参数)`
17. 增删改查：先删除state里的，快速渲染好页面。再改数据库中的。
18. 根据不同状态渲染不同组件
19. 解决闪动问题：isLoading，使用加载页面
20. 获取当前时间`import moment from 'moment';`

# 主要功能实现：

## 1. 注册

## 2. 登录

## 3. 退出