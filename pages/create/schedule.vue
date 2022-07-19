<template>
  <VCreateBox title="운동 메뉴 만들기">
    <v-form ref="form" v-model="isVaildForm">
    <v-row class="">

      <v-col cols="12" md="7">
        <v-select
          :rules="ruleCategory"
          :items="category"
          item-value="category_id"
          item-text="category_nm"
          outlined  
          dense
          label="카테고리"
        ></v-select>
        <v-text-field
          :rules="ruleTitle"
          class="ct-title-field"
          clearable
          placeholder="제목을 입력해 주세요"
          maxlength="50"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <div class="d-flex align-center">
            <v-btn large outlined>메뉴 합치기</v-btn>
            <div class="d-flex flex-column ml-5">
              <v-radio-group v-model="radioGroup">
                <v-radio
                  label="공개"
                  :value="0"
                ></v-radio>
                <v-radio
                  label="나만 보기"
                  :value="1"
                ></v-radio>
            </v-radio-group>
            </div>
        </div>
      </v-col>

    </v-row>
    </v-form>

    <div class="d-flex flex-column">
      <v-btn color="primary" class="mb-2" @click="save()">등록</v-btn>
    </div>
  </VCreateBox>
</template>

<script>
import MUtils from '@/mixins/MUtils'
import commonAPI from '@/api/commonAPI'

export default {
    layout({ store }){ store.commit('setLayout','emptyWhite') },
    middleware: ['MWauthenticated'],
    mixins: [MUtils],

    async asyncData({ app, redirect }){
        const res = await commonAPI(app).selectCategoryList({})
        const result = res.data.result

        if(result === 'N'){ 
          app.$notify.showMessage('서버오류: 카테고리 조회에 실패하였습니다')
          redirect('/'); 
        }else{
          const category = res.data.data // 카테고리 리스트
          return { category }
        }
    },

    mounted () {
      
    },
    data() {
      return {
        radioGroup: 0,
        isVaildForm: false,
        ruleTitle: [
            v => (!!v && v.trim().length > 0) || '필수입력 사항입니다',
            v => (!v || (!!v && !v.includes(' '))) || '공백을 포함할 수 없습니다',
        ],
        ruleCategory: [
            v => (!!v && v.trim().length > 0) || '필수선택 사항입니다',
        ],
      }
    },

    methods: {
      save(){
        if(this.$refs.form.validate()){
          //
        }
      }
    },
}
</script>

<style lang="scss" scoped>
.ct-title-field{
  
}


@include mobile {

}
</style>