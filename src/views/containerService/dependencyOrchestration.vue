<template>
  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>打包封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="padding-top: 20px">
      <el-steps :active="2" align-center >
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
              【服务依赖编排】
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="依赖服务名称" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖服务标识" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖服务版本" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖服务方式" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">增加</el-button>
                  <el-button type="danger">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-table :data="tableData"
                        border stripe
                        :header-cell-style="{background:'#42b983',color:'white'}"
                        @selection-change="handleSelectionChange"
                        :stripe=true
                        :highlight-current-row="true"
                        :row-class-name="tabRowClassName"
                        style="font-size: 15px"
                        max-height="600"
              >
                <el-table-column type="selection" >
                </el-table-column>
                <el-table-column prop="missionCode" label="依赖服务名称" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionName" label="依赖服务标识" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionTime" label="依赖服务版本" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionTime" label="依赖服务方式" min-width="180px">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              【数据依赖编排】
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="依赖数据名称" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖数据标识" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖数据版本" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="依赖数据方式" class="item">
                  <el-input v-model="formInline.user" placeholder="请填写" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">增加</el-button>
                  <el-button type="danger">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-table :data="tableData"
                        border stripe
                        :header-cell-style="{background:'#42b983',color:'white'}"
                        @selection-change="handleSelectionChange"
                        :stripe=true
                        :highlight-current-row="true"
                        :row-class-name="tabRowClassName"
                        style="font-size: 15px"
                        max-height="600"
              >
                <el-table-column type="selection" >
                </el-table-column>
                <el-table-column prop="missionCode" label="依赖数据名称" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionName" label="依赖数据标识" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionTime" label="依赖数据版本" min-width="220px">
                </el-table-column>
                <el-table-column prop="missionTime" label="依赖数据方式" min-width="180px">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: inside; padding-left: 40px;padding-top: 10px; color:white;font-size: 20px">
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
  name: "dependencyOrchestration",
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
      colWidth: '200px'
    }
  },
  methods: {
    goPrevious() {
      this.$router.push("/containerService/basicInfo")
    },
    goNext() {
      this.$router.push("/containerService/resourceRequirements")
    },
  }
}
</script>

<style>
.item .el-form-item__label{
  color: white;
}

</style>
