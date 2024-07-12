<template>
    <div>
        <el-input v-model="search" style="max-width: 600px" placeholder="输入视频标题" class="input-with-Search">
        </el-input>
        <el-button @click="getCollectList">搜索</el-button>
        <el-table :data="collectList" style="width: 100%">
            <el-table-column label="视频title" width="180" #default="scoped">
                <el-button type="primary" @click="$router.push(`/play/${scoped.row.vid}`)" link>{{scoped.row.title}}</el-button>
        </el-table-column>
            <el-table-column label="被收藏视频的UP主头像" width="180" #default="scoped">
                <el-image style="width: 50px;height: 50%;" :src="scoped.row.avatar"></el-image>
            </el-table-column>
            <el-table-column label="操作" align="center" #default="scoped">
                <el-button type="danger" @click="deleteCollect(scoped.row.id)">取消收藏</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collectList: [],
            search: ''
        }
    },
    mounted() {
        this.getCollectList()
    },
    methods: {
        getCollectList() {
            this.$axios.get("collect/get", {
                params: {
                    search: this.search
                }
            }).then(res => {
                console.log(res.data)
                this.collectList = res.data.data
            })
        },
        deleteCollect(id) {
            console.log("删除的收藏ID:", id)
            try {
                this.$axios.get(`collect/delete/${id}`).then(res => {
                    console.log(res.data)
                    this.$message.success("取消收藏成功")
                    this.getCollectList()
                })
            } catch (error) {
                // 错误处理
                console.error(error);
                this.$message.error("取消收藏失败");
            }

        }

    }
}
</script>
<style scoped></style>