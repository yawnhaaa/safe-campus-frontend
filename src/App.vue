<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './components/MainLayout.vue';

export default defineComponent({
  components: {
    MainLayout
  }
})
</script>

<template>
  <MainLayout />
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;

}
</style>
