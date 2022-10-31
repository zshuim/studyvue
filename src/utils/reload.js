// 操作加载界面
import { Loading } from "element-ui";
// 页面加载效果
let loading;
let loadingNum = 0; // 内存中存在的请求数量
export function startLoading() {
    if (loadingNum == 0) {
        loading = Loading.service({
            lock:true,
            text: '我努力...:smile:',
            background: "rgba(255,255,255,0.5)",
            customClass: "maxLoading",
            target: document.querySelector('#app')
        });
        loadingNum++;
    }
}
export function stopLoading() {
    loadingNum--;
    if (loadingNum <= 0) {
        loading.close()
        // console.log(loading);
    }
}
