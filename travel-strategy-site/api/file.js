import request from '@/utils/request'

const api_name = `/images`

export default {
    // 删除所有图片
    deleteAll(postImgs) {
        return request({
            url: `${api_name}/deleteAll`,
            method: 'post',
            data: postImgs
        })
    },
    // 删除图片
    deleteImage(fileName) {
        return request({
            url: `${api_name}/delete`,
            method: 'post',
            data: fileName
        })
    },
}