<template>
  <el-container>
    <el-header height="60px">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="180px">
        <SideBar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./components/Header";
import SideBar from "./components/SideBar";
export default {
  components: {
    Header,
    SideBar
  }
};
</script>

<style>
.el-header,
.el-container,
.el-aside,
.el-main {
  padding: 0 0 !important;
}
.el-header {
  height: "100px";
}
.el-container {
  height: 100%;
  width: 100%;
}
</style>
