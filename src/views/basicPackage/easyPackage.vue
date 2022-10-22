<template>

  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>基础封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>


    <div style="flex-grow: 2;padding-top: 30px">
      <div style="background-color: #cccccc;padding-top: 0px;flex-grow: 1"
           v-loading="maskDialogVisible"
           element-loading-text="系统处理中......"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <div style="background-color: #333333;height: 120%">

          <!--        这个row是第一个描述标题-->
          <el-row style="padding-top: 20px">
            <el-col :span="24">
              <span
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-left: 20px">一、上传镜像tar包</span>
            </el-col>
          </el-row>

          <!--        这个row是上传镜像的-->
          <el-row>
            <el-col :span="8">
              <div style="padding-top: 0px;padding-left: 20px;float: left">
                <el-upload action="#"
                           :show-file-list="true"
                           ref="upload"
                           :before-upload="checkImageFile"
                           :disabled="false"
                           :auto-upload="false"
                           style="display: inline-block;float: left"
                           :on-preview="handlePreview"
                           :on-success="handle_success"
                           accept=".tar"
                           :http-request="handleFileUpload"
                           :on-change="handleChange"
                           :on-remove="handleRemove"
                           limit="1"
                >
                  <el-button slot="trigger" size="small" type="warning" style="margin-top: 20px ">选取镜像</el-button>
                  <el-button size="small" style="margin-left: 20px" type="success" @click="submitUpload">确认</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>

          <!--这个row是第二个描述标题-->
          <el-row>
            <el-col :span="24">
              <span
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-top: 20px;padding-left: 20px">二、workLoad和Service的Yaml文件</span>
            </el-col>
          </el-row>
          <!--        这个row是上传两个yaml，用col隔开-->
          <el-row>
            <el-col :span="8">
              <div style="padding-top: 0px;padding-left: 20px;float: left">
                <el-upload action="#"
                           :show-file-list="true"
                           ref="upload"
                           :before-upload="checkWorkLoadYamlFile"
                           :disabled="false"
                           :auto-upload="false"
                           style="display: inline-block;float: left"
                           :on-preview="handlePreviewWorkLoadYaml"
                           :on-success="handle_successWorkLoadYaml"
                           accept=".yaml"
                           :http-request="handleFileUploadWorkLoadYaml"
                           :on-change="handleChangeWorkLoadYaml"
                           :on-remove="handleRemoveWorkLoadYaml"
                           limit="1"
                >
                  <el-button slot="trigger" size="small" type="warning" style="margin-top: 20px ">
                    选取工作负载(workLoad)的yaml文件
                  </el-button>
                  <el-button size="small" style="margin-left: 20px" type="success" @click="submitUploadWorkLoadYaml">确认
                  </el-button>
                </el-upload>
              </div>
            </el-col>

            <el-col :span="8">
              <div style="padding-top: 0px;padding-left: 20px;float: left">
                <el-upload action="#"
                           :show-file-list="true"
                           ref="upload"
                           :before-upload="checkServiceYamlFile"
                           :disabled="false"
                           :auto-upload="false"
                           style="display: inline-block;float: left"
                           :on-preview="handlePreviewServiceYaml"
                           :on-success="handle_successServiceYaml"
                           accept=".yaml"
                           :http-request="handleFileUploadServiceYaml"
                           :on-change="handleChangeServiceYaml"
                           :on-remove="handleRemoveServiceYaml"
                           limit="1"
                >
                  <el-button slot="trigger" size="small" type="warning" style="margin-top: 20px ">选取服务发现(Service)的yaml文件
                  </el-button>
                  <el-button size="small" style="margin-left: 20px" type="success" @click="submitUploadServiceYaml">确认
                  </el-button>
                </el-upload>
              </div>
            </el-col>

          </el-row>

          <!--这个row是第三个描述标题-->
          <el-row>
            <el-col :span="24">
              <span
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-top: 20px;padding-left: 20px">三、请调写服务基础信息</span>
            </el-col>
          </el-row>


          <el-row style="padding-top :10px">
            <div style="padding-top: 20px">
              <el-form :model="BasicInfoForm"
                       :rules="BasicInfoFormRules"
                       ref="BasicInfoForm"
                       label-width="120px"
                       class="demo-ruleForm"
                       style="margin: 0px;height: 200%;width: 100%;padding-left: 20px"
                       label-position="left"
              >
                <el-form-item label="服务中文名称" style="" label-width="150px" required prop="softwareCnName" class="item">
                  <el-input v-model="BasicInfoForm.softwareCnName" placeholder="服务中文名称"
                            style="width:200px;float: left"></el-input>
                </el-form-item>

                <!--                  <el-form-item label="服务组名称" style="" class="item">-->
                <!--                    <el-input v-model="BasicInfoForm.softwareGroupName" placeholder="服务组名称"-->
                <!--                              style="width: 200px;float: left"></el-input>-->
                <!--                  </el-form-item>-->

                <el-form-item label="软件运行环境" style="" label-width="150px" required prop="softwareEnvironment" class="item">
                  <el-select v-model="BasicInfoForm.softwareEnvironment" placeholder="请选择"
                             style="width:200px;float: left">
                    <el-option label="x86" value="x86"></el-option>
                    <el-option label="arm" value="arm"></el-option>
                    <el-option label="others" value="others"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务版本号" style="" label-width="150px" required class="item">
                  <el-form-item prop="majorVersionNumber" style="float: left">
                    <el-input v-model="BasicInfoForm.majorVersionNumber" style="width:200px;float: left"
                              placeholder="主版本号"></el-input>
                  </el-form-item>

                  <el-form-item prop="minorVersionNumber" style="float: left">
                    <el-input v-model="BasicInfoForm.minorVersionNumber" placeholder="子版本号"></el-input>
                  </el-form-item>
                  <el-form-item prop="revisionNumber" style="float: left">
                    <el-input v-model="BasicInfoForm.revisionNumber" placeholder="修正版本号"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="服务唯一标识" label-width="150px" required style="" class="item">
                  <el-form-item prop="domainName" style="float: left">
                    <el-input v-model="BasicInfoForm.domainName" style="float: left"
                              placeholder="业务域标识"></el-input>
                  </el-form-item>
                  <el-form-item prop="softwareName" style="float: left">
                    <el-input v-model="BasicInfoForm.softwareName" style="float: left"
                              placeholder="业务软件名"></el-input>
                  </el-form-item>


                  <el-form-item prop="serviceName" style="float: left">
                    <el-input v-model="BasicInfoForm.serviceName" style="float: left"
                              placeholder="服务功能名"></el-input>
                  </el-form-item>


                  <el-form-item prop="languageName" style="float: left">
                    <el-autocomplete
                      class="inline-input"
                      v-model="BasicInfoForm.languageName"
                      :fetch-suggestions="languageQuerySearch"
                      placeholder="请输入开发语言"
                      :trigger-on-focus="true"
                    >
                    </el-autocomplete>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="containers cpuRequest" style="" label-width="250px" required prop="cpuRequests" class="item">
                  <el-input v-model="BasicInfoForm.cpuRequests" placeholder="单位/核"
                            style="width:200px;float: left"></el-input>
                </el-form-item>
                <el-form-item label="containers memoryRequest" style="" label-width="300px" required prop="memoryRequests" class="item">
                  <el-input v-model="BasicInfoForm.memoryRequests" placeholder="单位Mi"
                            style="width:200px;float: left"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div style="padding-top: -10px">
              <el-form :model="DeveloperInfoForm"
                       :rules="DeveloperInfoFormRules"
                       ref="DeveloperInfoForm"
                       label-width="120px"
                       class="demo-ruleForm3"
                       style="margin: 0px;height: 200%;width: 100%;padding-left: 20px"
                       label-position="left"
              >
                <el-form-item label="服务开发者" style="" label-width="150px" required prop="developerName" class="item">
                  <el-input v-model="DeveloperInfoForm.developerName" placeholder="" style="width: 200px;float: left"></el-input>
                </el-form-item>

                <el-form-item label="服务开发单位" style="" label-width="150px" required prop="developerGroup" class="item">
                  <el-input v-model="DeveloperInfoForm.developerGroup" placeholder="" style="width: 200px;float: left"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" style="" label-width="150px" required prop="developerPhone" class="item">
                  <el-input v-model="DeveloperInfoForm.developerPhone" placeholder="" style="width: 200px;float: left"></el-input>
                </el-form-item>
              </el-form>

            </div>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div
                style="float: inside; padding-left: 40px;padding-top: 10px; color:white;font-size: 20px;padding-bottom: 10px">
                <el-button type="danger" @click="clearAllPage()">清空所有已填写内容</el-button>
                <el-button :disabled="isZipFileExist()" type="primary" @click="postPackingToolInfoForm()">提交信息
                </el-button>
                <el-button v-if="isZipFileExist()" type="success"><a
                  :href="'http://' + this.serverIp + ':' + this.serverHost + '/v1/packingToolForm/getZipFile?'+ 'zipFileName=' + this.zipFileName">
                  下载封装文件
                </a></el-button>
              </div>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import {serverIp} from "../../../public/config";
import {serverHost} from "../../../public/config";


export default {
  name: "basicInfo",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项，不可为空'));
      } else {
        // // 字母
        // let alphabet = value.match(/([A-Za-z]+)/)
        // // 数字符号
        // let number = value.match(/([\d]+)/)
        // // 特殊字符（英文符号）
        // let special = value.match(/[`~!@#\\$%\\^&\\*\\(\\)\-_=\\+\\{\\}\\[\]\\|\\;':"\\,\\.<>\\/\\?]+/)
        let alphabet = value.match(/([a-z]+$)/);
        if (alphabet) {
          callback();
        } else {
          callback(new Error('只允许使用字母小写'));
        }
      }
    }

    let validatePassNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项，不可为空'));
      } else {
        // // 字母
        // let alphabet = value.match(/([A-Za-z]+)/)
        // // 数字符号
        // let number = value.match(/([\d]+)/)
        // // 特殊字符（英文符号）
        // let special = value.match(/[`~!@#\\$%\\^&\\*\\(\\)\-_=\\+\\{\\}\\[\]\\|\\;':"\\,\\.<>\\/\\?]+/)
        let alphabet = value.match(/([\d]+$)/);
        if (alphabet) {
          callback();
        } else {
          callback(new Error('只允许使用数字'));
        }
      }
    }

    let validatePassChinese = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项，不可为空'));
      } else {
        // // 字母
        // let alphabet = value.match(/([A-Za-z]+)/)
        // // 数字符号
        // let number = value.match(/([\d]+)/)
        // // 特殊字符（英文符号）
        // let special = value.match(/[`~!@#\\$%\\^&\\*\\(\\)\-_=\\+\\{\\}\\[\]\\|\\;':"\\,\\.<>\\/\\?]+/)
        let alphabet = value.match(/^[\u4e00-\u9fa5]+$/);
        if (alphabet) {
          callback();
        } else {
          callback(new Error('只允许使用汉字'));
        }
      }
    }

    let memoryRequestPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项，不可为空'));
      } else {
        // // 字母
        // let alphabet = value.match(/([A-Za-z]+)/)
        // // 数字符号
        // let number = value.match(/([\d]+)/)
        // // 特殊字符（英文符号）
        // let special = value.match(/[`~!@#\\$%\\^&\\*\\(\\)\-_=\\+\\{\\}\\[\]\\|\\;':"\\,\\.<>\\/\\?]+/)
        if (value < 100) {
          callback(new Error('范围在100~10000'))
        } else if (value > 10000) {
          callback(new Error('范围在100~10000'))
        } else {
          callback();
        }
      }
    }


    return {
      serverIp: serverIp,
      serverHost: serverHost,

      note: {
        backgroundImage: "url(" + require("../../assets/basic_design.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        marginTop: "0px",
        height: "100%",
      },

      // 镜像文件列表
      fileList: [],

      // wordLoadYaml上传的列表
      wordLoadYamlFileList: [],

      // serviceYaml上传的列表
      serviceYamlFileList: [],


      // 待选的开发语言，这是一个数组，通过开始的loadAll注入数据，因为BasicInfoForm表单要整个传到后台这个枚举指就放外面了
      softwareLanguages: [],
      //基础信息表单的数据
      BasicInfoForm: {
        // 服务中文名
        softwareCnName: '',
        // 服务组名称
        softwareGroupName: '',
        // 服务运行环境
        softwareEnvironment: '',
        // 服务四段式唯一标识，业务域-业务软件名-服务功能名-开发语言
        domainName: '',
        softwareName: '',
        serviceName: '',
        languageName: '',
        //服务三段式版本号 Major-Minor-Re
        majorVersionNumber: '',
        minorVersionNumber: '',
        revisionNumber: '',
        // 容器资源限制
        cpuRequests: '',
        memoryRequests: '',
      },

      // 3个文件信息
      // 镜像信息表单
      ImageInfoForm: {
        imageFileName: '',
        workLoadYamlFileName: '',
        serviceYamlFileName: '',

        imageFileUid: '',
        wordLoadYamlFileUid: '',
        serviceYamlFileUid: '',
      },


      //基础信息校验规则
      BasicInfoFormRules: {
        softwareCnName: [
          {required: true, message: '请输入服务中文名称', trigger: 'blur'},
          {validator: validatePassChinese, trigger: 'blur'},
          {min: 1, max: 10, message: '允许1到10个汉字', trigger: 'blur'}
        ],

        softwareEnvironment: [
          {required: true, message: '请输入服务运行环境', trigger: 'blur'}
        ],

        majorVersionNumber: [
          {required: true, message: '请输入主版本号', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {min: 1, max: 1, message: '允许1个数字', trigger: 'blur'}
        ],


        minorVersionNumber: [
          {required: true, message: '请输入次版本号', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {min: 2, max: 2, message: '允许2个数字', trigger: 'blur'}
        ],
        revisionNumber: [
          {required: true, message: '请输入修正版本号', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {min: 2, max: 2, message: '允许2个数字', trigger: 'blur'}
        ],
        domainName: [
          {required: true, message: '请输入业务域名', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        softwareName: [
          {required: true, message: '请输入业务软件名', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        serviceName: [
          {required: true, message: '请输入服务功能名', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        languageName: [
          {required: true, message: '请输入开发语言', trigger: 'change'},
        ],
        cpuRequests: [
          {required: true, message: '请输入容器服务cpu最低需求', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {pattern: /^([1-8])$/, message: '范围在1~8',trigger: 'blur'}
        ],
        memoryRequests: [
          {required: true, message: '请输入容器内存memory最低需求', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {validator: memoryRequestPass, trigger: 'blur'}
        ]

      },


      // 开发者信息表单
      DeveloperInfoForm: {
        developerName: '',
        developerGroup: '',
        developerPhone: '',
      },
      DeveloperInfoFormRules: {
        developerName: [
          {required: true, message: '请输入开发者名', trigger: 'blur'}
        ],
        developerGroup: [
          {required: true, message: '请输入开发者组织或单位', trigger: 'blur'}
        ],
        developerPhone: [
          {required: true, message: '请输入开发者联系方式', trigger: 'blur'}
        ]
      },


      // 控制蒙层可见性
      maskDialogVisible: false,

      // 最后下载
      zipFileName: '',
    }
  },
  methods: {

    // 上传镜像文件相关方法
    // upload组件
    checkImageFile(file) {
      var FileExt = file.name.replace(/.+\./, "");
      if (['tar'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '目前只支持tar格式的镜像'
        });
        return false;
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handle_success(res) {
      // 这个上传success的钩子函数也是说name暂时没有用，给前端页面暂存的只有UUid
      this.$message.success("文件已上传");
    },
    handleRemove(file, fileList) {
      // 增加一个，把packageDetailInfo重置清空掉
      this.$message.info("文件已移除，请重新选取");
    },

    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleFileUpload() {
    },
    // 提交方法，发请求给厚度按
    async submitUpload() {
      // 检查一下，文件列表为空别给后端发请求
      if (this.fileList.length == 0) {
        this.$message.warning("没有检测到选取文件，请检查。");
      } else {
        const formData = new FormData();
        this.fileList.forEach(item => {
          formData.append("files", item.raw)
        })
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.maskDialogVisible = true;
        // 开发环境
        await this.request.post("/file/uploadImage", formData, config).then(res => {
          if (res.code === "200") {
            this.ImageInfoForm.imageFileName = res.data.fileName;
            this.ImageInfoForm.imageFileUid = res.data.fileUid;
            this.maskDialogVisible = false;
            this.$message.success("上传成功")
          } else {
            this.$message.error("上传失败,原因:" + res.msg)

            // 关闭蒙层
            this.maskDialogVisible = false;
          }
        })
        // 部署环境
        // this.request.post("/Package/uploadSingle", formData,config).then(res => {
        //   if (res.code === "200") {
        //     this.$message.success("上传成功")
        //   } else {
        //     this.$message.error("上传失败")
        //   }
        // })

      }
    },


    // 上传WorkLoadYaml的方法
    checkWorkLoadYamlFile(file) {
      var FileExt = file.name.replace(/.+\./, "");
      if (['yaml'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '目前只支持yaml格式描述文件'
        });
        return false;
      }
    },
    handlePreviewWorkLoadYaml(file) {
      console.log(file);
    },
    handle_successWorkLoadYaml(res) {
      // 这个上传success的钩子函数也是说name暂时没有用，给前端页面暂存的只有UUid
      this.$message.success("文件已上传");
    },
    handleRemoveWorkLoadYaml(file, fileList) {
      this.$message.info("文件已移除，请重新选取");
    },

    handleChangeWorkLoadYaml(file, fileList) {
      this.wordLoadYamlFileList = fileList;
    },
    handleFileUploadWorkLoadYaml() {
    },
    // 提交方法，发请求给厚度按
    async submitUploadWorkLoadYaml() {
      // 检查一下，文件列表为空别给后端发请求
      if (this.wordLoadYamlFileList.length == 0) {
        this.$message.warning("没有检测到选取文件，请检查。");
      } else {
        const formData = new FormData();
        this.wordLoadYamlFileList.forEach(item => {
          formData.append("files", item.raw)
        })
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.maskDialogVisible = true;
        // 开发环境
        await this.request.post("/file/uploadWordLoadYaml", formData, config).then(res => {
          if (res.code === "200") {
            this.ImageInfoForm.workLoadYamlFileName = res.data.fileName;
            this.ImageInfoForm.wordLoadYamlFileUid = res.data.fileUid;
            this.maskDialogVisible = false;
            this.$message.success("上传成功")
          } else {
            this.maskDialogVisible = false;
            this.$message.error("上传失败,原因:" + res.msg)
          }
        })
        // 部署环境
        // this.request.post("/Package/uploadSingle", formData,config).then(res => {
        //   if (res.code === "200") {
        //     this.$message.success("上传成功")
        //   } else {
        //     this.$message.error("上传失败")
        //   }
        // })

        // 关闭蒙层
        this.maskDialogVisible = false;
      }
    },


    // 上传ServiceYaml的方法
    checkServiceYamlFile(file) {
      var FileExt = file.name.replace(/.+\./, "");
      if (['yaml'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '目前只支持yaml格式描述文件'
        });
        return false;
      }
    },
    handlePreviewServiceYaml(file) {
      console.log(file);
    },
    handle_successServiceYaml(res) {
      // 这个上传success的钩子函数也是说name暂时没有用，给前端页面暂存的只有UUid
      this.$message.success("文件已上传");
    },
    handleRemoveServiceYaml(file, fileList) {
      // 增加一个，把packageDetailInfo重置清空掉
      this.$message.info("文件已移除，请重新选取");
    },

    handleChangeServiceYaml(file, fileList) {
      this.serviceYamlFileList = fileList;
    },
    handleFileUploadServiceYaml() {
    },
    // 提交方法，发请求给厚度按
    async submitUploadServiceYaml() {
      // 检查一下，文件列表为空别给后端发请求
      if (this.serviceYamlFileList.length == 0) {
        this.$message.warning("没有检测到选取文件，请检查。");
      } else {
        const formData = new FormData();
        this.serviceYamlFileList.forEach(item => {
          formData.append("files", item.raw)
        })
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.maskDialogVisible = true;
        // 开发环境
        await this.request.post("/file/uploadServiceYaml", formData, config).then(res => {
          if (res.code === "200") {
            this.ImageInfoForm.serviceYamlFileName = res.data.fileName;
            this.ImageInfoForm.serviceYamlFileUid = res.data.fileUid;
            this.maskDialogVisible = false;
            this.$message.success("上传成功")
          } else {
            this.maskDialogVisible = false;
            this.$message.error("上传失败,原因:" + res.msg)
          }
        })
        // 部署环境
        // this.request.post("/Package/uploadSingle", formData,config).then(res => {
        //   if (res.code === "200") {
        //     this.$message.success("上传成功")
        //   } else {
        //     this.$message.error("上传失败")
        //   }
        // })


      }
    },


    loadAll() {
      return [
        {"value": "c"},
        {"value": "c#"},
        {"value": "go"},
        {"value": "cpp"},
        {"value": "java"},
        {"value": "python"},
      ];
    },
    languageQuerySearch(queryString, cb) {
      const softwareLanguages = this.softwareLanguages;
      const results = queryString ? softwareLanguages.filter(this.createFilter(queryString)) : softwareLanguages;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },


    // 下面按钮的几个方法
    // 清空
    clearAllPage() {
      this.$router.go(0);
    },

    checkForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve();
          } else reject();
        });
      });
    },


    // 提交
    async postPackingToolInfoForm() {
      if (this.ImageInfoForm.imageFileUid === '') {
        this.$message.warning("没有镜像文件")
      } else if (this.ImageInfoForm.wordLoadYamlFileUid === '') {
        this.$message.warning("没有workLoadYaml")
      } else if (this.ImageInfoForm.serviceYamlFileUid === '') {
        this.$message.warning("没有serviceYaml")
      } else {
        let formList = [];
        formList.push(
          this.checkForm("BasicInfoForm"),
          this.checkForm("DeveloperInfoForm")
        );
        Promise.all(formList)
          .then(() => {
            // 这里应该是全部校验完成，要往后传参数了
            // 通过校验
            this.postAllInfo();
          })
          .catch(() => {
            this.$message.warning("缺少页面必须文件或者信息");
          })
      }
    },


    async postAllInfo() {
      this.maskDialogVisible = true;
      await this.request.post("/packingToolForm/postPackingToolInfo", {
        params: {
          BasicInfoForm: this.BasicInfoForm,
          ImageInfoForm: this.ImageInfoForm,
          DeveloperInfoForm: this.DeveloperInfoForm
        }
      }).then(res => {
        if (res.code == '200') {
          this.zipFileName = res.data;
          this.$message.success("封装完成")
        }
      })
      this.maskDialogVisible = false;
    },

    isZipFileExist() {
      return this.zipFileName !== '';
    },


  },
  mounted() {
    this.softwareLanguages = this.loadAll();
  },
}
</script>

<style>

.item .el-form-item__label {
  color: white;
  font-size: large;

}
</style>
