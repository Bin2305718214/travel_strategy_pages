<template>
  <div class="strategy-container">
    <!-- 级联选择器 -->
    <div class="selection">
      <div class="city-selection">
        <div class="selection-head">
          <strong>省 份：</strong>
        </div>
        <el-radio-group class="selection-list" v-model="province">
          <el-radio-button v-for="item in provinceList" :key="item.id" 
            class="selection-list-item" :label="item.name" @change.native="chnageProvince(item.name, item.id)"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="city-selection">
        <div class="selection-head">
          <strong>城 市：</strong>
        </div>
        <el-radio-group class="selection-list" v-model="city">
          <el-radio-button v-for="item in cityList" :key="item.id" 
            class="selection-list-item" :label="item.name" @click.native.prevent="chnageCity(item.name, item.id)"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 城市介绍 -->
    <div v-if="cityInfo != null" class="city-intro">
      <div class="city-card">
        <input type="radio" name="select" id="intro" checked>
        <input type="radio" name="select" id="recom-time">
        <input type="checkbox" id="cityImg">

        <div class="slider">
          <label for="intro" class="slide intro"></label>
          <label for="recom-time" class="slide recom-time"></label>
        </div>

        <div class="inner_part">
          <label for="cityImg" class="img">
            <img class="img_1" v-lazy="imgPref + cityInfo.coverImg1">
          </label>
          <div class="content content_1">
              <div class="title">{{ cityInfo.name }}</div>
              <div class="text">{{ cityInfo.intro }}</div>
          </div>
        </div>

        <div class="inner_part">
          <label for="cityImg" class="img">
            <img class="img_2" v-lazy="imgPref + cityInfo.coverImg2">
          </label>
          <div class="content content_2">
            <div class="title">推荐时间</div>
            <div class="text">{{ cityInfo.recommTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <el-empty description="暂无数据"></el-empty>
    </div>
    <!-- 城市信息表 -->
    <div v-if="cityInfo != null" class="tabs">
      <ul class="tabs__links">
        <li v-for="(item,index) in cityNavList" :key="index">
          <button :class="activeIndex == index?'tabs__link active':'tabs__link'">
            <span class="tabs__link__text" @click="getData($event)" :data-index="index" :data-text="item">{{item}}</span>
          </button>
        </li>
        <li>
          <button :class="activeIndex == 6?'tabs__link active':'tabs__link'">
            <span class="tabs__link__text" @click="getData($event)" data-index="6" data-text="实用信息">实用信息</span>
          </button>
        </li>
      </ul>
      <ul class="tabs__contents">
        <li v-for="(nav, index) in cityNavList" :key="index">
          <div :class="activeIndex == index?'tabs__content active':'tabs__content'">
            <div class="city-content">
              <div class="content-list-item" @click="toDetail(item.id)" v-for="item in detailData.records" :key="item.id">
                <div class="item-img">
                  <img v-if="Math.floor(item.id / 10000000) != 2" v-lazy="imgPref + item.coverImg">
                </div>
                <div class="item-text">
                  <div class="heading">
                    <h3>{{item.name}}</h3>
                  </div>
                  <p>{{item.intro}}</p>
                </div>
              </div>
              <div v-if="detailData.records.length == 0" class="noData">
                <el-empty description="暂无数据"></el-empty>
              </div>
              <el-pagination v-if="detailData.records.length != 0" background layout="prev, pager, next" :total="detailData.total">
              </el-pagination>
            </div>
          </div>
        </li>
        <!-- 实用信息 -->
        <li>
          <div :class="activeIndex == 6?'tabs__content active':'tabs__content'">
            <div class="city-content">
              <div :class="openPractical == true && openPracticalId == item.id?'content-list-item-open':'content-list-item'" 
              @click="practiaclClick(item.id)" v-for="item in practicalInfos" :key="item.id">
                <div class="item-text practical-text">
                  <div class="practical-heading heading">
                    <h3>{{item.name}}</h3>
                  </div>
                  <p :class="openPractical == true && openPracticalId == item.id?'practical-all':'practical-part'">{{item.content}}</p>
                  <div class="telorhosp-info" v-show="openPractical == true && openPracticalId == item.id && item.child != null"
                   v-for="i in item.child" :key="i.id">
                    <div>{{ i.name }}</div>
                    <div>{{ i.phone }}</div>
                    <div v-if="i.address != null">{{ i.address }}</div>
                  </div>
                </div>
              </div>
              <div v-if="practicalInfos.length == 0" class="noData">
                <el-empty description="暂无数据"></el-empty>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '~/assets/css/strategy.css'

import { getToken } from '@/utils/auth'
import strategyApi from '@/api/strategy'
import browseRecordApi from '@/api/browseRecord'

import AppLogo from '~/components/AppLogo.vue'
export default {
  components: {
    AppLogo
  },
  async asyncData({params, error}) {
    return strategyApi.getProvince('Province').then(res => {
      return {
        provinceList: res.data.provinceList,
        province: res.data.provinceList[0].name,  // 省份
        cityList: res.data.cityList,
        city: res.data.cityList[0].name   // 城市
      }
    })
  },
  data() {
    return {
      imgPref: 'http://localhost:8888/images/download?fileName=',  // 图片访问前缀
      cityNavList: ['景点','特色小吃','美食','酒店','购物','节日'], // 城市概览信息
      cityData: {}, // 城市数据
      detailData: {}, // 城市数据
      practicalInfos: [], // 实用信息数据
      cityInfo: null, // 城市信息
      current: 1, // 页码
      limit: 6, // 每页记录数
      activeIndex: 0,  // 城市信息索引
      token: null,
      openPracticalId: 0, // 点击的实用信息id
      openPractical: false, // 是否打开实用信息详情
    }
  },
  created() {
    var token = getToken();
    if(null != token) {
      this.token = token
    }

    this.init()
  },
  methods: {
    practiaclClick(id) {
      if(this.openPracticalId != id) {
        this.openPractical = true
        this.openPracticalId = id
      } else {
        this.openPractical = !this.openPractical
      }
    },
    // 跳转到详情页面
    toDetail(id) {
      window.location.href = '/strategy/detail/' + id
    },
    // 切换城市
    chnageCity(name, id) {
      this.getCityData(id)
      this.city = name
    },
    // 切换省份
    chnageProvince(name, id) {
      this.getCity(id)
      this.province = name
    },
    // 数据初始化
    init() {
      var id = this.$route.query.id
      if(id != null) {
        var provinceId = Math.floor(id / 10000) * 10000

        for(var i = 0; i < this.provinceList.length; i++) {
          if(this.provinceList[i].id == provinceId) {
            this.province = this.provinceList[i].name
            break;
          }
        }

        this.getCity(provinceId, id)
      } else {
        this.getCityData(110100)
      }
    },
    // 获取城市详情
    getCityData(id) {
      this.activeIndex = 0

      strategyApi.getCityDetail(id, this.current, this.limit).then(res => {
        this.cityData = res.data
        
        if(null != this.cityData.city) {
          this.cityInfo = this.cityData.city
          this.detailData = this.cityData.scenicSpots

          if(null != this.token) {
            browseRecordApi.userBrowseRecord(this.token.id, id, 'CITY').then()
          }
        } else {
          this.cityInfo = null
        }
      })
    },
    // 获取对应省的城市列表
    getCity(id, cityId) {
      strategyApi.getCity(id).then(res => {
          this.cityList = res.data

          if (cityId != null) {
            for(var i = 0; i < this.cityList.length; i++) {
              if(this.cityList[i].id == cityId) {
                this.city = this.cityList[i].name
                break;
              }
            }

          this.getCityData(cityId)
        } else {
          this.getCityData(this.cityList[0].id)
          this.city = res.data[0].name
        }
      })
    },
    // 切换概览
    getData(e) {
      var activeIndex = e.target.dataset.index
      if (this.activeIndex != activeIndex)
        this.activeIndex = activeIndex

        if(0 == this.activeIndex) { // 景点
          this.detailData = this.cityData.scenicSpots
        } else if (1 == this.activeIndex) { // 特色小吃
          this.detailData = this.cityData.specialSnacks
        } else if (2 == this.activeIndex) { // 餐馆
          this.detailData = this.cityData.restaurants
        } else if (3 == this.activeIndex) { // 酒店
          this.detailData = this.cityData.hotels
        } else if (4 == this.activeIndex) { // 购物点
          this.detailData = this.cityData.shoppings
        } else if (5 == this.activeIndex) { // 购物点
          this.detailData = this.cityData.festivals
        } else if (6 == this.activeIndex) { // 实用信息
          this.practicalInfos = this.cityData.practicalInfos
        }
    },
  },
}
</script>