<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './components/MainLayout.vue';
import '@/styles/global.scss';

export default defineComponent({
  components: {
    MainLayout
  }
})
</script>

<template>
  <MainLayout />
</template>

<style lang="scss" scoped>
</style>
