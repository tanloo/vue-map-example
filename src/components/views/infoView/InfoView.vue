<template>
  <div id="infoPanel">
    <el-row>
      <el-col :span="24">
        <div class="title" align="center">信息面板</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card" style="background:whitesmoke">
          <el-tab-pane label="点击点信息">
            <el-col :span="24">
              <MainPointTable />
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="POI信息">
            <POITable />
          </el-tab-pane>
          <el-tab-pane label="查询参数设置">
            <SearchConfigForm />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainPointTable from "./MainPointTable";
import POITable from "./POITable";
import SearchConfigForm from "./SearchConfigForm";

export default {
  components: { MainPointTable, POITable, SearchConfigForm }
};
</script>

<style>
#infoPanel {
  height: 100%;
  width: 100%;
}
.title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background: #f7f7f7;
}
.button {
  padding: 0;
  float: right;
}
</style>
