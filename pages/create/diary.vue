<template>
  <VCreateBox title="일기 작성">
      <div class="ct-date-title">{{ dateTitle }}</div>
      <v-btn 
        plain 
        v-show="!isPlace" 
        @click="isPlace = true">+ 운동 장소 추가하기</v-btn>

      <v-text-field
        class="ct-place-field"
        v-show="isPlace" 
        placeholder="@운동 장소를 입력해주세요"
        maxlength="20"
        dense
        hide-details 
        outlined></v-text-field>

      <v-textarea
        outlined
        counter
        maxlength="500"
        auto-grow
        rows="10"
        row-height="30"
        placeholder="일기 내용을 입력해주세요"
        :rules="rules"></v-textarea>

      <div class="d-flex flex-column align-center">
        <v-btn large color="primary" class="width-fit mb-2 font-12">등록하기</v-btn>
      </div>
  </VCreateBox>
</template>

<script>
import VCreateBox from '@/components/VCreateBox.vue'
import MUtils from '@/mixins/MUtils'

export default {
    layout: 'LEmptyWhite',
    middleware: 'authenticated',
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
      }
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