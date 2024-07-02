import { createRouter, createWebHistory } from 'vue-router'
// 1.导入页面：项目启动时就导入页面
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',         // 路由的路径   /项目根路径
      name: 'index',     // 路由名，今后可以根据路由的名字进行页面跳转
      component: Index   // 页面的名字，需要与导入时的名字一直
    },
    {
      path: '/play',
      name: 'play',
      // 路由懒加载：需要时再加载，不是提前就加载好
      component: () => import('../views/Play.vue')  // 在访问页面时才导入
    },
    {
      path: '/upPersonal',
      name: 'upPersonal',
      component: () => import('../views/up/UpPersonal.vue')  
    }
  ]
})

export default router
