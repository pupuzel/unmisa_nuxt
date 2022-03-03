<template>
  <VCreateBox title="일기 작성">
      <div class="ct-date-title">{{ dateTitle }}</div>
      <v-btn 
        plain 
        v-show="!isPlace" 
        @click="isPlace = true">+ 운동 장소 추가하기</v-btn>

      <v-text-field
        v-model="diaryInfo.diary_place"
        class="ct-place-field"
        v-show="isPlace" 
        placeholder="@운동 장소를 입력해주세요"
        maxlength="20"
        dense
        hide-details 
        outlined></v-text-field>

      <v-textarea
        v-model="diaryInfo.diary_content"
        outlined
        counter
        maxlength="500"
        auto-grow
        rows="10"
        row-height="30"
        placeholder="일기 내용을 입력해주세요"
        :rules="rules"></v-textarea>

      <div class="d-flex flex-column align-center">
        <v-btn 
          large 
          color="primary" 
          class="width-fit mb-2 font-12"
          @click="Create">등록하기</v-btn>
      </div>
  </VCreateBox>
</template>

<script>
import { mapState } from 'vuex'
import VCreateBox from '@/components/VCreateBox.vue'
import MUtils from '@/mixins/MUtils'
import authAPI from '@/api/authAPI'

export default {
    layout: 'LEmptyWhite',
    middleware: ['MWauthenticated','MWdiary'],
    mixins: [MUtils],
    components: { VCreateBox },
    mounted () {
      this.setDateTitle()
      this.jobInterval = setInterval(this.setDateTitle, 1000)
    },
    destroyed () {
      clearInterval(this.jobInterval)
    },
    data() {
      return {
        jobInterval: null,
        dateTitle: null,
        isPlace: false,
        rules: [
            v => !v || (!!v && v.length <= 500) || '최대 500자 입력가능',
        ],
        diaryInfo: {},
      }
    },

    computed: {
        ...mapState({ userInfo: state => state.user.userInfo })
    },
    methods: {
      setDateTitle() {
        var date = new Date()
        this.dateTitle = this.convertDateYYYYMMDD(date)
                         + '('
                         + this.convertDateDay(date)
                         + ')'
                         + ' '
                         + this.convertDateHHMISS(date)
      },

      async Create(){
        const date = new Date()

        this.diaryInfo.diary_ymd = this.convertDateYYYYMMDD(date, true)
        this.diaryInfo.diary_day = date.getDay()

        const response = await authAPI(this).CreateDiary(this.diaryInfo)
        if(response.data.result === 'Y'){
          this.$router.replace('/user/' + this.userInfo.user_nm)
        }else{
          this.$notify.showMessage(response.data.message)
        }
      }
    },
}
</script>

<style lang="scss" scoped>
.ct-place-field{
  max-width: 350px;
  margin-bottom: 3px;
}

.ct-date-title{
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

@include mobile {
  .ct-place-field{
    max-width: 100%;
  }
}
</style>