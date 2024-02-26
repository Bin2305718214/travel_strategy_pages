<template>
    <div class="copywriting-container" style="padding: 20px;">
        <!-- banner列表 -->
        <el-table :data="copywriting" stripe style="width: 100%">
            <el-table-column type="index" width="60" label="序号"/>
            <el-table-column width="120" prop="id" label="文案编号"/>
            <el-table-column width="120" prop="title" label="标题"/>
            <el-table-column width="250" prop="text" label="文本"/>
            <el-table-column prop="note" label="小计"/>
            <el-table-column width="170" prop="createTime" label="创建时间"/>
            <el-table-column width="170" prop="updateTime" label="修改时间"/>
            <el-table-column label="操作" width="240" align="center">
                <template slot-scope="scope">
                    &nbsp;
                    <router-link width="45%" :to="'/copywriting/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
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
import copywritingApi from '@/api/copywriting'

export default ({
    //  定义变量和初始值
    data() {
        return {
            current: 1, // 当前页
            limit: 10,   // 每页记录数
            copywriting: [],    //每页数据集合
            total: 0,    // 数据总量
        }
    },
    created() {
        // 获取文案信息
        this.getData()
    },
    methods: {
        // 删除文案信息
        removeById(id) {
            this.$confirm('此操作将永久删除除该文案, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                copywritingApi.delete(id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    this.getData()
                })
            })
        },
        // 获取文案信息
        getData(page = 1) {
            this.current = page
            copywritingApi.getList(this.current, this.limit).then(res => {
                // 返回集合
                this.copywriting = res.data.records
                // 总记录数
                this.total = res.data.total
            })
        },
    }
})
</script>
