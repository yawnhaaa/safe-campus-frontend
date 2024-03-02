<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import MenuItem from '../components/MenuItem.vue';

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
    const form = reactive<FormType>({
      name: '',
      email: '',
      intro: '',
      gender: '',
      school: '',
      college: '',
      stunum: '',
    })
    const onSave = () => {
      console.log(form, "form")
    }

    return {
      itemIndex,
      menuItemList,
      handleIndex,
      form,
      onSave,
    }
  }
})
</script>

<template>
  <div class="page-contain">
  <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
  <template v-if="itemIndex == 0">
    <el-form 
      :model="form" 
      label-width="auto" 
      class="profile-form"
      >
      <el-form-item label="昵称">
        <el-input v-model="form.name" class="profile-input" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" class="profile-input" />
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input v-model="form.intro" class="profile-input" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio-button label="女" value="0" />
          <el-radio-button label="男" value="1" />
          <el-radio-button label="保密" value="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="form.school" class="profile-input" />
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="form.college" class="profile-input" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.stunum" class="profile-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave" class="save-button">保存</el-button>
      </el-form-item>
    </el-form>
  </template>
  <template v-else>individual</template>
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
