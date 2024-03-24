<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import '../styles/page.scss'
import MenuItem from '../components/MenuItem.vue'
import { ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { requestJWT } from '@/api/request'

export default defineComponent({
    name: "IssuePage",
    components: {
        MenuItem,
        UploadFilled,
    },

    setup() {
        type InfoFormType = {
            title: string;
            author: string;
            authorId: number;
            content: string;
        }
        type MateriaFormType = {
            title: string;
            author: string;
            date: string;
            radio: string;
            content: string;
        }

        const menuItemList = ref(['资讯上传', '素材上传'])
        const itemIndex = ref('0')
        const handleIndex = (index: string) => {
            itemIndex.value = index
        }

        // 资讯表单
        const infoFormRef = ref<FormInstance>()
        const infoForm = reactive<InfoFormType>({
            title: '',
            author: '',
            authorId: 0,
            content: '',
        })
        const initInfoForm = () => {
            infoForm.title = ''
            infoForm.author= ''
            infoForm.authorId = 0
            infoForm.content = ''
            file.value = null
        }
        const infoFormRules = reactive<FormRules<InfoFormType>>({
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
            ],
            content: [
                { required: true, message: '请输入资讯内容', trigger: 'blur' }
            ]
        })
        const file = ref(null)
        const handleFileUpload = (event) => {
            file.value = event.target.files[0];
        }
        const handleInfoIssue = async (formEl: FormInstance | undefined) => {
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
                    return
                }
                const author = localStorage.getItem("user") || ''
                const authorId = Number(localStorage.getItem("userId")) || 0
                const formData = new FormData()
                formData.append("title", infoForm.title)
                formData.append("content", infoForm.content)
                formData.append("author", author)
                formData.append("authorId", authorId)
                formData.append("file", file.value)
                requestJWT.post("/issueInfo", formData).then((res) => {
                    if (res.data.code === 200) {
                        ElMessageBox.alert(res.data.data, '注意', {
                            confirmButtonText: '好的',
                        }).then(() => {
                            initInfoForm()
                        })
                    } else {
                        ElMessageBox.alert(res.data.msg, '注意', {
                            confirmButtonText: '好的',
                        }).then(() => {
                            initInfoForm()
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            })
        }

        // 素材表单
        const materiaFormRef = ref<FormInstance>()
        const materiaForm = reactive<MateriaFormType>({
            title: '',
            author: '',
            date: '',
            radio: '',
            content: '',
        })
        const materiaFormRules = reactive<FormRules<MateriaFormType>>({
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
            ],
            radio: [
                { required: true, message: '请选择类型', trigger: 'blur' },
            ],
            content: [
                { required: true, message: '请输入资讯内容', trigger: 'blur' }
            ]
        })
        const handleMateriaIssue = async (formEl: FormInstance | undefined) => {
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
            handleFileUpload,
            menuItemList,
            itemIndex,
            handleIndex,
            infoFormRef,
            infoForm,
            infoFormRules,
            handleInfoIssue,
            materiaFormRef,
            materiaForm,
            materiaFormRules,
            handleMateriaIssue,
        }
    }
})

</script>

<template>
    <div class="page-contain">
        <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
        <template v-if="itemIndex == 0">
            <el-form ref="infoFormRef" :model="infoForm" :rules="infoFormRules" class="form">
                <el-form-item label="资讯标题" prop="title">
                    <el-input v-model="infoForm.title" class="input" />
                </el-form-item>
                <input type="file" @change="handleFileUpload" ref="fileInput" />
                <el-form-item label="资讯内容" prop="content">
                    <el-input v-model="infoForm.content" class="info-content" :rows="22" maxlength="1000"
                        show-word-limit type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleInfoIssue(infoFormRef)" type="primary" class="button">发布</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template v-else>
            <el-form ref="materiaFormRef" :model="materiaForm" :rules="materiaFormRules" class="form">
                <el-form-item label="素材标题" prop="title">
                    <el-input v-model="materiaForm.title" class="input" />
                </el-form-item>
                <el-form-item label="素材类型" prop="radio">
                    <el-radio-group v-model="materiaForm.radio">
                        <el-radio :value='0'>图像</el-radio>
                        <el-radio :value='1'>视频</el-radio>
                        <el-radio :value='2'>音频</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="素材内容" prop="content">
                    <el-upload v-model="materiaForm.content" class="upload-demo"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :limit="1">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleMateriaIssue(materiaFormRef)" type="primary" class="button">发布</el-button>
                </el-form-item>
            </el-form>
        </template>
    </div>
</template>

<style lang="scss" scoped>
</style>
