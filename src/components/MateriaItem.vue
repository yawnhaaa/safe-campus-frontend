<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'

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
    }

})
</script>

<template>
    <div class="materia-item" v-for="item in itemList" :key="item.id" >
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
}
</style>
