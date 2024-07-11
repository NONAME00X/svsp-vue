<template>
    <div>
        <el-space fill wrap direction="horizontal" style="width:100%" :size="50">
            <el-row><el-col :span="12"><el-avatar @click="$refs.fileInput.click()" :size="100"
                        :src="user.avatar" /><input type="file" ref="fileInput" @change="changeFile"
                        accept=".png,.jpg,.jfif" v-show="show" /></el-col><el-col :span="12">用户等级<br><el-tag
                        size="large">{{ user.level }}</el-tag></el-col></el-row>
            <el-row><el-col>账号<br>{{ user.account }}</el-col></el-row>
            <el-row><el-col><el-button type="primary"
                        @click="this.dialogVisible = true;">修改密码</el-button></el-col></el-row>
        </el-space>
    </div>
    <!-- 修改密码 -->
    <el-dialog v-model="dialogVisible" title="修改密码" width="500" center>
        <el-form :model="formData" label-width="auto" style="max-width: 600px">
            <el-form-item label="原密码">
                <el-input v-model="formData.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="formData.newPassword" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="changePwd();">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            user: {},
            dialogVisible: false,
            formData: {
                oldPassword: "",
                newPassword: "",
            }
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            this.$axios.get("user/get").then(res => {
                let user = res.data.data
                this.user = user
                window.localStorage.setItem("user", JSON.stringify(user))
            })
        }, changeFile(event) {
            let file = event.target.files[0]
            if (file) {
                // this.user.avatar = URL.createObjectURL(file)
                console.log(file)
                let data = new FormData()
                data.append("avatar", file)
                try {
                    this.$axios.post("user/changeAvatar", data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        this.$message.success("修改头像成功")
                        this.getUserInfo()
                    })
                } catch (error) {
                    this.$message.error("修改头像失败");
                }

            }
        }, changePwd() {
            console.log("oldPwd:",this.formData.oldPassword,"newPwd:",this.formData.newPassword)
            try {
                this.$axios.get("user/changePwd", {
                    params: {
                        oldPassword: this.formData.oldPassword,
                        newPassword: this.formData.newPassword
                    }
                }).then(res => {
                    console.log(res.data)
                    if(res.data.data)
                        this.$message.success("修改密码成功")
                    else
                        this.$message.error("原密码错误")
                    this.getUserInfo()
                })
            } catch (error) {
                console.log(error)
                this.$message.error("修改密码失败");
            }
            this.formData.oldPassword=""
            this.formData.newPassword=""
            this.dialogVisible = false;
        }
    }
}
</script>
<style scoped></style>