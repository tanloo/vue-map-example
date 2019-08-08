<template>
  <el-table
    :data="POITableData"
    style="width: 100%"
    :border="true"
    :stripe="true"
    size="mini"
    highlight-current-row
    :max-height="755"
  >
    <el-table-column prop="name" label="POI名称" align="center"></el-table-column>
    <el-table-column prop="address" label="POI地址" align="center"></el-table-column>
    <el-table-column prop="label" label="POI标签" align="center"></el-table-column>
    <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
    <el-table-column prop="lon" label="经度" align="center"></el-table-column>
    <el-table-column prop="lat" label="纬度" align="center"></el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      poiPoints: state => state.points.poiPoints
    }),
    POITableData() {
      if (this.poiPoints !== null && this.poiPoints !== undefined) {
        let tableData = [];
        this.poiPoints.forEach(el => {
          tableData.push({
            name: el[1],
            address: el[2],
            label: el[3],
            tel: el[4],
            lon: el[5],
            lat: el[6]
          });
        });
        return tableData;
      } else {
        return [];
      }
    }
  },
  methods: {}
};
</script>

<style>
</style>
