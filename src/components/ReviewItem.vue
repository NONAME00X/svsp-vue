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
      <el-col :span="1" :offset="8" v-if="isMyReview()">
        <el-icon @click="del">
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
      <el-col :span="5" :offset="19">
        <!-- 要实现点赞、踩的功能需要给t_review表添加两个字段：点赞数、踩的数量 -->
        <div class="action">
          <img src="@/assets/up.png" alt="" width="20px">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img src="@/assets/down.png" alt="" width="20px">
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
    },
    del(){
      // 删除评论
      // 弹提示框
      this.$messageBox.confirm(
        '是否要删除该评论',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() =>{
        console.log("点击了确定")
        // 子组件通知父组件删除当前评论信息
        // 通过自定义事件
        this.$emit("del", this.review.id)
      }).catch(() => {
        console.log("点击了取消")
      })
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
  padding-left: 5px;
  padding-top: 5px;
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