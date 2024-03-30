<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue'
import {useRouter} from "vue-router";
import {request} from "@/api/request";
import {ElMessageBox} from "element-plus";


interface Material {
  id: number;
  title: string;
  author: string;
  authorId: number;
  materialDate: string;
  src: string;
  imgSrc: string;
  materialType: number;
  download: number;
  isDelete: number;
}

export default defineComponent({
  name: "MaterialDetail",

  setup() {
    const resUrl = "http://127.0.0.1:8080/api/resource/"
    const router = useRouter();
    // 获取动态路由中的id参数
    const materialId = router.currentRoute.value.params.id;
    const material = reactive<Material>({
      id: 0,
      title: '',
      author: '',
      authorId: 0,
      materialDate: '',
      src: '',
      imgSrc: '',
      materialType: 0,
      download: 0,
      isDelete: 0
    });

    const goBack = () => {
      router.go(-1)
    }
    const getMaterialDetail = () => {
      request.get("/admin/material/" + materialId).then((res) => {
        if (res.data.code === 200) {
          const materialDetail = res.data.data;
          // 使用解构赋值将属性值分配给material对象
          material.id = materialDetail.id;
          material.title = materialDetail.title;
          material.author = materialDetail.author;
          material.authorId = materialDetail.authorId;
          material.materialDate = formatDate(materialDetail.materialDate);
          material.src = materialDetail.src;
          material.imgSrc = materialDetail.imgSrc;
          material.materialType = materialDetail.materialType;
          material.download = materialDetail.download;
          material.isDelete = materialDetail.isDelete;
        } else {
          ElMessageBox.alert("网络错误", "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            goBack()
          })
        }
      })
    }
    const handleNoBan = () => {
      request.get("/admin/noBanMaterial/" + materialId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleBan = () => {
      request.get("/admin/banMaterial/" + materialId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleDelete = () => {
      request.get("/admin/deleteMaterial/" + materialId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            goBack()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handlePass = () => {
      request.get("/admin/passMaterial/" + materialId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleNoPass = () => {
      request.get("/admin/noPassMaterial/" + materialId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }

    const formatDate = (materialDate: string): string => {
      const date = new Date(materialDate)
      return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    onMounted(() => {
      getMaterialDetail()

    })
    return {
      resUrl,
      material,

      goBack,
      handleNoBan,
      handleBan,
      handleDelete,
      handlePass,
      handleNoPass,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header">
      <el-button @click="goBack">返回</el-button>
      <template v-if="material.isDelete !== 2 && material.isDelete !== 3">
        <el-button type="primary" @click="handleNoBan">启用</el-button>
        <el-button type="warning" @click="handleBan">限流</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="handlePass">通过</el-button>
        <el-button type="danger" @click="handleNoPass">驳回</el-button>
      </template>
    </div>
    <div class="main">
      <el-form :model="material" label-width="auto" style="max-width: 600px">
        <el-form-item label="当前状态">
          <span v-if="material.isDelete === 0">正常</span>
          <span v-else-if="material.isDelete === 1">限流</span>
          <span v-else-if="material.isDelete === 2">待审核</span>
          <span v-else-if="material.isDelete === 3">驳回</span>
          <span v-else>网络错误</span>
        </el-form-item>
        <el-form-item label="素材类型">
          <span v-if="material.materialType === 0">图像</span>
          <span v-else-if="material.materialType === 1">视频</span>
          <span v-else-if="material.materialType === 2">音频</span>
          <span v-else>网络错误</span>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="material.title" readonly/>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="material.author" readonly/>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-input v-model="material.materialDate" readonly/>
        </el-form-item>
        <el-form-item label="内容">
          <template v-if="material.materialType === 0">
            <img :src="resUrl + 'images/' + material.src" alt="" style="max-width: 300px; max-height: 300px;">
          </template>
          <template v-else-if="material.materialType === 1">
            <video :src="resUrl + 'videos/' + material.src" controls style="max-width: 500px; max-height: 500px;"/>
          </template>
          <template v-else-if="material.materialType === 2">
            <audio :src="resUrl + 'audios/' + material.src" controls/>
          </template>
        </el-form-item>
        <el-form-item label="展示图片" v-if="material.imgSrc">
          <img :src="resUrl + 'imgSrc/' + material.imgSrc" alt="" style="max-width: 100px; max-height: 100px;">
        </el-form-item>
        <template v-if="material.isDelete !== 2 && material.isDelete !== 3">
          <el-form-item label="下载量">
            <el-input v-model="material.download" readonly/>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  margin-top: 20px;
  padding: 20px;
}
</style>