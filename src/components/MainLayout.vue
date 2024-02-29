<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  components: {
    RouterLink,
    RouterView
  }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/material">素材</RouterLink>
      <RouterLink to="/learn">学习</RouterLink>
      <RouterLink to="/visual">可视化</RouterLink>
      <RouterLink to="/issue">发布</RouterLink>
      <RouterLink to="/my">个人信息</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div class="friend-link">
      <div>友情链接</div>
    </div>
    <div class="copyright">
      <p>举报邮箱：shuaige@xxx.xx 座机电话：0571-xxxxxxxx</p>
      <p>&copy; 大学反诈中心. All Rights Reserved</p>
      <p>浙ICP证：2024号xxxxxx号-1</p>
      <p>浙公网安备110xxxxxxxxxxx号</p>
    </div>
  </footer>
</template>
