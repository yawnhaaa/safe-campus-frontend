<script lang="ts">
import {defineComponent, ref, nextTick, onMounted} from 'vue'
import {redirectLogin, request} from '@/api/request'
import {ElMessageBox} from 'element-plus';

export default defineComponent({
  name: "LeftItem",
  props: {
    infoId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const isLike = ref(false)
    const infoId = ref(0)
    const handleLike = () => {
      if (!isLike.value) {
        const body = {
          userId: localStorage.getItem('userId') || '',
          infoId: infoId.value,
          type: 0,
          isStatus: true
        };
        request.post('/protected/handleInfo', body).then((res) => {
          if (res.data.code === -1) {
            ElMessageBox.alert(res.data.msg, '注意', {
              confirmButtonText: '好的',
            })
            return
          }
        }).catch(() => {
          redirectLogin()
        })
      }
      isLike.value = true
    }

    const isCollect = ref(false)
    const handleCollect = () => {
      if (!isCollect.value) {
        const body = {
          userId: localStorage.getItem('userId') || '',
          infoId: infoId.value,
          type: 1,
          isStatus: true
        };
        request.post('/protected/handleInfo', body).then((res) => {
          if (res.data.code === -1) {
            ElMessageBox.alert(res.data.msg, '注意', {
              confirmButtonText: '好的',
            })
          }
        }).catch(() => {
          redirectLogin()
        })

        isCollect.value = true
      }
    }

    const getInfoUserStatus = () => {
      if (localStorage.getItem('user') && infoId.value) {
        const body = {
          userId: localStorage.getItem('userId') || '',
          infoId: infoId.value,
        };
        request.post('/getInfoUserStatus', body).then((res) => {
          if (res.data.code !== -1) {
            isLike.value = res.data.data.likeStatus
            isCollect.value = res.data.data.collectStatus
          }
        })
      }
    }

    onMounted(() => {
      nextTick(() => {
        infoId.value = parseInt(props.infoId)
        getInfoUserStatus()
      })
    })

    return {
      isLike,
      isCollect,

      handleLike,
      handleCollect,
    }
  }
})
</script>

<template>
  <div class="left-contain">
    <img src="../assets/icon/like.png" @click="handleLike" :style="isLike ? 'background: red;' : '' " alt=""/>
    <img src="../assets/icon/shoucang.png" @click="handleCollect" :style="isCollect ? 'background: yellow;' : '' " alt=""/>
  </div>
</template>

<style lang="scss" scoped>
.left-contain {
  width: 50px;
  height: 200px;
  position: absolute;
  top: 50px;
  left: calc(20vw - 80px);

  img {
    padding: 5px;
    width: 30px;
    height: 30px;
    margin-bottom: 30px;
    border: 1px solid gray;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
