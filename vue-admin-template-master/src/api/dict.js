import request from '@/utils/request'

export default {
  // 获取数据字典列表
  dictList(id){
    return request({
      url: `/admin/dict/findChildData/${id}`,
      method: 'post'
    })
  }
}