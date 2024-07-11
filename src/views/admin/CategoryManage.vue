<template>
    <div>
        <el-row><el-col :span="4" :offset="20"><el-button type="primary" @click="addDialogVisible=true">添加</el-button></el-col></el-row>
        <el-table :data="categoryList" style="width: 100%">
            <el-table-column prop="name" label="分类名" width="180" />
            <el-table-column label="分类状态" align="center" #default="scoped" width="100">
                <el-tag v-if="scoped.row.state == 'category_normal'" type="success">启用</el-tag>
                <el-tag v-if="scoped.row.state == 'category_lock'" type="info">禁用</el-tag>
            </el-table-column>
            <el-table-column label="操作" align="center" #default="scoped">
                <el-button type="danger" v-if="scoped.row.state != 'category_lock'"
                    @click="commitState(scoped.row.id, false)">禁用</el-button>
                <el-button type="default" v-if="scoped.row.state != 'category_normal'"
                    @click="commitState(scoped.row.id, true)">启用</el-button>
                <el-button type="primary" @click="editDialogVisible=true;this.selectRow=scoped.row;this.editName=this.selectRow.name;">修改</el-button>
            </el-table-column>
        </el-table>

        <!-- 添加 -->
        <el-dialog v-model="addDialogVisible" title="添加分类" width="500" center>
            <el-input v-model="addName" style="width: 240px" placeholder="请输入分类名" clearable />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="add();">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog v-model="editDialogVisible" title="修改分类" width="500" center>
            <el-input v-model="editName" style="width: 240px" placeholder="请输入分类名" clearable />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="edit();">
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
            categoryList: [],
            selectRow: {},
            addDialogVisible: false,
            editDialogVisible: false,
            addName: '',
            editName: ''
        }
    },
    mounted() {
        this.getCategory();
    },
    methods: {
        getCategory() {
            this.$axios.get("category/allState").then(res => {
                console.log(res.data)
                this.categoryList = res.data.data
            })
        }, commitState(id, categoryPass) {
            let categoryState = "category_lock";
            if (categoryPass)
                categoryState = "category_normal"
            try {
                this.$axios.get(`category/commit/${id}`, {
                    params: {
                        categoryState: categoryState,
                    }
                }).then(res => {
                    console.log(res.data)
                    this.$message.success("修改成功")
                    this.getCategory()
                })
            } catch (error) {
                // 错误处理
                console.error(error);
                this.$message.error("修改失败");
            }
        }, add() {
            try {
                this.$axios.get("category/add", {
                    params: {
                        name: this.addName,
                    }
                }).then(res => {
                    console.log(res.data)
                    this.$message.success("添加成功")
                    this.getCategory()
                })
            } catch (error) {
                // 错误处理
                console.error(error);
                this.$message.error("添加失败");
            }
            this.addDialogVisible = false;
        }, edit() {
            let id=this.selectRow.id
            try {
                this.$axios.get(`category/edit/${id}`, {
                    params: {
                        name: this.editName,
                    }
                }).then(res => {
                    console.log(res.data)
                    this.$message.success("修改成功")
                    this.getCategory()
                })
            } catch (error) {
                // 错误处理
                console.error(error);
                this.$message.error("修改失败");
            }
            this.editDialogVisible = false;
        }

    }
}
</script>
<style scoped></style>