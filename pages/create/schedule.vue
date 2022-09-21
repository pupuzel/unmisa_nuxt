<template>
  <VCreateBox title="운동 메뉴 만들기">
    <v-form ref="form" v-model="isVaildForm">
    <v-row class="">

      <v-col cols="12" md="7">
        <v-select
          v-model="scheduleObj.category.category_id"
          :rules="ruleCategory"
          :items="category"
          item-value="category_id"
          item-text="category_nm"
          outlined  
          dense
          label="카테고리"
        ></v-select>
        <v-text-field
          v-model="scheduleObj.schedule_title"
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
              <v-radio-group v-model="scheduleObj.open_yn">
                <v-radio
                  label="공개"
                  :value="true"
                ></v-radio>
                <v-radio
                  label="나만 보기"
                  :value="false"
                ></v-radio>
            </v-radio-group>
            </div>
        </div>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12">
        <v-simple-table class="jock">
          <thead>
            <tr>
              <th class="text-center primary white--text">
                요일
              </th>
              <th class="text-center primary white--text">
                부위
              </th>
              <th class="text-center primary white--text">
                운동
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val,idx) in days" :key="idx"> <!-- 요일 -->
              <td class="text-center">{{val}}</td>
              <td class="text-center">
                <v-textarea
                  v-model="scheduleObj[`target_day${idx+1}`]"
                  no-resize
                  hide-details
                  outlined
                  rows="3"
                  ></v-textarea>
              </td>
              <td class="text-center">
                <v-textarea
                  v-model="scheduleObj[`workout_day${idx+1}`]"
                  no-resize
                  hide-details
                  outlined
                  rows="3"
                  ></v-textarea>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>

    </v-form>

    <div class="d-flex flex-column mt-10">
      <v-btn color="primary" class="mb-2" @click="save()">등록</v-btn>
    </div>
  </VCreateBox>
</template>

<script>
import { mapState } from 'vuex'
import MUtils from '@/mixins/MUtils'
import commonAPI from '@/api/commonAPI'
import authAPI from '@/api/authAPI'

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

    data() {
      return {
        days: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
        scheduleObj: {
          category: { category_id: null },
          schedule_title: null,
          schedule_comment: null,
          open_yn: true,
          target_day1: null,
          target_day2: null,
          target_day3: null,
          target_day4: null,
          target_day5: null,
          target_day6: null,
          target_day7: null,
          workout_day1: null,
          workout_day2: null,
          workout_day3: null,
          workout_day4: null,
          workout_day5: null,
          workout_day6: null,
          workout_day7: null,
        },
        isVaildForm: false,
        ruleTitle: [
            v => (!!v && v.trim().length > 0) || '필수입력 사항입니다',
            v => (!v || (!!v && !v.includes(' '))) || '공백을 포함할 수 없습니다',
        ],
        ruleCategory: [
            v => (!!v) || '필수선택 사항입니다',
        ],
      }
    },

    computed: {
        ...mapState({ userInfo: state => state.user.userInfo })
    },

    methods: {
      save(){
        const _this = this

        if(this.$refs.form.validate()){
          authAPI(this).createSchedule(this.scheduleObj).then((res) => {
            if(res.data.result === 'Y'){
              window.location.replace('/user/' + _this.userInfo.user_nm);
            }else{
              _this.$notify.showMessage(response.data.message)
            }
          })
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