# Axios
### 安装 ===> `npm install axios`
### 对axios进行二次封装 ===>
- #### 在*src*目录下创建*api*目录
- #### 在*api*目录下创建*request.js*文件
- ~~~js
    <!-- request.js -->
    <!-- 对于axios进行二次封装 -->
    <!-- 导入axios -->
    import axios from "axios";
    <!-- 1. 利用axios对象的方法create，去创建一个axios实例 -->
    <!-- 2. request就是axios,可以进行自己的配置 -->
    const requests = axios.create({
        <!-- 配置对象 -->
        <!-- 基础路径，发起请求的时候，路径当中会自带api -->
        <!-- baerURL的URL--一定要大写 -->
        baseURL: "/api",
        <!-- 设置请求超时 -->
        timeout:5000,
    });
    <!-- 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情 -->
    requests.interceptors.request.use((config)=>{
        <!-- config:配置对象，对象里面又一个属性很重要，header请求头 -->
        return config;
    });
    <!-- 响应拦截器: -->
    requests.interceptors.response.use((res)=>{
        <!-- 成功回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情 -->
        return res.data;
   } ,(error)=>{
        <!-- 相应失败的回调 -->
        return Promise.reject(new Error('fail'));
    })


    <!-- 对外暴露 -->
    export default requests;
  ~~~
### API接口统一管理===>
- #### 在*src*目录下创建*api*目录
- #### 在*api*目录下创建*index.js*文件
- ~~~js
    <!-- index.js -->
    <!-- API接口统一管理 -->
    <!-- 引入axios如果进行了分装就导入封装的js -->
    import requests from './request';
    <!-- xxx接口 -->
    <!-- 对外暴露函数 -->
    <!-- 发请求: axios发送请求返回结果是promise对象-->
    export const reqUserList = ()=>requests(url:"/user/get",method:'get')
        
        
  ~~~
### 跨域
- #### 协议，端口，域名有一个不统一就会跨域
- #### 在*vue.config.js*内配置
- ~~~js
    module.exports = defineConfig({
        devServer:{
            proxy:{
                '/api':{
                    target:'http://localhost:3000',
                    <!-- 路径重写 -->
                    pathRewrite:{'^/api':''},
                },
            },
        },
    })
  ~~~
### 发起请求的三种方式
- #### post请求
    - #### `axios.post()`
- #### get请求
    - #### `axios.get()`
- #### 第三种请求
    - #### 
        ~~~js
            axios({
                url:'请求的路径'
                method:'请求的方式，默认get'
                params:{} // get请求方式:前端给后端传递数据
                data:{} //post请求方式:前端给后端传递数据
            })
        ~~~

