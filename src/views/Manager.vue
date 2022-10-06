<template>


      <el-container style="height: 100%">
        <el-header>
          <Header></Header>
        </el-header>

        <!--这个contain是包含了aside和main的-->
        <el-container>
          <!--左侧aside部分的代码-->
          <el-aside width="200px">
            <Aside></Aside>
          </el-aside>

          <el-container>
            <el-main>
              <!-- 表示当前页面的子路由会在 <router-view /> 里面展示-->
              <router-view/>
            </el-main>
          </el-container>

        </el-container>

        <el-footer>北方信控2022</el-footer>

      </el-container>




</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";


export default {
  name: "Manage",
  components: {
    Aside,
    Header
  },

  data() {
    return {

    }
  },

  methods: {


  }

}
</script>

<style scoped>

#screen-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #EBEBEB;
  overflow-y: auto;
  overflow-x: hidden;

}
#main {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -960px;
  transform-origin: top center;
}

.el-header, .el-footer {
  background-color: rgb(24, 48, 84);
  color: #ccc;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  line-height: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<style>

</style>
