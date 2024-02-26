import request from '@/utils/request'

const api_name = `/strategy/user/browse`

export default {
    // 记录用户浏览历史
    userBrowseRecord(userId, browseId, type) {
        return request({
            url: `${api_name}/addUserBrowse/${userId}/${browseId}/${type}`,
            method: 'post'
        })
    },
}