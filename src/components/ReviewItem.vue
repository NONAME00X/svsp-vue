<template>
  <el-col class="review-item">
    <!-- 头像、账号、发布时间、关闭按钮 -->
    <el-row>
      <el-col :span="3">
        <el-avatar :size="50" :src="review.avatar" />
      </el-col>
      <el-col :span="5">
        <span>{{review.account}}</span>
      </el-col>
      <el-col :span="6">
        <span style="font-size: 10px;">{{review.time}}</span>
      </el-col>
      <el-col :span="1" :offset="9" v-if="isMyReview()">
        <el-icon>
          <Close/>
        </el-icon>
      </el-col>
    </el-row>

    <!-- 评论内容 -->
    <el-row>
      <el-col :span="20" :offset="3">
        <span v-html="review.content" class="reivew-content"></span>
      </el-col>
    </el-row>

    <!-- 点赞、回复、踩他 -->
    <el-row>
      <el-col :span="10" :offset="14">
        <div class="action">
          <span>点赞</span>
          <span>回复</span>
          <span>踩他</span>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
export default{
  props:{
    review: Object  // 接收父组件给它的数据
  },
  methods:{
    isMyReview(){
      let user = window.localStorage.getItem("user")
      console.log(user)
      if(user){
        if(this.review.uid == JSON.parse(user).id){
          return true
        }
      }
      return false
    }
  }
}
</script>
<style scoped>
.review-item{
  position: relative;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 10px;
}
.reivew-content{
  position: relative;
  top: -30px;
}
.action{
  position: absolute;
  top: -30px;
}
</style>