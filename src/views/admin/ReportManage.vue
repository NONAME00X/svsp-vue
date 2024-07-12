<template>
    <div>
        <el-table :data="reportList" style="width: 100%">
            <el-table-column #default="scoped" label="被投诉视频名称" width="180">
                <el-button type="primary" @click="$router.push(`/play/${scoped.row.vid}`)" link>{{scoped.row.title}}</el-button>
            </el-table-column>
            <el-table-column prop="account" label="被投诉UP主账号" width="180" />
            <el-table-column prop="time" label="投诉时间" width="180" />
            <el-table-column prop="reason" label="投诉内容" width="180" />
            <el-table-column label="操作" align="center" #default="scoped">
                <el-button type="danger" @click="commitState(scoped.row.id, false, scoped.row.vid)">不通过</el-button>
                <el-button type="primary" @click="commitState(scoped.row.id, true, scoped.row.vid)">通过</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            reportList: [],
        }
    },
    mounted() {
        this.getReport();
    },
    methods: {
        getReport() {
            this.$axios.get("report/getAll").then(res => {
                console.log(res.data)
                this.reportList = res.data.data
            })
        }, commitState(id, reportPass, vid) {
            let reportState = "report_reject";
            if (reportPass)
                reportState = "report_pass"
            // console.log("reportState==========",reportState)
            try {
                this.$axios.get(`report/commit/${id}`, {
                    params: {
                        reportState: reportState,
                        vid: vid
                    }
                }).then(res => {
                    console.log(res.data)
                    this.$message.success("审核成功")
                    this.getReport()
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