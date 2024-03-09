<script lang="ts">
import { defineComponent, ref } from 'vue'
import '../styles/page.scss'
import LeftItem from '../components/LeftItem.vue'
import CommentItem from '../components/CommentItem.vue'

export default defineComponent({
    name: 'ImagePage',
    components: {
        LeftItem,
        CommentItem,
    },
    setup() {
        const materia = ref({
            id: '0',
            src: '../assets/images/fanzha.jpg',
            title: '图像标题',
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
            <h1>主要内容</h1>
        </div>
        <comment-item />
    </div>
</template>

<style lang="scss" scoped>

.materia-header {
    display: flex;
    align-items: center;


    .materia-button {
        margin-left: 30px;
    }
}

</style>
