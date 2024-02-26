import request from '@/utils/request'

export default {
  // 获取对应id的文案信息
  getById(id){
    return request({
      url: `/admin/city/copywriting/get/${id}`,
      method: 'get'
    })
  },
  // 删除文案信息
  delete(id){
    return request({
      url: `/admin/city/copywriting/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改文案信息
  update(copywriting){
    return request({
      url: `/admin/city/copywriting/update`,
      method: 'post',
      data: copywriting
    })
  },
  // 添加文案信息
  save(copywriting){
    return request({
      url: `/admin/city/copywriting/save`,
      method: 'post',
      data: copywriting
    })
  },
  // 分页获取文案列表
  getList(current, limit){
    return request({
      url: `/admin/city/copywriting/findPage/${current}/${limit}`,
      method: 'post'
    })
  },
}