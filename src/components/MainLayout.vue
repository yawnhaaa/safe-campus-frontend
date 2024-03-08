<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'
import { Search } from '@element-plus/icons-vue'
import { useElementPlusTheme } from 'use-element-plus-theme'
import '../styles/page.scss'

export default defineComponent({
    name: "MainLayout",
    components: {
        RouterLink,
        RouterView
    },
    setup() {
        const isDark = useDark();
        const search = ref('')
        const lightLogoSrc = "../../public/lightLogoSrc.png"
        const darkLogoSrc = "../../public/darkLogoSrc.png"
        const { changeTheme } = useElementPlusTheme(localStorage.getItem('selectedTheme'))

        onMounted(() => {
            const selectedTheme = localStorage.getItem('selectedTheme') || '';
            document.documentElement.style.setProperty('--custom-font', selectedTheme);
            document.documentElement.style.setProperty('--color-a-hover', selectedTheme);
        });


        return {
            isDark,
            search,
            Search,
            lightLogoSrc,
            darkLogoSrc,
            changeTheme,
        }
    }
})
</script>

<template>
    <div class="contain">
        <header>
            <div class="title">
                <RouterLink to="/">
                    <img style="margin-right:10px;" :src="isDark ? darkLogoSrc : lightLogoSrc" />
                    <span>大学反诈</span>
                </RouterLink>
            </div>
            <nav>
                <RouterLink to="/">首页</RouterLink>
                <RouterLink to="/material">素材</RouterLink>
                <RouterLink to="/learn">学习</RouterLink>
                <RouterLink to="/visual">可视化</RouterLink>
                <RouterLink to="/issue">发布</RouterLink>
            </nav>
            <el-input
                v-model="search"
                style="max-width: 200px; margin-right: 20px;"
                placeholder="探索大学反诈"
                class="input-search"
            >
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
            <el-switch
                inline-prompt
                active-text="黑夜"
                inactive-text="白天"
                v-model="isDark"
                style="display: inline-flex;"
            />
            <RouterLink to="/my" class="profile-link">个人信息</RouterLink>
            <RouterLink to="/login" class="profile-link">登录/注册</RouterLink>
        </header>
        <main>
            <div class="main-contain">
                <RouterView />
            </div>
        </main>
        <footer>
            <div class="copyright">
                <span style="margin-right:10px;"><a href="mailto:shuaige@xxx.xx">举报邮箱：shuaige@xxx.xx</a></span>
                <span><a href="tel:0571-xxxxxxxx">座机电话：0571-xxxxxxxx</a></span>
                <p>Copyright &copy; 大学反诈中心. By 最帅的人. All Rights Reserved</p>
                <span style="margin-right:10px;"><a href="https://beian.miit.gov.cn/">浙ICP证：2024号xxxxxx号-1 </a></span>
                <span><a href="http://www.beian.gov.cn/">浙公网安备110xxxxxxxxxxx号</a></span>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.contain {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
header{
    display: flex;
align-items: center;
justify-content: center;
height: 60px;
border-bottom: 1px solid gray;

.title {
  
  a {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  text-decoration: none;
  color: inherit;
  }
}

nav {
  margin-right: 30px;
}

nav a {
  margin-right: 20px;
  text-decoration: none;
  color: inherit;
}

nav a:hover {
  color: var(--color-a-hover);
}

.profile-link {
  text-decoration: inherit;
  color: inherit;
  margin-left: 10px;
}
}

main {
  width: 100%;
  height: 100%;

  .main-contain {
    margin: 10px auto;
    flex-grow: 1;
    width: 60vw;
}
}

footer {
  border-top: 1px solid gray;
  padding: 20px 0;
  margin-top: auto;
  text-align: center;

  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>
