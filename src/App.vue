<script lang="ts">
import { computed, defineComponent } from 'vue';
import MainLayout from './components/MainLayout.vue';
import AdminLayout from './admin-components/AdminLayout.vue'
import '@/styles/global.scss';
import { useRoute } from 'vue-router'

export default defineComponent({
    components: {
        MainLayout,
        AdminLayout
    },
    setup() {
        const route = useRoute()

        const currentLayout = computed(() => {
            if (route.path.includes('/admin')) {
                return AdminLayout;
            } else {
                return MainLayout;
            }
        })
        
        return {
            currentLayout
        }
    }
})
</script>

<template>
    <component :is="currentLayout" />
</template>

<style lang="scss" scoped>
</style>
