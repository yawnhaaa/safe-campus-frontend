<script lang="ts">
import { defineComponent } from 'vue';
import '../styles/page.scss'
import { useDark } from '@vueuse/core'

export default defineComponent({
    name: 'LearnPage',

    setup() {
        const isDark = useDark();

        return {
            isDark,
        }

    }
})
</script>

<template>
    <div class="page-contain">
        <h1>激情答题区</h1>
        <div class="answer-contain">
            <div class="answer-area" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
                <div class="answer-topic">
                    <span style="color: orange;">单选</span>
                    <span>题目：阿豪帅不帅？</span>
                </div>
                <div class="answer-content">

                </div>
            </div>
            <div class="analysis-area">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    margin-left: 10px;
}

.answer-contain {
    width: calc(100% - 20p);
    height: 800px;
    margin: 10px;
    border: 1px solid gray;
    border-radius: 5px;

    .answer-area {
        width: calc(100% - 20px);
        height: 400px;
        margin: 10px;
        border-radius: 5px;

        .answer-topic {
            padding-top: 20px;
            font-size: 28px;
            text-align: center;

            span {
                padding: 10px;
            }
        }
    }
}

</style>
