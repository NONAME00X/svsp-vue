
<script>
// 导入第三插件、其它页面、写当前页面中的事件
import { RouterLink, RouterView } from 'vue-router'

export default{
  data(){
    return {
      ws: null
    }
  },
  methods:{
    loginSuccess(){
      console.log("app 监听到登录成功")
    }
  }
}
</script>

<template>
  <!-- 编写当前页面有哪些元素、标签：页面内容 -->
  <!-- RouterView显示当前URL对应的页面 -->
  <!-- 一级路由view，用来显示大的页面、整个页面 -->
  <RouterView @loginSuccess="loginSuccess"/>
</template>

<style scoped>
/* 当前页面中标签样式 */
</style>
