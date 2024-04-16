<script lang="ts">
import {defineComponent, reactive, ref, watch} from 'vue'
import '../styles/page.scss'
import MenuItem from '../components/MenuItem.vue'
import {ElMessageBox, FormInstance, FormRules} from 'element-plus'
import {redirectLogin, request} from '@/api/request'

export default defineComponent({
  name: "IssuePage",
  components: {
    MenuItem,
  },
  setup() {
    type InfoFormType = {
      title: string;
      author: string;
      authorId: number;
      content: string;
    }
    type MaterialFormType = {
      title: string;
      author: string;
      authorId: number;
      radio: number;
      file: File;
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
    const infoUpload = ref<any>(null);
    const infoFileClear = () => {
      infoUpload.value.clearFiles()
    }
    const initInfoForm = () => {
      infoForm.title = ''
      infoForm.author = ''
      infoForm.authorId = 0
      infoForm.content = ''
      infoFile.value = null
      infoFileClear()
    }
    const infoFormRules = reactive<FormRules<InfoFormType>>({
      title: [
        {required: true, message: '请输入标题', trigger: 'blur'},
      ],
      content: [
        {required: true, message: '请输入资讯内容', trigger: 'blur'}
      ]
    })
    // 文件上传逻辑
    const infoFile = ref(null)
    const uploadInfoImage = (uploadFile: any) => {
      infoFile.value = uploadFile.raw
    }
    const handleInfoIssue = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (!valid) {
          let errorMessage = '';
          for (const fieldName in fields) {
            if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
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
        // 如果没有文件，则不向formData添加
        if (infoFile.value !== null) {
          formData.append("file", infoFile.value)
        }
        request.post("/protected/issueInfo", formData).then((res) => {
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
        }).catch(() => {
            redirectLogin()
        })
      })
    }

    // 素材表单
    const materialFormRef = ref<FormInstance>()
    const materialForm = reactive<MaterialFormType>({
      title: '',
      author: '',
      authorId: 0,
      radio: null,
      file: null
    })
    const materialFormRules = reactive<FormRules<MaterialFormType>>({
      title: [
        {required: true, message: '请输入标题', trigger: 'blur'},
      ],
      radio: [
        {required: true, message: '请选择类型', trigger: 'blur'},
      ],
      file: [
        {required: true, message: '请上传资讯文件', trigger: 'blur'}
      ]
    })
    const materialImgFile = ref(null)
    const materialImgUpload = ref(null)
    const materialFile = ref(null)
    const materialFileClear = () => {
      materialFile.value.clearFiles()
      materialImgUpload.value.clearFiles()
    }
    const uploadMaterialImage = (uploadFile: any) => {
      materialImgFile.value = uploadFile.raw
    }
    const uploadMaterial = (uploadFile: any) => {
      materialForm.file = uploadFile.raw
    }
    const initMaterialForm = () => {
      materialForm.author = ''
      materialForm.authorId = 0
      materialForm.title = ''
      materialForm.radio = null
      materialForm.file = null
      materialImgFile.value = null
      materialFileClear()
    }
    const handleMaterialIssue = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (!valid) {
          let errorMessage = '';
          for (const fieldName in fields) {
            if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
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
        formData.append("title", materialForm.title)
        formData.append("materialType", materialForm.radio)
        formData.append("author", author)
        formData.append("authorId", authorId)
        // 如果没有文件，则不向formData添加
        if (materialForm.file !== null) {
          formData.append("file", materialForm.file)
        }
        // 如果没有文件，则不向formData添加
        if (materialImgFile.value !== null) {
          formData.append("imgFile", materialImgFile.value)
        }
        request.post("/protected/issueMaterial", formData).then((res) => {
          if (res.data.code === 200) {
            ElMessageBox.alert(res.data.data, '注意', {
              confirmButtonText: '好的',
            }).then(() => {
              initMaterialForm()
            })
          } else {
            ElMessageBox.alert(res.data.msg, '注意', {
              confirmButtonText: '好的',
            }).then(() => {
              initMaterialForm()
            })
          }
        }).catch(() => {
            redirectLogin()
        })
      })
    }

    const acceptFileType = ref('')

    watch(() => materialForm.radio, (newValue) => {
      switch (newValue) {
        case 0:
          acceptFileType.value = 'image/*';
          break;
        case 1:
          acceptFileType.value = 'video/*';
          break;
        case 2:
          acceptFileType.value = 'audio/*';
          break;
        default:
          acceptFileType.value = '';
          break;
      }
    })

    return {
      acceptFileType,
      uploadMaterial,
      infoUpload,
      uploadInfoImage,
      menuItemList,
      itemIndex,
      handleIndex,
      infoFormRef,
      infoForm,
      infoFormRules,
      handleInfoIssue,
      materialFormRef,
      materialForm,
      materialFormRules,
      handleMaterialIssue,
      uploadMaterialImage,
      materialImgUpload,
      materialFile,
    }
  }
})

</script>

<template>
  <div class="page-contain">
    <menu-item :menuItemList="menuItemList" @item-selected="handleIndex"/>
    <template v-if="itemIndex == 0">
      <el-form ref="infoFormRef" :model="infoForm" :rules="infoFormRules" class="form">
        <el-form-item label="资讯标题" prop="title">
          <el-input v-model="infoForm.title" class="input"/>
        </el-form-item>
        <el-form-item label="资讯内容" prop="content">
          <el-input v-model="infoForm.content" class="info-content" :rows="22" maxlength="1000"
                    show-word-limit type="textarea"/>
        </el-form-item>
        <el-form-item label="资讯展示图片">
          <el-upload ref="infoUpload" :limit=1 :auto-upload="false" :on-change="uploadInfoImage"
                     accept="image/*">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleInfoIssue(infoFormRef)" type="primary" class="button">发布</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <el-form ref="materialFormRef" :model="materialForm" :rules="materialFormRules" class="form">
        <el-form-item label="素材标题" prop="title">
          <el-input v-model="materialForm.title" class="input"/>
        </el-form-item>
        <el-form-item label="素材类型" prop="radio">
          <el-radio-group v-model="materialForm.radio">
            <el-radio :value='0'>图像</el-radio>
            <el-radio :value='1'>视频</el-radio>
            <el-radio :value='2'>音频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="素材文件" prop="file">
          <el-upload ref="materialFile" v-model="materialForm.file" :auto-upload="false"
                     :on-change="uploadMaterial" class="upload-demo" :limit="1" :accept="acceptFileType">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="素材展示图片">
          <el-upload ref="materialImgUpload" :limit=1 :auto-upload="false" :on-change="uploadMaterialImage"
                     accept="image/*">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleMaterialIssue(materialFormRef)" type="primary" class="button">发布</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>
