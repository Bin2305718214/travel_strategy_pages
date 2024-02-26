<template>
  <div class="treehole-container" style="padding: 20px;">
    <!-- banner列表 -->
    <el-table :data="treehole" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="id" label="树洞编号" />
      <el-table-column prop="nickName" label="用户名" />
      <el-table-column prop="avatarUrl" label="用户头像">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="
              'http://localhost:8888/images/download?fileName=' + scope.row.avatarUrl
            "
            fit="fill"
            lazy
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="树洞内容" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            width="45%"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getData"
    />
  </div>
</template>

<script>
// 引入接口定义的js文件
import treeholeApi from "@/api/treehole";

export default {
  //  定义变量和初始值
  data() {
    return {
      current: 1, // 当前页
      limit: 8, // 每页记录数
      treehole: [], //每页数据集合
      total: 0, // 数据总量
    };
  },
  created() {
    // 获取树洞信息
    this.getData();
  },
  methods: {
    // 删除树洞信息
    removeById(id) {
      this.$confirm("此操作将永久删除除该树洞信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        treeholeApi.delete(id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getData();
        });
      });
    },
    // 获取树洞信息
    getData(page = 1) {
      this.current = page;
      treeholeApi.getList(this.current, this.limit).then((res) => {
        // 返回集合
        this.treehole = res.data.records;
        // 总记录数
        this.total = res.data.total;
      });
    },
  },
};
</script>
