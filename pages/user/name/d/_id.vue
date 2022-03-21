<template>
  <div class="comm-overlay" @click.self="MoveBack">
    <v-card class="ct-box py-3 px-3 white" elevation="1">
      <!-- header -->
      <div class="d-flex">
        <div class="ct-profile-img mr-2">
          <img :src="ProfileImg(user.user_profile_img)">
        </div>
        <div class="d-flex flex-column">
          <label class="font-weight-600">{{ user.user_nm }}</label>
          <label class="font-10 grey--text">{{ title }}</label>
        </div>
      </div>

      <!-- content -->
      <div class="ct-content mt-3">{{ diary.diary_content }}</div>
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

      <!-- footer -->
      <div class="ct-footer">
        <div class="d-flex align-center">
          <VLike :on-like="LikeHit" :like-yn.sync="diary.like_yn" :key="key"></VLike>
          <label class="font-bold">{{ diary.diary_like_cnt }}명</label>이 좋아해요
        </div>
        <div class="d-flex align-center">
          <label class="font-weight-600">댓글 {{ diary.diary_cmt_cnt }}개</label>
        </div>
      </div>

      <!-- comment -->
    </v-card>
  </div>

</template>

<script>
import MUtils from '@/mixins/MUtils'
import commonAPI from '@/api/commonAPI'
import authAPI from '@/api/authAPI'
export default {
  mixins: [MUtils],

  // 운동 일기 조회
  async asyncData({ app, params, redirect }){
    if(params.id){
      const param = { diary_id: params.id }
      const res = await commonAPI(app).SelectDiary(param)
      const result = res.data.result

      if(result === 'N'){ 
        redirect('/'); 
      }else{
        const diary = res.data.data.diary
        const user = res.data.data.user
        return { diary, user }
      }
    }else{
      redirect('/'); 
    }
  },

  data() {
    return {
      key: 1
    }
  },

  activated(){
    this.DisableScroll()
    this.key++ 
  },
  deactivated () {
    this.EnableScroll()
  },

  methods: {
     async LikeHit(val) {
      if(val){
        this.diary.diary_like_cnt += 1
      }else{
        this.diary.diary_like_cnt -= 1
        if(this.diary.diary_like_cnt < 0){
          this.diary.diary_like_cnt = 0
        }
      }

      this.diary.like_yn = val

      var param = { like_yn: val, diary_id: this.diary.diary_id }
      const res = await authAPI(this).SaveDiaryLike(param)

      // 부모 router 알려주기
      this.$bus.diaryLikeHit(param)
      
    },
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
.ct-box{width: 600px; height:600px;}
.ct-title{font-size:1rem; font-weight: 600; margin-bottom: 10px; margin-top:5px;}
.ct-content{font-size:0.9rem; padding: 3px;}
.ct-tag-box{margin-bottom: 10px;}
.ct-footer{display: flex; flex-direction: row; justify-content:space-between; margin-top:5px; font-size:0.9rem;}

.ct-profile-img{
  display: flex; justify-content: center; align-items: center;
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  img{
     width: 100%; height: auto; object-fit: cover; border-radius: 50%;
  }
}

::v-deep .ct-dialog{
  max-width: 500px !important;
}

@include mobile{
  ::v-deep .ct-dialog{
    max-width: inherit !important
  }
}

</style>