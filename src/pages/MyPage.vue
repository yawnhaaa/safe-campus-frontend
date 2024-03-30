<script lang="ts">
import {defineComponent, ref, reactive, onMounted, watch} from 'vue';
import MenuItem from '../components/MenuItem.vue';
import {FormInstance, FormRules, ElMessageBox} from 'element-plus';
import {useElementPlusTheme} from 'use-element-plus-theme'
import {request, requestJWT} from '@/api/request';
import {useRouter} from "vue-router";


interface UserLike {
  id: number;
  title: string;
  author: string;
  infoLike: number;
}

interface UserCollect {
  id: number;
  title: string;
  author: string;
  infoCollect: number;
}

export default defineComponent({
  name: 'MyPage',
  components: {
    MenuItem,
  },
  setup() {
    const likeList = ref<UserLike[]>([])
    const collectList = ref<UserCollect[]>([])
    const itemIndex = ref('0');
    const menuItemList = ref(['个人信息', '个性化定制', '喜欢', '收藏'])
    const router = useRouter();
    const handleIndex = (index: string) => {
      itemIndex.value = index;
    }
    type FormType = {
      name: string;
      email: string;
      intro: string;
      gender: string;
      school: string;
      college: string;
      stunum: string;
    }
    const formRef = ref<FormInstance>()
    const form = reactive<FormType>({
      name: '',
      email: '',
      intro: '',
      gender: '',
      school: '',
      college: '',
      stunum: '',
    })
    const rules = reactive<FormRules<FormType>>({
      name: [
        {required: true, message: '请输入昵称', trigger: 'blur'},
        {min: 2, max: 10, message: '长度在2-8之间', trigger: 'blur'},
      ],
      email: [{required: true, message: '邮箱不可更改', trigger: 'blur'}],
    })
    type UpdateFormType = {
      id: number;  // 根据您的业务逻辑，此处可能是 number 类型，根据需要调整
      name: string;
      intro: string;
      gender: string;  // 假设性别为字符串类型
      school: string;
      college: string;
      stuNum: string;
    }
    const onSave = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (!valid) {
          let errorMessage = '';
          // 遍历 fields 对象的属性
          for (const fieldName in fields) {
            if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
              const fieldMessages = fields[fieldName];
              // 遍历属性值中的消息对象
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
        const updateForm: UpdateFormType = {
          id: Number(localStorage.getItem("userId")) || 0,
          name: form.name || '',
          intro: form.intro || '',
          gender: form.gender || '',
          school: form.school || '',
          college: form.college || '',
          stuNum: form.stunum || ''
        }
        requestJWT.post("/updateUserDetail", updateForm).then((res) => {
          if (res.data.code === 200) {
            ElMessageBox.alert(res.data.data, "注意", {
              confirmButtonText: '好的'
            }).then(() => {
            })
          } else {
            ElMessageBox.alert(res.data.msg, "注意", {
              confirmButtonText: '好的'
            })
          }
        }).catch(() => {
          ElMessageBox.alert("网络错误", "注意", {
            confirmButtonText: '好的'
          })
        })
      })
    }
    // 字体表单
    type IndividualFormType = {
      font: string;
      theme: string;
    }
    const individualForm = reactive<IndividualFormType>({
      font: '',
      theme: '',
    })
    const fontList = ref(['系统默认字体', 'LiuJianMaoCao', 'LongCang', 'MaShanZheng', 'NotoSans', 'NotoSerif', 'ZCOOLQing', 'ZCOOLXiao', 'ZhiMangXing']);
    const setFontFamily = () => {
      localStorage.setItem('selectedFont', individualForm.font)
      document.documentElement.style.setProperty('--custom-font', individualForm.font)
    }
    // 主题颜色
    const setTheme = useElementPlusTheme(individualForm.theme || localStorage.getItem('selectedTheme')).changeTheme;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch(() => individualForm.theme, (newValue, _) => {
      localStorage.setItem('selectedTheme', newValue)
      document.documentElement.style.setProperty('--color-a-hover', newValue);
    })

    const getUserDetail = () => {
      requestJWT.get("/getUserDetail/" + localStorage.getItem("userId")).then((res) => {
        if (res.data.code === 200) {
          const userData = res.data.data
          form.name = userData.name
          form.email = userData.email
          form.intro = userData.intro
          form.gender = userData.gender
          form.school = userData.school
          form.college = userData.college
          form.stunum = userData.stuNum
        }
      })
    }
    const getLikeList = () => {
      request.get("/getLikeList/" + localStorage.getItem("user")).then((res) => {
        likeList.value = res.data.data
      })
    }
    const getCollectList = () => {
      request.get("/getCollectList/" + localStorage.getItem("user")).then((res) => {
        collectList.value = res.data.data
      })
    }
    const handleInfo = (item) => {
      const id = item.id
      router.push({name: 'infoDetail', params: {id}})
    }

    onMounted(() => {
      getUserDetail()
      getLikeList()
      getCollectList()
    })

    return {
      likeList,
      collectList,
      itemIndex,
      menuItemList,
      form,
      rules,
      formRef,
      individualForm,
      fontList,

      handleIndex,
      onSave,
      setFontFamily,
      setTheme,
      handleInfo,
    }
  }
})
</script>

<template>
  <div class="page-contain">
    <menu-item :menuItemList="menuItemList" @item-selected="handleIndex"/>
    <template v-if="itemIndex == 0">
      <el-form ref="formRef" :model="form" label-width="auto" :rules="rules" class="form">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" class="input" maxlength="10" clearable disabled/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" class="input" disabled/>
        </el-form-item>
        <el-form-item label="个人介绍" prop="intro">
          <el-input v-model="form.intro" class="input" type="textarea" show-word-limit maxlength="200"
                    clearable/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio-button label="女" value="0"/>
            <el-radio-button label="男" value="1"/>
            <el-radio-button label="保密" value="2"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="form.school" class="input" maxlength="20" clearable/>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college" class="input" maxlength="20" clearable/>
        </el-form-item>
        <el-form-item label="学号" prop="stunum">
          <el-input v-model="form.stunum" class="input" maxlength="20" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave(formRef)" class="button">保存</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="itemIndex == 1">
      <el-form :model="individualForm" class="form">
        <el-form-item label="选择字体" prop="font">
          <el-select v-model="individualForm.font" placeholder="选择系统字体" @change="setFontFamily">
            <el-option v-for="font in fontList" :key="font" :label="font" :value="font"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择主题" prop="theme">
          <el-color-picker v-model="individualForm.theme" @change="setTheme"/>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="itemIndex == 2">
      <div class="user-contain" v-for="(item, index) in likeList" :key="index" @click="handleInfo(item)">
        <div class="header">{{ item.title }}</div>
        <div class="footer">
          <span style="margin-right: 5px">作者:{{ item.author }}</span>
          <span>喜欢:{{ item.infoLike }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="itemIndex == 3">
      <div class="user-contain" v-for="(item, index) in collectList" :key="index" @click="handleInfo(item)">
        <div class="header">{{ item.title }}</div>
        <div class="footer">
          <span style="margin-right: 5px">作者:{{ item.author }}</span>
          <span>收藏:{{ item.infoCollect }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-contain {
  display: inline-block;
  white-space: nowrap;
  padding: 2px;
  margin: 5px 5px 5px 0;
  border: 1px solid gray;
  border-radius: 5px;

  .footer {
    font-size: 12px;
    color: gray;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
