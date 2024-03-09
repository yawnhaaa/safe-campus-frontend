<script lang="ts">
import { defineComponent, ref } from 'vue'
import '../styles/page.scss'
import '../styles/materia.scss'
import LeftItem from '../components/LeftItem.vue'
import CommentItem from '../components/CommentItem.vue'

export default defineComponent({
    name: 'VideoPage',
    components: {
        LeftItem,
        CommentItem,
    },
    setup() {
        const materia = ref({
            id: '0',
            src: '../assets/images/fanzha.jpg',
            title: '视频标题',
            author: '阿豪',
            date: '3-9',
            type: '0'
        })

        return {
            materia,
        }
    }

})

</script>

<template>
    <div class="page-contain">
        <left-item />
        <div class="materia-contain">
            <div class="materia-header">
                <h1 class="materia-title">{{ materia.title }}</h1>
                <el-button class="materia-button" type="primary">下载素材</el-button>
            </div>
            <div class="materia-main">
                <span class="materia-author">{{ materia.author }}</span>
                <span class="materia-date">{{ materia.date }}</span>
            </div>
            <div class="video-contain">
                <video controls width="640" height="360">
                    <source src="../assets/videos/video.mp4">
                </video>
            </div>
        </div>
        <comment-item />
    </div>
</template>

<style lang="scss" scoped>
.video-contain {
    margin-top: 10px;
    position: relative;
    width: 100%;
    padding-top: 56.25%;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
