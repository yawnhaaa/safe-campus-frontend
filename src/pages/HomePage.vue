<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import InfoItem from '../components/InfoItem.vue'
import '../styles/page.scss'
import type { InfoType } from '../types/type'
import { request } from '@/api/request';

export default defineComponent({
    name: 'HomePage',
    components: {
        InfoItem,
    },

    setup (){
        const infoArray = ref<InfoType[] | string>([]);
        
        const init = () => {
            request.get('getInfoList').then((res) => {
                if (res.status === 200 && res.data.data) {
                    infoArray.value = res.data.data
                }
            })
        }

        onMounted(() => {
            init()
        })

        return {
            infoArray,
        }
    }
})
</script>

<template>
    <div class="page-contain">
        <info-item :infoArray="infoArray" />
    </div>
</template>

<style lang="scss" scoped>
</style>
