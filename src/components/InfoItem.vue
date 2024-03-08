<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InfoType } from '../types/type'
import { useRouter } from 'vue-router'

export default defineComponent ({
    name: "InfoItem",
    props: {
        infoArray: {
            type: Array as PropType<InfoType[]>,
            required: true
        }
    },

    setup() {
        const router = useRouter();
        const handleToInfoDetail = (id: string) => {
            router.push({ name: 'infoDetail', params: { id } })
        }

        return{
            handleToInfoDetail,
        }
    }
})
</script>

<template>
    <div class="info-contain" v-for="item in infoArray" :key="item.id" @click="handleToInfoDetail(item.id)">
        <div class="info-text">
            <div class="text-title">{{ item.title }}</div>
            <div class="text-content">{{ item.content }}</div>
            <div class="text-footer">
                <span class="text-author">{{ item.author }}</span>
                <span class="text-like">{{ item.like }}</span>
            </div>
        </div>
        <div class="info-img">
            <img v-if="item.img" :src="item.img" style="width: 108px; height: 72px;"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-contain {
    margin: 10px;
    padding: 10px;
    border-bottom: 1px solid gray;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    .info-text {
        flex: 1;
        width: 300px;

        .text-title {
            font-weight: bold;
            font-size: 18px;
        }

        .text-content {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 10px 0;
            font-size: 14px;
        }

        .text-footer {
            font-size: 14px;

            .text-author {
                margin-right: 10px;
                padding-right: 10px;
                border-right: 1px solid gray;
            }
        }
    }

    .info-img {
        align-self: center;
        margin-left: auto;
    }

    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        transform: scale(1.02);
        cursor: pointer;
    }
}
</style>
