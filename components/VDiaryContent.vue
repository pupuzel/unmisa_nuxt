<template>
  <v-card class="my-2 py-1 px-2" max-width="600" elevation="3">
    <div class="ct-title">{{ title }}</div>
    <div class="ct-content">{{ diary.diary_content }}</div>
    <div class="ct-tag-box">
      <v-chip v-if="diary.diary_place" 
              class="font-8" 
              color="primary" 
              text-color="white" 
              label 
              small>
        <v-icon class="font-12" left>mdi-map-marker</v-icon>
        {{ diary.diary_place }}
      </v-chip>
    </div>
    <div class="ct-footer">
      <div class="d-flex align-center">
        <v-icon class="font-18 mr-1">mdi-heart</v-icon>
        <label class="font-bold">{{ diary.diary_like_cnt }}명</label>이 좋아해요
      </div>
      <div class="d-flex align-center">
        <label class="font-weight-600">댓글 {{ diary.diary_cmt_cnt }}개</label>
      </div>
    </div>
  </v-card>
</template>

<script>
import MUtils from '@/mixins/MUtils.js'
export default {
  mixins: [MUtils],
  props: {
    diary: Object
  },
  computed: {
    title() {
      return this.createDatebar(this.diary.diary_ymd)
            + ' ('
            + this.diary.diary_day
            + ')' 
    }
  },
}
</script>

<style lang="scss" scoped>
.ct-title{font-size:1rem; font-weight: 600; margin-bottom: 10px; margin-top:5px;}
.ct-content{font-size:0.9rem; padding: 3px;}
.ct-tag-box{margin-bottom: 10px;}
.ct-footer{display: flex; flex-direction: row; justify-content:space-between; margin-top:5px; font-size:0.9rem;}
</style>