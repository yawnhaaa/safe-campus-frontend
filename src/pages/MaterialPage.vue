<script lang="ts">
import { defineComponent, onMounted, ref, } from 'vue';
import MenuItem from '../components/MenuItem.vue'
import MateriaItem from '../components/MateriaItem.vue'
import { request } from '@/api/request';

export default defineComponent({
    name: 'MaterialPage',
    components: {
        MenuItem,
        MateriaItem,
    },
    setup() {
        const menuItemList = ref(['图片区', '视频区', '音频区'])
        const itemIndex = ref('0')
        const handleIndex = (index: string) => {
            itemIndex.value = index;
        }

        // 测试数据
        const imageList = ref([])
        const videoList = ref([
            {
                id: '0',
                src: 'src/assets/images/fanzha.jpg',
                title: '视频0',
                author: '阿赵视频',
                date: '3-7',
                type: '1',
            },
            {
                id: '1',
                src: 'src/assets/images/fanzha.jpg',
                title: '视频1',
                author: '阿宇视频',
                date: '3-8',
                type: '1',
            },
            {
                id: '2',
                src: 'src/assets/images/fanzha.jpg',
                title: '视频2',
                author: '阿豪视频',
                date: '3-0',
                type: '1',
            },
            {
                id: '3',
                src: 'src/assets/images/fanzha.jpg',
                title: '视频3',
                author: '阿豪视频',
                date: '3-11',
                type: '1',
            },
        ])
        const audioList = ref([
            {
                id: '0',
                src: 'src/assets/images/fanzha.jpg',
                title: '音频0',
                author: '阿赵音频',
                date: '3-7',
                type: '2',
            },
            {
                id: '1',
                src: 'src/assets/images/fanzha.jpg',
                title: '音频1',
                author: '阿宇音频',
                date: '3-8',
                type: '2',
            },
            {
                id: '2',
                src: 'src/assets/images/fanzha.jpg',
                title: '音频2',
                author: '阿豪音频',
                date: '3-0',
                type: '2',
            },
            {
                id: '3',
                src: 'src/assets/images/fanzha.jpg',
                title: '音频3',
                author: '阿豪音频',
                date: '3-11',
                type: '2',
            },
            {
                id: '4',
                src: 'src/assets/images/fanzha.jpg',
                title: '音频4',
                author: '阿豪音频',
                date: '3-12',
                type: '2',
            },
        ])
        const getImageList = () => {
            request.get("/imageList").then((res) => {
                if (res.data.code === 200 && res.data.data) {
                    imageList.value = res.data.data
                }
            })
        }
        const getVideoList = () => {
            request.get("/videoList").then((res) => {
                if (res.data.code === 200 && res.data.data) {
                    videoList.value = res.data.data
                }
            })
        }
        const getAudioList = () => {
            request.get("/audioList").then((res) => {
                if (res.data.code === 200 && res.data.data) {
                    audioList.value = res.data.data
                }
            })
        }

        onMounted(() => {
            getImageList()
            getVideoList()
            getAudioList()
        })

        return {
            menuItemList,
            itemIndex,
            handleIndex,
            imageList,
            videoList,
            audioList,
        }
    }
})
</script>

<template>
    <div class="page-contain">
        <menu-item :menuItemList="menuItemList" @item-selected="handleIndex"/>
        <template v-if="itemIndex == '0'">
            <div class="image-contain">
                <materia-item :itemList="imageList" />
            </div>
        </template>
        <template v-else-if="itemIndex == '1'">
            <div class="video-contain">
                <materia-item :itemList="videoList" />
            </div>
        </template>
        <template v-else>
            <div class="audio-contain">
                <materia-item :itemList="audioList" />
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.image-contain, .video-contain, .audio-contain {
    display: flex;
    flex-wrap: wrap;
}
</style>
