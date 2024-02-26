import request from '@/utils/request'

const api_name = `/admin/city/practicalInfo`

export default {
  // 获取对应id的实用信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  // 删除实用信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改实用信息
  update(practicalInfo){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: practicalInfo
    })
  },
  // 添加实用信息
  save(practicalInfo){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: practicalInfo
    })
  },
}