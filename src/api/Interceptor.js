// !zy 拦截器 模块

import requests from "./request";

// !zy < !--请求拦截器: 在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情-- >
requests.interceptors.request.use((config) => {
    // < !--config: 配置对象，对象里面又一个属性很重要，header请求头-- >
    // 判断是否存在token,如果存在将每个页面header添加token
    if (sessionStorage.getItem("token")) {
        config.headers.token = `${sessionStorage.getItem("token")}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error)
});
//  !zy < !--响应拦截器: -->
requests.interceptors.response.use((res) => {
    // < !--成功回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情-- >
    return res.data;
}, (error) => {
    // < !--相应失败的回调 -->
    return Promise.reject(new Error('fail'));
})

// export default requests;