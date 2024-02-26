<template>
  <div class="details-container">
    <div class="back-to-prev" style="margin: 20px;">
      <el-page-header @back="goBack" content="城市列表"></el-page-header>
    </div>
    <!-- 城市介绍 -->
    <div class="city-info">
      <table cellspacing="20">
        <tr class="head">
          <th class="head-title">{{ city.name }}</th>
          <td class="head-small">{{ city.pinyin }}</td>
        </tr>
        <tr>
          <th>介绍：</th>
          <td>{{ city.intro }}</td>
        </tr>
        <tr>
          <th>推荐时间：</th>
          <td>{{ city.recommTime }}</td>
        </tr>
      </table>
    </div>

    <!-- 城市详情概览 -->
    <el-tabs
      class="city-details"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, index) in navList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <router-link :to="'/city/' + activeName + '/add/' + cityId">
          <el-button type="primary" size="mini" icon="el-icon-plus"
            >添加</el-button
          >
        </router-link>
        <!-- 除实用信息的信息概览 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="编号">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="城市代码">
                  <span>{{ props.row.cityId }}</span>
                </el-form-item>
                <el-form-item label="名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="拼音">
                  <span>{{ props.row.pinyin }}</span>
                </el-form-item>
                <el-form-item v-if="item.name != 'specialSnacks'" label="地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item v-if="item.name == 'festival'" label="举办日期">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item v-if="item.name == 'scenicSpot'" label="开放时间">
                  <span>{{ props.row.openingTime }}</span>
                </el-form-item>
                <el-form-item label="介绍">
                  <span>{{ props.row.intro }}</span>
                </el-form-item>
                <el-form-item
                  v-if="item.name == 'restaurant' || item.name == 'hotel'"
                  label="价格"
                >
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item
                  v-if="item.name == 'restaurant' || item.name == 'hotel'"
                  label="电话"
                >
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
              </el-form>
              操作&nbsp;
              <router-link
                :to="'/city/' + activeName + '/edit/' + props.row.id"
              >
                <el-button type="primary" size="mini" icon="el-icon-edit"
                  >编辑</el-button
                >
              </router-link>
              &nbsp;
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeById(props.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="id"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="拼音" prop="pinyin"></el-table-column>
          <el-table-column v-if="item.name != 'festival'" label="封面图" prop="coverImg">
            <template #default="scope">
                <div class="demo-image">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="imgPref + scope.row.coverImg"
                    fit="fill"
                    :preview-src-list="[imgPref + scope.row.coverImg]"
                    ></el-image>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.name != 'specialSnacks'"
            label="地址"
            prop="address"
          >
          </el-table-column>
          <el-table-column
            v-if="item.name == 'restaurant' || item.name == 'hotel'"
            label="价格"
            prop="price"
          >
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getCityAll"
        />
      </el-tab-pane>

      <!-- 实用信息 -->
      <el-tab-pane label="实用信息" name="practicalInfo">
        <router-link :to="'/city/practicalInfo/add/' + cityId">
          <el-button type="primary" size="mini" icon="el-icon-plus"
            >添加</el-button
          >
        </router-link>
        &nbsp;
        <router-link :to="'/city/telTnfo/add/' + cityId + '/' + practicalTelId">
          <el-button type="primary" size="mini" icon="el-icon-plus"
            >添加电话信息</el-button
          >
        </router-link>
        &nbsp;
        <router-link
          :to="'/city/hospitalInfo/add/' + cityId + '/' + practicalHospId"
        >
          <el-button type="primary" size="mini" icon="el-icon-plus"
            >添加医院信息</el-button
          >
        </router-link>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="id" label="编号" width="180"></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="prop">
              <router-link
                v-if="Math.floor(prop.row.id / 10000000) == 8"
                :to="'/city/telTnfo/edit/' + cityId + '/' + prop.row.id"
              >
                <el-button type="primary" size="mini" icon="el-icon-edit"
                  >编辑</el-button
                >
              </router-link>
              <router-link
                v-else-if="Math.floor(prop.row.id / 10000000) == 9"
                :to="'/city/hospitalInfo/edit/' + cityId + '/' + prop.row.id"
              >
                <el-button type="primary" size="mini" icon="el-icon-edit"
                  >编辑</el-button
                >
              </router-link>
              <router-link
                v-else
                :to="'/city/practicalInfo/edit/' + prop.row.id"
              >
                <el-button type="primary" size="mini" icon="el-icon-edit"
                  >编辑</el-button
                >
              </router-link>
              &nbsp;
              <el-button
                v-if="Math.floor(prop.row.id / 10000000) == 8"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeTelOrHospById(prop.row.id)"
                >删除</el-button
              >
              <el-button
                v-else-if="Math.floor(prop.row.id / 10000000) == 9"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeTelOrHospById(prop.row.id)"
                >删除</el-button
              >
              <el-button
                v-else
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeById(prop.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入接口定义的js文件
import cityApi from "@/api/city";
import scenicSpotApi from "@/api/scenicSpot";
import festivalApi from "@/api/festival";
import hotelApi from "@/api/hotel";
import specialSnacksApi from "@/api/specialSnacks";
import restaurantApi from "@/api/restaurant";
import shoppingApi from "@/api/shopping";
import practicalInfoApi from "@/api/practicalInfo";
import telApi from "@/api/tel";
import hospApi from "@/api/hosp";

export default {
  //  定义变量和初始值
  data() {
    return {
      imgPref: "http://localhost:8888/images/download?fileName=",
      cityId: 0, // 城市id
      current: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 数据总量
      city: {}, // 城市基本信息
      cityData: {}, // 城市详情信息
      navList: [
        {
          label: "景点",
          name: "scenicSpot",
        },
        {
          label: "节日",
          name: "festival",
        },
        {
          label: "酒店",
          name: "hotel",
        },
        {
          label: "特色小吃",
          name: "specialSnacks",
        },
        {
          label: "餐馆",
          name: "restaurant",
        },
        {
          label: "购物点",
          name: "shopping",
        },
      ], // 标签页信息
      activeName: "scenicSpot",
      tableData: [], // 每页记录集合
      firstAccept: true, // 是否为第一次访问
      api: scenicSpotApi, //动态删除的API方法
      practicalTelId: 0, // 实用信息电话的id
      practicalHospId: 0, // 实用信息医院的id
      tab: null,
      event: null,
    };
  },
  created() {
    this.cityId = this.$route.params.id;

    // 获取城市所有信息
    this.getCityAll();
  },
  methods: {
    // 删除医院或电话信息
    removeTelOrHospById(id) {
      var api = this.api;

      if (Math.floor(id / 10000000) == 8) {
        this.$confirm("此操作将永久删除除电话信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          telApi.delete(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });

            // 刷新页面
            this.activeName = "festival";
            this.changeTableData();
            this.getCityAll();
            // 延迟700ms
            let _this = this;
            setTimeout(function () {
              _this.activeName = "scenicSpot";
              _this.changeTableData();
            }, 700);
          });
        });
      } else {
        this.$confirm("此操作将永久删除除医院信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          hospApi.delete(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });

            // 刷新页面
            this.activeName = "festival";
            this.changeTableData();
            this.getCityAll();
            // 延迟700ms
            let _this = this;
            setTimeout(function () {
              _this.activeName = "scenicSpot";
              _this.changeTableData();
            }, 700);
          });
        });
      }

      this.api = api;
    },
    // 删除对应id的信息
    removeById(id) {
      this.$confirm("此操作将永久删除除信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.api.delete(id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          // 刷新页面
          this.activeName = "festival";
          this.changeTableData();
          this.getCityAll();
          // 延迟700ms
          let _this = this;
          setTimeout(function () {
            _this.activeName = "scenicSpot";
            _this.changeTableData();
          }, 700);
        });
      });
    },
    // 切换标签页
    handleClick(tab, event) {
      this.getCityAll();

      this.changeTableData();
    },
    // 获取城市所有信息
    getCityAll(page = 1) {
      // 添加当前页的参数
      this.current = page;
      cityApi
        .getCityDetail(this.cityId, this.current, this.limit)
        .then((res) => {
          // 请求成功回调
          this.cityData = res.data;

          if (this.firstAccept) {
            // 添加城市信息
            this.city = this.cityData.city;

            // 添加表格数据
            this.tableData = this.cityData.scenicSpots.records;
            // 总记录数
            this.total = this.cityData.scenicSpots.total;

            this.firstAccept = false;
          }
        });
    },
    // 切换表格数据
    changeTableData() {
      if ("scenicSpot" == this.activeName) {
        this.tableData = this.cityData.scenicSpots.records;
        this.total = this.cityData.scenicSpots.total;
        this.api = scenicSpotApi;
      } else if ("festival" == this.activeName) {
        this.tableData = this.cityData.festivals.records;
        this.total = this.cityData.festivals.total;
        this.api = festivalApi;
      } else if ("hotel" == this.activeName) {
        this.tableData = this.cityData.hotels.records;
        this.total = this.cityData.hotels.total;
        this.api = hotelApi;
      } else if ("specialSnacks" == this.activeName) {
        this.tableData = this.cityData.specialSnacks.records;
        this.total = this.cityData.specialSnacks.total;
        this.api = specialSnacksApi;
      } else if ("restaurant" == this.activeName) {
        this.tableData = this.cityData.restaurants.records;
        this.total = this.cityData.restaurants.total;
        this.api = restaurantApi;
      } else if ("shopping" == this.activeName) {
        this.tableData = this.cityData.shoppings.records;
        this.total = this.cityData.shoppings.total;
        this.api = shoppingApi;
      } else if ("practicalInfo" == this.activeName) {
        this.tableData = this.cityData.practicalInfos;
        this.api = practicalInfoApi;

        for (var i = 0; i < this.tableData.length; i++) {
          if ("医院" == this.tableData[i].name) {
            this.practicalHospId = this.tableData[i].id;
          } else if ("电话" == this.tableData[i].name) {
            this.practicalTelId = this.tableData[i].id;
          }
        }
      }
    },
    // 返回上个页面
    goBack() {
      this.$router.push({path: '/city/list'})
    },
  },
};
</script>

<style scoped>
.city-info {
  padding: 10px 30px;
}

.city-info .head-title {
  font-size: 66px;
}
.city-info table th {
  width: 200px;
  text-align: right;
}

.head-small {
  position: relative;
  top: -10px;
  font-size: 30px;
  color: #696969;
}

.city-details {
  padding: 20px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>