<template>
  <div>
    <!-- 搜索、添加 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="视频标题" v-model="search" style="width: 80%;"></el-input>
        <el-button type="success" @click="getData()">搜索</el-button>
      </el-col>
      <el-col :span="1" :offset="15">
        <el-button type="primary" @click="$router.push('/upPersonal/addVideo')">添加</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-row>
      <el-table :data="videoList" style="width: 100%">
        <el-table-column prop="title" label="视频标题" width="180" align="center" />

        <!-- prop：对象的属性，只能在el-table-column中使用 -->
        <!-- 如果想在子标签中访问属性，只能通过 #default="scoped" 插槽  scoped简单的理解成 videoList-->
        <el-table-column label="视频封面" width="180" #default="scoped" align="center">
          <!-- scoped.row：当前行的对象 -->
          <el-image :src="scoped.row.cover"></el-image>
        </el-table-column>

        <el-table-column label="视频" #default="scoped" align="center">
          <!-- controls:播放控件 -->
          <video :src="scoped.row.video" style="width: 160px;height: 90px;" controls></video>
        </el-table-column>

        <el-table-column prop="uptime" label="上传时间" width="180" align="center" />
        <el-table-column prop="playnums" label="播放次数" width="100" align="center" />

        <el-table-column label="视频状态" align="center" #default="scoped" width="100">
          <el-tag v-if="scoped.row.state == 'video_pass'" type="success">正常</el-tag>
          <el-tag v-if="scoped.row.state == 'video_commit'" type="warning">审核中</el-tag>
          <el-tag v-if="scoped.row.state == 'video_reject'" type="danger">未通过</el-tag>
          <el-tag v-if="scoped.row.state == 'video_lock'" type="info">被锁定</el-tag>
        </el-table-column>

        <el-table-column label="操作" align="center" #default="scoped">
          <el-button type="primary" @click="getInfo(scoped.row)">查看</el-button>
          <el-button type="warning" @click="edit(scoped.row)" v-if="scoped.row.state != 'video_lock'">编辑</el-button>
          <el-button type="danger" @click="deleteDialogVisible=true;this.selectRow=scoped.row" v-if="scoped.row.state != 'video_lock'">删除</el-button>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 分页 -->
    <el-row>
      <el-pagination layout="prev, pager, next, jumper" :total="total" :default-page-size="size"
        @current-change="pageChange" />
    </el-row>
    <!-- 查看 -->
    <el-dialog v-model="InfoDialogVisible" title="视频信息查看">
      <el-space fill wrap direction="horizontal" style="width:100%" :size="50">
        <el-row><el-col :span="12">{{ selectRow.title }}</el-col><el-col :span="12">播放次数:{{ selectRow.playnums
            }}</el-col></el-row>
        <el-row><el-col :span="12"><el-image style="width: 160px;height: 90px;"
              :src="selectRow.cover"></el-image></el-col><el-col :span="12">点赞数:{{ selectRow.likenums
            }}</el-col></el-row>
        <el-row><el-col :span="12"><video :src="selectRow.video" style="width: 160px;height: 90px;"
              controls></video></el-col><el-col :span="12">收藏数:{{ selectRow.collectnums }}</el-col></el-row>
        <el-row><el-col :span="12">发布时间:{{ selectRow.uptime }}</el-col><el-col :span="12">视频状态:
            <el-tag v-if="selectRow.state == 'video_pass'" type="success">正常</el-tag>
            <el-tag v-if="selectRow.state == 'video_commit'" type="warning">审核中</el-tag>
            <el-tag v-if="selectRow.state == 'video_reject'" type="danger">未通过</el-tag>
            <el-tag v-if="selectRow.state == 'video_lock'" type="info">被锁定</el-tag></el-col></el-row>
        <el-row><el-col :span="2" :offset="22"><el-button type="primary"
              @click="this.InfoDialogVisible = false;">返回</el-button></el-col></el-row>
      </el-space>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="editDialogVisible" title="视频信息编辑">
      <el-space fill wrap direction="horizontal" style="width:100%" :size="50">
        <el-row><el-col> <el-input v-model="editTitle" style="width: 240px" placeholder="输入视频标题" /></el-col></el-row>
        <el-row><el-col><el-image style="width: 160px;height: 90px;"
              :src="selectRow.cover"></el-image></el-col></el-row>
        <el-row><el-col><video :src="selectRow.video" style="width: 160px;height: 90px;"
              controls></video></el-col></el-row>
        <el-row><el-col :span="6" :offset="18"><el-button @click="this.editDialogVisible = false;">取消</el-button>
            <el-button type="primary" @click="editTileById()">确定</el-button></el-col></el-row>
      </el-space>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog v-model="deleteDialogVisible" title="警告" width="500" center>
            <el-row justify="center"><span style="color:red ;font-size: medium">确定要删除该视频吗</span></el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取消</el-button>
                    <el-button type="danger" @click="deleteVideo();">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1, // 页面
      size: 5, // 每一页多少条数据
      total: 0, // 总条数
      videoList: [], // 当前页的视频列表、数据
      search: '',
      InfoDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible:false,
      //按钮传递的行
      selectRow: {},
      editTitle: '',
    }
  },
  mounted() {
    // 页面加载时去查询出第一页的视频信息
    this.getData()
  },
  methods: {
    pageChange(page) {
      this.page = page
      //
      this.getData()
    },
    getData() {
      // video/findByUid/1/5    video/findByUid?page=1&size=5&account=xxx
      // `模板字符串`  方便拼接字符串
      this.$axios.get(`video/findByUid/${this.page}/${this.size}`, {
        params: {
          search: this.search
        }
      }).then(res => {
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
    },
    getInfo(row) {
      this.InfoDialogVisible = true
      this.selectRow = row
    },
    edit(row) {
      this.editDialogVisible = true
      this.selectRow = row
      this.editTitle = row.title
    },
    editTileById() {
      try {
        //发送请求修改
        this.$axios.get(`video/editVideo/${this.selectRow.id}`, {
          params: {
            title: this.editTitle
          }
        }).then(res => {
          // 响应对象：里面包含了状态、数据、响应头
          console.log(res)
          // res.data属性：存放后端返回的数据  ResponseResult 对象
          console.log(res.data)
          // res.data.data：分页信息 ResPage
          // 修改成功
          this.$message.success("修改成功")

          this.getData();
        })
      } catch (error) {
        // 错误处理
        console.error(error);
        this.$message.error("修改失败");
      }
      this.editDialogVisible = false;
    },
    deleteVideo()
    {
      //发送请求
      try {
        //发送请求修改
        this.$axios.get(`video/delete/${this.selectRow.id}`).then(res => {
          // 响应对象：里面包含了状态、数据、响应头
          console.log(res)
          // res.data属性：存放后端返回的数据  ResponseResult 对象
          console.log(res.data)
          // res.data.data：分页信息 ResPage
          // 修改成功
          this.$message.success("删除成功")

          this.getData();
        })
      } catch (error) {
        // 错误处理
        console.error(error);
        this.$message.error("删除失败");
      }
      this.deleteDialogVisible = false
    }
  }
}
</script>
<style scoped></style>