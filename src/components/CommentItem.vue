<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { request, requestJWT } from '@/api/request'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
    name: "CommentItem",

    setup() {
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
        }
        const comment = ref('')
        const commentList = ref<CommentType[]>([]);
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
                console.log(res)
            })
        }

        const getComment = () => {
            request.get('/getComment/' + infoId.value).then((res) => {
                if(res.data.code === 200) {
                    const newComments = res.data.data;
                    newComments.sort((a: CommentType, b: CommentType) => new Date(b.commentTime).getTime() - new Date(a.commentTime).getTime());
                    commentList.value = newComments
                    console.log(commentList.value)
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
            const formattedDateTime = `${month}-${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            return formattedDateTime;
        }

        const getInfoId = () => {
            const url = window.location.pathname
            const parts = url.split("/")
            return parseInt(parts[parts.length - 1], 10);
        }
        
        onMounted(() => {
            infoId.value = getInfoId()
            getComment()
        })

        return {
            comment,
            commentList,
            handleSend,
            formatDateTime,
        }
    }
})
</script>

<template>
    <div class="contain">
        <div class="comment-contain">
            <h4 class="comment-header">评论</h4>
            <div class="comment-input">
                <el-input v-model="comment" maxlength="100" class="comment" show-word-limit type="textarea" />
            </div>
            <el-button type="primary" class="send" @click="handleSend">发送</el-button>
        </div>
        <div class="comment-text" v-for="(item, index) in commentList" :Key="index">
            <div class="comment-name">{{ item.commentName }}</div>
            <div class="comment-content">{{ item.comment }}</div>
            <div class="comment-footer">
                <span class="comment-time">{{ formatDateTime(item.commentTime) }}</span>
                <span class="comment-resend" @click="resend">回复</span>
            </div>

        </div>
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
</style>
