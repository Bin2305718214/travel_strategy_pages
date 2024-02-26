<template>
    <div class="edit-container">
      <el-form label-width="120px">
          <el-form-item v-if="hasCopywritingId" label="编号">
            <el-input v-model="copywriting.id"/>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="copywriting.title"/>
          </el-form-item>
          <el-form-item label="文本">
            <el-input v-model="copywriting.text"/>
          </el-form-item>
          <el-form-item label="小计">
            <el-input v-model="copywriting.note"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
          </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import copywritingApi from '@/api/copywriting'
  
  export default {
    data() {
      return {
        copywriting: {},   // 添加的文案信息
        hasCopywritingId: false // 存在文案id，为修改
      }
    },
    created() {
      // 获取路由传递的id值
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        // 调用接口得到医院设置信息
        this.getCopywriting(id)
      }
    },
    methods: {
      // 添加或编辑医院设置信息
      saveOrUpdate() {
        if(!this.copywriting.id) {  // 没有id，添加操作
          this.save()
        } else {  // 有id，做修改操作
          this.update()
          this.hasCopywritingId = true
        }
      },
      // 修改
      update() {
        copywritingApi.update(this.copywriting).then(res => {
          // 提示
          this.$message({
              type: 'success',
              message: '编辑成功!',
          });
          // 跳转回信息显示页面，使用路由信息跳转方式
          this.$router.push({path: '/copywriting/list'})
        })
      },
      // 添加
      save() {
        copywritingApi.save(this.copywriting).then(res => {
          // 提示
          this.$message({
              type: 'success',
              message: '添加成功!',
          });
          // 跳转回信息显示页面，使用路由信息跳转方式
          this.$router.push({path: '/copywriting/list'})
        })
      },
      // 根据id查询文案信息
      getCopywriting(id) {
        copywritingApi.getById(id).then(res => {
          this.copywriting = res.data
        })
      },
    }
  }
  </script>