<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, FormInstance, FormRules } from 'element-plus';
import MenuItem from '../components/MenuItem.vue'
import { request } from '@/api/request';
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
                            ElMessageBox.alert("登录成功", '注意', {
                                confirmButtonText: '好的',
                            })
                            setToken(data.data)
                            localStorage.setItem('user', loginForm.email)
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
            if(!registerForm.email){
                ElMessageBox.alert("请输入邮箱", "注意", {
                    confirmButtonText: "现在就去输"
                })
            }
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
            loginForm.email = ''
            loginForm.passwd = ''
        }
        const initRegisterForm = () => {
            registerForm.name = ''
            registerForm.email = ''
            registerForm.passwd = ''
            registerForm.code = ''
        }
        onMounted(() => {
            initLoginForm(),
            initRegisterForm()
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
                    <el-button type="primary" @click="handleSend" class="codeButton">发送验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="registerForm.code" class="register-code" />
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input v-model="registerForm.passwd" class="input" />
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
