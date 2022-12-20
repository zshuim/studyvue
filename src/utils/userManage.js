import requests from "@/api/Interceptor";
/**
 * 获取学院和行政班级
 */
export function stuDeptList() {
    return requests.get('http://localhost:3002/data')
}
export function tchDeptList() {
    return requests.get('http://localhost:3002/data')
}
/**
 * 修改组织结构
 * @param {*} oldDeptOption  旧的组织结构 
 * @returns 新的组织结构
 */
export function modifyDeptStructure(oldDeptOption) {
    const deptOption = [];
    for (var i = 0; i < oldDeptOption.sysDeptList.length; i++) {
        if (oldDeptOption.sysDeptList[i].parentDeptId == null) {
            deptOption.push(oldDeptOption.sysDeptList[i]);
        }
    }
    for (var j = 0; j < deptOption.length; j++) {
        deptOption[j].children = [];
        for (var i = 0; i < oldDeptOption.sysDeptList.length; i++) {
            if (oldDeptOption.sysDeptList[i].parentDeptId == deptOption[j].id) {
                deptOption[j].children.push(oldDeptOption.sysDeptList[i]);
            }
        }
    }
    return deptOption;
}

/**
 * 获取用户列表
 * @param {*} pageInfo 翻页内容
 * @param {*} usertype 用户类型 老师/学生
 * @returns 
 */
export function getuseerList(pageInfo,usertype) {
    return requests.get('http://localhost:3001/data')
}

/**
 * 
 * @param {*} userid 要删除用户的数组
 * @param {*} flag 删除方式 true--真实删除 false--假删
 */
export function delUser(userid,flag) {
    if (flag) {
        console.log(userid)
    }
    else {
        console.log(userid)
    }
}
/**
 * 修改选择组织的结构
 * @param {*} arr_selectedOptions 选择的组织数组
 * @param {*} callback    true false
 * @param {*} usertype    用户类型 教师  学生
 * @returns 选择的组织的字符串
 */
export function screen_User( arr_selectedOptions, callback, usertype) {
     var str_selectedOptions = "";
    if (usertype == 'stu') {
        if (!callback) {
            if ( arr_selectedOptions.length == 0) {
                 str_selectedOptions = "";
            }
            for (var i = 0; i <  arr_selectedOptions.length; i++) {
                if ( arr_selectedOptions.length == 1) {
                     str_selectedOptions =  arr_selectedOptions[i];
                } else if (i == 0) {

                     str_selectedOptions +=  arr_selectedOptions[i] + "/";
                } else {
                     str_selectedOptions +=  arr_selectedOptions[i];
                }
            }
        }

    }
    else {
        if (!callback) {
            if ( arr_selectedOptions.length == 0) {
                 str_selectedOptions = "";
            }
            for (var i = 0; i <  arr_selectedOptions.length; i++) {
                if ( arr_selectedOptions.length == 1) {
                     str_selectedOptions =  arr_selectedOptions[i];
                } else if (i == 0) {
                     str_selectedOptions +=  arr_selectedOptions[i] + "/";
                } else {
                     str_selectedOptions +=  arr_selectedOptions[i];
                }
            }

        }
    }
    return str_selectedOptions;
}
/**
 * 
 * @param {*} pageInfo   翻页信息
 * @param {*} userName   要查询用户的名字
 * @param {*} deptOption  组织
 * @param {*} usertype    用户类型 
 * @returns 
 */
export function getSearchUserList(pageInfo, userName, deptOption, usertype) {
    if (userName == "" && deptOption == "") {
        console.log(pageInfo, userName, deptOption, usertype);
        return requests.get('http://localhost:3001/data')
    }
    else if (userName != "" && deptOption == "") {
        console.log(pageInfo, userName, deptOption, usertype);
        return requests.get('http://localhost:3001/data')
    }
    else if (userName == "" && deptOption != "") {
        console.log(pageInfo, userName, deptOption, usertype);
        return requests.get('http://localhost:3001/data')
    }
    else if (userName != "" && deptOption != "") {
        console.log(pageInfo, userName, deptOption, usertype);
        return requests.get('http://localhost:3001/data')
    }
    
} 

export function delUsers(users) {
    var userids = [];
    for (var i = 0; i < users.length; i++) {
        userids.push(users[i].id);
    }
    console.log(userids);
}

export function getUserByID(id) {
    console.log("好了你获取到了用户信息");
}

export function getSearchRoleList(pageInfo,RoleName) {
    if (RoleName != "") {
        return requests.get('http://localhost:3001/data');
    }
    return requests.get('http://localhost:3001/data');
}