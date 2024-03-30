<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue'
import {request, requestJWT} from '@/api/request'
import {ElMessageBox} from 'element-plus'

type CommentType = {
  id: number;
  comment: string;
  commentId: number;
  commentName: string;
  commentedId: number;
  commentedName: string;
  topId: number;
  commentTime: string;
  isDelete: number;
  childList?: CommentType[];
}

export default defineComponent({
  name: "CommentItem",

  setup() {
    const comment = ref('')
    const resendComment = ref('')
    const topCommentList = ref<CommentType[]>([]);
    const infoId = ref(0)
    const handleSend = () => {
      if (comment.value === '') {
        return ElMessageBox.alert("请输入评论内容", "注意", {
          confirmButtonText: "好的"
        })
      }
      const body = {
        infoId: infoId.value,
        comment: comment.value,
        commentId: localStorage.getItem("userId"),
        commentName: localStorage.getItem("user"),
      }
      requestJWT.post("/sendComment", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert("评论成功", "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            comment.value = ''
            getComment()
          })
          return
        } else {
          ElMessageBox.alert("网络错误", "注意", {
            confirmButtonText: "好的"
          })
          return
        }
      })
    }

    const getComment = () => {
      request.get('/getComment/' + infoId.value).then((res) => {
        if (res.data.code === 200 && res.data.data) {
          const newComments = res.data.data;
          const filteredComments = newComments.filter((comment: CommentType) => comment.topId === null);
          filteredComments.sort((a: CommentType, b: CommentType) => new Date(b.commentTime).getTime() - new Date(a.commentTime).getTime());
          // 遍历原始评论数组，将符合条件的评论添加至父评论的childList中
          newComments.forEach((comment: CommentType) => {
            if (comment.topId !== null) {
              const parentComment = filteredComments.find((parent: CommentType) => parent.id === comment.topId);
              if (parentComment) {
                if (!parentComment.childList) {
                  parentComment.childList = [];
                }
                parentComment.childList.unshift(comment);
              }
            }
          });
          topCommentList.value = filteredComments
        }
      })
    }

    const formatDateTime = (dateTimeString: string): string => {
      const date = new Date(dateTimeString);
      const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // 使用 padStart 方法补零，并拼接成目标格式的字符串
      return `${month}-${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const getInfoId = () => {
      const url = window.location.pathname
      const parts = url.split("/")
      return parseInt(parts[parts.length - 1], 10);
    }
    const commented: CommentType = reactive({
      id: 0,
      comment: '',
      commentId: 0,
      commentName: '',
      commentedId: 0,
      commentedName: '',
      topId: 0,
      commentTime: '',
      isDelete: 0,
    });
    const dialogFormVisible = ref(false)
    const resend = (item: CommentType) => {
      dialogFormVisible.value = true
      commented.commentedId = item.commentId
      commented.commentedName = item.commentName
      commented.topId = item.topId || item.id
    }
    const sendCommented = () => {
      const body = {
        infoId: infoId.value,
        comment: resendComment.value,
        commentId: localStorage.getItem("userId"),
        commentName: localStorage.getItem("user"),
        commentedId: commented.commentedId,
        commentedName: commented.commentedName,
        topId: commented.topId
      }
      requestJWT.post("/sendComment", body).then((res) => {
        if (res.data.code === 200) {
          ElMessageBox.alert("评论成功", "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogFormVisible.value = false
            resendComment.value = ''
            getComment()
          })
          return
        } else {
          ElMessageBox.alert("网络错误", "注意", {
            confirmButtonText: "好的"
          }).then(() => {
            dialogFormVisible.value = false
          })
          return
        }
      })
    }

    onMounted(() => {
      infoId.value = getInfoId()
      getComment()
    })

    return {
      comment,
      topCommentList,
      handleSend,
      formatDateTime,
      dialogFormVisible,
      resend,
      resendComment,
      sendCommented,
    }
  }
})
</script>

<template>
  <div class="contain">
    <div class="comment-contain">
      <h4 class="comment-header">评论</h4>
      <div class="comment-input">
        <el-input v-model="comment" maxlength="100" class="comment" show-word-limit type="textarea"/>
      </div>
      <el-button type="primary" class="send" @click="handleSend">发送</el-button>
    </div>
    <div class="comment-text" v-for="(item, index) in topCommentList" :Key="index">
      <div class="comment-name" style="color: rgb(128,128,128);">{{ item.commentName }}</div>
      <div class="comment-content">{{ item.comment }}</div>
      <div class="comment-footer">
        <span class="comment-time" style="color: rgb(128,128,128);">{{ formatDateTime(item.commentTime) }}</span>
        <span class="comment-resend" @click="resend(item)">回复</span>
      </div>
      <div class="child-comment" v-for="(child, index) in item.childList" :Key="index">
        <div class="comment-header">
          <span>{{ child.commentName }}</span>
          <span style="color: rgb(128,128,128);">回复</span>
          <span>{{ child.commentedName }}</span>
        </div>
        <div class="comment-content">{{ child.comment }}</div>
        <div class="comment-footer">
          <span class="comment-time" style="color: rgb(128,128,128);">{{ formatDateTime(child.commentTime) }}</span>
          <span class="comment-resend" @click="resend(item)">回复</span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="回复" top="40vh" width="500">
      <el-input v-model="resendComment" maxlength="100" class="comment" show-word-limit type="textarea"/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="sendCommented">
            发送
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.comment-contain {
  height: 100%;
  margin-top: 10px;
  border-top: 1px solid gray;
  display: flex;
  flex-direction: column;

  .comment-header {
    margin-left: 10px;
  }

  .comment-input {
    display: flex;
    justify-content: center;
    align-items: center;

    .comment {
      width: calc(100% - 30px);
      margin: 0 auto;
    }

  }

  .send {
    align-self: flex-end;
    margin: 15px;
  }
}

.comment-text {
  margin: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;

  .comment-content {
    padding: 10px;
  }

  .comment-resend {
    margin-left: 30px;
    color: gray;

    &:hover {
      cursor: pointer;
    }
  }
}

.child-comment {
  margin: 10px 0 0 30px;

  .comment-header {
    span {
      margin-right: 10px;
    }
  }
}
</style>
