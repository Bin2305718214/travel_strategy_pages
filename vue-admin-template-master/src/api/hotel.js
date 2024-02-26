import request from '@/utils/request'

export default {
  // 获取对应id的酒店信息
  getById(id){
    return request({
      url: `/admin/city/hotel/get/${id}`,
      method: 'post'
    })
  },
  // 删除酒店信息
  delete(id){
    return request({
      url: `/admin/city/hotel/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改酒店信息
  update(hotel){
    return request({
      url: `/admin/city/hotel/update`,
      method: 'post',
      data: hotel
    })
  },
  // 添加酒店信息
  save(hotel){
    return request({
      url: `/admin/city/hotel/save`,
      method: 'post',
      data: hotel
    })
  },
}