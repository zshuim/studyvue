import requests from "@/api/Interceptor";
import { Message } from "element-ui";
import store from "@/store";
// 获取验证码图片
export function get_code() {
    return requests.get("https://www.mxnzp.com/api/verifycode/code?len=4&type=0&app_id=unelukhohlqjrrip&app_secret=WmdRVmtJVDRXZ1EweFJ3bENOS1Qrdz09");
}

// 验证码比对
export function comparisonCode(code, truecode) {
    if (code.toUpperCase() == truecode.toUpperCase()) {
        return true;
    }
    else return false;
}
// 提交前表单是否填写完整判断
export function judgeFormIntegrity(formRef) {
    var flag = false;
     formRef.validate((valid) => {
        if (valid) {
            // alert('表单填写完整')
            flag = true;
        }
        else {
            // console.log('error submit!!');
            flag = false;
        }

     });
    return flag;
}
// 提交新密码
export function commitNewPwd(vueObj) {
    var flag = false;
    console.log("这是重置密码请求函数");
    if (vueObj.pwdForm.newpwd !== vueObj.pwdForm.newpwds) {
        Message.error("两次密码不相同");
        return false;
    }
    // requests.post().then((res) => {
    //     Message.success("操作成功");
    //     flag = true;
    // });
    // return flag;
    return true;
}
// 提交登录信息
export function commitLoginUser(vueObj) {
    return requests({
        url: "/login",
        method: "post",
        data: {},
        params: {
            uid: vueObj.loginForm.account,
            pwd: vueObj.loginForm.pwd,
        }
    })
}

// 将路由格式改成f父级[子级[]]
export function transformationRouter(routerObj) {
    var routers = routerObj;
    for (var i = 0; i < routers.length; i++) {
        routers[i].children = [];
        for (var j = 0; j < routers.length; j++) {
            if (routers[j].parentMenuId == "0") {
                continue;
            }
            else if (parseInt(routers[i].id) - parseInt(routers[j].parentMenuId) == 0) {
                routers[i].children.push(routers[j]);

            }
        }
    }
    for (var i = 0; i < routers.length; i++) {
        if (parseInt(routers[i].parentMenuId) != 0) {
            routers.splice(i, 1);
            i--;
        }
    }
    store.dispatch('setSideRouteAsync', routers);
}
