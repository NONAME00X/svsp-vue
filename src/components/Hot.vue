<template>
  <div>
    <el-row :gutter="10">
      <!-- 轮播图 -->
      <el-col :span="10">
        <el-carousel height="300px">
          <el-carousel-item v-for="item in carousels" :key="item">
            <el-image style="width: 100%; height: 100%" :src="item.cover" fit="contain" />
          </el-carousel-item>
        </el-carousel>
      </el-col>

      <!-- 推荐视频 -->
      <el-col :span="14">
        <el-row :gutter="15">
          <el-col :span="8" v-for="abc in videoList" :key="abc">
            <VideoItem :video="abc"></VideoItem>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VideoItem from './VideoItem.vue'
export default{
  // data写当前页面的属性，data在脚手架项目中必须是一个函数，不能是对象：为了在组件复用时不会出现互相干扰
  // data里面必须返回一个对象，对象中就写当前页面的属性
  data(){
    return {
      carousels:[
        {
          id: 1001,
          title: "热门推荐1",
          cover: "https://cdjava96.oss-cn-chengdu.aliyuncs.com/c1.png"
        },
        {
          id: 1002,
          title: "热门推荐2",
          cover: "https://cdjava96.oss-cn-chengdu.aliyuncs.com/c2.png",
        },
        {
          id: 1003,
          title: "热门推荐3",
          cover: "https://cdjava96.oss-cn-chengdu.aliyuncs.com/c3.png"
        },
        {
          id: 1004,
          title: "热门推荐4",
          cover: "https://cdjava96.oss-cn-chengdu.aliyuncs.com/c4.png"
        }
      ],
      videoList: []
    }
  },
  mounted(){
    // 发请求将最新的视频查询出来：审核通过的视频
    this.$axios.get("video/findNew").then(res => {
      console.log(res.data)

      this.videoList = res.data.data
    })
  },
  components:{
    VideoItem
  }
}
</script>
<style scoped>

</style>