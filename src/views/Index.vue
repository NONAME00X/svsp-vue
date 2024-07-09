<template>
  <div>
    <!-- 1.header：logo、搜索、头像 -->
    <!-- 3.使用组件 -->
    <Header @loginSuccess="loginSuccess"></Header>

    <el-row>
      <el-col :span="20" :offset="2">
        <!-- 2.菜单 -->
        <Menus></Menus>

        <!-- 3.轮播图、热门视频 -->
        <Hot></Hot>

        <!-- 4.其它视频的列表 -->
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { RouterLink} from 'vue-router'
// 1.导入组件
import Header from '../components/Header.vue'
import Menus from '../components/Menus.vue'
import Hot from '../components/Hot.vue'

export default{
  // 写事件函数，例如点击、双击、change事件等等
  methods:{
    loginSuccess(){
      this.$emit("loginSuccess")
    }
  },
  components:{
    // 2.注册组件
    Header,
    Menus,
    Hot
  }
}
</script>

<style scoped>

</style>