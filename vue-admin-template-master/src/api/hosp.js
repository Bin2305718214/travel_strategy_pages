import request from '@/utils/request'

export default {
    // 获取对应id的医院信息
    getById(id){
        return request({
            url: `/admin/city/hospitalInfo/get/${id}`,
            method: 'get'
        })
    },
    // 删除医院信息
    delete(id){
        return request({
            url: `/admin/city/hospitalInfo/remove/${id}`,
            method: 'delete'
        })
    },
    // 修改医院信息
    update(hospitalInfo){
        return request({
            url: `/admin/city/hospitalInfo/update`,
            method: 'post',
            data: hospitalInfo
        })
    },
    // 添加医院信息
    save(hospitalInfo){
        return request({
            url: `/admin/city/hospitalInfo/save`,
            method: 'post',
            data: hospitalInfo
        })
    },
}