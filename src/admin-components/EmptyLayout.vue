<script lang="ts">
import {defineComponent} from 'vue'
import {RouterView} from 'vue-router'

export default defineComponent({
  name: "EmptyLogin",
  components: {
    RouterView,
  },

  setup() {

    return {}
  }
})
</script>

<template>
  <div class="contain">
    <div class="header">
      <div>反诈校园后台管理系统</div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 设置高度为视口高度，使其铺满整个浏览器 */

  .header {
    position: fixed;
    font-size: 36px;
    font-weight: bold;
    top: 200px;
  }
}

.main {
  margin: auto;
  /* 水平居中 */
}
</style>