<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestJWT } from '@/api/request'
import _ from 'lodash'; // 引入 lodash 库

export default defineComponent({
    name: "LeftItem",

    setup() {
        const hello = ref('666')
        const isLike = ref(false)
        const handleLike = () => {
            isLike.value = !isLike.value
            debouncedLike();
        }
        const callLike = () => {
            console.log('防抖')
            requestJWT.post('/login', hello).then((res) => {
                console.log(res)
            })
        }
        const debouncedLike = _.debounce(callLike, 1000); // 设置1秒的防抖时间

        const isCollect = ref(false)
        const handleCollect = () => {
            isCollect.value = !isCollect.value
            throttleCollect();
        }
        const callCollect = () => {
            console.log('节流')
        }
        const throttleCollect = _.throttle(callCollect, 1000);

        const handleComment = () => {
            console.log("comment")
        }

        const handleShare = () => {
            console.log("share")
        }

        return {
            isLike,
            isCollect,
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
        <img src="../assets/icon/like.png" @click="handleLike" :style="isLike ? 'background: red;' : '' "/>
        <img src="../assets/icon/shoucang.png" @click="handleCollect" :style="isCollect ? 'background: yellow;' : '' " />
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
