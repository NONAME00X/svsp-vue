<template>
    <div>
        <el-table :data="reviewList" style="width: 100%">
            <el-table-column label="评论者头像" width="180" #default="scoped">
                <el-image style="width: 50px;height: 50%;" :src="scoped.row.avatar"></el-image>
            </el-table-column>
            <el-table-column prop="content" label="评论内容"  #default="scoped">
        <span v-html="scoped.row.content" class="reivew-content"></span>
    </el-table-column>
            <el-table-column prop="time" label="评论时间" width="180" />
            <el-table-column label="操作" align="center" #default="scoped">
                <el-button type="danger" @click="commitState(scoped.row.id,false)">不通过</el-button>
                <el-button type="primary" @click="commitState(scoped.row.id,true)">通过</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            reviewList: [],
        }
    },
    mounted() {
        this.getReview();
    },
    methods: {
        getReview() {
            this.$axios.get("review/getAll").then(res => {
                console.log(res.data)
                this.reviewList = res.data.data
            })
        }, commitState(id,reviewPass) {
            let reviewState="review_reject";
            if(reviewPass)
                reviewState="review_pass"
            try {
                this.$axios.get(`review/commit/${id}`, {
                    params: {
                        reviewState: reviewState,
                    }
                }).then(res => {
                    console.log(res.data)
                    this.$message.success("审核成功")
                    this.getReview()
                })
            } catch (error) {
                // 错误处理
                console.error(error);
                this.$message.error("审核失败");
            }
        }

    }
}
</script>
<style scoped></style>