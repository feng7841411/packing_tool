<template>
  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>打包封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="padding-top: 20px">
      <el-steps :active="4" align-center >
        <el-step title="服务镜像化" style="font-size: 10px"></el-step>
        <el-step title="填写基础信息" ></el-step>
        <el-step title="服务依赖编排" ></el-step>
        <el-step title="设置资源需求" ></el-step>
        <el-step title="完成封装" ></el-step>
      </el-steps>
    </div>

    <div style="padding-top: 0px;flex-grow: 2">
      <div class="note" :style ="note">
        <div>
          <h1 style="font-size: 20px;color: #cccccc;padding-top: 20px">展示封装结果</h1>
        </div>


        <el-row>
          <el-col :span="24">
            <div style="float: inside; padding-left: 40px;padding-top: 300px; color:white;font-size: 20px">
              <el-button type="success" @click=""><i class="el-icon-download"></i>下载</el-button>
              <el-button type="primary" @click="" disabled><i class="el-icon-s-promotion" ></i>推送至软件仓库</el-button>
              <el-button type="warning" @click="goHome()">返回首页</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "completePackaging",
  data() {
    return {

      note: {
        backgroundImage: "url(" + require("../../assets/basic_design.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        marginTop: "0px",
        height: "100%",

      },
    }
  },
  methods: {
    goHome() {
      this.$router.push("/home")
    }
  }
}
</script>

<style scoped>

</style>
