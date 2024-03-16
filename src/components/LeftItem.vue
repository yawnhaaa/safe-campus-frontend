<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestJWT } from '@/api/request'

export default defineComponent({
    name: "LeftItem",

    setup() {
        const hello = ref('666')
        const handleLike = () => {
            requestJWT.post('/login', hello).then((res) => {
                console.log(res)
            })
        }

        const handleCollect = () => {
            console.log("collect")
        }

        const handleComment = () => {
            console.log("comment")
        }

        const handleShare = () => {
            console.log("share")
        }

        return {
            handleLike,
            handleCollect,
            handleComment,
            handleShare,
        }
    }
})
</script>

<template>
    <div class="left-contain">
        <img src="../assets/icon/like.png" @click="handleLike" />
        <img src="../assets/icon/shoucang.png" @click="handleCollect" />
        <img src="../assets/icon/comment.png" @click="handleComment" />
        <img src="../assets/icon/fenxiang.png" @click="handleShare" />
    </div>
</template>

<style lang="scss" scoped>
.left-contain {
    width: 50px;
    height: 200px;
    position: absolute;
    top: 50px;
    left: calc(20vw - 80px);

    img {
        padding: 5px;
        width: 30px;
        height: 30px;
        margin-bottom: 30px;
        border: 1px solid gray;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
