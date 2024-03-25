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
    const multipleSelection = ref<User[]>([])
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

    const handleSelectionChange = (val: User[]) => {
      multipleSelection.value = val
      console.log(multipleSelection.value)
    }
    const handleEdit = (index: number, row: User) => {
      console.log(index, row)
    }
    const handleDelete = (index: number, row: User) => {
      console.log(index, row)
    }

    return {
      tableData,

      handleSelectionChange,
      handleEdit,
      handleDelete,
    }
  }
})
</script>

<template>
  <div class="contain">
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
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  height: 100%
}
</style>
