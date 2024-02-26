<template>
  <div class="edit-container">
    <div class="back-to-prev" style="margin: 20px;">
      <el-page-header @back="goBack" content="城市信息详情"></el-page-header>
    </div>
    <el-form label-width="120px" style="margin: 20px 30px 0 0">
        <el-form-item v-if="!hasCityId" label="编号">
          <el-input v-model="info.id"/>
        </el-form-item>
        <el-form-item label="城市编号">
          <el-input :disabled="hasCityId" v-model="info.cityId"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="info.name"/>
        </el-form-item>
        <el-form-item v-if="!path.includes('practicalInfo')" label="拼音">
          <el-input v-model="info.pinyin"/>
        </el-form-item>
        <el-form-item v-if="!path.includes('practicalInfo')" label="介绍">
          <el-input type="textarea" v-model="info.intro"/>
        </el-form-item>
        <el-form-item v-if="!path.includes('festival') && !path.includes('practicalInfo')" label="封面图">
          <el-upload
            class="avatar-uploader"
            action="http://localhost/images/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="info.coverImg" :src="imgPref + info.coverImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="!path.includes('specialSnacks') && !path.includes('practicalInfo')" label="地址">
          <el-input v-model="info.address"/>
        </el-form-item>
        <el-form-item v-if="path.includes('festival')" label="举办日期">
          <el-input v-model="info.date"/>
        </el-form-item>
        <el-form-item v-if="path.includes('hotel') || path.includes('restaurant')" label="电话">
          <el-input v-model="info.phone"/>
        </el-form-item>
        <el-form-item v-if="path.includes('hotel') || path.includes('restaurant')" label="价格">
          <el-input v-model="info.price"/>
        </el-form-item>
        <el-form-item v-if="path.includes('practicalInfo')" label="内容">
          <el-input type="textarea" v-model="info.content"/>
        </el-form-item>
        <el-form-item v-if="path.includes('scenicSpot')" label="开放时间">
          <el-input v-model="info.openingTime"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import scenicSpotApi from '@/api/scenicSpot'
import festivalApi from '@/api/festival'
import hotelApi from '@/api/hotel'
import specialSnacksApi from '@/api/specialSnacks'
import restaurantApi from '@/api/restaurant'
import shoppingApi from '@/api/shopping'
import practicalInfoApi from '@/api/practicalInfo'

export default {
  data() {
    return {
      imgPref: 'http://localhost:8888/images/download?fileName=',  // 图片访问前缀
      api: null,  // 动态api
      path: '',  //路径
      hasCityId: false,  // 是否有cityId
      info: {
        coverImg: ''
      }, // 添加的信息
    }
  },
  created() {
    // 获取路由传递的id值
    if(this.$route.params) {
      this.path = this.$route.path
      
      // 选择对应Api
      this.chooseApi(this.path)

      if(this.path.includes('add')) {
        this.info.cityId = this.$route.params.cityId
        this.hasCityId = true
      } else if(this.path.includes('edit')) {
        const id = this.$route.params.id
        // 调用接口得到对应信息
        this.getInfo(id)
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.info.coverImg = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      return isJPG;
    },
    // 添加或编辑医院设置信息
    saveOrUpdate() {
      if(this.hasCityId) {  // 没有id，添加操作
        this.save()
      } else {  // 有id，做修改操作
        this.update()
      }
    },
    // 修改
    update() {
      this.api.update(this.info).then(res => {
        // 提示
        this.$message({
            type: 'success',
            message: '编辑成功!',
        });
        // 跳转回信息显示页面，使用路由信息跳转方式
        this.$router.push({path: '/city/details/' + this.info.cityId})
      })
    },
    // 添加
    save() {
      this.api.save(this.info).then(res => {
        // 提示
        this.$message({
            type: 'success',
            message: '添加成功!',
        });
        // 跳转回信息显示页面，使用路由信息跳转方式
        this.$router.push({path: '/city/details/' + this.info.cityId})
      })
    },
    // 根据id查询对应信息
    getInfo(id) {
      this.api.getById(id).then(res => {
        this.info = res.data
      })
    },
    // 选择Api
    chooseApi(path) {
      if(path.includes('scenicSpot')) {
        this.api = scenicSpotApi
      } else if(path.includes('festival')) {
        this.api = festivalApi
      } else if(path.includes('hotel')) {
        this.api = hotelApi
      } else if(path.includes('specialSnacks')) {
        this.api = specialSnacksApi
      } else if(path.includes('restaurant')) {
        this.api = restaurantApi
      } else if(path.includes('shopping')) {
        this.api = shoppingApi
      } else if(path.includes('practicalInfo')) {
        this.api = practicalInfoApi
      }
    },
    // 返回上个页面
    goBack() {
      this.$router.push({path: '/city/details/' + this.info.cityId})
    },
  }
}
</script>
  
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>