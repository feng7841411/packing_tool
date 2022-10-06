const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,

  devServer: {
    hot: true,
    port: 19800,
    host: '0.0.0.0',
  },

})
