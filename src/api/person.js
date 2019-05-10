import axios from './index';

export function checkLogin() {
    //return axios.get('/personal/login');
    return {code:0,msg:"已经登陆"}
}

export function exitLogin() {
    //return axios.get('/personal/out');
    return {code:0,msg:"退出登陆成功"}
}

export function queryInfo() {
    //return axios.get('/personal/info');
    return {code:0,msg:"获取用户信息成功",data:{
            name:"Mr zhang",
            email:"123456@qq.com",
            phone:"666666"
        }}
}

export function login(payload) {
    //return axios.post('/personal/login',payload);
    return {
        code:0,
        msg:'登陆成功'
    }
}

export function register(payload) {
    //return axios.post('/personal/register',payload);
    return {
        code:0,
        msg:'注册成功'
    }
}

