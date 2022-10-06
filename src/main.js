import Vue from 'vue'
import App from './App.vue'


import router from './router'





import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {size: "small"});

import './assets/gloable.css'


import dataV from '@jiaminghi/data-view'
Vue.use(dataV)











new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



