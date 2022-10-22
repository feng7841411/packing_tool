import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manager'),
    redirect: "/basicPackage/easyPackage",
    meta: {needLogin: true},
    children: [
      //主页路由
      {
        path: 'home', name: 'Home', component: () => import('../views/subViews/Home'),
      },

      // 容器服务封装部分路由
      {
        path: 'containerService/makingImage', name: 'makingImage', component: () => import('../views/containerService/makingImage')
      },
      {
        path: 'containerService/basicInfo', name: 'basicInfo', component: () => import('../views/containerService/basicInfo')
      },
      {
        path: 'containerService/dependencyOrchestration', name: 'dependencyOrchestration', component: () => import('../views/containerService/dependencyOrchestration')
      },
      {
        path: 'containerService/resourceRequirements', name: 'resourceRequirements', component: () => import('../views/containerService/resourceRequirements')
      },
      {
        path: 'containerService/completePackaging', name: 'completePackaging', component: () => import('../views/containerService/completePackaging')
      },

      // 2022年10月17日 09点49分 basicPackage 上传两种Yaml的做法
      {
        path: 'basicPackage/easyPackage', name: 'easyPackage', component: () => import('../views/basicPackage/easyPackage')
      }



    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
