<template>
  <div>
    <!-- 搜索、添加 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="视频标题" style="width: 80%;"></el-input>
        <el-button type="success">搜索</el-button>
      </el-col>
      <el-col :span="1" :offset="15">
        <el-button type="primary">添加</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-row>

    </el-row>

    <!-- 分页 -->
    <el-row></el-row>
  </div>
</template>
<script>
export default{
  data(){
    return{
      page: 1, // 页面
      size: 5, // 每一页多少条数据
      total: 0, // 总条数
      videoList: [] // 当前页的视频列表、数据
    }
  },
  mounted(){
    // 页面加载时去查询出第一页的视频信息
    // video/findByUid/1/5    video/findByUid?page=1&size=5&account=xxx
    // `模板字符串`  方便拼接字符串
    this.$axios.get(`video/findByUid/${this.page}/${this.size}`).then(res =>{
      console.log(res.data)
    })
  }
}
</script>
<style scoped>

</style>