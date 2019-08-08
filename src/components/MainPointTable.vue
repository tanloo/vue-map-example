<template>
  <el-table
    :data="mainPointTableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :border="true"
  >
    <el-table-column prop="province" label="省份" align="center"></el-table-column>
    <el-table-column prop="city" label="市" align="center"></el-table-column>
    <el-table-column prop="county" label="区/县" align="center"></el-table-column>
    <el-table-column prop="address" label="街道" width="180" align="center"></el-table-column>
    <el-table-column prop="lon" label="经度" align="center"></el-table-column>
    <el-table-column prop="lat" label="纬度" align="center"></el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      mainPoint: state => state.points.mainPoint
    }),
    mainPointTableData() {
      if (this.mainPoint !== null && this.mainPoint !== undefined) {
        return [
          {
            lon: this.mainPoint.location.lon,
            lat: this.mainPoint.location.lat,
            province: this.mainPoint.addressComponent.province,
            city: this.mainPoint.addressComponent.city,
            county: this.mainPoint.addressComponent.county,
            address: this.mainPoint.addressComponent.address
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "main-row";
      }
      return "";
    }
  }
};
</script>

<style>
.el-table .main-row {
  background: #f0f9eb;
}
</style>
