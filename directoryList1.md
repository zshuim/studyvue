|-- undefined
    |-- .browserslistrc
    |-- .gitignore
    |-- babel.config.js
    |-- jsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js  ----------- VUE配置文件
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
    |   |-- App.vue    -----------  根组件
    |   |-- main.js    -----------  入口文件
    |   |-- api        -----------  axios封装和配置
    |   |   |-- Interceptor.js
    |   |   |-- request.js
    |   |-- assets     -----------  资源文件
    |   |   |-- login_background.jpg
    |   |   |-- login_photo.png
    |   |   |-- logo.png
    |   |   |-- 401_images
    |   |   |   |-- 401.gif
    |   |   |-- 404_images
    |   |       |-- 404.png
    |   |       |-- 404_cloud.png
    |   |-- components  -----------  组件
    |   |   |-- deptSearch.vue  -----------  组织架构查询组件
    |   |   |-- HelloWorld.vue  -----------  测试elementui的组件
    |   |   |-- searchBox.vue   -----------  搜索框组件
    |   |   |-- login           -----------  登录组件
    |   |       |-- accountLogin.vue  ----------- 账号登录组件
    |   |       |-- wachetLogin.vue   -----------  微信登录组件
    |   |   |-- useManage
    |   |       |-- addStu.vue  ----------- 添加学生组件
    |   |       |-- addTch.vue  ----------- 添加老师组件
    |   |       |-- chagerole.vue ----------- 修改角色组件
    |   |-- router  ----------- 路由文件夹
    |   |   |-- index.js
    |   |-- store   -----------  vuex配置文件夹
    |   |   |-- index.js
    |   |-- style   -----------  样式文件夹
    |   |   |-- about.css  ----------- 用来看效果的（没用）
    |   |   |-- global.css  -----------  全局样式
    |   |   |-- home.css  -----------  home页面样式
    |   |   |-- login.css   ----------- 登录界面样式
    |   |   |-- password.css    -----------  忘记密码页面样式
    |   |   |-- reset.css   -----------  取消浏览器默认样式
    |   |   |-- userManage.css  -----------  用户管理样式
    |   |-- utils   -----------  工具==>每个界面的操作
    |   |   |-- about.js
    |   |   |-- home.js
    |   |   |-- login.js
    |   |   |   |-- get_code() -----------  获取图形验证码
    |   |   |   |-- comparisonCode(code, truecode)  ----------- 验证码比对
    |   |   |   |-- judgeFormIntegrity(formRef)  -----------  表单是否填写完整判断
    |   |   |   |-- commitNewPwd(vueObj)  -----------  提交新密码
    |   |   |   |-- commitLoginUser(vueObj)  -----------  提交登录信息
    |   |   |   |-- transformationRouter(routerObj)  -----------  将路由格式改成f父级[子级[]]
    |   |   |-- reload.js
    |   |   |   |-- startLoading()  -----------  请求开始加载
    |   |   |   |-- stopLoading()  -----------  请求结束停止加载
    |   |   |-- userManage.js
    |   |-- views   -----------  界面
    |       |-- AboutView.vue  -----------  测试界面
    |       |-- HomeView.vue  ----------- 测试界面
    |       |-- password.vue  -----------  忘记密码界面
    |       |-- error   -----------  错误界面
    |       |   |-- 401.vue
    |       |   |-- 404.vue
    |       |-- home     -----------   主页
    |       |   |-- home.vue
    |       |-- Login     -----------  登录界面
    |       |   |-- login.vue
    |       |   |-- regest.vue
    |       |-- UserManage     ----------- 用户管理界面
    |           |-- Stu.vue
    |           |-- Tch.vue
    |-- 一个测试后端  ----------- 简单的本地服务器进行模拟
    |   |-- college.json
    |   |-- config.json
    |   |-- data.json
    |   |-- deptInfo.json
    |   |-- table.json
    |-- 笔记    -----------  学习的笔记
    |   |-- axios.md
    |   |-- Export.md
    |   |-- 外部样式和外部事件的使用.md
    |   |-- 导航守卫.md
    |   |-- 插槽.md
    |   |-- 生命周期.md
    |-- 页面结构介绍    ----------- 原先想在这里写结构的，最后还是决定直接用这个生成
        |-- 登录.md
