<template>
  <v-card class="my-2 py-1 px-2" max-width="600" elevation="3">
    <div class="ct-title">{{ title }}</div>
    <div class="ct-content">{{ info.diary_content }}</div>
    <div class="ct-tag-box">
      <v-chip v-if="info.diary_place" 
              class="font-8" 
              color="primary" 
              text-color="white" 
              label 
              small>
        <v-icon class="font-12" left>mdi-map-marker</v-icon>
        {{ info.diary_place }}
      </v-chip>
    </div>
    <div class="ct-footer">
      <div class="d-flex align-center">
        <VLike :on-like="LikeHit" :like-yn="info.like_yn"></VLike>
        <label class="font-bold">{{ info.diary_like_cnt }}명</label>이 좋아해요
      </div>
      <div class="d-flex align-center">
        <label class="font-weight-600 cursor" @click="MoveComment(info.diary_id)">댓글 {{ info.diary_cmt_cnt }}개</label>
      </div>
    </div>
  </v-card>
</template>

<script>
import MUtils from '@/mixins/MUtils.js'
import VLike from '@/components/VLike'
import authAPI from '@/api/authAPI'

export default {
  mixins: [MUtils],
  components: { VLike },
  props: {
    diary: Object
  },
  data() {
    return {
      info: this.diary
    }
  },
  computed: {
    title() {
      return this.createDatebar(this.info.diary_ymd)
            + ' ('
            + this.info.diary_day
            + ')' 
    }
  },
  methods: {
    async LikeHit(val) {
      if(val){
        this.info.diary_like_cnt += 1
      }else{
        this.info.diary_like_cnt -= 1
        if(this.info.diary_like_cnt < 0){
          this.info.diary_like_cnt = 0
        }
      }

      var param = { like_yn: val, diary_id: this.info.diary_id }
      const res = await authAPI(this).SaveDiaryLike(param)
    },

    MoveComment(id){
      this.$router.push(`/d/${id}`)
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