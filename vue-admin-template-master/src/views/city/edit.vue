<template>
  <div class="edit-container">
    <el-form label-width="120px" style="margin: 20px 30px 0 0">
      <el-form-item
        label="城市编号"
      >
        <el-input required="" v-show="showIdInput" :disabled="isAdd" v-model="city.id" />
      </el-form-item>
      <el-form-item label="城市名">
        <el-input v-if="!isAdd" v-model="city.name" />
        <div v-else>
          <el-select
            v-model="provinceName"
            placeholder="请选择省"
            style="margin-right: 30px"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click.native="getCityList(item.id)"
            />
          </el-select>
          <el-select v-model="cityName" placeholder="请选择城市">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click.native="setCityId(item.name, item.id)"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="城市拼音">
        <el-input v-model="city.pinyin" />
      </el-form-item>
      <el-form-item label="城市介绍">
        <el-input type="textarea" v-model="city.intro" />
      </el-form-item>
      <el-form-item label="封面图1">
        <el-upload
          class="avatar-uploader"
          action="http://localhost/images/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="city.coverImg1"
            :src="imgPref + city.coverImg1"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="封面图2">
        <el-upload
          class="avatar-uploader"
          action="http://localhost/images/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="city.coverImg2"
            :src="imgPref + city.coverImg2"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="推荐时间">
        <el-input type="textarea" v-model="city.recommTime" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
import cityApi from "@/api/city";

export default {
  data() {
    return {
      imgPref: "http://localhost:8888/images/download?fileName=", // 图片访问前缀
      provinceList: [], // 省份列表
      provinceName: "",
      cityList: [], // 城市列表
      cityName: "",
      city: {
        name: "",
        coverImg1: "",
        coverImg2: "",
      }, // 添加的城市信息
      isAdd: true,
      showIdInput: true,
    };
  },
  created() {
    // 获取路由传递的id值
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      // 调用接口得到医院设置信息
      this.getCity(id);
      thi.isAdd = false
    } else {
      this.getProvinceList();
    }
  },
  methods: {
    // 设置城市id
    setCityId(name, id) {
      this.showIdInput = false;

      this.city.id = id;
      this.city.name = name.split("市")[0];

      this.showIdInput = true;
    },
    // 获取城市列表
    getCityList(id) {
      cityApi.getCityListByProvince(id).then((res) => {
        this.cityList = res.data;
      });
    },
    // 获取省份列表
    getProvinceList() {
      cityApi.getByDictCode("Province").then((res) => {
        this.provinceList = res.data;
      });
    },
    // 根据id查询医院设置信息
    getCity(id) {
      cityApi.getCityById(id).then((res) => {
        this.city = res.data;
      });
    },
    // 封面图2上传成功的回调
    handleAvatarSuccess2(res) {
      this.city.coverImg2 = res.data;
    },
    // 封面图1上传成功的回调
    handleAvatarSuccess1(res) {
      if(this.postObj.coverImg1 && this.postObj.coverImg1 != res.data) {
        fileApi.deleteImage(this.postObj.coverImg1).then()
      }

      this.city.coverImg1 = res.data;
    },
    // 图片上传前执行，限制上传文件的类型
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    // 添加
    save() {
      cityApi.saveCity(this.city).then((res) => {
        // 提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        // 跳转回信息显示页面，使用路由信息跳转方式
        this.$router.push({ path: "/city/list" });
      });
    },
    // 修改
    update() {
      cityApi.updateCity(this.city).then((res) => {
        // 提示
        this.$message({
          type: "success",
          message: "编辑成功!",
        });
        // 跳转回信息显示页面，使用路由信息跳转方式
        this.$router.push({ path: "/city/list" });
      });
    },
    // 添加或编辑医院设置信息
    saveOrUpdate() {
      if (this.isAdd) {
        // 没有id，添加操作
        this.save();
      } else {
        // 有id，做修改操作
        this.update();
      }
      
    },
  },
};
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
  border-color: #409eff;
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