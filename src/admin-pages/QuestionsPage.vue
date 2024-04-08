<script lang="ts">
import {request} from '@/api/request';
import {ElMessageBox} from 'element-plus';
import {computed, defineComponent, onMounted, reactive, ref} from 'vue'


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
    const questionUpdate = ref('')
    const dialogTableVisible = ref(false)
    const dialogType = ref(-1)
    const questionType = ref(0)
    const title = ref('')
    const analysis = ref('')
    const content1 = ref('')
    const content2 = ref('')
    const content3 = ref('')
    const content4 = ref('')
    const checked1 = ref(false)
    const checked2 = ref(false)
    const checked3 = ref(false)
    const checked4 = ref(false)
    const checkedDisable1 = ref(true)
    const checkedDisable2 = ref(true)
    const checkedDisable3 = ref(true)
    const checkedDisable4 = ref(true)
    const inputDisable1 = ref(false)
    const inputDisable2 = ref(false)
    const inputDisable3 = ref(false)
    const inputDisable4 = ref(false)


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
    }

    const openNew = (type: number) => {
      dialogTableVisible.value = true
      dialogType.value = type
      questionType.value = type
      initForm()
    }
    const handleNew = () => {
      let contentList = []
      if (content1.value) {
        let obj = {
          content: content1.value,
          isTrue: checked1.value
        }
        contentList.push(obj)
      }
      if (content2.value) {
        let obj = {
          content: content2.value,
          isTrue: checked2.value
        }
        contentList.push(obj)
      }
      if (content3.value) {
        let obj = {
          content: content3.value,
          isTrue: checked3.value
        }
        contentList.push(obj)
      }
      if (content4.value) {
        let obj = {
          content: content4.value,
          isTrue: checked4.value
        }
        contentList.push(obj)
      }
      let body = {
        type: questionType.value,
        title: title.value,
        analysis: analysis.value,
        questionContentDTOList: []
      }
      body.questionContentDTOList = contentList
      if (!body.title) {
        ElMessageBox.alert("请输入题目", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (!body.analysis) {
        ElMessageBox.alert("请输入解析", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (body.questionContentDTOList.length < 2) {
        ElMessageBox.alert("选项不得少于2项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      let num = 0
      body.questionContentDTOList.forEach((contentItem) => {
        if (contentItem.isTrue) num++
      })
      if (questionType.value === 1 && num < 2) {
        ElMessageBox.alert("多选题正确项不得少于2项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (questionType.value === 0 && num !== 1) {
        ElMessageBox.alert("单选题正确项必须为1项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      request.post("/admin/newQuestion", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogTableVisible.value = false
            getQuestionList()
          })
        }
      })
    }
    const openUpdate = (row: Question) => {
      inputDisable1.value = true
      inputDisable2.value = true
      inputDisable3.value = true
      inputDisable4.value = true
      dialogTableVisible.value = true
      questionUpdate.value = row
      title.value = row.title
      analysis.value = row.analysis
      questionType.value = row.type
      row.questionContentEntityList.forEach((contentItem, index) => {
        if (index === 0) {
          content1.value = contentItem.content;
          checked1.value = contentItem.isTrue
          checkedDisable1.value = false
          inputDisable1.value = false
        } else if (index === 1) {
          content2.value = contentItem.content;
          checked2.value = contentItem.isTrue
          checkedDisable2.value = false
          inputDisable2.value = false
        } else if (index === 2) {
          content3.value = contentItem.content;
          checked3.value = contentItem.isTrue
          checkedDisable3.value = false
          inputDisable3.value = false
        } else if (index === 3) {
          content4.value = contentItem.content;
          checked4.value = contentItem.isTrue
          checkedDisable4.value = false
          inputDisable4.value = false
        }
      })
    }
    const handleUpdate = () => {
      const questionData = questionUpdate.value
      let contentList = []
      if (content1.value) {
        let obj = {
          id: questionData.questionContentEntityList[0].id,
          questionId: questionData.questionContentEntityList[0].questionId,
          content: content1.value,
          isTrue: checked1.value
        }
        contentList.push(obj)
      }
      if (content2.value) {
        let obj = {
          id: questionData.questionContentEntityList[1].id,
          questionId: questionData.questionContentEntityList[1].questionId,
          content: content2.value,
          isTrue: checked2.value
        }
        contentList.push(obj)
      }
      if (content3.value) {
        let obj = {
          id: questionData.questionContentEntityList[2].id,
          questionId: questionData.questionContentEntityList[2].questionId,
          content: content3.value,
          isTrue: checked3.value
        }
        contentList.push(obj)
      }
      if (content4.value) {
        let obj = {
          id: questionData.questionContentEntityList[3].id,
          questionId: questionData.questionContentEntityList[3].questionId,
          content: content4.value,
          isTrue: checked4.value
        }
        contentList.push(obj)
      }
      let body = {
        id: questionData.id,
        type: questionType.value,
        title: title.value,
        analysis: analysis.value,
        questionContentDTOList: []
      }
      body.questionContentDTOList = contentList
      if (!body.title) {
        ElMessageBox.alert("请输入题目", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (!body.analysis) {
        ElMessageBox.alert("请输入解析", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (body.questionContentDTOList.length < 2) {
        ElMessageBox.alert("选项不得少于2项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      let num = 0
      body.questionContentDTOList.forEach((contentItem) => {
        if (contentItem.isTrue) num++
      })
      if (questionType.value === 1 && num < 2) {
        ElMessageBox.alert("多选题正确项不得少于2项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      if (questionType.value === 0 && num !== 1) {
        ElMessageBox.alert("单选题正确项必须为1项", "注意", {
          confirmButtonText: "好的"
        })
        return
      }
      request.post("/admin/updateQuestion", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert(res.data.data, "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogTableVisible.value = false
            getQuestionList()
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
          const {id, type, title, analysis, isSubmit, isDelete, questionContentEntityList} = item;

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
            const {id, questionId, content, isChecked, isTrue, isDelete} = contentItem;
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
      });
    };

    const changeContent1 = () => {
      if (content1.value) {
        checkedDisable1.value = false
      } else {
        checkedDisable1.value = true
        checked1.value = false
      }
    }
    const changeContent2 = () => {
      if (content2.value) {
        checkedDisable2.value = false
      } else {
        checkedDisable2.value = true
        checked2.value = false
      }
    }
    const changeContent3 = () => {
      if (content3.value) {
        checkedDisable3.value = false
      } else {
        checkedDisable3.value = true
        checked3.value = false
      }
    }
    const changeContent4 = () => {
      if (content4.value) {
        checkedDisable4.value = false
      } else {
        checkedDisable4.value = true
        checked4.value = false
      }
    }
    const changeCheck1 = () => {
      if (questionType.value === 0) {
        checked2.value = false
        checked3.value = false
        checked4.value = false
      }
    }
    const changeCheck2 = () => {
      if (questionType.value === 0) {
        checked1.value = false
        checked3.value = false
        checked4.value = false
      }
    }
    const changeCheck3 = () => {
      if (questionType.value === 0) {
        checked2.value = false
        checked1.value = false
        checked4.value = false
      }
    }
    const changeCheck4 = () => {
      if (questionType.value === 0) {
        checked2.value = false
        checked3.value = false
        checked1.value = false
      }
    }

    const initForm = () => {
      title.value = ''
      analysis.value = ''
      content1.value = ''
      content2.value = ''
      content3.value = ''
      content4.value = ''
      checked1.value = false
      checked2.value = false
      checked3.value = false
      checked4.value = false
      checkedDisable1.value = true
      checkedDisable2.value = true
      checkedDisable3.value = true
      checkedDisable4.value = true
    }

    const dialogClosed = () => {
      dialogType.value = -1
    }
    const getTitle = computed(() => {
      if (dialogType.value === 0) {
        return '新增单选题';
      } else if (dialogType.value === 1) {
        return '新增多选题';
      } else {
        return '更新题目';
      }
    });

    onMounted(() => {
      getQuestionList()
    })

    return {
      dialogType,
      questionType,
      questionList,
      dialogTableVisible,
      title,
      analysis,
      content1,
      content2,
      content3,
      content4,
      checked1,
      checked2,
      checked3,
      checked4,
      checkedDisable1,
      checkedDisable2,
      checkedDisable3,
      checkedDisable4,
      inputDisable1,
      inputDisable2,
      inputDisable3,
      inputDisable4,

      selectDelete,
      handleSelectionChange,
      openNew,
      handleNew,
      handleUpdate,
      openUpdate,
      handleDelete,
      changeContent1,
      changeContent2,
      changeContent3,
      changeContent4,
      changeCheck1,
      changeCheck2,
      changeCheck3,
      changeCheck4,
      dialogClosed,
      getTitle,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="header-button">
      <el-button type="primary" @click="openNew(0)">新增单选题</el-button>
      <el-button type="primary" @click="openNew(1)">新增多选题</el-button>
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
    <el-dialog v-model="dialogTableVisible" :title="getTitle" width="800"
               align-center center @close="dialogClosed">
      <el-form>
        <el-form-item label="题目">
          <el-input
              v-model="title"
              autocomplete="off"
              maxlength="100"
              show-word-limit
              clearable
          />
        </el-form-item>
        <el-form-item label="解析">
          <el-input
              v-model="analysis"
              autocomplete="off"
              maxlength="100"
              show-word-limit
              clearable
          />
        </el-form-item>
        <el-form-item label="选项一">
          <el-input
              v-model="content1"
              autocomplete="off"
              maxlength="50"
              show-word-limit
              style="width: 90%; margin-right: 20px"
              clearable
              :disabled="inputDisable1"
              @change="changeContent1"
          />
          <el-checkbox v-model="checked1" :disabled="checkedDisable1" @change="changeCheck1">正确</el-checkbox>
        </el-form-item>
        <el-form-item label="选项二">
          <el-input
              v-model="content2"
              autocomplete="off"
              maxlength="50"
              show-word-limit
              style="width: 90%; margin-right: 20px"
              clearable
              :disabled="inputDisable2"
              @change="changeContent2"
          />
          <el-checkbox v-model="checked2" :disabled="checkedDisable2" @change="changeCheck2">正确</el-checkbox>
        </el-form-item>
        <el-form-item label="选项三">
          <el-input
              v-model="content3"
              autocomplete="off"
              maxlength="50"
              show-word-limit
              style="width: 90%; margin-right: 20px"
              clearable
              :disabled="inputDisable3"
              @change="changeContent3"
          />
          <el-checkbox v-model="checked3" :disabled="checkedDisable3" @change="changeCheck3">正确</el-checkbox>
        </el-form-item>
        <el-form-item label="选项四">
          <el-input
              v-model="content4"
              autocomplete="off"
              maxlength="50"
              show-word-limit
              style="width: 90%; margin-right: 20px"
              clearable
              :disabled="inputDisable4"
              @change="changeContent4"
          />
          <el-checkbox v-model="checked4" :disabled="checkedDisable4" @change="changeCheck4">正确</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button v-if="dialogType === -1" type="primary" @click="handleUpdate">
            确认更改
          </el-button>
          <el-button v-else type="primary" @click="handleNew">
            确认新增
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