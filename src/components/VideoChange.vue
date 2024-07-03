<template>
  <div>
    <el-row class="item">
      <el-button @click="$refs.fileInput.click()" size="small" type="success">选择文件
        <el-icon><Files/></el-icon>
      </el-button>
      <input 
        type="file" 
        ref="fileInput" 
        @change="changeFile" 
        accept=".mp4" 
        v-show="show"/>
    </el-row>
    <el-row class="item">
      <video id="videoPlayer" controls width="320" height="180"></video>
    </el-row>
      
  </div>
</template>
<script>
export default{
  data(){
    return{
      show: false
    }
  },
  mounted(){
  },
  methods:{
    changeFile(event) {
      let file = event.target.files[0]
      if(file){
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = URL.createObjectURL(file);
        videoPlayer.load(); // 重新加载视频
        
        // 通过自定义事件将文件传递给父组件
        this.$emit("changeFile", file)
      }
    }
  }
}
</script>
<style scoped>
.car-image{
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  background-color: white;
  object-fit: cover;
}
#fileInput{
  display: none;
}
.item{
  margin-bottom: 5px;
}
</style>