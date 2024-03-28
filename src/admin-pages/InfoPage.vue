<script lang="ts">
import {request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {defineComponent, onMounted, ref} from 'vue'


interface Info {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  img: string;
  infoDate: string;
  infoLike: number;
  infoCollect: number;
  isDelete: number;
}

export default defineComponent({
  name: "InfoPage",

  setup() {
    const itemsSelected = ref<Info[]>([])
    const infoList = ref<Info[]>([])


    const selectNoBan = () => {
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
      request.get(`/admin/noBanInfoList?${paramsString}`).then((res) => {
          if (res.data.code === 200) {
              ElMessageBox.alert(res.data.data, "注意", {
                  confirmButtonText: "好的"
              }).then(() => {
                  getInfoList()
              })
          } else {
              ElMessageBox.alert(res.data.msg, "注意", {
                  confirmButtonText: "好的"
              })
          }
      })
    }
    const selectBan = () => {
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
      request.get(`/admin/banInfoList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const selectDelete = () => {
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
      request.get(`/admin/deleteInfoList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleSelectionChange = (val: Info[]) => {
      itemsSelected.value = val
    }

    const handleNoBan = (row: Info) => {
      request.get("/admin/noBanInfo/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleBan = (row: Info) => {
      request.get("/admin/banInfo/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleDelete = (row: Info) => {
      request.get("/admin/deleteInfo/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getInfoList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }

    // todo: 资讯详情未做
    const handleInfoDetail = (row: Info) => {
      console.log("查看详情", row)
    }

    const getInfoList = () => {
      request.get("/admin/getInfoList").then((res) => {
        infoList.value = res.data.data
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
      getInfoList()
    })

    return {
      infoList,

      formatTime,

      selectNoBan,
      selectBan,
      selectDelete,
      handleSelectionChange,
      handleNoBan,
      handleBan,
      handleDelete,
      handleInfoDetail,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header-button">
      <el-button type="primary" @click="selectNoBan">批量启用</el-button>
      <el-button type="warning" @click="selectBan">批量限流</el-button>
      <el-button type="danger" @click="selectDelete">批量删除</el-button>
    </div>
    <el-table :data="infoList" border height="666px" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="content" label="内容">
        <template #default>
          <span>更多内容见详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者"/>
      <el-table-column prop="infoDate" label="发布日期">
        <template #default="{ row }">
          {{ formatTime(row.infoDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="infoLike" label="点赞数量"/>
      <el-table-column prop="infoCollect" label="点赞数量"/>
      <el-table-column label="状态">
        <template #default="{ row }">
          <span v-if="row.isDelete === 0">正常</span>
          <span v-else-if="row.isDelete === 1">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleInfoDetail(scope.row)">详情</el-button>
          <el-button size="small" type="primary" @click="handleNoBan(scope.row)">启用</el-button>
          <el-button size="small" type="warning" @click="handleBan(scope.row)">限流</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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