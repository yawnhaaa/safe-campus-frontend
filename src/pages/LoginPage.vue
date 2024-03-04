<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../styles/page.scss'
import MenuItem from '../components/MenuItem.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    MenuItem,
  },

  setup(){
    const itemIndex = ref('0');
    const menuItemList = ref(['登录', '注册'])
    const handleIndex = (index: string) => {
      itemIndex.value = index;
    }

    return {
      itemIndex,
      menuItemList,
      handleIndex,
    }
  }
})
</script>

<template>
  <div class="page-contain">
    <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
    <template v-if="itemIndex == 0">
      <h1>登录</h1>
    </template>
    <template v-else>
      <h1>注册</h1>
    </template>
  </div>
</template>
