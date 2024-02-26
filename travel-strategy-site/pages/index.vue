<template>
  <div class="index-container">
    <!-- 轮播文案 -->
    <ul class="rslides">
      <transition v-for="(item, index) in copywriting" :key="item.id" name="text-li">
        <li v-if="isShow == index">
          <div class="head-info">
            <h1>{{ item.title }}<span>{{ item.text }}</span></h1>
            <p>{{ item.note }}</p>
          </div>
        </li>
      </transition>
    </ul>
    <!-- 下部分 -->
    <div class="index-content">
      <!-- 树洞 -->
      <div class="tree-hole">
        <div class="screen-title">
          <h2>天涯树洞</h2>
          <button v-if="token != null" class="tree-hole-add-btn" @click="dialogVisible = true">我也来写</button>
          <a v-else class="tree-hole-add-link" :href="'/login'">我也来写</a>
          <el-dialog title="想你所想(树洞无悔)" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-input type="textarea" placeholder="畅所欲言" v-model="treeText" maxlength="200" show-word-limit></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveTreeHole()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="hole-content-list">
          <div v-for="item in treeHole" :key="item.id" class="hole-item">
            <div class="hole-userinfo">
              <img v-lazy="imgPref + item.avatarUrl" />
              <h3>{{ item.nickName }}</h3>
            </div>
            <div class="hole-content">
              <p class="hole-content-text">{{ item.content }}</p>
            </div>
            <div class="hole-time">{{ item.createTime }}</div>
          </div>
          <p class="data-load load" v-if="treeHole.length != 0 && total > 9 && !noMore" @click="getTreeHoleData()">加载更多</p>
          <p class="data-load end" v-if="treeHole.length != 0 && noMore">没有更多了</p>
        </div>
      </div>
      <!-- 热门城市排行榜 -->
      <div class="city-top">
        <h1><img src="~/assets/images/top.png" />热门城市</h1>
        <ol>
          <li v-for="item in cityTop" :key="item.id" class="top-item" @click="toCityDetail(item.id)">
            <span>{{ item.name }}</span><small>{{ item.readingNum }}</small></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { formatTime } from '@/utils/index'
import indexApi from '@/api/index'

import AppLogo from '~/components/AppLogo.vue'
export default {
  components: {
    AppLogo
  },
  asyncData({params, error}) {
    return indexApi.getIndexInfo(1, 6).then(res => {
      return {
        copywriting: res.data.copywritingList,
        treeHole: res.data.treeHolePage.records,
        cityTop: res.data.cityList,
        total: res.data.treeHolePage.total // 总数
      }
    })
  },
  data() {
    return {
      imgPref: 'http://localhost:8888/images/download?fileName=', // 图片访问前缀
      timer: "",  // 定时器
      isShow: 0,  //隐藏标签
      current: 1, // 当前页面数
      limit: 6,  // 每页记录数
      lastPage: false,  // 是否为最后一页
      dialogVisible: false, // 是否打开对话框
      treeText: '', // 输入的树洞信息
      token: null,
    }
  },
  created() {
    var token = getToken();
    if(token != null) {
      this.token = token
    }

    this.start()
    this.formatTreeHoleTime()
  },
  computed: {
    // 没有数据
    noMore () {
      return this.lastPage
    },
  },
  methods: {
    // 格式化树洞时间
    formatTreeHoleTime() {
      for(var i = 0; i < this.treeHole.length; i++) {
        this.treeHole[i].createTime = formatTime(new Date(this.treeHole[i].createTime))
      }
    },
    // 前往城市详情页面
    toCityDetail(id) {
      let { href } = this.$router.resolve({
          path: '/strategy',
          query: {id: id}
      })
      window.open(href, '_self')
    },
    // 分页获取哦树洞信息
    getTreeHoleData() {
      this.current += 1
      indexApi.getIndexInfo(this.current, this.limit).then(res => {
        var treeHole = res.data.treeHolePage.records

        if(treeHole != null) {
          if(treeHole.length < this.limit) {
            this.lastPage = true
          }
  
          for(var i = 0; i < treeHole.length; i++) {
            treeHole[i].createTime = formatTime(new Date(treeHole[i].createTime))
            this.treeHole.push(treeHole[i])
          }
        }
      })
    },
    // 添加树洞
    saveTreeHole() {
      var searchObj = {}
      searchObj.nickName = this.token.nickName
      searchObj.avatarUrl = this.token.avatarUrl
      searchObj.content = this.treeText

      indexApi.addTreeHole(searchObj).then(res => {
        this.dialogVisible = false
        this.treeText = ''
        this.$router.go(0)

        this.$message({
          type: 'success',
          message: '树洞发布成功！'
        });
      })
    },
    // 关闭添加树洞对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.treeText = ''
        })
        .catch(_ => {});
    },
    // 创建一个定时器
    start() {
      this.timer = setInterval(this.bannerSwitch, 4000)
    },
    // 切换显示的文本
    bannerSwitch() {
      if(this.isShow == this.copywriting.length - 1) {
        this.isShow = -1
      }
      this.isShow += 1
    },
    // 清除定时器
    over() {
      clearInterval(this.timer)
    },
  },
  // 销毁定时器
  beforeDestory() {
    this.over()
  },
}
</script>