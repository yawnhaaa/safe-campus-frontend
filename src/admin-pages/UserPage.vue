<script lang="ts">
import {redirectAdminLogin, request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {defineComponent, onMounted, ref} from 'vue'


interface User {
  id: number;
  name: string;
  email: string;
  school: string;
  college: string;
  stuNum: string;
}

export default defineComponent({
  name: "UserPage",

  setup() {
    const itemsSelected = ref<User[]>([])
    const userList = ref<User[]>([])
    const dialogTableVisible = ref(false)
    const passwd = ref('')
    const userEdit = ref<User>()


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
      request.get(`/admin/noBanUserList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
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
      request.get(`/admin/banUserList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
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
      request.get(`/admin/deleteUserList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleSelectionChange = (val: User[]) => {
      itemsSelected.value = val
    }
    const openDialog = (row: User) => {
      passwd.value = ''
      userEdit.value = row
      dialogTableVisible.value = true
    }
    const handleEdit = () => {
      const body = {
        id: userEdit.value?.id,
        passwd: passwd.value
      }
      request.post("/admin/updateUserPasswd", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogTableVisible.value = false
            getUserList()
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
    const handleNoBan = (row: User) => {
      request.get("/admin/noBanUser/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
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
    const handleBan = (row: User) => {
      request.get("/admin/banUser/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
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
    const handleDelete = (row: User) => {
      request.get("/admin/deleteUser/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getUserList()
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

    const getUserList = () => {
      request.get("/admin/getUserList").then((res) => {
        userList.value = res.data.data
      }).catch(() => {
        redirectAdminLogin()
      })
    }

    onMounted(() => {
      getUserList()
    })

    return {
      userList,
      dialogTableVisible,
      passwd,

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
      <el-button type="warning" @click="selectNoBan">批量启用</el-button>
      <el-button type="warning" @click="selectBan">批量禁用</el-button>
      <el-button type="danger" @click="selectDelete">批量删除</el-button>
    </div>
    <el-table :data="userList" border height="666px" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="school" label="学校"/>
      <el-table-column prop="college" label="学院"/>
      <el-table-column prop="stuNum" label="学号"/>
      <el-table-column label="状态">
        <template #default="{ row }">
          <span v-if="row.isDelete === 0">正常</span>
          <span v-else-if="row.isDelete === 1">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">
            修改密码
          </el-button>
          <el-button size="small" type="primary" @click="handleNoBan(scope.row)">启用</el-button>
          <el-button size="small" type="warning" @click="handleBan(scope.row)">禁用</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="修改用户密码" width="300" align-center center>
      <el-form>
        <el-form-item label="密码">
          <el-input v-model="passwd" type="password" autocomplete="off"/>
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
