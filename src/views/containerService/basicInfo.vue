<template>

  <div style="display: flex;flex-direction: column;height: 80vh">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><b>打包封装</b></el-breadcrumb-item>
      <el-breadcrumb-item>镜像服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="padding-top: 20px">
      <el-steps :active="1" align-center >
        <el-step title="服务镜像化" style="font-size: 10px"></el-step>
        <el-step title="填写基础信息" ></el-step>
        <el-step title="服务依赖编排" ></el-step>
        <el-step title="设置资源需求" ></el-step>
        <el-step title="完成封装" ></el-step>
      </el-steps>
    </div>

    <div style="padding-top: 0px;flex-grow: 2">
      <div class="note" :style ="note">
        <el-row style="padding-top: 40px">
          <el-col :span="24">
            <div style="padding-top: 20px">
              <el-form :model="BasicInfoForm"
                       :rules="BasicInfoFormRules"
                       ref="BasicInfoForm"
                       label-width="120px"
                       class="demo-ruleForm"
                       style="margin: 0px;height: 200%;width: 100%"
              >
                <el-form-item label="服务中文名称" style="float: left" required prop="softwareCnName" class="item">
                  <el-col :span="6">
                    <el-input v-model="BasicInfoForm.softwareCnName" placeholder="服务中文名称" style="width: 200px"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="服务组名称" style="float: left" class="item">
                  <el-input v-model="BasicInfoForm.softwareGroupName" placeholder="服务组名称" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="软件运行环境" style="float: left;" required prop="softwareEnvironment" class="item">
                  <el-select v-model="BasicInfoForm.softwareEnvironment" placeholder="请选择">
                    <el-option label="x86" value="x86"></el-option>
                    <el-option label="arm" value="arm"></el-option>
                    <el-option label="others" value="others"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务版本号" style="float: left" required class="item">
                  <el-col :span="6">
                    <el-form-item prop="majorVersionNumber">
                      <el-input v-model="BasicInfoForm.majorVersionNumber" placeholder="主版本号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>

                  <el-col :span="6">
                    <el-form-item prop="minorVersionNumber">
                      <el-input v-model="BasicInfoForm.minorVersionNumber" placeholder="子版本号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>

                  <el-col :span="6">
                    <el-form-item prop="revisionNumber">
                      <el-input v-model="BasicInfoForm.revisionNumber" placeholder="修正版本号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="服务唯一标识" required style="float: left" class="item" >
                  <el-col :span="5">
                    <el-form-item prop="domainName">
                      <el-input v-model="BasicInfoForm.domainName" style="float: left"
                                placeholder="业务域标识"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="5">
                    <el-form-item prop="softwareName">
                      <el-input v-model="BasicInfoForm.softwareName" style="float: left"
                                placeholder="业务软件名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="5">
                    <el-form-item prop="serviceName">
                      <el-input v-model="BasicInfoForm.serviceName" style="float: left"
                                placeholder="服务功能名"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="5">
                    <el-form-item prop="languageName">
                      <el-autocomplete
                        class="inline-input"
                        v-model="BasicInfoForm.languageName"
                        :fetch-suggestions="languageQuerySearch"
                        placeholder="请输入开发语言"
                        :trigger-on-focus="true"
                      >
                      </el-autocomplete>
                    </el-form-item>
                  </el-col>


                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="padding-top: 20px">
              <el-form :model="DeveloperInfoForm"
                       :rules="DeveloperInfoFormRules"
                       ref="DeveloperInfoForm"
                       label-width="120px"
                       class="demo-ruleForm3"
                       style="margin: 0px;height: 200%;width: 100%"
              >
                <el-form-item label="服务开发者" style="float: left" required prop="developerName" class="item">
                  <el-input v-model="DeveloperInfoForm.developerName" placeholder="" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="服务开发单位" style="float: left" prop="developerGroup" class="item">
                  <el-input v-model="DeveloperInfoForm.developerGroup" placeholder="" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" style="float: left" prop="developerPhone" class="item">
                  <el-input v-model="DeveloperInfoForm.developerPhone" placeholder="" style="width: 200px"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="float: inside; padding-left: 40px;padding-top: 80px; color:white;font-size: 20px">
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
  name: "basicInfo",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../../assets/basic_design.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        marginTop: "0px",
        height: "100%",
      },

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
          {required: false}
        ],
        developerPhone: [
          {required: false}
        ]
      },
    }
  },
  methods:{
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
    goPrevious() {
      this.$router.push("/containerService/makingImage")
    },
    goNext() {
      this.$router.push("/containerService/dependencyOrchestration")
    },
  },
  mounted() {
    this.softwareLanguages = this.loadAll();

  },
}
</script>

<style >

.item .el-form-item__label{
  color: white;
}
</style>
