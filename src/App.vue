
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
      // 建立websocket连接
      var url = "ws://localhost:8080/WebSocketHandler/"
      let user = JSON.parse(window.localStorage.getItem("user"))

      this.ws = new WebSocket(url + user.account)

      // 绑定事件 
      this.ws.onopen = this.open
      this.ws.onmessage = this.message
    },
    open(){
      console.log("建立连接成功")
    },
    message(res){
      // 收到消息
      console.log(res)
      //
      this.$notify({
        title:"通知",
        message: res.data,
        duration: 2000,
        type: 'warning'
      })
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
