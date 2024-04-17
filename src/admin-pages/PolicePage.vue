<script lang="ts">
import {redirectAdminLogin, request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {defineComponent, onMounted, reactive, ref} from 'vue'


interface Police {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
  address: string;
  intro: string;
  tel: string;
}

export default defineComponent({
  name: "PolicePage",

  setup() {
    const itemsSelected = ref<Police[]>([])
    const policeList = ref<Police[]>([])
    const dialogTableVisible = ref(false)
    const dialogTableVisible2 = ref(false)
    const policeEdit = ref<Police>()
    const policeEditForm = ref<Police>()
    const newPolice = reactive<Police>({
      id: "",
      longitude: "",
      latitude: "",
      name: "",
      address: "",
      intro: "",
      tel: ""
    })

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
      request.get(`/admin/noBanPoliceList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
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
      request.get(`/admin/banPoliceList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
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
      request.get(`/admin/deletePoliceList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleSelectionChange = (val: Police[]) => {
      itemsSelected.value = val
    }
    const validBody = (body: Police): Boolean => {
      return (body.longitude && body.latitude && body.name && body.address && body.intro && body.intro && body.tel);
    }
    const openDialog = (row?: Police) => {
      policeEdit.value = row
      policeEditForm.value = row
      dialogTableVisible.value = true
    }
    const openNewDialog = () => {
      newPolice.longitude = ''
      newPolice.latitude = ''
      newPolice.name = ''
      newPolice.address = ''
      newPolice.intro = ''
      newPolice.tel = ''
      dialogTableVisible2.value = true
    }
    const handleNew = () => {
      const body = {
        longitude: newPolice.longitude,
        latitude: newPolice.latitude,
        name: newPolice.name,
        address: newPolice.address,
        intro: newPolice.intro,
        tel: newPolice.tel
      }
      if (!validBody(body)) {
        ElMessageBox.alert("请将表单填完全！", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (!isNumeric(body.latitude) || isNumeric(!body.longitude)) {
        ElMessageBox.alert("经纬度必须为数值！", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      request.post("/admin/newPolice", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogTableVisible2.value = false
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      }).catch(() => {
        redirectAdminLogin()
      })
    }
    const handleEdit = () => {
      const body = {
        id: policeEditForm.value?.id,
        longitude: policeEditForm.value?.longitude,
        latitude: policeEditForm.value?.latitude,
        name: policeEditForm.value?.name,
        address: policeEditForm.value?.address,
        intro: policeEditForm.value?.intro,
        tel: policeEditForm.value?.tel
      }
      if (!validBody(body)) {
        ElMessageBox.alert("请将表单填完全！", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (!body.id) {
        ElMessageBox.alert("网络异常！请稍后重试", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (!isNumeric(body.latitude) || !isNumeric(body.longitude)) {
        ElMessageBox.alert("经纬度必须为数值！", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      request.post("/admin/updatePolice", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogTableVisible.value = false
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      }).catch(() => {
        redirectAdminLogin()
      })
    }
    const handleNoBan = (row: Police) => {
      request.get("/admin/noBanPoliceById/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      }).catch(() => {
        redirectAdminLogin()
      })
    }

    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    const handleBan = (row: Police) => {
      request.get("/admin/banPoliceById/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      }).catch(() => {
        redirectAdminLogin()
      })
    }
    const handleDelete = (row: Police) => {
      request.get("/admin/deletePoliceById/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getPoliceList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      }).catch(() => {
        redirectAdminLogin()
      })
    }

    const getPoliceList = () => {
      request.get("/admin/getAdminPoliceList").then((res) => {
        policeList.value = res.data.data
      }).catch(() => {
        redirectAdminLogin()
      })
    }

    onMounted(() => {
      getPoliceList()
    })

    return {
      policeList,
      policeEdit,
      dialogTableVisible,
      dialogTableVisible2,
      newPolice,

      openNewDialog,
      handleNew,
      selectNoBan,
      selectBan,
      selectDelete,
      handleSelectionChange,
      handleEdit,
      openDialog,
      handleNoBan,
      handleBan,
      handleDelete,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header-button">
      <el-button type="primary" @click="openNewDialog">新增数据</el-button>
      <el-button type="warning" @click="selectNoBan">批量启用</el-button>
      <el-button type="warning" @click="selectBan">批量禁用</el-button>
      <el-button type="danger" @click="selectDelete">批量删除</el-button>
    </div>
    <el-table :data="policeList" border height="666px" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="name" label="派出所"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="longitude" label="经度"/>
      <el-table-column prop="latitude" label="纬度"/>
      <el-table-column prop="tel" label="电话"/>
      <el-table-column prop="intro" label="介绍"/>
      <el-table-column label="状态">
        <template #default="{ row }">
          <span v-if="row.isDelete === 0">正常</span>
          <span v-else-if="row.isDelete === 1">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">
            修改点位
          </el-button>
          <el-button size="small" type="primary" @click="handleNoBan(scope.row)">启用</el-button>
          <el-button size="small" type="warning" @click="handleBan(scope.row)">禁用</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="修改派出所信息" width="300" align-center center>
      <el-form>
        <el-form-item label="派出所">
          <el-input v-model="policeEdit.name"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="policeEdit.address"/>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="policeEdit.longitude"/>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="policeEdit.latitude"/>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="policeEdit.intro"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="policeEdit.tel"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleEdit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible2" title="新增派出所信息" width="300" align-center center>
      <el-form>
        <el-form-item label="派出所">
          <el-input v-model="newPolice.name"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="newPolice.address"/>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="newPolice.longitude"/>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="newPolice.latitude"/>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="newPolice.intro"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newPolice.tel"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible2 = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleNew">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
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
