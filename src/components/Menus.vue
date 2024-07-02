<template>
  <div style="margin-top: 20px;">
    <el-row>
      <!-- 动态、热门 -->
      <el-col :span="2">
        <el-row>
          <el-col :span="12">
            <el-avatar :size="50" :src="avatar"/>
            <p>动态</p>
          </el-col>
          <el-col :span="12">
            <el-avatar :size="50" :src="avatar"/>
            <p>热门</p>
          </el-col>
        </el-row>
      </el-col>

      <!-- 分类 -->
      <el-col :span="16" :offset="1">
        <el-row v-for="(menus, i) in menuList" :key="i" style="margin-bottom: 5px;">
          <el-button v-for="(name, j) in menus" :key="j" style="width: 62px;">{{name}}</el-button>
        </el-row>
      </el-col>

      <!-- 其它 -->
      <el-col :span="5" style="text-align: right;float: right;">
        <el-row class="other-row">
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>专栏
          </el-button>
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>活动
          </el-button>
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>社区中心
          </el-button>
        </el-row>
        <el-row class="other-row">
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>直播
          </el-button>
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>课堂
          </el-button>
          <el-button size="small" class="other-btn">
            <el-icon>
              <Edit/>
            </el-icon>新歌热榜
          </el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default{
  data(){
    return{
      avatar:"https://cdjava96.oss-cn-chengdu.aliyuncs.com/avatar.png",
      menuList:[
        ["番剧", "国创", "综艺", "动画", "鬼畜", "舞蹈", "娱乐", "科技", "美食", "汽车", "运动"],
        ["电影", "电视剧", "纪录片", "游戏", "音乐", "影视", "知识", "资讯", "生活", "时尚", "更多"]
      ]
    }
  }
}
</script>
<style scoped>
*{
  text-align: center;
  font-size: 12px;
}
.other-row{
  margin-bottom: 5px;
  float: right;
}
.other-btn{
  width: 70px;
  height: 32px;
  float: right;
}
</style>