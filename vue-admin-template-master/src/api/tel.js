import request from '@/utils/request'

export default {
    // 获取对应id的电话信息
    getById(id){
        return request({
            url: `/admin/city/telTnfo/get/${id}`,
            method: 'get'
        })
    },
    // 删除电话信息
    delete(id){
        return request({
          url: `/admin/city/telTnfo/remove/${id}`,
          method: 'delete'
        })
    },
    // 修改电话信息
    update(telTnfo){
        return request({
            url: `/admin/city/telTnfo/update`,
            method: 'post',
            data: telTnfo
        })
    },
    // 添加电话信息
    save(telTnfo){
        return request({
            url: `/admin/city/telTnfo/save`,
            method: 'post',
            data: telTnfo
        })
    },
}