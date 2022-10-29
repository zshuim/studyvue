import { login as loginapi } from '@/api/index/login'
export function login(obj, params) {
    loginapi('/login', params).then((response) => {
        console.log(response);
        obj.msg = response.token; 
    }, (error) => {
        console.log(error);
    });
}
