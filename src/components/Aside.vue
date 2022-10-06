<template>
  <!--声明一个菜单，-->
  <el-menu :default-active="activeIndex" class="el-menu-demo"
           background-color=#164F84
           @select="handleSelect"
           style="height: 100%;overflow-x: hidden"
           active-text-color="#ffd04b"
           router
  >


    <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-search" style="padding-right: 0px;color: #cccccc;font-size: 20px"></i>
        <span style="font-size: 15px;color: #01D2F7;padding-left: 0px">使用手册</span>
      </template>
    </el-menu-item>


    <!--菜单的第一项-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-edit-outline" style="padding-right: 0px;color: #cccccc;font-size: 20px"></i>
        <span style="font-size: 15px;color: #01D2F7;padding-left: 0px">打包封装</span>
      </template>
      <el-menu-item index="/containerService/makingImage">
        <img src="../assets/icons8-docker-white.png" alt="" style="width: 25px; position: relative;margin-right: 5px;">
        <span style="font-size: 10px;color: white">镜像服务</span>
      </el-menu-item>

      <el-menu-item index="/" disabled>
        <i class="el-icon-box" style="width: 30px;color: white"></i>
        <span style="font-size: 15px;color: white">段包服务</span>
      </el-menu-item>


      <el-menu-item index="/" disabled>
        <i class="el-icon-coin" style="width: 30px;color:white"></i>
        <span style="font-size: 15px;color: white">数据封装</span>
      </el-menu-item>

    </el-submenu>


  </el-menu>
</template>

<script>
export default {
  name: "Aside",

  data() {

    return {
      activeIndex: '1',
      isAdmin: window.sessionStorage.getItem('userRole') == "admin"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>

<style scoped>

</style>
