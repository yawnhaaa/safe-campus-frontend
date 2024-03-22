<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue';
import { ElMessageBox, FormInstance, FormRules } from 'element-plus';
import MenuItem from '../components/MenuItem.vue'
import { loginSuccess, request, verifyUser } from '@/api/request';
import { setToken } from '@/utils/auth';

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
        type LoginFormType = {
            name: string;
            passwd: string;
        }
        const loginFormRef = ref<FormInstance>()
        const loginForm = reactive<LoginFormType>({
            name: '',
            passwd: '',
        })
        const loginRules = reactive<FormRules<LoginFormType>>({
            name: [
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
                    request.post('/login', loginForm).then(({ data }) => {
                        if (data.code === 200) {
                            setToken(data.data.jwt)
                            localStorage.setItem('user', data.data.userName)
                            localStorage.setItem('userId', data.data.userId)
                            loginSuccess()
                        } else {
                            ElMessageBox.alert(data.msg, '注意', {
                                confirmButtonText: '好的',
                            })
                        }
                    })
                }
            })
        }

        // register表单
        type RegisterFormType = {
            name: string;
            email: string;
            code: string;
            passwd: string;
        }
        const registerFormRef = ref<FormInstance>()
        const registerForm = reactive<RegisterFormType>({
            name: '',
            email: '',
            code: '',
            passwd: '',
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
            passwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        })
        const handleSend = () => {
            const requestBody = { email: registerForm.email }
            request.post('/getCode', requestBody).then(({ data }) => {
                if (data.code == 200) {
                    ElMessageBox.alert(data.data, "注意", {
                        confirmButtonText: "好的"
                    })
                } else {
                    ElMessageBox.alert(data.msg, "注意", {
                        confirmButtonText: "好的"
                    })
                }
            }).catch(err => {
                ElMessageBox.alert(err, "注意", {
                    confirmButtonText: "好的"
                })
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
                } else {
                    request.post('/register', registerForm).then(({ data }) => {
                        if (data.code === 200) {
                            ElMessageBox.alert(data.data, "注意", {
                                confirmButtonText: "好的"
                            })

                        } else {
                            ElMessageBox.alert(data.msg, "注意", {
                                confirmButtonText: "好的"
                            })
                        }
                    }).catch(err => {
                        ElMessageBox.alert(err, "注意", {
                            confirmButtonText: "好的"
                        })
                    })
                }
            })
        }
        const initLoginForm = () => {
            loginForm.name = ''
            loginForm.passwd = ''
        }
        const initRegisterForm = () => {
            registerForm.name = ''
            registerForm.email = ''
            registerForm.passwd = ''
            registerForm.code = ''
        }
        onMounted(async () => {
            if (await verifyUser()) {
                loginSuccess()
            }
            initLoginForm(),
            initRegisterForm()
        })
        onUnmounted(() => {
            location.reload()
        })
        return {
            itemIndex,
            menuItemList,
            handleIndex,
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
        <template v-if="itemIndex === '0'">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="form">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="loginForm.name" class="input" />
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="loginForm.passwd" class="input" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin(loginFormRef)" class="button">登录</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template v-else>
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="form">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="registerForm.name" class="input" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" class="input" />
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="registerForm.passwd" class="input" />
                </el-form-item>
                <el-form-item label="验证码">
                    <div style="display: flex; width: 100%; align-items: center;">
                        <el-input v-model="registerForm.code" class="register-code"
                            style="flex: 1; width: 80px;" />
                        <el-button type="primary" @click="handleSend" class="codeButton">发送验证码</el-button>
                    </div>
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
