<template>
  <div>
    <h2>首页</h2>

    <RouterLink to="/play">去播放页</RouterLink>
    <hr>
    <button @click="goPlay()">去播放页</button>
    <hr>
    <button @click="$router.push('/play')">去播放页</button>
  </div>
</template>

<script>
import { RouterLink} from 'vue-router'

export default{
  // 写事件函数，例如点击、双击、change事件等等
  methods:{
    goPlay(){
      console.log("按钮被点击了")
      // 通过路由跳转页面
      this.$router.push("/play")
    }
  }
}
</script>

<style scoped>

</style>