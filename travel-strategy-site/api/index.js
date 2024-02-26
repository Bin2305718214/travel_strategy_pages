import request from '@/utils/request'

const api_name = `/strategy/user/index`

export default {
    // 添加树洞
    addTreeHole(searchObj) {
        return request({
            url: `${api_name}/saveTreeHole`,
            method: 'post',
            data: searchObj
        })
    },
    // 获取首页信息
    getIndexInfo(current, limit) {
        return request({
            url: `${api_name}/findIndexInfo/${current}/${limit}`,
            method: 'get'
        })
    },
}