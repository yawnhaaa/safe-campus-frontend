<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import '@/styles/page.scss'
import LeftItem from '../components/LeftItem.vue'
import CommentItem from '../components/CommentItem.vue'

export default defineComponent({
    name: 'InfoDetail',
    components: {
        LeftItem,
        CommentItem,
    },

    setup() {
        type InfoContentType = {
            id: string;
            title: string;
            author: string;
            time: string;
            content: string;
        }

        const info: InfoContentType = {
            id: '1',
            title: '文章标题',
            author: '文章作者',
            time: '2024-03-08',
            content: '这里是文章正文内容'
        }

        const leftShow = ref(false)

        onMounted(() => {
        })
        onUnmounted(() => {
        })

        return {
            info,
            leftShow,
        }
    }

})
</script>

<template>
    <div class="page-contain">
        <left-item />
        <div class="info-contain">
            <h1>{{ info.title }}</h1>
            <div class="info-header">
                <span>{{ info.author }}</span>
                <span>{{ info.time }}</span>
            </div>
            <div class="info-content">
                <p>{{ info.content }}</p>
            </div>
        </div>
        <comment-item />
    </div>
</template>

<style lang="scss" scoped>
.info-contain {
    margin: 0 20px;

    .info-header {
        font-size: 14px;
        color: gary;

        span {
            padding-right: 30px;
        }
    }
}
</style>
