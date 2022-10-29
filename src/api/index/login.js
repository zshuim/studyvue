// ! zy 登录界面所需api
import requests from "../request";
// // import { request_post as posts ,request_get as gets} from "./request";
import { base} from "../request";

export function login(url, params) {
    return requests({
        method: 'post',
        url: `${base}${url}`,
        data: {},
        params,
    })
}