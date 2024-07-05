<template>
  <div v-if="show"
       class="item-box">
    <el-row>
      <img :src="video.cover"
           class="cover">
    </el-row>
    <el-row class="play-icon">
      <img src="@/assets/play.png"
           class="rec-list-play" @click="play(video.id)">
    </el-row>
    <p class="title">{{video.title}}</p>
    <p style="position: relative;top: -30px;">
      <span style="color: red;">{{video.uid}}</span>&nbsp;&nbsp;
      <span style="font-size: 12px;">{{video.uptime}}</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,  // 显示、交互用的属性
    }
  },
  props: {
    video: Object,  // 用来接收父组件传递的数据
  },
  mounted() {
    if (this.video) {
      this.show = true
    }
  },
  methods:{
    play(id){
      this.$router.push("/play/" + id)   //   /play/n
    }
  }
}
</script>
<style scoped>
.item-box {
  width: 100%;
  position: relative;
}
.cover {
  width: 100%;
  height: auto;
  border: 1px solid gainsboro;
}
.play-icon {
  position: absolute;
  top: 0px;
  left: 0px;
}
.rec-list-play {
  width: 100%;
  height: 100%;
}
.rec-list-play:hover {
  transform: scale(1.1);
}
.title {
  margin-bottom: 15px;
  font-weight: bold;
  white-space: nowrap; /* 强制文本不换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的内容 */
  display: inline-block; /* 将 p 标签设置为行内块元素，确保宽度生效 */
}
</style>