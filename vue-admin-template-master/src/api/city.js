import request from '@/utils/request'

const api_name = `/admin/city`

export default {
  // 获取城市攻略数量数据
  getAllNum(){
    return request({
      url: `${api_name}/getAllCount`,
      method: 'get'
    })
  },
  // 获取对应id的城市详情
  getCityDetail(id, current, limit){
    return request({
      url: `${api_name}/getCityDetail/${id}/${current}/${limit}`,
      method: 'post'
    })
  },
  // 获取对应id的城市信息
  getCityById(id){
    return request({
      url: `${api_name}/get/${id}`,
      method: 'post'
    })
  },
  // 批量删除城市信息
  batchRemoveCity(idList){
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  // 删除城市信息
  deleteCity(id){
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改城市信息
  updateCity(city){
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: city
    })
  },
  // 添加城市信息
  saveCity(city){
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: city
    })
  },
  // 获取城市列表
  getCityListByProvince(id){
    return request({
        url: `/admin/dict/findChildData/${id}`,
        method: 'post'
      })
  },
  // 获取省列表
  getByDictCode(dictCode){
    return request({
        url: `/admin/dict/findByDictCode/${dictCode}`,
        method: 'post'
      })
  },
  // 获取城市信息列表
  getCityList(current, limit, searchObj){
    return request({
      url: `${api_name}/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
}