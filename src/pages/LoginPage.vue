<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElMessageBox, FormInstance, FormRules } from 'element-plus';
import MenuItem from '../components/MenuItem.vue'

export default defineComponent({
    name: 'LoginPage',
    components: {
        MenuItem,
    },
    setup(){
        // menu跳转
        const itemIndex = ref('0');
        const menuItemList = ref(['登录', '注册'])
        const handleIndex = (index: string) => {
            itemIndex.value = index;
        }
        // login表单
        const loginCode = ref('')
        type LoginFormType = {
            email: string;
            passwd: string;
        }
        const loginFormRef = ref<FormInstance>()
        const loginForm = reactive<LoginFormType>({
            email: '',
            passwd: '',
        })
        const loginRules = reactive<FormRules<LoginFormType>>({
            email: [
                { required: true, message: '请输入登录邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱', trigger: 'blur'},
            ],
            passwd: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
            ]
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
                }
            })
        }

        // register表单
        type RegisterFormType = {
            name: string;
            email: string;
            code: string;
        }
        const registerFormRef = ref<FormInstance>()
        const registerForm = reactive<RegisterFormType>({
            name: '',
            email: '',
            code: '',
        })
        const registerRules = reactive<FormRules<RegisterFormType>>({
            name: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
                { min: 2, max: 8, message: '长度在2-8之间', trigger: 'blur' },
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
            ],
            code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ]
        })
        const handleSend = async (formEl: FormInstance | undefined) => {
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
                    ElMessageBox.alert('发送成功', '提示', {
                        confirmButtonText: '好的',
                    })
                }
            })
        }
        const handleRegister = async (formEl: FormInstance | undefined) => {
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
                }
            })
        }


        return {
            itemIndex,
            menuItemList,
            handleIndex,
            loginCode,
            loginFormRef,
            loginForm,
            loginRules,
            registerFormRef,
            registerForm,
            registerRules,
            handleLogin,
            handleSend,
            handleRegister,
        }
    }
})
</script>

<template>
    <div class="page-contain">
        <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
        <template v-if="itemIndex == 0">
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                class="form"
            >
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" class="input" />
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="loginForm.passwd" class="input" />
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="loginCode" class="input" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin(loginFormRef)" class="button">登录</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template v-else>
            <el-form
                ref="registerFormRef"
                :model="registerForm"
                :rules="registerRules"
                class="form"
            >
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="registerForm.name" class="input" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" class="input" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSend(registerFormRef)" class="codeButton">发送验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="registerForm.code" class="register-code" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister(registerFormRef)" class="button">注册</el-button>
                </el-form-item>
            </el-form>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.codeButton {
    margin-left: 52px;
}
</style>
