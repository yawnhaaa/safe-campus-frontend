<script lang="ts">
import {request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {defineComponent, onMounted, reactive, ref} from 'vue'


interface QuestionContent {
  id: number;
  questionId: number;
  content: string;
  isChecked: boolean;
  isTrue: boolean;
  isDelete: number;
}

interface Question {
  id: number;
  type: number;
  title: string;
  analysis: string;
  isSubmit: boolean;
  isDelete: number;
  questionContentEntityList: QuestionContent[];
}

export default defineComponent({
  name: "QuestionPage",

  setup() {
    const itemsSelected = ref<Question[]>([])
    const questionList = reactive({
      questions: []
    });

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
      request.get(`/admin/deleteQuestionList?${paramsString}`).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getQuestionList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleSelectionChange = (val: Question[]) => {
      itemsSelected.value = val
      console.log(itemsSelected.value)
    }

    const openNew = (row: Info) => {
      request.get("/admin/deleteInfo/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const openUpdate = (row: Info) => {
      request.get("/admin/deleteInfo/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }
    const handleDelete = (row: Info) => {
      request.get("/admin/deleteQuestion/" + row.id).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            getQuestionList()
          })
        } else {
          ElMessageBox.alert(res.data.msg, "注意", {
            confirmButtonText: "好的"
          })
        }
      })
    }

    const getQuestionList = () => {
      request.get("/admin/getQuestionList").then((res) => {
        const responseData = res.data.data; // 假设 res.data.data 是从后端获取的数组
        questionList.questions = []

        responseData.forEach((item: any) => {
          const { id, type, title, analysis, isSubmit, isDelete, questionContentEntityList } = item;

          // 初始化问题变量
          const initializedQuestion: any = {
            id,
            type,
            title,
            analysis,
            isSubmit,
            isDelete,
            questionContentEntityList: [],
          };

          // 处理问题内容子数组
          questionContentEntityList.forEach((contentItem: QuestionContent) => {
            const { id, questionId, content, isChecked, isTrue, isDelete } = contentItem;
            const initializedContent: QuestionContent = {
              id,
              questionId,
              content,
              isChecked,
              isTrue,
              isDelete,
            };

            // 将问题内容添加到问题的内容列表中
            initializedQuestion.questionContentEntityList.push(initializedContent);
          });

          // 将初始化好的问题添加到 questionList 中
          questionList.questions.push(initializedQuestion);
        });
        console.log(questionList)
      });
    };

    onMounted(() => {
      getQuestionList()
    })

    return {
      questionList,

      selectDelete,
      handleSelectionChange,
      openNew,
      openUpdate,
      handleDelete,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header-button">
      <el-button type="primary" @click="openNew">新增题目</el-button>
      <el-button type="danger" @click="selectDelete">批量删除</el-button>
    </div>
    <el-table :data="questionList.questions" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="55"/>
      <el-table-column prop="type" label="类型">
        <template #default="{ row }">
          <span v-if="row.type === 0">单选</span>
          <span v-else>多选</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="题目"></el-table-column>
      <el-table-column prop="analysis" label="解析"></el-table-column>
      <el-table-column label="Question Content" width="500">
        <template v-slot="scope">
          <el-table :data="scope.row.questionContentEntityList" style="width: 100%">
            <el-table-column type="index" label="序号" width="55"/>
            <el-table-column prop="content" label="选项"></el-table-column>
            <el-table-column prop="isTrue" label="答案">
              <template #default="{ row }">
                <span v-if="row.isTrue === true">正确</span>
                <span v-else-if="row.isTrue === false">错误</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="openUpdate(scope.row)">更改</el-button>
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