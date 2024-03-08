<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent ({
    name: 'MenuItem',
    props: {
        menuItemList : {
            type: Array as PropType<string[]>,
            required: true
        }
    },
    setup(_, { emit }) {
        const activeIndex = ref('0')
        const handleSelect = (index: string) => {
            emit('item-selected', index)
        }

        return {
            activeIndex,
            handleSelect
        }
    }
})
</script>

<template>
    <el-menu
        :default-active="activeIndex"
        class="menu-item"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item 
            v-for="(item, index) in menuItemList" 
            :key="index" 
            :index="String(index)"
        >
            {{ item }}
        </el-menu-item>
    </el-menu>
</template>
