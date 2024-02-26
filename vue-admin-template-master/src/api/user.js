import request from '@/utils/request'

const api_name = `/admin/city/user`

export default {
  // 删除用户
  deleteUser(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'post'
    })
  },
  // 修改用户状态
  changeUserStatus(id) {
    return request({
      url: `${api_name}/changeStatus/${id}`,
      method: 'post'
    })
  },
  // 修改用户权限
  changeUserAuthority(id, authorityId) {
    return request({
      url: `${api_name}/changeUserRole/${id}/${authorityId}`,
      method: 'post'
    })
  },
  // 获取权限列表
  getAuthorityList() {
    return request({
      url: `${api_name}/findAuthority`,
      method: 'get'
    })
  },
  // 获取用户列表
  getUserList(current, limit) {
    return request({
      url: `${api_name}/findPage/${current}/${limit}`,
      method: 'get'
    })
  },
  // 获取用户总数
  getUserCount() {
    return request({
      url: `${api_name}/getCount`,
      method: 'get'
    })
  },
}