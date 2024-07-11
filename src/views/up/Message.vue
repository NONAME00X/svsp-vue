<template>
  <div>
    <el-select  @change="changeVideo" placeholder="请选择视频" v-model="chooseId" size="large" style="width: 240px">
      <el-option v-for=" item in options" :key="item.id" :label="item.title" :value="item.id" />
    </el-select>
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="title" label="视频title" width="180" />
      <el-table-column label="评论者头像" width="180" #default="scoped">
        <el-image style="width: 50px;height: 50%;" :src="scoped.row.avatar"></el-image>
      </el-table-column>
      <el-table-column prop="time" label="评论时间" />
      <el-table-column prop="content" label="评论内容"  #default="scoped">
        <span v-html="scoped.row.content" class="reivew-content"></span>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          id: 0,
          title: '全部',
        },
      ],
      comments: [],
      chooseId:''
    }
  }, 
  mounted(){
    this.getAllTitle()
  },
  methods:{
    getAllTitle()
    {
      this.$axios.get("video/findAllTitle").then(res => {
      console.log(res.data)
      this.options = res.data.data
    })
    },
    getComments(){
      this.$axios.get(`review/findByVid/${this.chooseId}`).then(res => {
      console.log(res.data)
      this.comments = res.data.data
    })
    },
    changeVideo(){
      console.log("Choose Video--",this.chooseId)
      this.getComments()
    },
  }
}
</script>
<style scoped></style>