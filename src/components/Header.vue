<template>
  <div style="background-color: black;">
    <!-- 菜单、输入框、头像 -->
    <!-- 行 :gutter="20" 指定列之间的间距  单位px -->
    <el-row :gutter="20">
      <!-- 列 span：指定当前el-col占用多少列-->
      <el-col :span="10">
        <ul class="menu">
          <li><a href="#">首页</a></li>
          <li><a href="#">番剧</a></li>
          <li><a href="#">直播</a></li>
          <li><a href="#">游戏中心</a></li>
          <li><a href="#">会员购</a></li>
          <li><a href="#">漫画</a></li>
          <li><a href="#">赛事</a></li>
          <li><a href="#">欧洲杯</a></li>
          <li><a href="#">周年庆</a></li>
        </ul>
      </el-col>

      <!-- 搜索输入框 -->
      <el-col :span="6">
        <!-- 输入框 -->
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>

      <!-- 头像、个人、投稿 -->
      <el-col :span="8">
        <ul class="menu">
          <li style="margin-left: 10px;margin-right: 10px;">
            <el-icon color="white">
              <Avatar />
            </el-icon>
            <div style="color: white;">大会员</div>
          </li>
          <li style="margin-left: 10px;margin-right: 10px;">
            <el-icon color="white">
              <Avatar />
            </el-icon>
            <div style="color: white;">消息</div>
          </li>
          <li style="margin-left: 10px;margin-right: 10px;">
            <el-icon color="white">
              <Avatar />
            </el-icon>
            <div style="color: white;">动态</div>
          </li>
          <li style="margin-left: 10px;margin-right: 10px;">
            <el-icon color="white">
              <Avatar />
            </el-icon>
            <div style="color: white;">历史</div>
          </li>
          <li style="margin-left: 10px;margin-right: 10px;">
            <el-icon color="white">
              <Avatar />
            </el-icon>
            <div style="color: white;">创作中心</div>
          </li>
          <li style="margin-left: 10px;margin-right: 10px;">
            <div style="color: white;">
              <el-button type="danger"
                         @click="upload">
                <el-icon>
                  <UploadFilled />
                </el-icon>投稿
              </el-button>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!-- logo  :offset="20"  设置偏移量-->
    <el-row>
      <el-col :span="4">
        <img src="@/assets/logo.png"
             alt=""
             style="width: 100%; height: auto;">
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.menu li {
  float: left;
}

.menu li a {
  display: block;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
}

/* 鼠标悬停时的样式 */
.menu li a:hover {
  font-size: 14px; /* 增加字体大小 */
}

/* 清除浮动 */
.menu:after {
  content: '';
  display: table;
  clear: both;
}
</style>