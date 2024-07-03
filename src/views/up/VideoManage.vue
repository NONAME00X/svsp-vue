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
      <el-table :data="videoList" style="width: 100%">
        <el-table-column prop="title" label="视频标题" width="180" />
        <el-table-column prop="cover" label="视频封面" width="180" />
        <el-table-column prop="video" label="视频" />
      </el-table>
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
      // 响应对象：里面包含了状态、数据、响应头
      console.log(res)
      // res.data属性：存放后端返回的数据  ResponseResult 对象
      console.log(res.data)
      // res.data.data：分页信息 ResPage
      console.log(res.data.data)
      // 获取到了分页信息对象
      let resPage = res.data.data
      // 获取总条数
      this.total = resPage.total
      // 获取当前页数据
      this.videoList = resPage.data
    })
  }
}
</script>
<style scoped>

</style>