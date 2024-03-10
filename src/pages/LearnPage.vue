<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../styles/page.scss'
import { useDark } from '@vueuse/core'

export default defineComponent({
    name: 'LearnPage',

    setup() {
        type ContentType = {
            id: string;
            content: string;
            isChecked: boolean;
            isTrue: boolean;
        }
        type TopicType = {
            id: string;
            type: string;
            title: string;
            analysis: string;
            isSubmit: boolean;
            content: ContentType[]
        }

        const isDark = useDark();
        const topicList = ref<TopicType[]>([
            {
                id: '0',
                type: '0',
                title: '阿豪帅不帅',
                analysis: '单选题解析',
                isSubmit: false,
                content: [
                    {
                        id: '0',
                        content: '帅',
                        isChecked: false,
                        isTrue: false,
                    },
                    {
                        id: '1',
                        content: '很帅',
                        isChecked: false,
                        isTrue: false,
                    },
                    {
                        id: '2',
                        content: '特别帅',
                        isChecked: false,
                        isTrue: true,
                    },
                ],
            },
            {
                id: '1',
                type: '1',
                title: '阿豪帅不帅',
                analysis: '多选题解析',
                isSubmit: false,
                content: [
                    {
                        id: '0',
                        content: '帅',
                        isChecked: false,
                        isTrue: true,
                    },
                    {
                        id: '1',
                        content: '很帅',
                        isChecked: false,
                        isTrue: true,
                    },
                    {
                        id: '2',
                        content: '特别帅',
                        isChecked: false,
                        isTrue: true,
                    },
                    {
                        id: '3',
                        content: '巨无敌帅',
                        isChecked: false,
                        isTrue: true,
                    },
                ],
            }
        ])
        const checkItem = (item: ContentType) => {
            item.isChecked = !item.isChecked;
        }
        const dynamicStyles = (item: ContentType) => {
            if (topicList.value[topicIndex.value].isSubmit) {
                return {
                    background: isDark.value ? (item.isTrue ? '#69E667' : '#EB6969') : (item.isTrue ? '#69E667' : '#EB6969')
                };
            } else {
                return {
                    background: isDark.value ? (item.isChecked ? 'orange' : 'black') : (item.isChecked ? 'orange' : 'white')
                };
            }
        }
        const topicIndex = ref(0)
        const previousTopic = () => {
            if (topicIndex.value !== 0) {
                topicIndex.value -= 1
                analysisButton.value = true
                analysisVisible.value = false
            }
        }
        const nextTopic = () => {
            if (topicIndex.value !== topicList.value.length - 1) {
                topicIndex.value += 1
                analysisButton.value = true
                analysisVisible.value = false
            }
        }
        const submitTopic = () => {
            topicList.value[topicIndex.value].isSubmit = true
        }

        const analysisButton = ref(true)
        const analysisVisible = ref(false)
        const handleAnalysis = () => {
            analysisButton.value = false
            analysisVisible.value = true
        }

        return {
            isDark,
            topicList,
            checkItem,
            dynamicStyles,
            topicIndex,
            previousTopic,
            nextTopic,
            submitTopic,
            analysisButton,
            analysisVisible,
            handleAnalysis,
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
                    <span style="color: orange;">{{ topicList[topicIndex].type == '0' ? '单选' : '多选' }}</span>
                    <span>题目：{{ topicList[topicIndex].title }}</span>
                </div>
                <div class="answer-content">
                    <div class="answer-item" 
                        v-for="item in topicList[topicIndex].content" 
                        :key="item.id" 
                        :style="dynamicStyles(item)"
                        @click="checkItem(item)"
                    >
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="answer-button">
                <el-button :disabled="topicIndex === 0" @click="previousTopic">上一题</el-button>
                <el-button :disabled="topicIndex === topicList.length - 1" @click="nextTopic">下一题</el-button>
                <el-button @click="submitTopic">提交</el-button>
            </div>
            <div class="analysis-area" :style="{ background: isDark ? '#333333' : '#ECECEC' }">
                <p @click="handleAnalysis" v-if="analysisButton">点击展示解析</p>
                <p v-show="analysisVisible">hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
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

    .answer-content {

        .answer-item {
            padding: 20px;
            margin: 20px;
            text-align: center;
            border-radius: 20px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .answer-button {
        text-align: center;
    }

    .analysis-area {
        width: calc(100% - 20px);
        min-height: 200px;
        margin: 10px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            word-wrap: break-word;
            width: 90%;
        }
    }
}

</style>
