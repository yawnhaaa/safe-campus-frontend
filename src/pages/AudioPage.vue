<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue'
import '../styles/page.scss'
import '../styles/material.scss'
import {request, url} from '@/api/request'
import {ElMessageBox} from 'element-plus'


interface Material {
  title: string;
  src: string;
  author: string;
  materialDate: string;
  download: number;
}

export default defineComponent({
  name: 'AudioPage',
  components: {},
  setup() {
    const material = reactive<Material>({
      title: '',
      src: '',
      author: '',
      materialDate: '',
      download: 0,
    });
    const materialSrc = ref('')
    const src = ref('')
    const getMaterialId = () => {
      const url = window.location.pathname
      const parts = url.split("/")
      return parseInt(parts[parts.length - 1], 10);
    }

    const formatTime = (time: string) => {
      const date: Date = new Date(time);
      const formattedTime: string = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      return formattedTime
    }

    const getMaterial = () => {
      request.get("/material/" + getMaterialId()).then((res) => {
        if (res.data.code === 200 && res.data.data) {
          const materialData = res.data.data
          material.title = materialData.title
          material.src = materialData.src
          material.author = materialData.author
          material.materialDate = materialData.materialDate
          material.download = materialData.download
          materialSrc.value = url + "/resource/audios/" + res.data.data.src
          src.value = res.data.data.src
        } else {
          ElMessageBox.alert("网络错误", '确认', {
            confirmButtonText: '好的'
          })
        }
      })
    }

    const getAudioSource = () => {
      return materialSrc.value;
    }
    const increaseDownloadNum = () => {
      request.get("downloadMaterial/" + getMaterialId())
    }
    const download = () => {
      fetch(getAudioSource())
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', src.value);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }).then(() => {
        increaseDownloadNum()
      })
    }

    onMounted(() => {
      getMaterial()
    })
    return {
      getAudioSource,
      formatTime,
      download,
      material,
    }
  }

})

</script>

<template>
  <div class="page-contain">
    <div class="material-contain">
      <div class="material-header">
        <h1 class="material-title">{{ material.title }}</h1>
        <el-button @click="download" class="material-button" type="primary">下载素材</el-button>
        <span v-if="material.download"
              style="padding-left: 20px; color: rgb(128,128,128);">下载次数：{{ material.download }}</span>
      </div>
      <div class="material-main">
        <span class="material-author">{{ material.author }}</span>
        <span class="material-date">{{ formatTime(material.materialDate) }}</span>
      </div>
      <div class="audio-contain">
        <audio :src="getAudioSource()" controls/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.audio-contain {
  margin-top: 10px;
  width: 100%;

  audio {
    width: 100%;
  }
}
</style>
