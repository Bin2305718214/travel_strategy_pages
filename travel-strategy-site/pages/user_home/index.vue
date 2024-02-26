<template>
    <div class="user-home-container">
      <div class="user-card">
        <div class="user-info left">
          <img :src="imgPref + token.avatarUrl">
          <div class="user-name">{{ token.nickName }}</div>
          <div class="person-operation">
            <button @click="showEditUserInfo()">编辑资料</button>
            <button @click="pwdVisible = true">修改密码</button>
          </div>
        </div>
        <div class="user-info right">
          <div class="email">邮箱：{{ token.email }}</div>
          <div class="signature">{{ token.autograph == ""?'个性签名：用户还没填写个性签名~' : token.autograph}}</div>
        </div>
      </div>
      <el-dialog
        title="编辑资料"
        :visible.sync="editUserVisible"
        width="30%"
        :before-close="handleClose">
        <form class="form">
          <el-upload class="avatar-uploader" action="http://localhost/images/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="token.avatarUrl" :src="imgPref + avatarUrl" class="avatar">
          </el-upload>
          <input type="text" class="input" v-model="nickName" placeholder="用户名">
          <el-input type="text" placeholder="个性签名" v-model="autograph" maxlength="50" show-word-limit ></el-input>
        </form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateUserInfo()">修 改</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改密码"
        :visible.sync="pwdVisible"
        width="30%"
        :before-close="handleClose">
        <div class="pwd-box">
          <form @submit.prevent="updatePwd()">
            <div class="user-box">
              <input type="password" name="" required="" v-model="oldPwd">
              <label>旧密码</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" v-model="newPwd">
              <label>新密码</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" v-model="comfirmPwd">
              <label>确认新密码</label>
            </div>
            <center>
                <input class="pwd-submit-btn" type="submit" value="确认修改">
            </center>
          </form>
        </div>
      </el-dialog>

      <div class="tabs-container">
        <div :class="activeIndex == 4?'tabs-hostory':'tabs'">
          <input type="radio" id="radio-1" name="tabs" value="1" @click="getPostData(1)" v-model="activeIndex" checked/>
          <label class="tab" for="radio-1">个人中心</label>
          <!-- <input type="radio" id="radio-2" name="tabs" value="2" @click="getPostData(2)" v-model="activeIndex"/>
          <label class="tab" for="radio-2">文章动态<span v-if="messageNum != 0" class="notification">{{ messageNum }}</span></label> -->
          <input type="radio" id="radio-3" name="tabs" value="3" @click="getPostData(3)" v-model="activeIndex"/>
          <label class="tab" for="radio-3">点赞记录</label>
          <input type="radio" id="radio-4" name="tabs" value="4" @click="getPostData(4, 1)" v-model="activeIndex"/>
          <label class="tab" for="radio-4">浏览历史</label>
          <span class="glider"></span>
        </div>
      </div>
      <div v-show="activeIndex == 1" class="personal-homepage">
        <CardPage :postData="postData"></CardPage>
      </div>
      <!-- <div v-show="activeIndex == 2" class="post-dynamics">

      </div> -->
      <div v-show="activeIndex == 3" class="like-record">
        <CardPage :postData="postData"></CardPage>
      </div>
      <div v-show="activeIndex == 4" class="browse-history">
        <div class="city-or-post">
          <input type="radio" id="city-or-post-1" name="city-or-post" @click="getPostData(4, 1)" value="1" v-model="cityOrPost" checked/>
          <label class="tab" for="city-or-post-1">城市</label>
          <input type="radio" id="city-or-post-2" name="city-or-post" @click="getPostData(4, 2)" value="2" v-model="cityOrPost"/>
          <label class="tab" for="city-or-post-2">游记</label>
          <span class="glider"></span>
        </div>
        <div v-show="cityOrPost == 1" class="city-history">
          <div class="city-content">
            <div class="content-list-item" @click="toDetail(item.id)" v-for="item in cityList" :key="item.id">
              <div class="item-img">
                <img v-lazy="imgPref + item.coverImg1">
              </div>
              <div class="item-text">
                <div class="heading">
                  <h3>{{item.name}}</h3>
                </div>
                <p>{{item.intro}}</p>
              </div>
            </div>
            <div v-if="cityList.length == 0" class="noData">
              <div> 这么久都没互动过，还挺害羞的 ~ </div>
              <svg t="1678181228003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8645" width="249" height="249">
                <path d="M512 512m-507.12381 0a507.12381 507.12381 0 1 0 1014.24762 0 507.12381 507.12381 0 1 0-1014.24762 0Z" fill="#FFBD66" p-id="8646"></path><path d="M512 1024A512 512 0 1 1 1024 512 512.78019 512.78019 0 0 1 512 1024z m0-1014.247619A502.247619 502.247619 0 1 0 1014.247619 512 502.832762 502.832762 0 0 0 512 9.752381z" fill="#351D14" p-id="8647"></path><path d="M721.67619 441.197714m-105.520761 0a105.520762 105.520762 0 1 0 211.041523 0 105.520762 105.520762 0 1 0-211.041523 0Z" fill="#FFFFFF" p-id="8648"></path><path d="M721.67619 551.789714a110.592 110.592 0 1 1 110.396953-110.592A110.787048 110.787048 0 0 1 721.67619 551.789714z m0-211.236571a100.839619 100.839619 0 1 0 100.644572 100.644571A100.839619 100.839619 0 0 0 721.67619 340.553143z" fill="#351D14" p-id="8649"></path><path d="M721.67619 441.197714m-75.28838 0a75.288381 75.288381 0 1 0 150.576761 0 75.288381 75.288381 0 1 0-150.576761 0Z" fill="#351D14" p-id="8650"></path><path d="M765.17181 440.612571a78.019048 78.019048 0 0 0-27.696762 19.504762 133.412571 133.412571 0 0 0-15.798858 36.08381 124.050286 124.050286 0 0 0-16.384-34.328381 92.842667 92.842667 0 0 0-27.501714-21.260191 75.873524 75.873524 0 0 0 29.452191-19.504761 112.152381 112.152381 0 0 0 14.433523-36.08381 145.310476 145.310476 0 0 0 15.408762 34.328381 84.065524 84.065524 0 0 0 28.086858 21.26019zM771.413333 403.553524a23.210667 23.210667 0 0 0-7.411809 5.266286 35.498667 35.498667 0 0 0-4.291048 9.75238 35.303619 35.303619 0 0 0-4.486095-9.167238 23.79581 23.79581 0 0 0-7.41181-5.851428 19.504762 19.504762 0 0 0 7.996953-5.266286 28.476952 28.476952 0 0 0 3.900952-9.557333 33.158095 33.158095 0 0 0 4.096 9.167238 20.870095 20.870095 0 0 0 7.606857 5.656381z" fill="#FFF0A6" p-id="8651"></path><path d="M312.07619 441.197714m-105.520761 0a105.520762 105.520762 0 1 0 211.041523 0 105.520762 105.520762 0 1 0-211.041523 0Z" fill="#FFFFFF" p-id="8652"></path><path d="M312.07619 551.789714a110.592 110.592 0 1 1 110.396953-110.592A110.787048 110.787048 0 0 1 312.07619 551.789714z m0-211.236571a100.839619 100.839619 0 1 0 100.644572 100.644571A100.839619 100.839619 0 0 0 312.07619 340.553143z" fill="#351D14" p-id="8653"></path><path d="M312.07619 441.197714m-75.28838 0a75.288381 75.288381 0 1 0 150.576761 0 75.288381 75.288381 0 1 0-150.576761 0Z" fill="#351D14" p-id="8654"></path><path d="M355.376762 440.612571a78.019048 78.019048 0 0 0-27.696762 19.504762 133.412571 133.412571 0 0 0-15.60381 36.08381 124.050286 124.050286 0 0 0-16.384-34.328381 92.842667 92.842667 0 0 0-27.501714-21.260191 75.873524 75.873524 0 0 0 29.452191-19.504761 112.152381 112.152381 0 0 0 14.433523-36.08381 145.310476 145.310476 0 0 0 15.408762 34.328381 84.065524 84.065524 0 0 0 27.89181 21.26019zM361.618286 403.553524a23.210667 23.210667 0 0 0-7.41181 5.266286 35.498667 35.498667 0 0 0-4.291047 9.75238 35.303619 35.303619 0 0 0-4.486096-9.167238 23.79581 23.79581 0 0 0-7.411809-5.851428 19.504762 19.504762 0 0 0 7.996952-5.266286 28.476952 28.476952 0 0 0 3.900953-9.557333 40.96 40.96 0 0 0 4.096 9.167238 20.870095 20.870095 0 0 0 7.606857 5.656381z" fill="#FFF0A6" p-id="8655"></path><path d="M413.110857 606.98819s17.749333 229.766095 110.006857 230.546286c63.585524 0 69.241905-67.486476 84.260572-127.561143 13.263238-53.248 23.015619-97.52381 23.015619-97.523809l-62.805334-13.068191-39.009523-26.331428L474.745905 604.647619z" fill="#DB263C" p-id="8656"></path><path d="M523.117714 837.534476c60.464762 0 68.461714-61.049905 82.115048-118.784a100.059429 100.059429 0 0 0-167.740952 16.774095c16.579048 52.662857 43.105524 101.61981 85.625904 102.009905z" fill="#F96472" p-id="8657"></path><path d="M672.914286 595.675429a4.681143 4.681143 0 0 0-6.631619-1.365334 100.644571 100.644571 0 0 1-70.412191 6.046476 123.075048 123.075048 0 0 1-64.950857-36.473904l-1.755429-1.755429h-4.486095l-1.560381 1.560381a125.805714 125.805714 0 0 1-64.560762 34.328381 101.424762 101.424762 0 0 1-70.41219-5.851429 4.87619 4.87619 0 1 0-5.461333 8.192 78.019048 78.019048 0 0 0 25.746285 8.582096c0 24.185905 9.947429 234.057143 114.688 234.057143 63.975619 0 71.972571-50.322286 79.189334-94.793143 1.560381-8.97219 2.925714-18.139429 4.87619-26.916572a604.647619 604.647619 0 0 1 31.792762-108.446476 83.480381 83.480381 0 0 0 32.572952-9.752381 4.87619 4.87619 0 0 0 1.365334-7.411809z m-75.288381 122.88c-1.950476 8.97219-3.31581 18.334476-4.876191 27.501714-7.606857 46.421333-14.043429 86.601143-69.632 86.601143-92.452571 0-103.765333-193.877333-104.935619-222.159238a144.725333 144.725333 0 0 0 42.325334-2.730667A137.508571 137.508571 0 0 0 526.628571 573.830095a133.022476 133.022476 0 0 0 66.901334 36.08381 169.886476 169.886476 0 0 0 30.817524 3.120762h3.315809a659.846095 659.846095 0 0 0-30.037333 105.520762zM331.580952 237.177905c14.628571 5.656381 29.062095 11.702857 43.300572 18.334476a80.164571 80.164571 0 0 1 20.870095 10.337524 54.418286 54.418286 0 0 1 15.213714 19.504762v1.560381a54.02819 54.02819 0 0 1-24.380952-4.486096 81.334857 81.334857 0 0 1-19.504762-13.848381c-12.288-9.362286-24.380952-19.504762-36.083809-29.842285v-1.365334s0.585143-0.390095 0.585142-0.195047zM703.341714 238.933333c-11.702857 10.337524-23.79581 20.48-36.083809 29.842286a81.334857 81.334857 0 0 1-19.504762 13.848381 54.02819 54.02819 0 0 1-24.380953 4.486095 1.170286 1.170286 0 0 1-1.170285-1.170285 54.418286 54.418286 0 0 1 15.213714-19.504762 80.164571 80.164571 0 0 1 20.870095-10.337524c14.238476-6.631619 28.672-12.678095 43.300572-18.334476a1.170286 1.170286 0 0 1 1.365333 0s0.78019 0.78019 0.390095 1.170285z" fill="#351D14" p-id="8658"></path>
              </svg>
            </div>
            <el-pagination v-if="cityList.length != 0" background layout="prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
        <div v-show="cityOrPost == 2" class="post-history">
          <CardPage :postData="postData" :total="total"></CardPage>
        </div>
      </div>
    </div>
</template>

<script>
import CardPage from './card'

import { getToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
import { formatTime } from '@/utils/index'

import fileApi from '@/api/file'
import personalApi from '@/api/personal'

import '~/assets/css/userHome.css'
export default {
  // async asyncData([params, error]) {
  // },
  components: {
    CardPage,
  },
  data() {
    return {
      imgPref: 'http://localhost/images/download?fileName=',
      activeIndex: 1,  // 选中的个人记录
      cityOrPost: 1,  // 选中的个人记录
      avatarUrl: '',  // 上传的头像
      nickName: '', // 用户名
      autograph: '',  // 个性签名
      editUserVisible: false, // 用户资料编辑是否可见
      pwdVisible: false, // 用户资料编辑是否可见
      oldPwd: '', // 旧密码
      newPwd: '', // 新密码
      comfirmPwd: '', // 确认密码
      current: 1, // 页码
      limit: 5, // 每页记录数
      total: 0, // 总记录数
      postData: [], // 用户发布的帖子列表
      cityList: [], // 访问的城市记录列表
      messageNum: 0,  // 消息数量
      praiseList: [], // 点赞列表
      browsedList: [], // 浏览列表
      token: null,
    }
  },
  created() {
    var token = getToken()
    if(token != null) {
      this.token = token
    } else {
      window.location.href = '/login'
    }

    this.getPostData(this.activeIndex)
  },
  methods: {
    // 修改密码
    updatePwd() {
      // 旧密码与新密码相同时
      if(this.oldPwd == this.newPwd) {
        this.$message.error('旧密码不能与新密码相同！');
        return false
      } else if(this.newPwd != this.comfirmPwd) { // 两次输入的密码不一致时
        this.$message.error('两次密码不一致！');
        return false
      } else {
        var userPwd = {
          id: this.token.id,
          oldPassword: this.oldPwd,
          newPassword: this.newPwd
        }

        personalApi.updatePassword(userPwd).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功，请重新登录！'
          });

          removeToken()

          window.location.href = '/login'
        })
      }
    },
    // 修改用户信息
    updateUserInfo() {
      if(this.nickName == '') {
        this.$message.error('用户名不能为空！');
      } else {
        this.token.nickName = this.nickName
        this.token.avatarUrl = this.avatarUrl
        this.token.autograph = this.autograph

        personalApi.updateUserInfo(this.token).then(res => {
          // 更新token
          setToken(res.data)

          // 刷新页面
          this.$router.go(0)
          
          if(this.avatarUrl != this.token.avatarUrl) {
            // 删除旧头像
            fileApi.deleteImage(this.token.avatarUrl).then()
          }

          this.$message({
            type: 'success',
            message: '个人资料修改成功！'
          });
        })
      }
    },
    // 头像上传成功后回调
    handleAvatarSuccess(res) {
        this.avatarUrl = res.data;
    },
    // 上传前监测
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    // 关闭对话框监听
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.clearPwd()

          if(this.avatarUrl != '' && this.avatarUrl != this.token.avatarUrl) {
            fileApi.deleteImage(this.avatarUrl).then(res => {
              console.log(11111)
            })
          }

          done();
        })
        .catch(_ => {});
    },
    // 清空密码
    clearPwd() {
      this.oldPwd = ''
      this.newPwd = ''
      this.comfirmPwd = ''
    },
    // 显示修改个人信息对话框
    showEditUserInfo() {
      // 初始化修改个人信息的数据
      this.avatarUrl = this.token.avatarUrl
      this.nickName = this.token.nickName
      this.autograph = this.token.autograph

      this.editUserVisible = true
    },
    // 跳转到城市详情页面
    toDetail(id) {
      window.location.href = '/strategy?id=' + id
    },
    // 初始化数据
    getPostData(activeIndex, cityOrPost) {
      this.cityOrPost = 1

      if(activeIndex == 1) {
        personalApi.getUserPost(this.token.id, this.current, this.limit).then(res => {
          this.setData(res.data, res.data.total)
        })
      } else if (activeIndex == 3) {
        personalApi.getPraisePost(this.token.id, this.current, this.limit).then(res => {
          this.setData(res.data, res.data.total)
        })
      } else if (activeIndex == 4) {
        if (cityOrPost == 1) {
          personalApi.getBrowsePost(this.token.id, 'CITY', this.current, this.limit).then(res => {
            this.cityList = res.data.records
            this.total = res.data.total
          })
        } else {
          personalApi.getBrowsePost(this.token.id, 'POST', this.current, this.limit).then(res => {
            this.setData(res.data, res.data.total)
          })
        }
      }
    },
    // 设置获取的页面值
    setData(data, total) {
      this.postData = data,
      this.total = total

      this.format()
    },
    // 格式化时间
    format() {
      for(var i = 0; i < this.postData.records.length; i++) {
          this.postData[i].records.createTime = formatTime(new Date(this.postData[i].records.createTime))
        }
    }
  }
}
</script>