# 心得：

1. react-route-config 集中管理路由

2. flex 布局

3. react-route

4. antd+样式按需引入

5. 路由导航守卫（路由鉴权）

6. 编程式导航 history push replace

7. 响应式布局，判断屏幕大小

8. withRouter 加工一般组件，返回新组件，使其具有路由组件的 API

9. componentDidMount

10. input 监听回车事件

11. 正则表达式验证

12. CSS 自定义动画

13. 手写导航栏效果

14. 页脚始终固定在底部（min-height、负 margin-top、专门填充的 div）

15. 渲染数据`<li></li>`之前，先`setState`存放数据，一定要初始化状态！！！`state = { going: [] };`

16. onClick 传递参数：`this.deleteTask.bind(this, taskObj._id)`，`bind(this,参数)`

17. 增删改查：先删除 state 里的，快速渲染好页面。再改数据库中的。

18. 根据不同状态渲染不同组件

19. ~~解决闪动问题：isLoading，使用加载页面~~

20. 获取当前时间`import moment from 'moment';`

21. 开启定时器每秒更新状态（componentDidMount），开启之前先执行一遍需要的操作，记得关闭定时器（componentWillUnmount）

22. input 上传图片、预览图片

23. input file 元素的美化方案：外面套层 div，input 隐藏，点击 div 触发 input 的 click 事件

24. 上传头像成功后，清空 input 的值，防止下次选择相同图片，不会触发 onchange

25. 每日一句诗句 API

26. promise 错误需要在最后`.catch(()=>{})`

27. setState 是异步的，所以要先等状态更新完、input 输入框显示出来以后，再获取 input 的焦点，所以 focus 写在 setState 的回调函数中

28. 完成任务总数计数功能：

    组件初始化时，查询集合 doneSum 中有无文档，如果没文档，则是第一次登陆，则创建一个文档用于计数。如果有文档则不是第一次登录，不创建。

29. Footer 绝对底部的实现

30. redux 重构

31. 移动端适配：媒体查询

32. Safari 不支持 vh 单位，用%

33. 应用加壳技术

34. 退出时，清空所有 redux 中的数据

35. 黑暗模式：根据redux中的数据，给每个模块添加类名或ID


