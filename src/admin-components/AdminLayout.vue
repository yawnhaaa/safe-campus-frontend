<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'


export default defineComponent({
    name: "AdminLayout",
    components: {
        RouterLink,
        RouterView,
        Document, IconMenu, Location, Setting,
    },

    setup() {
        const isDark = useDark()
        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }

        return {
            isDark,
            handleOpen,
            handleClose,
        }
    }
})
</script>

<template>
    <div class="common-layout">
        <el-container class="contain">
            <el-header class="header" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
                <span class="title">大学反诈信息管理系统</span>
                <el-switch
                    inline-prompt
                    active-text="黑夜"
                    inactive-text="白天"
                    v-model="isDark"
                    style="display: inline-flex;"
                    class="switch"
                />
                <span class="admin">管理员大大</span>
                <span class="logout" @click="logout">退出登录</span>
            </el-header>
            <el-container>
                <el-aside class="aside" width="200px" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
                    <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                    >
                        <el-menu-item index="0">
                            <el-icon><icon-menu /></el-icon>
                            <span>首页</span>
                        </el-menu-item>
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>用户管理</span>
                            </template>
                                <el-menu-item index="1-1">用户</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>资讯管理</span>
                            </template>
                                <el-menu-item index="2-1">资讯</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>素材管理</span>
                            </template>
                                <el-menu-item index="3-1">图像素材</el-menu-item>
                                <el-menu-item index="3-1">视频素材</el-menu-item>
                                <el-menu-item index="3-1">音频素材</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>学习管理</span>
                            </template>
                                <el-menu-item index="4-1">答题</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="5">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>可视化管理</span>
                            </template>
                                <el-menu-item index="5-1">可视化数据</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="6">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>发布审核管理</span>
                            </template>
                            <el-sub-menu index="6-1">
                                <template #title>
                                    <el-icon><location /></el-icon>
                                    <span>资讯审核管理</span>
                                </template>
                                <el-menu-item index="6-1-1">资讯审核</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="6-2">
                                <template #title>
                                    <el-icon><location /></el-icon>
                                    <span>素材审核管理</span>
                                </template>
                                <el-menu-item index="6-2-1">图像审核</el-menu-item>
                                <el-menu-item index="6-2-2">视频审核</el-menu-item>
                                <el-menu-item index="6-2-3">音频审核</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main><router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.contain {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
        width: 100%;
        border-bottom: 1px solid gray;
        display: flex;
        align-items: center;

        .title {
            margin-left: 20px;
        }

        .switch {
            margin-left: 45vw;
            margin-right: 10vw;
        }
        
        .admin {
            margin-right: 20px;
        }
    }

    .aside {
        height: calc(100vh - 60px);
    }
}
</style>
