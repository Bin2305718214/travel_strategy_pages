import request from '@/utils/request'

const api_name ='/admin/city/restaurant'

export default {
  // 获取对应id的餐馆信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 删除餐馆信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改餐馆信息
  update(restaurant){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: restaurant
    })
  },
  // 添加餐馆信息
  save(restaurant){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: restaurant
    })
  },
}