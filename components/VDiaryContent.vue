<template>
  <v-card class="my-2 py-1 px-2" max-width="600" elevation="3">
    <div class="ct-title">{{ title }}</div>
    <pre class="ct-content">{{ diaryInfo.diary_content }}</pre>
    <div class="ct-tag-box">
      <v-chip v-if="diaryInfo.diary_place" 
              class="font-8" 
              color="primary" 
              text-color="white" 
              label 
              small>
        <v-icon class="font-12" left>mdi-map-marker</v-icon>
        {{ diaryInfo.diary_place }}
      </v-chip>
    </div>
    <div class="ct-footer">
      <div class="d-flex align-center">
        <VLike :on-like="LikeHit" :like-yn.sync="diaryInfo.like_yn"></VLike>
        <label class="font-bold">{{ diaryInfo.diary_like_cnt }}명</label>이 좋아해요
      </div>
      <div class="d-flex align-center">
        <NuxtLink class="font-weight-600 cursor" :to="'/d/'+diaryInfo.diary_id">댓글 {{ diaryInfo.diary_cmt_cnt }}개</NuxtLink>
      </div>
    </div>
  </v-card>
</template>

<script>
import MUtils from '@/mixins/MUtils.js'
import authAPI from '@/api/authAPI'

export default {
  mixins: [MUtils],
  props: {
    diary: Object
  },
  data() {
    return {
      diaryInfo: this.diary
    }
  },
  created () {
    this.$bus.diaryLikeHit(this.LikeHit)
  },
  beforeDestroy(){
    this.$bus.off('diaryLikeHit')
  },
  computed: {
    title() {
      return this.createDatebar(this.diaryInfo.diary_ymd)
            + ' ('
            + this.diaryInfo.diary_day
            + ')' 
    }
  },
  methods: {
    // 좋아요
    async LikeHit(val) {
      if(typeof val === 'boolean'){

        this.updateLikeHit(val)

        var param = { like_yn: val, diary_id: this.diaryInfo.diary_id }
        const res = await authAPI(this).SaveDiaryLike(param)

      }else{
        if(val.diary_id === this.diaryInfo.diary_id){
          this.updateLikeHit(val.like_yn)
        }
      }

    },

    updateLikeHit(val){
      if(val){
        this.diaryInfo.diary_like_cnt += 1
      }else{
        this.diaryInfo.diary_like_cnt -= 1
        if(this.diaryInfo.diary_like_cnt < 0){
          this.diaryInfo.diary_like_cnt = 0
        }
      }

      this.diaryInfo.like_yn = val
    }

  },
}
</script>

<style lang="scss" scoped>
.ct-title{font-size:1rem; font-weight: 600; margin-bottom: 10px; margin-top:5px;}
.ct-content{font-size:0.9rem; padding: 3px; white-space: pre-wrap;}
.ct-tag-box{margin-bottom: 10px;}
.ct-footer{display: flex; flex-direction: row; justify-content:space-between; margin-top:5px; font-size:0.9rem;}
</style>