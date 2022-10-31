// !nr < !--request.js -->
    // < !--对于axios进行二次封装 -->
    // < !--导入axios -->
    import axios from "axios";
    // !zy < !--1. 利用axios对象的方法create，去创建一个axios实例-- >
    // < !--2. request就是axios, 可以进行自己的配置-- >
    const requests = axios.create({
        // < !--配置对象 -->
        // < !--基础路径，发起请求的时候，路径当中会自带api-- >
    baseURL: "/api",
        // < !--设置请求超时 -->
    timeout: 5000,
    });
    // !zy < !--请求拦截器: 在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情-- >
    // requests.interceptors.request.use((config) => {
    //     // < !--config: 配置对象，对象里面又一个属性很重要，header请求头-- >
    //     // 判断是否存在token,如果存在将每个页面header添加token
    //     if (sessionStorage.getItem("token")) {
    //         config.headers.token = `${sessionStorage.getItem("token")}`;
    //     }
    //     return config;
    // }, function (error) {
    //     return Promise.reject(error)
    // });
    // //  !zy < !--响应拦截器: -->
    // requests.interceptors.response.use((res) => {
    //     // < !--成功回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情-- >
    //     return res.data;
    // },(error) => {
    //     // < !--相应失败的回调 -->
    //     return Promise.reject(new Error('fail'));
    // })


    //  !zy < !--对外暴露 -->
export default requests;

// !zy 如果后面要改项目的前置访问路径可以直接改
export let base = "/api";
// // !zy 对外暴露post请求
// export const request_post = (url, params) => {
//     requests({
//         method: 'post',
//         url: `${base}${url}`,
//         data: {},
//         params,
//     }).then((response) => {
//         console.log(response);
//         return response;
//     }, (error) => {
//         return error;
//     });
// }
// // !zy 对外暴露get请求
// export const request_get = (url, params) => {
//     requests({
//         method: 'post',
//         url: `${base}${url}`,
//         data: {},
//         params,
//     }).then((response) => {
//         return response;
//     }, (error) => {
//         return error;
//     });
// }