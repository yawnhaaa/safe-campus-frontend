<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { adminLoginSuccess, request } from '@/api/request';
import { setToken } from '@/utils/auth';

export default defineComponent({
    name: "ALoginPage",

    setup() {
        type LoginFormType = {
            username: string;
            passwd: string;
        }
        const loginFormRef = ref<FormInstance>()
        const loginForm = reactive<LoginFormType>({
            username: '',
            passwd: '',
        })
        const loginRules = reactive<FormRules<LoginFormType>>({
            username: [
                { required: true, message: '请输入登录昵称', trigger: 'blur' },
            ],
            passwd: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
            ],
        })
        const handleLogin = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (!valid) {
                    let errorMessage = '';
                    for (const fieldName in fields) {
                        if (fields.hasOwnProperty(fieldName)) {
                            const fieldMessages = fields[fieldName];
                            fieldMessages.forEach(messageObj => {
                                errorMessage += messageObj.message + '; ';
                            });
                        }
                    }
                    ElMessageBox.alert(errorMessage, '注意', {
                        confirmButtonText: '好的',
                    })
                } else {
                    request.post('/admin/aLogin', loginForm).then(({ data }) => {
                        if (data.code === 200) {
                            setToken(data.data)
                            localStorage.setItem('user', loginForm.username)
                            adminLoginSuccess()
                        } else {
                            ElMessageBox.alert(data.msg, '注意', {
                                confirmButtonText: '好的',
                            })
                        }
                    })
                }
            })
        }

        return {
            loginFormRef,
            loginForm,
            loginRules,
            handleLogin,
        }
    },
})
</script>

<template>
    <div class="contain">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="form">
            <el-form-item label="昵称" prop="username">
                <el-input v-model="loginForm.username" class="input" />
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="loginForm.passwd" class="input" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin(loginFormRef)" class="button">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.contain {
    height: 200px;
    border: 1px solid gray;
    border-radius: 5px;

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form {
        padding: 20px;
    }
}
</style>