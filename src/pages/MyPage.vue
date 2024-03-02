<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MyPage',
  setup() {
    const activeIndex = ref('1');
    const handleSelect = (index: string) => {
      activeIndex.value = index;
    };

    return {
      activeIndex,
      handleSelect
    }
  }
})
</script>

<template>
  <div class="main-contain">
  <el-menu
      :default-active="activeIndex"
      class="menu-item"
      mode="horizontal"
      @select="handleSelect"
      >
      <el-menu-item index="1">个人信息</el-menu-item>
      <el-menu-item index="2">个性化定制</el-menu-item>
  </el-menu>
  <h1 v-if="activeIndex == 1">My Page</h1>
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
