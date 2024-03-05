<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage'
})
</script>

<template>
  <div class="page-contain">
    <div class="info-contain">
      <div class="info-text">
        <div class="text-title">这里是资讯标题</div>
        <div class="text-content">这这里是文章内容的简略展示这里是文章内容的简略展示这里是文章内容的简略展示这里是文章内容的简略展示这里是文章内容的简略展示这里是文章内容的简略展示里是文章内容的简略展示</div>
        <span class="text-author">作者阿豪</span>
        <span class="text-like">点赞：467</span>
      </div>
      <div class="info-img">
        <img v-if="true" src="../../public/logo.png" style="width: 108px; height: 72px;"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-contain {
  margin: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid white;

  .info-text {
    flex: 1;
    width: 300px;

    .text-title {
      font-weight: bold;
      font-size: 18px;
    }

    .text-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 10px 0;
      font-size: 14px;
    }

    .text-author {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid gray;
    }
  }

  .info-img {
    align-self: center;
    margin-left: auto;
  }
}
</style>
