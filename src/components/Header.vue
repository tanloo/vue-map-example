<template>
  <div class="header-menu">
    <div class="div-img">
      <img src="../assets/cloud_logo.png" />
      
    </div>

    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link" style="color:#ccc">
          用户
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-info">用户中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-top-left">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scope>
.header-menu {
  background-color: #464c5b !important;
  width: 100%;
  height: 100%;
  position: relative;
  vertical-align: middle;
}
.right-menu {
  margin-left: auto;
  margin-right: 30px;
  display: table;
}
.div-img {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  outline: none;
  padding-left: 15px;
}
img {
  position: absolute;
}
</style>

