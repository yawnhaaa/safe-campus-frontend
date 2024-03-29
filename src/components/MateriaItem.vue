<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import { useRouter } from 'vue-router'


type ItemType = {
    id: string;
    imgSrc: string;
    title: string;
    author: string;
    materialDate: string;
    materialType: string;
}

export default defineComponent({
    name: 'MateriaItem',
    props: {
        itemList: {
            type: Object as PropType<ItemType>,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const handleItem = (item: ItemType) => {
            if(item.materialType == '0') {
                router.push({ name: 'imageMateria', params: { id: item.id } })
            } else if(item.materialType == '1') {
                router.push({ name: 'videoMateria', params: { id: item.id } })
            } else {
                router.push({ name: 'audioMateria', params: { id: item.id } })
            }
        }

        const formatTime = (time: string) => {
            const date: Date = new Date(time);
            const formattedTime: string = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return formattedTime
        }

        onMounted(() => {
        })

        return {
            formatTime,
            handleItem,
        }
    }

})
</script>

<template>
    <div class="materia-item" v-for="(item, index) in itemList" :key="index" @click="handleItem(item)" >
        <img :src="item.imgSrc ? item.imgSrc : 'src/assets/images/fanzha.jpg'" class="materia-image" />
        <div class="materia-info">
            <div class="materia-title">{{ item.title }}</div>
            <div class="materia-footer">
                <span class="materia-author">{{ item.author }}</span>
                <span class="materia-date">{{ formatTime(item.materialDate) }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.materia-item {
    margin-top: 5px;
    width: calc(50% - 15px);
    border: 1px solid gray;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;

    .materia-image {
        width: calc(100% - 10px);
        padding: 5px;
    }

    .materia-info {
        margin-left: 5px;

        .materia-footer {
            font-size: 14px;
            color: gray;

            span {
                margin-right: 10px;
            }
        }
    }

    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        transform: scale(1.02);
        cursor: pointer;
    }
}
</style>
