<template>

  <div style="height: 30px; line-height: 60px; width: 100%">
    <div style="float: left">
      <img src="../assets/logo200.png" alt="" style="width: 50px; position: relative;top: 5px;margin-right: 5px;">
    </div>
    <b style="color: white; margin-bottom: 0px;margin-top: 0px;padding-top: 0px;float: left">边缘支撑系统-边缘打包工具</b>
    <span style="padding-left: 20px;padding-top: 1px;float: left">
          {{ dateFormat(date) }}</span>

    <div style="float: right">
      <el-button type="primary">
        封装工具基础版
      </el-button>

    </div>


  </div>


</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      date: new Date(),
      // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
      user: sessionStorage.getItem('userAccount')
    };
  },

  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date();
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  methods: {
    dateFormat: function (time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    logout() {
      this.$router.push("/login");
      window.sessionStorage.removeItem('userAccount');
      window.sessionStorage.removeItem('userRole');
      this.$message.success("已注销");
    },
  }
};
</script>

<style scoped>

</style>
