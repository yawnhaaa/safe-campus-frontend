<script lang="ts">
import { defineComponent, ref } from 'vue'
import '../styles/page.scss'
import '../styles/materia.scss'

export default defineComponent({
    name: 'AudioPage',
    components: {
    },
    setup() {
        const materia = ref({
            id: '0',
            src: '../assets/images/fanzha.jpg',
            title: '音频标题',
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
        <div class="materia-contain">
            <div class="materia-header">
                <h1 class="materia-title">{{ materia.title }}</h1>
                <el-button class="materia-button" type="primary">下载素材</el-button>
            </div>
            <div class="materia-main">
                <span class="materia-author">{{ materia.author }}</span>
                <span class="materia-date">{{ materia.date }}</span>
            </div>
            <div class="audio-contain">
                <audio controls>
                    <source src="../assets/audios/music.mp3" type="audio/mpeg">
                </audio>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.audio-contain {
    margin-top: 10px;
    width: 100%;

    audio {
        width: 100%;
    }
}
</style>
