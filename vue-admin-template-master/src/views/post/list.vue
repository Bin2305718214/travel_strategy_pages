<template>
    <div class="post-container" style="padding: 20px;">
        <!-- banner列表 -->
        <el-table :data="postList" stripe style="width: 100%;">
            <el-table-column prop="id" label="游记编号"/>
            <el-table-column prop="nickName" label="作者"/>
            <el-table-column prop="avatarUrl" label="作者头像">
                <template #default="scope">
                <div class="demo-image">
                    <el-image
                    style="width: 80px; height: 80px"
                    :src="imgPref + scope.row.avatarUrl"
                    fit="fill"
                    ></el-image>
                </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="coverImg" label="封面">
                <template #default="scope">
                <div class="demo-image">
                    <el-image
                    style="width: 120px; height: 80px"
                    :src="imgPref + scope.row.coverImg"
                    fit="fill"
                    ></el-image>
                </div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间"/>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    &nbsp;
                    <router-link width="30%" :to="'/post/detail/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
                    </router-link>
                    &nbsp;
                    <el-button width="45%" type="danger" size="mini" 
                        icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :current-page="current" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getData" />
    </div>
</template>

<script>
// 引入接口定义的js文件
import postApi from '@/api/post'

export default ({
    //  定义变量和初始值
    data() {
        return {
            imgPref: 'http://localhost/images/download?fileName=',
            current: 1, // 当前页
            limit: 10,   // 每页记录数
            postList: [],    //每页数据集合
            total: 0,    // 数据总量
        }
    },
    created() {
        // 获取游记信息
        this.getData()
    },
    methods: {
        // 根据id删除对应的游记
        removeById(id) {
            this.$confirm("此操作将永久删除除游记信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                postApi.deletePostById(id).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });

                    this.getData()
                })
            });
        },
        // 获取游记信息
        getData(page = 1) {
            this.current = page
            postApi.getPostList(this.current, this.limit).then(res => {
                // 返回集合
                this.postList = res.data.data.records
                // 总记录数
                this.total = res.data.data.total
            })
        },
    }
})
</script>