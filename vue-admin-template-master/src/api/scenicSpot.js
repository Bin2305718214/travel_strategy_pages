import request from '@/utils/request'

const api_name ='/admin/city/scenicSpot'

export default {
  // 获取对应id的景点信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 删除景点信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改景点信息
  update(scenicSpot){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: scenicSpot
    })
  },
  // 添加景点信息
  save(scenicSpot){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: scenicSpot
    })
  },
}