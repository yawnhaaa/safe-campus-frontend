<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import {RouterLink, RouterView} from 'vue-router'
import {useDark} from '@vueuse/core'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {verifyAdmin} from '@/api/request'
import router from '@/router/index'
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "AdminLayout",
  components: {
    RouterLink,
    RouterView,
    Document, IconMenu, Location, Setting,
  },

  setup() {
    const isDark = useDark()
    const handleOpen = async () => {
      if (!await verifyAdmin()) {
        ElMessage.error('此操作需要管理员权限，重定向至登录页')
        router.push('/aLogin')
      }
    }
    const handleClose = async () => {
      if (!await verifyAdmin()) {
        ElMessage.error('此操作需要管理员权限，重定向至登录页')
        await router.push('/aLogin')
      }
    }

    const logout = () => {
      localStorage.removeItem('user')
      router.push('/aLogin')
    }
    onMounted(async () => {
      if (!await verifyAdmin()) {
        await router.push('/aLogin')
      }
    })

    return {
      isDark,

      handleOpen,
      handleClose,
      logout,
    }
  }
})
</script>

<template>
  <div class="common-layout">
    <el-container class="contain">
      <el-header class="header" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
        <span class="title">大学反诈信息管理系统</span>
        <div class="right-box">
          <el-switch inline-prompt active-text="黑夜" inactive-text="白天" v-model="isDark"
                     style="display: inline-flex;" class="switch"/>
          <span class="admin">管理员大大</span>
          <span class="logout" @click="logout">退出登录</span>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
          <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <router-link to="/admin">
              <el-menu-item index="0">
                <el-icon>
                  <icon-menu/>
                </el-icon>
                <span>首页</span>
              </el-menu-item>
            </router-link>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>用户管理</span>
              </template>
              <router-link to="/admin/user">
                <el-menu-item index="1-1">用户</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>资讯管理</span>
              </template>
              <router-link to="/admin/info">
                <el-menu-item index="2-1">资讯</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>素材管理</span>
              </template>
              <router-link to="/admin/images">
                <el-menu-item index="3-1">图像素材</el-menu-item>
              </router-link>
              <router-link to="/admin/videos">
                <el-menu-item index="3-2">视频素材</el-menu-item>
              </router-link>
              <router-link to="/admin/audios">
                <el-menu-item index="3-3">音频素材</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>学习管理</span>
              </template>
              <router-link to="/admin/questions">
                <el-menu-item index="4-1">答题</el-menu-item>
              </router-link>
            </el-sub-menu>
            <!-- <el-sub-menu index="5">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>可视化管理</span>
                </template>
                <router-link to="/admin/questions"></router-link><el-menu-item index="5-1">可视化数据</el-menu-item>
            </el-sub-menu> -->
            <el-sub-menu index="6">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>发布审核管理</span>
              </template>
              <el-sub-menu index="6-1">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <span>资讯审核管理</span>
                </template>
                <router-link to="/admin/infoReview">
                  <el-menu-item index="6-1-1">资讯审核</el-menu-item>
                </router-link>
              </el-sub-menu>
              <el-sub-menu index="6-2">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <span>素材审核管理</span>
                </template>
                <router-link to="/admin/imagesReview">
                  <el-menu-item index="6-2-1">图像审核</el-menu-item>
                </router-link>
                <router-link to="/admin/videosReview">
                  <el-menu-item index="6-2-2">视频审核</el-menu-item>
                </router-link>
                <router-link to="/admin/audiosReview">
                  <el-menu-item index="6-2-3">音频审核</el-menu-item>
                </router-link>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.contain {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    width: 100%;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      margin-left: 20px;
    }

    .right-box > * {
      margin-right: 20px;
    }

    .logout {

      &:hover {
        cursor: pointer;
      }
    }
  }

  .aside {
    height: calc(100vh - 60px);
  }
}
</style>
