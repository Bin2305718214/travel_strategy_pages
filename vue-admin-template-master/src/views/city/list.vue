<template>
  <div class="city-container" style="padding: 20px;">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.provinceCode" placeholder="请选择省">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="城市名称" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getCityData()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="城市代码" />
      <el-table-column prop="name" label="城市名称" />
      <el-table-column prop="pinyin" label="城市拼音" />
      <el-table-column prop="coverImg1" label="封面图1">
        <template #default="scope">
          <div class="demo-image">
            <el-image
              style="width: 100px; height: 100px"
              :src="imgPref + scope.row.coverImg1"
              fit="fill"
              :preview-src-list="[imgPref + scope.row.coverImg1]"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="coverImg2" label="封面图2">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgPref + scope.row.coverImg2"
            fit="fill"
            :preview-src-list="[imgPref + scope.row.coverImg2]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="readingNum" label="阅览量" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link width="30%" :to="'/city/details/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >详情</el-button
            >
          </router-link>
          &nbsp;
          <router-link width="30%" :to="'/city/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
          &nbsp;
          <el-button
            width="30%"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
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
      @current-change="getCityData"
    />
  </div>
</template>

<script>
// 引入接口定义的js文件
import cityApi from "@/api/city";

export default {
  //  定义变量和初始值
  data() {
    return {
      imgPref: "http://localhost:8888/images/download?fileName=",
      multipleSelection: [], // 批量选择中选择的记录列表
      current: 1, // 当前页
      limit: 10, // 每页记录数
      searchObj: {
        provinceCode: null,
        name: "",
      }, // 封装对象
      list: [], //每页数据集合
      total: 0, // 数据总量
      provinceList: [], // 所有省的集合
    };
  },
  created() {
    // 获取城市信息
    this.getCityData();
    // 获取省列表
    this.getProvinceList();
  },
  methods: {
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    // 批量删除
    removeRows() {
      this.$confirm("此操作将永久删除城市信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var idList = [];
        // 遍历得到每个id值，添加到idList中
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var id = this.multipleSelection[i].id;
          idList.push(id);
        }

        cityApi.batchRemoveCity(idList).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getCityData();
        });
      });
    },
    // 删除城市信息
    removeDataById(id) {
      this.$confirm("此操作将永久删除除城市信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cityApi.deleteCity(id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getCityData();
        });
      });
    },
    // 清空查询条件
    resetData() {
      this.searchObj.provinceCode = null;
      this.searchObj.name = "";

      this.getCityData();
    },
    // 获取省列表
    getProvinceList() {
      cityApi.getByDictCode("Province").then((res) => {
        this.provinceList = res.data;
      });
    },
    // 获取城市信息
    getCityData(page = 1) {
      // 添加当前页的参数
      this.current = page;
      cityApi
        .getCityList(this.current, this.limit, this.searchObj)
        .then((res) => {
          // 请求成功回调
          // 返回集合赋值list
          this.list = res.data.records;
          // 总记录数
          this.total = res.data.total;
        });
    },
  },
};
</script>
