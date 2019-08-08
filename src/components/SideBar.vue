<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    background-color="#464c5b"
    text-color="#fff"
    :router="true"
  >
    <el-submenu index="1" style="margin-top: 20px;">
      <template slot="title">
        <i class="el-icon-map-location"></i>
        <span>地图</span>
      </template>
      <el-menu-item index="bmap">百度地图</el-menu-item>
      <el-menu-item index="amap">高德地图</el-menu-item>
        <el-menu-item index="tmap">天地图</el-menu-item>
      <el-menu-item index="leaflet">Leaflet</el-menu-item>
    </el-submenu>
    <el-menu-item index="info">
      <i class="el-icon-search"></i>
      <span slot="title">信息结果</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style>
.el-menu-vertical {
  background-color: #464c5b !important;
  height: 100%;
  border-right: solid 0px #e6e6e6 !important;
}
.el-menu-item {
  padding-right: 0px;
}
</style>
