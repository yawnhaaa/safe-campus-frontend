<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {useRouter} from 'vue-router'


type ItemType = {
  id: string;
  imgSrc: string;
  title: string;
  author: string;
  materialDate: string;
  materialType: string;
}

export default defineComponent({
  name: 'MaterialItem',
  props: {
    itemList: {
      type: Object as PropType<ItemType[]>,
      required: true
    }
  },
  setup() {
    const url = "http://127.0.0.1:8080/api/resource/imgSrc/"
    const router = useRouter()
    const handleItem = (item: ItemType) => {
      if (item.materialType == '0') {
        router.push({name: 'imageMaterial', params: {id: item.id}})
      } else if (item.materialType == '1') {
        router.push({name: 'videoMaterial', params: {id: item.id}})
      } else {
        router.push({name: 'audioMaterial', params: {id: item.id}})
      }
    }

    const formatTime = (time: string) => {
      const date: Date = new Date(time);
      const formattedTime: string = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      return formattedTime
    }

    return {
      url,

      formatTime,
      handleItem,
    }
  }

})
</script>

<template>
  <div class="material-item" v-for="(item, index) in itemList" :key="index" @click="handleItem(item)">
    <img :src="item.imgSrc ? url + item.imgSrc : 'src/assets/images/anti-fraud.jpg'" class="material-image" alt=""/>
    <div class="material-info">
      <div class="material-title">{{ item.title }}</div>
      <div class="material-footer">
        <span class="material-author">{{ item.author }}</span>
        <span class="material-date">{{ formatTime(item.materialDate) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.material-item {
  margin-top: 5px;
  width: calc(50% - 15px);
  border: 1px solid gray;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  .material-image {
    width: calc(100% - 10px);
    padding: 5px;
    max-width: 500px;
    max-height: 250px;
  }

  .material-info {
    margin-left: 5px;

    .material-footer {
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
