<template>
  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>打包封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="padding-top: 20px">
      <el-steps :active="0" align-center>
        <el-step title="服务镜像化" style="font-size: 10px"></el-step>
        <el-step title="填写基础信息"></el-step>
        <el-step title="服务依赖编排"></el-step>
        <el-step title="设置资源需求"></el-step>
        <el-step title="完成封装"></el-step>
      </el-steps>
    </div>

    <div style="padding-top: 0px;flex-grow: 2">
      <div class="note" :style="note">
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              【方式一 构建镜像】
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              Ⅰ 导入软件包
            </div>
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <el-upload action="#">
                <el-button style="" size="mini" type="success">选取</el-button>
              </el-upload>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              Ⅱ 请选择基础镜像
            </div>
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <span @click="selectBasicImageFromSystem">
                <el-radio v-model="radio1" label="1" border style="background-color: white" size="mini">从系统基础镜像库选取</el-radio>
              </span>
              <el-dialog
                title="选取基础镜像"
                :visible.sync="selectBasicImageFromSystemDialogVisible"
                width="30%">
                <span>展示系统内置的基础镜像</span>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="selectBasicImageFromSystemDialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="selectBasicImageFromSystemDialogVisible = false">确 定</el-button>
                 </span>
              </el-dialog>
              <span @click="selectBasicImageFromLocal" style="padding-left: 20px">
                <el-radio v-model="radio1" label="2" border style="background-color: white" size="mini">上传新基础镜像</el-radio>
              </span>
              <el-dialog
                title="上传基础镜像"
                :visible.sync="selectBasicImageFromLocalDialogVisible"
                width="30%">
                <el-upload action="#">
                  <el-button style="" size="mini" type="success">选取</el-button>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="selectBasicImageFromLocalDialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="selectBasicImageFromLocalDialogVisible = false">确 定</el-button>
                 </span>
              </el-dialog>

            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              Ⅲ 生成Dockerfile文件
            </div>
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              <span @click="showDialog">
                <el-radio v-model="radio2" label="1" border style="background-color: white"
                          size="mini">基于模板文件编辑</el-radio>
              </span>

              <span style="padding-left: 20px" @click="showDialog2">
                <el-radio v-model="radio2" label="2" border style="background-color: white"
                          size="mini">上传Dockerfile文件</el-radio>
              </span>

              <span style="padding-left: 20px">
                <el-radio v-model="radio2" label="3" border style="background-color: white" size="mini">缺省方式
                </el-radio>
              </span>

              <el-dialog
                title="编辑Dockerfile"
                :visible.sync="dialogVisible"
                width="30%">
                <span>动态表单</span>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                 </span>
              </el-dialog>

              <el-dialog
                title="上传已有的dockerfile文件"
                :visible.sync="dialogVisible2"
                width="30%">
                <el-upload action="#">
                  <el-button style="" size="mini" type="success">选取</el-button>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible2 = false">取 消</el-button>
                   <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                 </span>
              </el-dialog>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 20px; color:white;font-size: 20px">
              Ⅳ 生成镜像
            </div>
            <div style="float: left; padding-left: 20px;padding-top: 15px; color:white;font-size: 20px">
              <el-button style="" size="mini" type="primary">镜像构建</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 20px;padding-top: 80px; color:white;font-size: 20px">
              【方式二 直接上传已有服务镜像】
            </div>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="float: left; padding-left: 40px;padding-top: 20px; color:white;font-size: 20px">
              <el-upload action="#">
                <el-button style="" size="mini" type="success">选取</el-button>
              </el-upload>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: inside; padding-left: 40px;padding-top: 20px; color:white;font-size: 20px">
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
  name: "makingImage",
  data() {
    return {

      note: {
        backgroundImage: "url(" + require("../../assets/basic_design.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        marginTop: "0px",
        height: "100%",
      },
      radio1: '',
      radio2: '',
      selectBasicImageFromSystemDialogVisible:false,
      selectBasicImageFromLocalDialogVisible:false,
      dialogVisible: false,
      dialogVisible2: false,


      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    showDialog2() {
      this.dialogVisible2 = true;
    },
    goNext() {
      this.$router.push("/containerService/basicInfo")
    },
    selectBasicImageFromSystem() {
      this.selectBasicImageFromSystemDialogVisible = true;
    },

    selectBasicImageFromLocal() {
      this.selectBasicImageFromLocalDialogVisible = true;
    },
  }
}
</script>

<style scoped>
.background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}

.content {
  z-index: 1;
  position: absolute;
}

</style>
