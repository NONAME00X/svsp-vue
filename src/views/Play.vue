<template>
  <div>
    <Header></Header>

    <el-row>
      <el-col :span="20" :offset="2">
        <el-row>
          <!-- 视频、评论、点赞 -->
          <el-col :span="16">
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
              <el-col :span="8">
                <el-scrollbar height="400px">
                  <el-row v-for="review in reviewList" :key="review">
                    <ReviewItem :review="review"></ReviewItem>
                  </el-row>
                </el-scrollbar>
              </el-col>
            </el-row>

            <!-- 点赞、收藏、关注、举报 -->
            <el-row style="margin-top: 20px;">
              <el-col :span="2">
                <span class="info">点赞</span>
                <img src="@/assets/up.png" v-if="!isUp" width="30px" @click="changeUp">
                <img src="@/assets/up-check.png" v-else width="30px" @click="changeUp">
              </el-col>
              <el-col :span="2">
                <span class="info">关注</span>
                <img src="@/assets/follow.png" v-if="!isFollow" width="30px" @click="changeFollow">
                <img src="@/assets/follow-check.png" v-else width="30px" @click="changeFollow">
              </el-col>
              <el-col :span="2">
                <span class="info">收藏</span>
                <img src="@/assets/like.png" alt="" width="30px">
              </el-col>
              <el-col :span="2" :offset="16">
                <el-button type="warning" plain size="small">举报</el-button>
              </el-col>
            </el-row>

            <!-- 发表评论 -->
            <el-row>
              <Editor @review="commitReview"></Editor>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { RouterLink} from 'vue-router'
import MyVideo from '../components/MyVideo.vue'
import Header from '../components/Header.vue'
import Editor from '../components/editor/Editor.vue'
import ReviewItem from '../components/ReviewItem.vue'

export default{
  data(){
    return {
      vid: this.$route.params.abc,  //this.$route 当前路由，params路由中的参数们
      video: null,
      danmuList: null,
      isUp: false,
      isFollow: false,
      reviewList: null
    }
  },
  mounted(){
    // 发请求获取当前视频的信息
    this.$axios.get("video/findById/" + this.vid).then(res => {
      console.log(res.data)
      // 保存视频信息
      this.video = res.data.data
      
      // 查询用户的点赞
      this.$axios.get("like/findByVid/" + this.video.id).then(res => {
        console.log(res.data.data)
        this.isUp = res.data.data
      })

      // 查询当前视频的评论信息
      this.$axios.get("review/findByVid/" + this.video.id).then(res => {
        console.log(res.data.data)
        this.reviewList = res.data.data
      })

    })
    // 发请求获取当前视频的弹幕列表
    this.$axios.get("danmu/findByVid/" + this.vid).then(res => {
      console.log(res.data.data)
      // 将弹幕传给子组件
      this.danmuList = res.data.data
    })
  },
  components:{
    MyVideo,
    Header,
    Editor,
    ReviewItem
  },
  methods:{
    changeUp(){
      this.isUp = !this.isUp
      // 发请求点赞、取消点赞
      this.$axios.get(`like/update/${this.isUp}/${this.video.id}`).then(res => {

      })
    },
    changeFollow(){
      this.isFollow = !this.isFollow
    },
    commitReview(review){
      console.log(review)
      // 发请求提交评论信息
      let data = {
        vid: this.video.id,
        content: review
      }
      this.$axios.post("review/add", data).then(res => {
        if(res.data.code == 200){
          this.$message.success("发表成功,等待审核")
        }
      })
    }
  }
}
</script>

<style scoped>
.info{
  position: relative;
  top: -8px;
}
</style>