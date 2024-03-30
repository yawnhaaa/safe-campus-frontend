<script lang="ts">
import {defineComponent, onMounted, ref,} from 'vue';
import MenuItem from '../components/MenuItem.vue'
import MaterialItem from '../components/MaterialItem.vue'
import {request} from '@/api/request';

export default defineComponent({
  name: 'MaterialPage',
  components: {
    MenuItem,
    MaterialItem,
  },
  setup() {
    const menuItemList = ref(['图片区', '视频区', '音频区'])
    const itemIndex = ref('0')
    const handleIndex = (index: string) => {
      itemIndex.value = index;
    }

    // 测试数据
    const imageList = ref([])
    const videoList = ref([])
    const audioList = ref([])
    const getImageList = () => {
      request.get("/imageList").then((res) => {
        if (res.data.code === 200 && res.data.data) {
          imageList.value = res.data.data
        }
      })
    }
    const getVideoList = () => {
      request.get("/videoList").then((res) => {
        if (res.data.code === 200 && res.data.data) {
          videoList.value = res.data.data
        }
      })
    }
    const getAudioList = () => {
      request.get("/audioList").then((res) => {
        if (res.data.code === 200 && res.data.data) {
          audioList.value = res.data.data
        }
      })
    }

    onMounted(() => {
      getImageList()
      getVideoList()
      getAudioList()
    })

    return {
      menuItemList,
      itemIndex,
      imageList,
      videoList,
      audioList,

      handleIndex,
    }
  }
})
</script>

<template>
  <div class="page-contain">
    <menu-item :menuItemList="menuItemList" @item-selected="handleIndex"/>
    <template v-if="itemIndex == '0'">
      <div class="image-contain">
        <material-item :itemList="imageList"/>
      </div>
    </template>
    <template v-else-if="itemIndex == '1'">
      <div class="video-contain">
        <material-item :itemList="videoList"/>
      </div>
    </template>
    <template v-else>
      <div class="audio-contain">
        <material-item :itemList="audioList"/>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.image-contain, .video-contain, .audio-contain {
  display: flex;
  flex-wrap: wrap;
}
</style>
