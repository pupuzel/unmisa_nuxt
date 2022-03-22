<template>
  <div class="comm-overlay" @click.self="MoveBack">
    <v-card class="ct-box py-3 px-3 white" elevation="1">
      <!-- header -->
      <div class="ct-header">
        <div class="d-flex">
          <div class="ct-profile-img mr-2">
            <img :src="ProfileImg(user.user_profile_img)">
          </div>
          <div class="d-flex flex-column">
            <label class="font-weight-600">{{ user.user_nm }}</label>
            <label class="font-9 grey--text">{{ title }}</label>
          </div>
        </div>

        <v-divider class="my-2"></v-divider>
      </div>

      <!-- content -->
      <div class="ct-content">
        <pre class="">{{ diary.diary_content }}</pre>
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
      </div>

      <!-- footer -->
      <div class="ct-footer mt-1">
        <div class="d-flex align-center">
          <VLike :on-like="LikeHit" :like-yn.sync="diary.like_yn" :key="key"></VLike>
          <label class="font-bold">{{ diary.diary_like_cnt }}명</label>이 좋아해요
        </div>

        <div class="d-flex justify-center align-center mt-1">
          <v-text-field
            v-model="comment"
            maxlength="100"
            placeholder="댓글을 입력해 주세요"
            hide-details
            outlined
            dense
            @keyup.enter="CreateComment"
          ></v-text-field>
          <v-btn
            :disabled="!isCheckCreateComment"
            color="primary" 
            class="font-9 ml-2"
            @click="CreateComment">등록</v-btn>
        </div>
      </div>

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
        const diary = res.data.data.diary // 일기 data
        const user = res.data.data.user // 일기 작성자 data
        return { diary, user }
      }
    }else{
      redirect('/'); 
    }
  },

  data() {
    return {
      key: 1, // 일기 상세 페이지 keepalive 방지
      comment: '',
    }
  },

  computed: {
    title() {
      return this.createDatebar(this.diary.diary_ymd)
            + ' ('
            + this.diary.diary_day
            + ')' 
    },

    isCheckCreateComment(){
      const t = this.comment
      if(!!t && t.trim().length > 0){
        return true
      }else{
        return false
      }
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
     // 좋아요 클릭 이벤트
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

    // 댓글 작성
    async CreateComment(){
      if(this.isCheckCreateComment && this.$auth()){
        var param = { diary: { diary_id: this.diary.diary_id },
                      cmt_content: this.comment, 
                      cmt_depth: 0 }
        const res = await authAPI(this).CreateDiaryComment(param)
        console.log(res.data)
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.ct-box{display: flex; flex-direction: column; width: 600px; height:600px;}
.ct-header{display: flex; flex-direction: column;}
.ct-title{font-size:1rem; font-weight: 600; margin-bottom: 10px; margin-top:5px;}
.ct-content{
    flex:1; font-size:0.9rem; padding: 3px; overflow-y: scroll; -ms-overflow-style: none;
    &::-webkit-scrollbar{
      display: none;
      width: 0 !important;
    }
}
.ct-tag-box{margin-bottom: 10px;}
.ct-footer{display: flex; flex-direction: column; font-size:0.9rem;}

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