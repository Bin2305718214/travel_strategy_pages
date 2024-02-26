import request from '@/utils/request'

const api_name = `/strategy/user/personal`

export default {
    // 修改密码
    updatePassword(userPwd) {
        return request({
            url: `${api_name}/updatePwd`,
            method: 'post',
            data: userPwd
        })
    },
    // 修改用户个人信息
    updateUserInfo(userInfo) {
        return request({
            url: `${api_name}/updateUser`,
            method: 'post',
            data: userInfo
        })
    },
    // 获取用户帖子浏览列表
    getBrowsePost(userId, type, current, limit) {
        return request({
            url: `${api_name}/findBrowsePostPage/${userId}/${type}/${current}/${limit}`,
            method: 'get',
        })
    },
    // 获取用户点赞列表
    getPraisePost(userId, current, limit) {
        return request({
            url: `${api_name}/findPraisePostPage/${userId}/${current}/${limit}`,
            method: 'get',
        })
    },
    // 获取用户发布的帖子
    getUserPost(userId, current, limit) {
        return request({
            url: `${api_name}/findUserPostPage/${userId}/${current}/${limit}`,
            method: 'get',
        })
    },
}