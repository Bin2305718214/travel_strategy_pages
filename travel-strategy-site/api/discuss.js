import request from '@/utils/request'

const api_name = `/strategy/user/post`

export default {
    // 删除评论
    deleteComment(postComment) {
        return request({
            url: `${api_name}/removeComment`,
            method: 'post',
            data: postComment
        })
    },
    // 添加评论
    addComment(postComment) {
        return request({
            url: `${api_name}/saveComment`,
            method: 'post',
            data: postComment
        })
    },
    // 删除帖子
    removePost(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'post'
        })
    },
    // 获取帖子详情
    getPostComment(id, current, limit) {
        return request({
            url: `${api_name}/getComment/${id}/${current}/${limit}`,
            method: 'get'
        })
    },
    // 获取帖子详情
    getPost(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get'
        })
    },
    // 改变点赞状态
    changeLike(userId, postId, postList) {
        return request({
            url: `${api_name}/changeLikeStatus/${userId}/${postId}`,
            method: 'post',
            data: postList
        })
    },
    // 添加帖子信息
    addPost(postObj) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: postObj
        })
    },
    // 分页获取帖子信息
    getPostPage(userId, current, limit) {
        return request({
            url: `${api_name}/findPage/${userId}/${current}/${limit}`,
            method: 'get'
        })
    },
}