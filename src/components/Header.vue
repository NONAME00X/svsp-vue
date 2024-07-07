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
      <el-col :span="5">
        <!-- 输入框 -->
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>

      <!-- 头像、个人、投稿 -->
      <el-col :span="9">
        <ul class="menu">
          <li @click="checkState">
            <el-avatar :size="40" :src="avatar" />
          </li>
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
                         @click="upload"
                         v-if="isNotAdmin()">
                <el-icon>
                  <UploadFilled />
                </el-icon>投稿
              </el-button>

              <el-button type="danger" plain v-if="isLogin" @click="logout">
                注销
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

    <!-- 登录、注册对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="登录/注册"
      width="40%">
      <div>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-input placeholder="账号" style="margin-bottom: 20px;" v-model="user.account"></el-input>
            <el-input placeholder="密码" style="margin-bottom: 20px;" v-model="user.password" show-password></el-input>
            <el-button type="success" style="width: 100px;" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data(){
    return{
      dialogVisible : false, // 默认情况下对话框隐藏
      user:{
        account: "",
        password: ""
      },
      avatar: "https://cdjava96.oss-cn-chengdu.aliyuncs.com/login.png",
      isLogin: false
    }
  },
  mounted(){
    // 判断本地是否有用户信息  得到的是字符串
    let user = window.localStorage.getItem("user")
    if(user){
      // JSON.parse 将字符串转换成对象
      this.avatar = JSON.parse(user).avatar
      // 已登录
      this.isLogin = true
    }
  },
  methods:{
    login(){
      console.log(this.user)
      // 发请求进行登录  axios
      this.$axios.post("user/login", this.user).then(res =>{
        console.log(res)
        if(res.data.code == 200){
          this.$message.success("登录成功")
          // 将用户信息、token信息保存到本地
          let user = res.data.data
          let token = res.headers.authorization

          // 设置用户头像
          this.avatar = user.avatar

          this.isLogin = true

          // localStorage:浏览器自带用来存储数据的
          // JSON.stringify 将对象转换JSON格式字符串，因为localStorage只能存字符串
          window.localStorage.setItem("user", JSON.stringify(user))
          window.localStorage.setItem("token", token)

          // 隐藏登录的对话框
          this.dialogVisible = false
        }
      })
    },
    checkState(){
      // 判断本地是否有用户信息
      let user = window.localStorage.getItem("user")

      // 如果user有数据说明登录过了,否则没有
      if(user){
        // 登录了  跳转到个人后台页面
        // 判断当前用户是管理员还是up主
        user = JSON.parse(user)
        //
        if(user.role == 'up'){
          this.$router.push("/upPersonal")
        }else{
          this.$router.push("/adminPersonal")
        }
      }else{
        // 没登录
        this.dialogVisible = true
      }
    },
    isNotAdmin(){
      let user = window.localStorage.getItem("user")
      if(user){
        user = JSON.parse(user)
        if(user.role == 'admin'){
          return false
        }
      }
      return true
    },
    logout(){
      // 删除本地的用户信息
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
      //
      this.isLogin = false
      this.avatar = "https://cdjava96.oss-cn-chengdu.aliyuncs.com/login.png"
      // 登出之后跳转到首页
      this.$router.push("/")
    }
  }
}
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