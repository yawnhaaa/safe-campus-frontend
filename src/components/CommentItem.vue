<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "CommentItem",

    setup() {
        const comment = ref('')
        const handleSend = () => {
            console.log('发送')
        }

        return {
            comment,
            handleSend,
        }
    }
})
</script>

<template>
    <div class="comment-contain">
        <h4 class="comment-header">评论</h4>
        <div class="comment-input">
            <el-input
                v-model="comment"
                maxlength="100"
                class="comment"
                show-word-limit
                type="textarea"
            />
        </div>
        <el-button type="primary" class="send" @click="handleSend">发送</el-button>
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
</style>
