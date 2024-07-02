<template>
  <div>
    <!-- 1.header：logo、搜索、头像 -->
    <!-- 3.使用组件 -->
    <Header></Header>

    <el-row>
      <el-col :span="20" :offset="2">
        <!-- 2.菜单 -->
        <Menus></Menus>

        <!-- 3.轮播图、热门视频 -->

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

export default{
  // 写事件函数，例如点击、双击、change事件等等
  methods:{
    
  },
  components:{
    // 2.注册组件
    Header,
    Menus
  }
}
</script>

<style scoped>

</style>