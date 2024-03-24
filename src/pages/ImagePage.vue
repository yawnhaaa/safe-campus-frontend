<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import '../styles/page.scss'
import '../styles/materia.scss'
import { ElMessageBox } from 'element-plus'
import { request, url } from '@/api/request'

export default defineComponent({
    name: 'ImagePage',
    components: {
    },
    setup() {
        const materia = ref('')
        const materiaSrc = ref('')
        const src = ref('')
        const getMateriaId = () => {
            const url = window.location.pathname
            const parts = url.split("/")
            return parseInt(parts[parts.length - 1], 10);
        }
        
        const formatTime = (time: string) => {
            const date: Date = new Date(time);
            const formattedTime: string = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return formattedTime
        }
        
        const getMateria = () => {
            request.get("/material/" + getMateriaId()).then((res) => {
                if (res.data.code === 200 && res.data.data) {
                    materia.value = res.data.data
                    materiaSrc.value = url + "/resource/images/" + res.data.data.src
                    src.value = res.data.data.src
                } else {
                    ElMessageBox.alert("网络错误", '确认', {
                        confirmButtonText: '好的'
                    })
                }
            })
        }
        
        const getImageSource = () => {
            return materiaSrc.value;
        }
        const increaseDownloadNum = () => {
            request.get("downloadMaterial/" + getMateriaId())
        }
        const download = () => {
            fetch(getImageSource())
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
                .catch(error => {
                    console.error('Error downloading file: ', error);
                });
        }
        onMounted(() => {
            getMateria()
        })

        return {
            getImageSource,
            formatTime,
            download,
            materiaSrc,
            materia,
        }
    }

})

</script>

<template>
    <div class="page-contain">
        <div class="materia-contain">
            <div class="materia-header">
                <h1 class="materia-title">{{ materia.title }}</h1>
                <el-button @click="download" class="materia-button" type="primary">下载素材</el-button>
                <span v-if="materia.download" style="padding-left: 20px; color: gray;">下载次数：{{ materia.download }}</span>
            </div>
            <div class="materia-main">
                <span class="materia-author">{{ materia.author }}</span>
                <span class="materia-date">{{ formatTime(materia.materialDate) }}</span>
            </div>
            <div class="image-contain">
                <img :src="getImageSource()" controls />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    width: 100%;
}
</style>
