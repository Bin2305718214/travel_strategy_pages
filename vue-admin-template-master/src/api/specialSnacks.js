import request from '@/utils/request'

const api_name = `/admin/city/specialSnacks`

export default {
  // 获取对应id的特色小吃信息
  getById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 删除特色小吃信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改特色小吃信息
  update(specialSnacks){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: specialSnacks
    })
  },
  // 添加特色小吃信息
  save(specialSnacks){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: specialSnacks
    })
  },
}