<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';
import MenuItem from '../components/MenuItem.vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useElementPlusTheme } from 'use-element-plus-theme'

export default defineComponent({
  name: 'MyPage',
  components: {
    MenuItem,
  },
  setup() {
    const itemIndex = ref('0');
    const menuItemList = ref(['个人信息', '个性化定制'])
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
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 2, max: 8, message: '长度在2-10之间', trigger: 'blur' },
      ],
      email: [ { required: true, message: '邮箱不可更改！', trigger: 'blur' } ],
    })
    const onSave = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log(form, "submit!")
        } else {
          console.log(fields, "error submit!")
        }
      })
    }
    // 字体表单
    type IndividFormType = {
      font: string;
      theme: string;
    }
    const individForm = reactive<IndividFormType>({
      font: '',
      theme: '',
    })
    const fontList = ref(['系统默认字体', 'LiuJianMaoCao', 'LongCang', 'MaShanZheng', 'NotoSans', 'NotoSerif', 'ZCOOLQing', 'ZCOOLXiao', 'ZhiMangXing']);
    const setFontFamily = () => {
      localStorage.setItem('selectedFont', individForm.font)
      document.documentElement.style.setProperty('--custom-font', individForm.font)
    }
    // 主题颜色
    const setTheme = useElementPlusTheme(individForm.theme || localStorage.getItem('selectedTheme')).changeTheme;
    watch(() => individForm.theme, (newValue, _) => {
      localStorage.setItem('selectedTheme', newValue)
      document.documentElement.style.setProperty('--color-a-hover', newValue);
    })

    onMounted(() => {
    })

    return {
      itemIndex,
      menuItemList,
      handleIndex,
      form,
      onSave,
      rules,
      formRef,
      individForm,
      fontList,
      setFontFamily,
      setTheme,
    }
  }
})
</script>

<template>
  <div class="page-contain">
  <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
  <template v-if="itemIndex == 0">
    <el-form 
      ref="formRef"
      :model="form" 
      label-width="auto" 
      :rules="rules"
      class="profile-form"
      >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" class="profile-input" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" class="profile-input" />
      </el-form-item>
      <el-form-item label="个人介绍" prop="intro">
        <el-input v-model="form.intro" class="profile-input" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio-button label="女" value="0" />
          <el-radio-button label="男" value="1" />
          <el-radio-button label="保密" value="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" class="profile-input" />
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-input v-model="form.college" class="profile-input" />
      </el-form-item>
      <el-form-item label="学号" prop="stunum">
        <el-input v-model="form.stunum" class="profile-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave(formRef)" class="save-button">保存</el-button>
      </el-form-item>
    </el-form>
  </template>
  <template v-else>
    <el-form
      :model="individForm"
      class="profile-form"
      >
      <el-form-item label="选择字体" prop="font">
        <el-select
          v-model="individForm.font"
          placeholder="选择系统字体"
          @change="setFontFamily"
          >
          <el-option
            v-for="font in fontList"
            :key="font"
            :label="font"
            :value="font"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="选择主题" prop="theme">
        <el-color-picker v-model="individForm.theme" @change="setTheme" />
      </el-form-item>
    </el-form>

  </template>
  </div>
</template>

<style lang="scss" scoped>
.page-contain {
  padding: 5px;
  border-radius: 5px;
  height: 100%;
  border: 1px solid gray;
}

.profile-form {
  margin: 20px 10px;

  .profile-input {
    position: relative;
  }

  .save-button {
    position: absolute;
    margin-top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
