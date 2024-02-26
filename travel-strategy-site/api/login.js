import request from '@/utils/request'

const api_name = `/strategy/user/login`

export default {
    forgetPassword(forgotPwd) {
        return request({
            url: `${api_name}/forgetPassword`,
            method: 'post',
            data: forgotPwd
        })
    },
    // 注册
    login(searchObj) {
        return request({
            url: `${api_name}/login`,
            method: 'post',
            data: searchObj
        })
    },
    // 注册
    register(searchObj) {
        return request({
            url: `${api_name}/register`,
            method: 'post',
            data: searchObj
        })
    },
    // 获取验证码
    getCode(email) {
        return request({
            url: `${api_name}/code/email?email=${email}`,
            method: 'post',
        })
    },
}