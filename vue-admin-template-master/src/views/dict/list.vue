<template>
    <div class="app-container" style="padding: 20px;">
        <el-table
        :data="dictList" style="width: 100%" row-key="id" border lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="编码" width="220">
                <template slot-scope="{row}">
                        {{ row.dictCode }}
                </template>
            </el-table-column>
            <el-table-column label="值" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import dict from '@/api/dict'

export default {
    data() {
        return {
            dialogImportVisible: false, // 设置是否弹出弹框
            dictList: [],    // 数据字典
        }
    },
    created() {
        this.getDictList(1)
    },
    methods: {
        // 导入数据字典
        importData() {
            this.dialogImportVisible = true
        },
        // 数据字典列表
        getDictList(id) {
            dict.dictList(id).then(res => {
                this.dictList = res.data
            })
        },
        // 查询子列表内容
        getChildrens(tree, treeNode, resolve) {
            dict.dictList(tree.id).then(res => {
                resolve(res.data)
            })
        }
    }
}
</script>