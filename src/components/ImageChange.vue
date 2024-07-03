<template>
  <div>
    <el-row class="item">
      <el-button @click="$refs.fileInput.click()" size="small" type="success">选择封面
        <el-icon><Files/></el-icon>
      </el-button>
      <input 
        type="file" 
        ref="fileInput" 
        @change="changeFile" 
        accept=".png,.jpg,.jfif" 
        v-show="show"/>
    </el-row>
    <el-row class="item">
      <img src="@/assets/cover.png" alt="" class="cover" id="cover">
    </el-row>
    
  </div>
</template>
<script>
export default{
  data(){
    return{
      show: false,
    }
  },
  mounted(){
  },
  methods:{
    changeFile(event) {
      let file = event.target.files[0]

      if(file){
        document.getElementById("cover").src = URL.createObjectURL(file)
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
.cover{
  width: 320px;
  height: 180px;
  border: 1px solid gray;
  border-radius: 5px;
}
.item{
  margin-bottom: 5px;
}
</style>