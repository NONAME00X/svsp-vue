<template>
    <div>
        <el-table :data="followList" style="width: 100%">
            <el-table-column label="粉丝头像" width="180" #default="scoped">
                <el-image style="width: 50px;height: 50%;" :src="scoped.row.avatar"></el-image>
            </el-table-column>
            <el-table-column prop="account" label="粉丝账号" width="180" />
            <el-table-column prop="time" label="关注时间" width="180" />
            <el-table-column label="操作" align="center" #default="scoped">
                <el-button type="primary" @click="addFollow(scoped.row.fid)">关注</el-button>
                <el-button type="danger" @click="deleteFollow(scoped.row.id)">拉黑</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            followList: [],
        }
    },
    mounted() {
        this.getFollowList()
    },
    methods: {
        getFollowList() {
            this.$axios.get("follow/findByUid").then(res => {
                console.log(res.data)
                this.followList = res.data.data
            })
        },
        addFollow(uid){
            try{
            this.$axios.get("follow/add",{
                params: {
                    uid: uid
                }
            }).then(res => {
                console.log(res.data)
                if(res.data.data)
                    this.$message.success("关注成功")
                else
                    this.$message.error("已经关注,请勿重复关注")
            })
            }catch(error){
                 // 错误处理
                 console.error(error);
                this.$message.error("关注失败");
            }
        },
        deleteFollow(id){
            try{
            this.$axios.get(`follow/delete/${id}`).then(res => {
                console.log(res.data)
                this.$message.success("拉黑成功")
                this.getFollowList()
            })}catch(error){
                 // 错误处理
                 console.error(error);
                this.$message.error("拉黑失败");
            }
        }
    
    }
}
</script>
<style scoped></style>