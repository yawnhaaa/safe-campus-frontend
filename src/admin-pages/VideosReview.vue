<script lang="ts">
import {request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {defineComponent, onMounted, ref} from 'vue'
import router from "@/router";


interface Material {
  id: number;
  title: string;
  src: string;
  author: string;
  authorId: number;
  imgSrc: string;
  materialDate: string;
  materialType: number;
  download: number;
  isDelete: number;
}

export default defineComponent({
  name: "VideosReview",

  setup() {
    const itemsSelected = ref<Material[]>([])
    const materialList = ref<Material[]>([])


    const selectPass = () => {
      if (itemsSelected.value.length < 1) {
        ElMessageBox.alert("请选择数据", "注意", {
          confirmButtonText: "好的"
        })
      }
      const idList: number[] = [];
      itemsSelected.value.forEach((item) => {
        idList.push(item.id);
      });
      const paramsString = idList.map(id => `idList=${id}`).join('&');
      request.get(`/admin/passMaterialList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialReviewList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const selectNoPass = () => {
      if (itemsSelected.value.length < 1) {
        ElMessageBox.alert("请选择数据", "注意", {
          confirmButtonText: "好的"
        })
      }
      const idList: number[] = [];
      itemsSelected.value.forEach((item) => {
        idList.push(item.id);
      });
      const paramsString = idList.map(id => `idList=${id}`).join('&');
      request.get(`/admin/noPassMaterialList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialReviewList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleSelectionChange = (val: Material[]) => {
      itemsSelected.value = val
    }

    const handlePass = (row: Material) => {
      request.get("/admin/passMaterial/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialReviewList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleNoPass = (row: Material) => {
      request.get("/admin/noPassMaterial/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getMaterialReviewList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }

    const handleMaterialDetail = (row: Material) => {
      router.push({ path: `/admin/material/${row.id}` });
    }

    const getMaterialReviewList = () => {
      request.get("/admin/getVideoReviewList").then((res) => {
        materialList.value = res.data.data
      })
    }

    const formatTime = (inputTime: string): string => {
      const date = new Date(inputTime);

      const year = date.getFullYear().toString().slice(-2); // 取后两位作为年份
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份补零
      const day = date.getDate().toString().padStart(2, "0"); // 日补零

      return `${year}-${month}-${day}`;
    }

    onMounted(() => {
      getMaterialReviewList()
    })

    return {
      materialList,

      formatTime,

      selectPass,
      selectNoPass,
      handleSelectionChange,
      handlePass,
      handleNoPass,
      handleMaterialDetail,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header-button">
      <el-button type="primary" @click="selectPass">批量通过</el-button>
      <el-button type="danger" @click="selectNoPass">批量驳回</el-button>
    </div>
    <el-table :data="materialList" border height="666px" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="src" label="内容">
        <template #default>
          <span>更多内容见详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="imgSrc" label="展示图片">
        <template #default="{ row }">
          <span v-if="row.imgSrc">展示图片见详情</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者"/>
      <el-table-column prop="materialDate" label="发布日期">
        <template #default="{ row }">
          {{ formatTime(row.materialDate) }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <span v-if="row.isDelete === 2">待审核</span>
          <span v-else-if="row.isDelete === 3">已驳回</span>
          <span v-else>网络错误</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleMaterialDetail(scope.row)">详情</el-button>
          <el-button size="small" type="primary" @click="handlePass(scope.row)">通过</el-button>
          <el-button size="small" type="danger" @click="handleNoPass(scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  height: 100%;

  .header-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>