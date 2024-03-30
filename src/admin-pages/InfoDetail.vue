<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue'
import {useRouter} from "vue-router";
import {request} from "@/api/request";
import {ElMessageBox} from "element-plus";


interface Info {
  id: number;
  title: string;
  author: string;
  authorId: number;
  infoDate: string;
  content: string;
  img: string;
  infoLike: number;
  infoCollect: number;
  isDelete: number;
}

export default defineComponent({
  name: "InfoDetail",

  setup() {
    const resUrl = "http://127.0.0.1:8080/api/resource/imgSrc/"
    const router = useRouter();
    // 获取动态路由中的id参数
    const infoId = router.currentRoute.value.params.id;
    const info = reactive<Info>({
      id: 0,
      title: '',
      author: '',
      authorId: 0,
      infoDate: '',
      content: '',
      img: '',
      infoLike: 0,
      infoCollect: 0,
      isDelete: 0
    });

    const goBack = () => {
      router.go(-1)
    }
    const getInfoDetail = () => {
      request.get("/admin/info/" + infoId).then((res) => {
        if (res.data.code === 200) {
          const infoDetail = res.data.data;
          // 使用解构赋值将属性值分配给info对象
          info.id = infoDetail.id;
          info.title = infoDetail.title;
          info.author = infoDetail.author;
          info.authorId = infoDetail.authorId;
          info.infoDate = formatDate(infoDetail.infoDate);
          info.content = infoDetail.content;
          info.img = infoDetail.img;
          info.infoLike = infoDetail.infoLike;
          info.infoCollect = infoDetail.infoCollect;
          info.isDelete = infoDetail.isDelete;
          console.log(info.img)
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
      request.get("/admin/noBanInfo/" + infoId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleBan = () => {
      request.get("/admin/banInfo/" + infoId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleDelete = () => {
      request.get("/admin/deleteInfo/" + infoId).then((res) => {
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
      request.get("/admin/passInfo/" + infoId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleNoPass = () => {
      request.get("/admin/noPassInfo/" + infoId).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoDetail()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }

    const formatDate = (infoDate: string): string => {
      const date = new Date(infoDate)
      return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    onMounted(() => {
      getInfoDetail()
    })
    return {
      info,
      resUrl,

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
      <template v-if="info.isDelete !== 2 && info.isDelete !== 3">
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
      <el-form :model="info" label-width="auto" style="max-width: 600px">
        <el-form-item label="当前状态">
          <span v-if="info.isDelete === 0">正常</span>
          <span v-else-if="info.isDelete === 1">限流</span>
          <span v-else-if="info.isDelete === 2">待审核</span>
          <span v-else-if="info.isDelete === 3">驳回</span>
          <span v-else>网络错误</span>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="info.title" readonly/>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="info.author" readonly/>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-input v-model="info.infoDate" readonly/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
              v-model="info.content"
              readonly
              autosize
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="展示图片" v-if="info.img">
          <img :src="resUrl + info.img" alt="" style="max-width: 100px; max-height: 100px;">
        </el-form-item>
        <template v-if="info.isDelete !== 2 && info.isDelete !== 3">
          <el-form-item label="点赞数">
            <el-input v-model="info.infoLike" readonly/>
          </el-form-item>
          <el-form-item label="收藏数">
            <el-input v-model="info.infoCollect" readonly/>
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