<template>

  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>基础封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>


    <div style="flex-grow: 2;padding-top: 30px">
      <div style="background-color: #333333;padding-top: 0px;flex-grow: 1"
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
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-left: 20px">一、上传镜像tar包、workLoadYaml、serviceYaml(必填)</span>
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

          <!--这个row是第二个描述标题-->
          <el-row>
            <el-col :span="24">
              <span
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-top: 20px;padding-left: 20px">二、上传挂载所需文件夹(可选)</span>
            </el-col>
          </el-row>
          <!--这里改成了上传挂载的文件夹-->
          <el-row>
            <el-col :span="8">
              <template>
                <div style="float: left;padding-left: 20px">
                  <input @change="getFiles($event)" style="background-color: #42b983;width: 200px" name="files"
                         type="file" webkitdirectory mozdirectory/>
                </div>
                <div style="float: left;padding-left: 20px">
                  <el-button @click="uploadFile" type="submit">上传</el-button>
                </div>
                <div style="float: left;padding-left: 20px;" v-if="ifUploadPlugInFiles">
                  <i class="el-icon-success" style="color: green;font-size: 40px"></i>
                </div>
                <div style="float: left;padding-left: 20px" v-if="false">
                  <el-button @click="testTransferPlugInFile" type="primary">测试挂载文件重建</el-button>
                </div>
                <div style="float: left;padding-left: 20px" v-if="false">
                  <el-button @click="clearAllFile" type="warning">测试删除所有后端文件缓存</el-button>
                </div>

                <!--                <div style="float: left;padding-left: 20px;">-->
                <!--                  <i class="el-icon-warning" style="color: yellow;font-size: 40px"></i>-->
                <!--                </div>-->
              </template>

            </el-col>


          </el-row>

          <!--这个row是第三个描述标题-->
          <el-row>
            <el-col :span="24">
              <span
                style="font-weight: bold; padding-right: 10px;color: white;font-size: larger;float: left;padding-top: 20px;padding-left: 20px">三、请调写服务基础信息(必填)</span>
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

                <el-form-item label="软件运行环境" style="" label-width="150px" required prop="softwareEnvironment"
                              class="item">
                  <el-select v-model="BasicInfoForm.softwareEnvironment" placeholder="请选择"
                             style="width:200px;float: left">
                    <el-option label="x86" value="x86"></el-option>
                    <el-option label="arm" value="arm"></el-option>
                    <el-option label="others" value="others"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务版本号" style="" label-width="150px" required class="item">
                  <el-form-item prop="majorVersionNumber" style="float: left">
                    <el-input v-model="BasicInfoForm.majorVersionNumber" style="float: left"
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
                <el-form-item label="服务功能描述" style="" label-width="150px" required prop="serviceDescription"
                              class="item">
                  <el-input type="textarea" v-model="BasicInfoForm.serviceDescription" placeholder="输入服务描述信息"
                            style="width:600px;float: left" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item label="服务标签" label-width="150px" class="item" required>
                  <el-tag
                    style="float: left"
                    size="big"
                    :key="tag"
                    v-for="tag in BasicInfoForm.keywordList"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="medium"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    style="float: left"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput" style="float: left;">+增加标签</el-button>
                </el-form-item>






                <el-form-item label="containers cpuRequest" style="" label-width="250px" required prop="cpuRequests"
                              class="item">
                  <el-input v-model="BasicInfoForm.cpuRequests" placeholder="单位/核"
                            style="width:200px;float: left"></el-input>
                </el-form-item>
                <el-form-item label="containers memoryRequest" style="" label-width="300px" required
                              prop="memoryRequests" class="item">
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
                  <el-input v-model="DeveloperInfoForm.developerName" placeholder=""
                            style="width: 200px;float: left"></el-input>
                </el-form-item>

                <el-form-item label="服务开发单位" style="" label-width="150px" required prop="developerGroup" class="item">
                  <el-input v-model="DeveloperInfoForm.developerGroup" placeholder=""
                            style="width: 200px;float: left"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" style="" label-width="150px" required prop="developerPhone" class="item">
                  <el-input v-model="DeveloperInfoForm.developerPhone" placeholder=""
                            style="width: 200px;float: left"></el-input>
                </el-form-item>
              </el-form>

            </div>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div
                style="float: inside; padding-left: 40px;padding-top: 10px; color:white;font-size: 20px;padding-bottom: 10px">
<!--                <el-button @click="testGetApi" type="warning">测试API获取</el-button>-->
<!--                <el-button @click="testGetApi1" type="warning">测试API获取1</el-button>-->
<!--                <el-button @click="testGetApi2" type="warning">测试API获取2</el-button>-->
<!--                <el-button @click="testGetApi3" type="warning">测试API获取3</el-button>-->
                <el-button @click="clearAllFile" type="warning">删除所有后台文件缓存</el-button>
                <el-button type="danger" @click="clearAllPage()">清空页面所有已填写内容</el-button>
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

import {ipconfig} from "../../../public/ipconfig"

import axios from "axios";

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


      // 挂载上传文件夹
      files: [],
      pluginFileUIds: [],
      ifUploadPlugInFiles: false,


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
        // 2022年11月30日 时间，增加2个
        serviceDescription:'',
        keywordList:[],
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',

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
        serviceDescription: [
          {required:true, message:'请描述服务功能、作用',trigger:'blur'},
        ],
        cpuRequests: [
          {required: true, message: '请输入容器服务cpu最低需求', trigger: 'blur'},
          {validator: validatePassNumber, trigger: 'blur'},
          {pattern: /^([1-8])$/, message: '范围在1~8', trigger: 'blur'}
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


    testGetApi() {
      let url = window.ipconfig.myUrl + "/testAxiosApi"
      axios({
        method: 'post',
        url: url
      }).then(res => {
        if (res.data.code === '200') {
          this.$message.success(res.data.msg);
        }else {
          this.$message.warning(res.data.msg);
        }
      })
    },

    testGetApi1() {
      this.request.post("/testAxiosApi").then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg);
        }else {
          this.$message.warning(res.msg);
        }
      })
    },

    testGetApi2() {
      let url = "http://" + ipconfig.deploymentToolIp + ":" + ipconfig.deploymentToolPort + "/testAxiosApi"
      axios({
        method: 'post',
        url: url
      }).then(res => {
        if (res.data.code === '200') {
          this.$message.success(res.data.msg);
        }else {
          this.$message.warning(res.data.msg);
        }
      })
    },

    testGetApi3() {
      let url = window.ipConfigUrl.baseURL + "/testAxiosApi"
      axios({
        method: 'post',
        url: url
      }).then(res => {
        if (res.data.code === '200') {
          this.$message.success(res.data.msg);
        }else {
          this.$message.warning(res.data.msg);
        }
      })
    },

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
      this.ImageInfoForm.imageFileName = '';
      this.ImageInfoForm.imageFileUid = '';
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
      this.ImageInfoForm.workLoadYamlFileName = '';
      this.ImageInfoForm.wordLoadYamlFileUid = '';
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
      this.ImageInfoForm.serviceYamlFileName = '';
      this.ImageInfoForm.serviceYamlFileUid = '';
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
        {"value": "cpp"},
        {"value": "go"},
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
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
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
          DeveloperInfoForm: this.DeveloperInfoForm,
          pluginFileUIds: this.pluginFileUIds,
        }
      }).then(res => {
        if (res.code == '200') {
          this.zipFileName = res.data;
          this.$message.success("封装完成");
          this.maskDialogVisible = false;
        }else {
          this.$message.error("封装失败");
          this.maskDialogVisible = false;
        }
      })

    },

    isZipFileExist() {
      return this.zipFileName !== '';
    },


    /**
     * 2022年10月26日 22点03分 增加挂载文件夹上传
     */
    getFiles: function (event) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        this.files.push(files[i]);
      }
    },
    uploadFile: function () {
      var formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
      }
      this.request.post("/file/uploadPlugInFile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.info(res.msg);
          this.pluginFileUIds = res.data;
          this.ifUploadPlugInFiles = true;
        }
      })
    },

    // 2022年10月27日 09点07分 测试方法，把挂载文件重建在后端的FileTemp
    testTransferPlugInFile() {
      this.request.post("/file/testTransferPlugInFile", {
        params: {
          pluginFileUIds: this.pluginFileUIds,
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg);
        }
      })
    },


    // 2022年10月27日 10点12分 方便自己调试，把后端的数据全清空
    clearAllFile() {
      this.request.post("/file/testClearAllFile", {
        params: {
          pluginFileUIds: this.pluginFileUIds,
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg);
        }
      })
    },
    // 2022年11月30日 20点13分 动态增加标签，3个方法
    handleClose(tag) {
      this.BasicInfoForm.keywordList.splice(this.BasicInfoForm.keywordList.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.BasicInfoForm.keywordList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
