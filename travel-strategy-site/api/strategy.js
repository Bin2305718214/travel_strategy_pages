import request from '@/utils/request'

const api_name = `/strategy/user/strategy`

export default {
    // 获取攻略详情
    getDetail(id) {
        return request({
            url: `${api_name}/findDetail/${id}`,
            method: 'get'
        })
    },
    // 获取城市详情
    getCityDetail(id, current, limit) {
        return request({
            url: `${api_name}/findCityDetail/${id}/${current}/${limit}`,
            method: 'get'
        })
    },
    // 获取城市列表
    getCity(id) {
        return request({
            url: `${api_name}/findCityList/${id}`,
            method: 'get'
        })
    },
    // 获取省列表
    getProvince(dictCode) {
        return request({
            url: `${api_name}/findProvinceList/${dictCode}`,
            method: 'get'
        })
    },
}