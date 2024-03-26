<script lang="ts">
import { defineComponent, ref } from 'vue'

interface User {
  date: string;
  name: string;
  address: string
}

export default defineComponent ({
  name: "UserPage",

  setup() {
    const itemsSelected= ref<User[]>([])
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]

    const selectNoBan = () => {
      console.log(itemsSelected.value, "noBan")
    }
    const selectBan = () => {
      console.log(itemsSelected.value, "ban")
    }
    const selectDelete = () => {
      console.log(itemsSelected.value, "delete")
    }
    const handleSelectionChange = (val: User[]) => {
      itemsSelected.value = val
      console.log(itemsSelected.value)
    }
    const handleEdit = (index: number, row: User) => {
      console.log(index, row)
    }
    const handleNoBan = (index: number, row: User) => {
      console.log(index, row)
    }
    const handleBan = (index: number, row: User) => {
      console.log(index, row)
    }
    const handleDelete = (index: number, row: User) => {
      console.log(index, row)
    }

    return {
      tableData,

      selectNoBan,
      selectBan,
      selectDelete,
      handleSelectionChange,
      handleEdit,
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
      <el-button
        type="warning"
        @click="selectNoBan"
      >批量启用</el-button>
      <el-button
        type="warning"
        @click="selectBan"
      >批量禁用</el-button>
      <el-button
        type="danger"
        @click="selectDelete"
      >批量删除</el-button>
    </div>
    <el-table 
      :data="tableData" 
      border 
      height="666px"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button 
            size="small" 
            @click="handleEdit(scope.$index, scope.row)"
          >
            修改密码
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleNoBan(scope.$index, scope.row)"
          >启用</el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleBan(scope.$index, scope.row)"
          >禁用</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
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
