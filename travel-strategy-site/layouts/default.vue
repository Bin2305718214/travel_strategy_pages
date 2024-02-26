<template>
  <client-only>
    <div class="app-container-index">
      <div id="main">
        <!-- 公共头 -->
        <myheader/>
        <div class="main-container">
          <el-scrollbar class='page-component__scroll'>
            <!-- 内容区域 -->
            <nuxt/>
          </el-scrollbar>
        </div>
          <!-- 公共底 -->
        <myfooter/>
        <el-backtop target=".app-container-index"></el-backtop>
      </div>
    </div>
  </client-only>
</template>

<script>
import '~/assets/css/app.css'
import '~/assets/css/index.css'
import '~/assets/css/comment.css'
import '~/assets/css/li.css'

import myheader from './myheader'
import myfooter from './myfooter'
export default {
  components: {
    myheader,myfooter
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
}
</script>