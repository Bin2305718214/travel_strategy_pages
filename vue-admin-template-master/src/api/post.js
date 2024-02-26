import request from '@/utils/request'

const api_name = `/admin/city/post`

export default {
  // 删除对应id的游记评论
  deletePostComment(postComment) {
    return request({
      url: `${api_name}/removePostComment`,
      method: 'post',
      data: postComment
    })
  },
  // 获取游记评论列表
  getPostCommentList(id, current, limit) {
    return request({
      url: `${api_name}/findPostDetail/${id}/${current}/${limit}`,
      method: 'get'
    })
  },
  // 删除对应id的游记
  deletePostById(id) {
    return request({
      url: `${api_name}/removePost/${id}`,
      method: 'post'
    })
  },
  // 获取游记列表
  getPostList(current, limit) {
    return request({
      url: `${api_name}/findPostPage/${current}/${limit}`,
      method: 'get'
    })
  },
  // 获取游记和游记评论总数
  getPostAndCommentCount() {
    return request({
      url: `${api_name}/getCount`,
      method: 'get'
    })
  },
}