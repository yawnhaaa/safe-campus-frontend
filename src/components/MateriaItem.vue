<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'


type ItemType = {
    id: string;
    src: string;
    title: string;
    author: string;
    date: string;
    type: string;
}

export default defineComponent({
    name: 'MateriaItem',
    props: {
        itemList: {
            type: Object as PropType<ItemType>,
            required: true
        }
    },
    setup(_) {
        const router = useRouter()
        const handleItem = (item: ItemType) => {
            if(item.type == '0') {
                router.push({ name: 'imageMateria', params: { id: item.id } })
            } else if(item.type == '1') {
                router.push({ name: 'videoMateria', params: { id: item.id } })
            } else {
                router.push({ name: 'audioMateria', params: { id: item.id } })
            }
        }

        return {
            handleItem,
        }
    }

})
</script>

<template>
    <div class="materia-item" v-for="item in itemList" :key="item.id" @click="handleItem(item)" >
        <img :src="item.src" class="materia-image" />
        <div class="materia-info">
            <div class="materia-title">{{ item.title }}</div>
            <div class="materia-footer">
                <span class="materia-author">{{ item.author }}</span>
                <span class="materia-date">{{ item.date }}</span>
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
