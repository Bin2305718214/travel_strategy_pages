<template>
  <div class="header-container-index">
    <div class="head-bg">
      <div class="container">
        <div class="head-logo">
          <a :href="'/'"><span><img src="~assets/images/logo.png" /></span></a>
        </div>
        <div class="top-nav">
            <ul class="cl-effect-1">
              <li><a :href="'/'">首页</a></li>
              <li><a :href="'/strategy'">攻略</a></li>
              <li><a :href="'/discuss'">讨论</a></li>
              <li v-if="token == null"><a :href="'/login'">登录/注册</a></li>
              <li v-else>
                <el-dropdown>
                  <a class="user-info">
                    <img :src="'http://localhost:8888/images/download?fileName=' + token.avatarUrl">
                    <span>{{ token.nickName }}</span>
                  </a>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="gotoUserHome()">我的</el-dropdown-item>
                    <el-dropdown-item v-if="isAdmin" @click.native="gotoAdmin()">后台管理</el-dropdown-item>
                    <el-dropdown-item @click.native="logout()">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      token: null,  // token
      isAdmin: false, // 是否为管理员
    }
  },
  created() {
    this.token = getToken()

    if(this.token && (this.token.role == 'ROLE_admin' || this.token.role == 'ROLE_super')) {
      this.isAdmin = true
    }

  },
  methods: {
    // 注销
    logout() {
      removeToken()

      if(this.$route.path == '/user_home') {
        window.location.href = '/'
      } else {
        this.$router.go(0)
      }
    },
    // 跳转到后台管理界面
    gotoAdmin() {
      window.location.href = 'http://localhost:9528/'
    },
    gotoUserHome() {
      window.location.href = '/user_home'
    },
  },
}
</script>