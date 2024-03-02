<script lang="ts">
import { defineComponent, ref } from 'vue';
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

    return {
      itemIndex,
      menuItemList,
      handleIndex,
    }
  }
})
</script>

<template>
  <div class="main-contain">
  <menu-item :menuItemList="menuItemList" @item-selected="handleIndex" />
  <h1 v-if="itemIndex == 0">My Page</h1>
  <h1 v-else>individual</h1>
  </div>
</template>

<style lang="scss" scoped>
.main-contain {
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  height: 100%;
  border: 1px solid gray;
}
</style>
