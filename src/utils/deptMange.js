import requests from "@/api/request";
import { Message } from "element-ui";
export function getCollegeList() {  
    return requests.get('http://localhost:3003/data')
}
/**
 * 学院查询使用  (偷懒不重新写了)
 * @param {*} pageInfo 
 * @param {*} searchCollegeName 
 * @param {*} dept_type 
 * @returns 
 */
export function searchCollege(pageInfo, searchCollegeName , dept_type) {
    if (searchCollegeName == "") {
        // console.log(pageInfo, searchCollegeName, dept_type);
        return requests.get('http://localhost:3003/data');
        
        
    }
    else {
        // console.log(pageInfo, searchCollegeName, dept_type);
        return requests.get('http://localhost:3003/data');
        
    }
}


/**
 * 这是班级这一类组织的查询
 * @param {*} pageInfo 
 * @param {*} parent_dept_id 
 * @param {*} dept_type 
 * @param {*} searchGroupName 
 */
export function searchGroup(pageInfo, parent_dept_id, dept_type, searchGroupName) {
    if (searchGroupName == "") {;
        return requests.get('http://localhost:3004/data');
    }
    else {
        return requests.get('http://localhost:3004/data');
    }
}

/**
 * 删除组织
 * @param {*}} ids 
 */
export function delDepts(ids) {
    console.log(ids);
    
}

/**
 * 获取组织内部人员信息
 * @param {*} pageInfo  页面信息
 * @param {*} searchUserName  呀查询用户信息
 * @param {*} GroupID  组织ID
 * @returns 
 */
export function getGroup_User(pageInfo, searchUserName, GroupID) {
    if (searchUserName == "") {
        return requests.get('http://localhost:3001/data');
    }
    else {
        Message.error("没有")
    }
    
}
/**
 * 删除(增加)组织内部人员
 * @param {*} addarr  增加人员列表
 * @param {*} delarr  删除人员列表
 * @param {*} GroupID  该组织ID
 */
export function delORaddGroup_User(addarr,delarr,GroupID) {
    console.log(addarr, delarr, GroupID)
}