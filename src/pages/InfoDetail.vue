<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import '@/styles/page.scss'
import LeftItem from '../components/LeftItem.vue'
import CommentItem from '../components/CommentItem.vue'
import { request } from '@/api/request';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
    name: 'InfoDetail',
    components: {
        LeftItem,
        CommentItem,
    },

    setup() {
        const route = useRoute();
        type InfoContentType = {
            id: number;
            title: string;
            content: string;
            author: string;
            authorId: number;
            infoDate: string;
            infoLike: number;
            infoCollect: number;
        }

        const info = ref<InfoContentType | null>(null);
        const leftShow = ref(false)
        const getInfoDetail = (id: string) => {
            request.get('/getInfoById/' + id).then((res) => {
                if (res.data.code != -1) {
                    info.value = res.data.data
                } else {
                    ElMessageBox.alert(res.data.msg, '注意', {
                        confirmButtonText: '确认'
                    })
                }
            }).catch(() => {
                ElMessageBox.alert("网络错误", '注意', {
                    confirmButtonText: '确认'
                })
            })
        }

        onMounted(() => {
            const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
            getInfoDetail(id);
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
            <h1>{{ info?.title }}</h1>
            <div class="info-header">
                <span>{{ info?.author }}</span>
                <span>{{ info?.infoDate }}</span>
            </div>
            <div class="info-content">
                <div v-for="(paragraph, index) in info?.content.split('\n')" :key="index">
                    <p style="text-indent: 2em;">{{ paragraph }}</p>
                </div>
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
        color: gray;

        span {
            padding-right: 30px;
        }
    }
}
</style>
