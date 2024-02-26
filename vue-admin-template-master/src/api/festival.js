import request from '@/utils/request'

const api_name = `/admin/city/festival`

export default {
  // 获取对应id的节日信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 删除节日信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改节日信息
  update(festival){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: festival
    })
  },
  // 添加节日信息
  save(festival){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: festival
    })
  },
}