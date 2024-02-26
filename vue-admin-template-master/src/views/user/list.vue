<template>
    <div class="copywriting-container" style="padding: 20px;">
        <!-- banner列表 -->
        <el-table :data="userList" stripe style="width: 100%;">
            <el-table-column width="120" prop="id" label="用户编号"/>
            <el-table-column width="200" prop="email" label="邮箱"/>
            <el-table-column prop="nickName" label="用户名称"/>
            <el-table-column prop="avatarUrl" label="用户头像">
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
            <el-table-column prop="autograph" label="个性签名" />
            <el-table-column prop="avatarUrl" label="用户权限">
                <template #default="scope">
                <div v-show="scope.row.role == 'ROLE_common'">用户</div>
                <div v-show="scope.row.role == 'ROLE_admin'">管理员</div>
                </template>
            </el-table-column>
            <el-table-column prop="avatarUrl" label="状态">
                <template #default="scope">
                <div v-show="scope.row.status == 0" style="color:red; font-weight: bold;">不可用</div>
                <div v-show="scope.row.status == 1" style="color:green; font-weight: bold;">可用</div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column label="操作" width="320" align="center">
                <template slot-scope="scope">
                    &nbsp;
                    <el-button type="primary" size="mini" icon="el-icon-edit" :disabled="token.role != 'ROLE_super'"
                        @click="getAuthority(scope.row.id, scope.row.role)">修改权限</el-button>
                    &nbsp;
                    <el-button v-show="scope.row.status == 0" type="success" size="mini"
                        @click="changeSatus(scope.row.id)" icon="el-icon-edit">启用</el-button>
                    <el-button v-show="scope.row.status == 1" type="danger" size="mini"
                        @click="changeSatus(scope.row.id)" icon="el-icon-edit" :disabled="token.id == scope.row.id">禁用</el-button>
                    &nbsp;
                    <el-button width="45%" type="danger" size="mini" :disabled="token.id == scope.row.id"
                        icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-radio v-for="(item,index) in authoritys" :key="index" v-model="radio" :label="item.id">
                {{ item.authority == 'ROLE_admin'?'系统管理员':'普通用户'}}</el-radio>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUserRole()">确 定</el-button>
            </span>
            </el-dialog>

        <!-- 分页 -->
        <el-pagination :current-page="current" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getData" />
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import userApi from '@/api/user'

export default ({
    //  定义变量和初始值
    data() {
        return {
            imgPref: 'http://localhost:8888/images/download?fileName=',
            current: 1, // 当前页
            limit: 10,   // 每页记录数
            userList: [],    //每页数据集合
            authoritys: [], // 权限
            userId: 0,  // 修改的用户id
            radio: 1,   // 权限选项
            dialogVisible: false,   // 权限修改是否可见
            total: 0,    // 数据总量
            token: null
        }
    },
    created() {
        this.token = getToken()

        // 获取用户信息
        this.getData()
    },
    methods: {
        // 删除对应用户信息
        removeById(id) {
            this.$confirm("此操作将永久删除除用户信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                userApi.deleteUser(id).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });

                    this.getData()
                })
            });
        },
        // 修改用户状态
        changeSatus(id) {
            this.$confirm("此操作将永久修改用户状态, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                userApi.changeUserStatus(id).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });

                    this.getData()
                })
            });
        },
        // 修改用户权限
        changeUserRole() {
            userApi.changeUserAuthority(this.userId, this.radio).then(res => {
                this.dialogVisible = false

                this.getData()
            })
        },
        // 权限修改对话框关闭监听
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.userId = 0
                done();
            })
            .catch(_ => {});
        },
        // 获取权限
        getAuthority(id, role) {
            userApi.getAuthorityList().then(res => {
                this.authoritys = res.data
                this.userId = id

                if(role == 'ROLE_admin') {
                    this.radio = 1
                } else {
                    this.radio = 2
                }

                this.dialogVisible = true
            })
        },
        // 获取用户信息
        getData(page = 1) {
            this.current = page
            userApi.getUserList(this.current, this.limit).then(res => {
                // 返回集合
                this.userList = res.data.records
                // 总记录数
                this.total = res.data.total
            })
        },
    }
})
</script>