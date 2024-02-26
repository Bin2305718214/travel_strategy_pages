<template>
    <div class="post-detail-container" style="padding: 20px;">
        <div class="back-to-prev" style="margin: 20px;">
            <el-page-header @back="goBack" content="游记列表"></el-page-header>
        </div>
        <!-- 城市介绍 -->
        <div class="city-info" style="margin-bottom: 20px; text-align: center;">
            <table cellspacing="20">
                <tr>
                    <td>
                        <div>
                            <img :src="imgPref + post.avatarUrl" style="width: 80px; height: 80px; border-radius: 50%;"/>
                            <div>{{post.nickName}}</div>
                        </div>
                    </td>
                    <td>
                        <img style="width: 300px; height: 200px; border-radius: 10px;" :src="imgPref + post.coverImg">
                    </td>
                </tr>
                <tr>
                    <th>标题</th>
                    <td>{{ post.title }}</td>
                </tr>
                <tr>
                    <th>游记文章</th>
                    <td>
                        <pre>{{ post.content }}</pre>
                    </td>
                </tr>
                <tr>
                    <th>游记图片</th>
                    <td v-for="(item, index) in post.postImgs" :key="index">
                        <img style="width: 300px; height: 200px; border-radius: 10px;" :src="imgPref + item">
                    </td>
                </tr>
            </table>
        </div>
        <!-- banner列表 -->
        <el-table :data="postCommentList" stripe style="width: 100%;">
            <el-table-column prop="id" label="评论编号"/>
            <el-table-column prop="nickName" label="评论用户"/>
            <el-table-column prop="avatarUrl" label="评论用户头像">
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
            <el-table-column prop="parentUserName" label="回复用户"/>
            <el-table-column prop="content" label="评论内容"/>
            <el-table-column prop="createTime" label="发布时间"/>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    &nbsp;
                    <el-button width="45%" type="danger" size="mini" 
                        icon="el-icon-delete" @click="removeById(scope.row)">删除</el-button>
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
            imgPref: 'http://localhost:8888/images/download?fileName=',
            postId: 0,  // 游记id
            post: {},   // 游记信息
            postCommentList: [],    // 游记评论
            current: 1, // 当前页
            limit: 10,   // 每页记录数
            total: 0,    // 数据总量
        }
    },
    created() {
        this.postId = this.$route.params.id

        // 获取文案信息
        this.getData()
    },
    methods: {
        removeById(postComment) {
            this.$confirm("此操作将永久删除除游记评论, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                postApi.deletePostComment(postComment).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });

                    this.getData()
                })
            });
        },
        // 获取评论信息
        getData(page = 1) {
            this.current = page
            postApi.getPostCommentList(this.postId, this.current, this.limit).then(res => {
                this.post = res.data.post
                this.post.postImgs = this.post.postImgs.split(',')

                this.postCommentList = res.data.postComments.records
                // 总记录数
                this.total = res.data.postComments.total
            })
        },
        // 返回游记列表页面
        goBack() {
            this.$router.push({path: '/post/list'})
        },
    }
})
</script>