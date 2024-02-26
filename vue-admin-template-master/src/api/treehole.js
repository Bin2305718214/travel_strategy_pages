import request from '@/utils/request'

const api_name = `/admin/city/treehole`

export default {
  // 删除树洞信息
  delete(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 分页获取树洞列表
  getList(current, limit){
    return request({
      url: `${api_name}/findPage/${current}/${limit}`,
      method: 'post'
    })
  },
  // 获取树洞总数
  getTreeholeCount() {
    return request({
      url: `${api_name}/getCount`,
      method: 'get'
    })
  }
}