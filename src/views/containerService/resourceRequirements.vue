<template>
  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>打包封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="padding-top: 20px">
      <el-steps :active="3" align-center >
        <el-step title="服务镜像化" style="font-size: 10px"></el-step>
        <el-step title="填写基础信息" ></el-step>
        <el-step title="服务依赖编排" ></el-step>
        <el-step title="设置资源需求" ></el-step>
        <el-step title="完成封装" ></el-step>
      </el-steps>
    </div>

    <div style="padding-top: 0px;flex-grow: 2">
      <div class="note" :style ="note">
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              【设置服务资源需求】
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="cpu最低需求" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="内存最低需求" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="硬盘最低需求" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="服务端口" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: inside; padding-left: 40px;padding-top: 300px; color:white;font-size: 20px">
              <el-button type="info" @click="goPrevious()">上一步</el-button>
              <el-button type="danger" @click="goNext()">下一步</el-button>
            </div>
          </el-col>
        </el-row>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "resourceRequirements",
  data() {
    return {

      note: {
        backgroundImage: "url(" + require("../../assets/basic_design.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        marginTop: "0px",
        height: "100%",
      },
      formInline: {
        user: '',
        region: ''
      },
    }
  },
  methods: {
    goPrevious() {
      this.$router.push("/containerService/dependencyOrchestration")
    },
    goNext() {
      this.$router.push("/containerService/completePackaging")
    },
  }
}
</script>

<style scoped>

</style>
