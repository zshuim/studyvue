// !zy 拦截器 模块
import { Message } from "element-ui";
import requests from "./request";
import router from '@/router'

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
    console.log(res.data);
    if (res.data.code == -1) {
        Message.error(res.data.msg);
        return false;
    }
    return res.data.data;
}, (error) => {
    // < !--相应失败的回调 -->
    console.log("error--" + error);
    if (error.response) {
        switch (error.response.status) {
            case 404: router.push({
                path: '/404',
                name: "404",
            }); break;
            case 401: router.push({
                path: '/401',
                name: "401",
            }); break;
        }
    }
    Message.error(error.stack);
        
    return false;
})

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

export default requests;