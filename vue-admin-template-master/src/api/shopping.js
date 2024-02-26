import request from '@/utils/request'

const api_name = `/admin/city/shopping`

export default {
  // 获取对应id的购物点信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 删除购物点信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改购物点信息
  update(shopping){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: shopping
    })
  },
  // 添加购物点信息
  save(shopping){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: shopping
    })
  },
}