<template>
    <div class="edit-container">
        <div class="back-to-prev" style="margin: 20px;">
            <el-page-header @back="goBack" content="编辑实用信息"></el-page-header>
        </div>
        <el-form label-width="120px">
            <el-form-item v-if="!hasPracticalId" label="编号">
            <el-input v-model="info.id"/>
            </el-form-item>
            <el-form-item label="信息编号">
            <el-input :disabled="hasPracticalId" v-model="info.infoId"/>
            </el-form-item>
            <el-form-item label="名称">
            <el-input v-model="info.name"/>
            </el-form-item>
            <el-form-item label="电话">
            <el-input v-model="info.phone"/>
            </el-form-item>
            <el-form-item v-if="!isTel" label="地址">
            <el-input v-model="info.address"/>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import telApi from '@/api/tel'
import hospApi from '@/api/hosp'

export default {
    data() {
        return {
            api: null,  // 动态api
            cityId: 0,  // 城市id
            id: 0,  // 信息id
            hasPracticalId: false,  // 是否有practicalId
            info: {}, // 添加的信息
            isTel: false,   // 是否编辑电话信息
        }
    },
    created() {
        if(this.$route.params) {
            var path = this.$route.path

            this.cityId = this.$route.params.cityId
            this.id = this.$route.params.id

            if(path.includes('telTnfo')) {
                this.api = telApi
                this.isTel = true
            } else {
                this.api = hospApi
            }
            this.initData(path, this.id)
        }
    },
    methods: {
        // 添加或编辑医院设置信息
        saveOrUpdate() {
            if(this.hasPracticalId) {  // 没有id，添加操作
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
                this.$router.push({path: '/city/list/'})
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
                this.$router.push({path: '/city/list/'})
            })
        },
        // 根据id查询医院设置信息
        getInfo(id) {
            this.api.getById(id).then(res => {
                this.info = res.data
            })
        },
        // 返回上个页面
        goBack() {
            this.$router.push({path: '/city/details/' + this.cityId})
        },
        // 初始化数据
        initData(path, practicalId) {
            if(path.includes('add')) {
                this.hasPracticalId = true
                this.info.infoId = practicalId
            } else {
                // 调用接口得到对应信息
                this.getInfo(this.id)
            }
        }
    }
}
</script>