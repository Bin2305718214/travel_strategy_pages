<template>
    <div class="strategy-detail-container">
        <div>
            <button @click="goBack()" class="cta">
                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                </svg>
                <span class="hover-underline-animation">返回</span>
            </button>
        </div>
        <div class="detail-info">
            <div class="detail-head">
                <img v-if="Math.floor(id / 10000000) != 2" class="detail-img" v-lazy="imgPref + detail.coverImg">
                <div class="head-name">
                    <div class="name-cn">{{ detail.name }}</div>
                    <div class="name-pinyin">{{ detail.pinyin }}</div>
                </div>
            </div>
            <div v-show="Math.floor(id / 10000000) == 1 || Math.floor(id / 10000000) == 2" class="detail-row">
                <div class="row-header">
                    <img src="~/assets/images/time.png" />
                    <div>时间</div>
                </div>
                <div v-show="Math.floor(id / 10000000) == 1" class="row-value">{{ detail.openingTime }}</div>
                <div v-show="Math.floor(id / 10000000) == 2" class="row-value">{{ detail.date }}</div>
            </div>
            <div v-show="Math.floor(id / 10000000) == 3 || Math.floor(id / 10000000) == 5" class="detail-row">
                <div class="row-header">
                    <img src="~/assets/images/price.png" />
                    <div>价格</div>
                </div>
                <div class="row-value">{{ detail.price }}元/人</div>
            </div>
            <div v-show="Math.floor(id / 10000000) != 4 && Math.floor(id / 10000000) != 7" class="detail-row">
                <div class="row-header">
                    <img src="~/assets/images/addr.png" />
                    <div>地址</div>
                </div>
                <div class="row-value">{{ detail.address }}</div>
            </div>
            <div v-show="Math.floor(id / 10000000) == 3 || Math.floor(id / 10000000) == 5" class="detail-row">
                <div class="row-header">
                    <img src="~/assets/images/phone.png" />
                    <div>电话</div>
                </div>
                <div class="row-value">{{ detail.phone }}</div>
            </div>
        </div>
        <div class="detail-intro">
            <h3>简介</h3>
            <p>{{ detail.intro }}</p>
        </div>
    </div>
</template>
  
<script>
import '~/assets/css/strategyDetail.css'
import strategyApi from '~/api/strategy.js'

import AppLogo from '~/components/AppLogo.vue'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
export default {
    components: {
        AppLogo
    },
    asyncData({params, error}) {
        return strategyApi.getDetail(params.id).then(res => {
            return {
                detail: res.data.detail,
                city: res.data.city
            }
        })
    },
    data() {
        return {
            imgPref: 'http://localhost:8888/images/download?fileName=',  // 图片访问前缀
            id: null, // 信息id
        }
    },
    created() {
        this.id = this.$route.params.id
    },
    methods: {
        goBack() {
            window.location.href = '/strategy?id=' + this.city.id
        }
    },
}
</script>