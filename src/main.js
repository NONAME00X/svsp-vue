// 全局导入css文件：如果某些css是很多页面都需要用到的，就可以在main.js中统一导入，对所有页面有效
// import './assets/main.css'

// 导入createApp函数，用来创建应用程序对象
import { createApp } from 'vue'
// 导入程序的主页面
import App from './App.vue'
// 导入路由：进行页面跳转
import router from './router'

// 创建项目对象
const app = createApp(App)

// 使用路由：让路由生效
app.use(router)

// 显示项目主页面
app.mount('#app')
