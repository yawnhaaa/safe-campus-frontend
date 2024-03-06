<script lang="ts">
import { defineComponent } from 'vue';
import InfoItem from '../components/InfoItem.vue'
import '../styles/page.scss'
import { InfoType } from '../types/type'

export default defineComponent({
  name: 'HomePage',
  components: {
    InfoItem,
  },

  setup (){
    const infoArray: InfoType[] = [
      {
        id: '1',
        title: '标题1',
        content: '内容1',
        author: '作者1',
        like: '点赞：100',
      },
      {
        id: '2',
        title: '标题2',
        content: '内容2',
        author: '作者2',
        like: '点赞：200',
        img: '../../public/logo.png',
      },
    ]

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
