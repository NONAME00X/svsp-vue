<template>
  <div>
    <!-- 视频信息、用户信息 -->
    <el-row v-if="video">
      <!-- 视频信息 -->
      <el-col :span="16">
        <!-- 标题 -->
        <el-row>
          <h3>{{video.title}}</h3>
        </el-row>

        <!-- 播放次数、上传时间 -->
        <el-row>
          <span>播放次数：{{video.playnums}}</span>
          <!-- 空格 -->
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>发布时间：{{video.uptime}}</span>
        </el-row>
      </el-col>

      <!-- up主信息 -->
      <el-col :span="8">

      </el-col>
    </el-row>

    <!-- 视频播放、评论 -->
    <el-row>
      <!-- 播放器 -->
      <el-col :span="16">
        <MyVideo v-if="video!=null && danmuList!=null" :video="video" :danmuList="danmuList"></MyVideo>
      </el-col>

      <!-- 评论列表 -->
      <el-col :span="8"></el-col>
    </el-row>

  </div>
</template>

<script>
import { RouterLink} from 'vue-router'
import MyVideo from '../components/MyVideo.vue'

export default{
  data(){
    return {
      vid: this.$route.params.abc,  //this.$route 当前路由，params路由中的参数们
      video: null,
      danmuList: null
    }
  },
  mounted(){
    // 发请求获取当前视频的信息
    this.$axios.get("video/findById/" + this.vid).then(res => {
      console.log(res.data)
      // 保存视频信息
      this.video = res.data.data
    })
    // 发请求获取当前视频的弹幕列表
    this.$axios.get("danmu/findByVid/" + this.vid).then(res => {
      console.log(res.data.data)
      // 将弹幕传给子组件
      this.danmuList = res.data.data
    })


  },
  components:{
    MyVideo
  }
}
</script>

<style scoped>

</style>