<template>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="ma-auto px-5" max-width="600">
          <div class="d-flex justify-center font-15 font-bold pa-5">
            <label>SNS 로그인 계정설정</label>
          </div>
          <v-divider class="pb-5"></v-divider>

          <v-form ref="form" v-model="isVaildForm">
            <!-- 프로필 이미지 -->
            <div class="d-flex flex-column">
              <label class="font-bold">프로필 이미지</label>
              <div class="d-flex">
                <img class="ct-profile-img mr-3" ref="profileThumbnailImg" src="/images/user_default.jpg" width="200" height="200">
                <div class="d-flex flex-column font-8">
                  <input type="file" ref="upImgFile" accept="image/png, image/jpeg, image/jpg" style="display:none;" @change="uploadImgCallback()">
                  <v-btn color="grey darken-3" class="mb-2 white--text" @click="uploadImg()">이미지 변경</v-btn>
                  <label class="grey--text text--darken4">추천 사이즈 600px*600px<br>jpg,jpeg,png 최대 파일크기 10MB</label>
                </div>
              </div>
            </div>

            <!-- 사용자 이름 -->
            <div class="d-flex flex-column">
              <label class="font-bold">사용자 이름<label class="red--text font-12">*</label></label>
              <v-text-field
                @blur="checkName"
                @focus="isCheckName = true"
                v-model="joinInfo.user_nm"
                clearable
                counter
                :rules="ruleUserName"
                maxlength="20"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- 한줄 소개 -->
            <div class="d-flex flex-column">
              <label class="font-bold">한줄 소개</label>
              <v-text-field
                v-model="joinInfo.user_simple_intro"
                clearable
                maxlength="30"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- 지역 -->
            <div class="d-flex flex-column">
              <label class="font-bold">지역</label>
              <v-text-field
                v-model="joinInfo.user_area"
                clearable
                maxlength="20"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- SNS -->
            <div class="d-flex flex-column">
              <label class="font-bold">SNS</label>
              <v-text-field
                v-model="joinInfo.user_sns"
                clearable
                maxlength="200"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- 웹사이트 -->
            <div class="d-flex flex-column">
              <label class="font-bold">웹사이트</label>
              <v-text-field
                v-model="joinInfo.user_site"
                clearable
                maxlength="200"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- 이벤트 혹은 서비스에 관한 이메일 수신 여부 -->
            <div class="d-flex flex-column">
              <label class="font-bold">이벤트 혹은 서비스에 관한 이메일 수신 여부</label>
              <v-radio-group v-model="joinInfo.email_yn" row>
                <v-radio
                  label="네"
                  :value="true"
                ></v-radio>
                <v-radio
                  label="아니요"
                  :value="false"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-form>

          <div class="d-flex flex-column">
            <v-btn color="primary" class="mb-2" @click="join()">계정 설정을 완료하고 로그인</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
</template>


<script>
import * as common from '~/assets/js/common';

export default {
  asyncData({ store, redirect }){
    // UserState 비회원으로 초기화
    store.commit('user/setUserState', 0)

    // 회원가입 정보 가져오기
    const joinInfo = store.state.user.joinInfo
    if(joinInfo === null) { redirect('/login') }

    // 회원가입 정보 return
    store.commit('user/removeJoinInfo')
    return { joinInfo: common.clone(joinInfo) }
  },

  watch: {

  },
  
  data() {
    return {
      isCheckName: true,
      isVaildForm: false,
      ruleUserName: [
          v => (!!v && v.trim().length > 0) || '필수입력 사항입니다',
          v => (!v || (!!v && !v.includes(' '))) || '공백을 포함할 수 없습니다',
          v => this.isCheckName || '이미 사용중인 이름입니다'
      ],
    }
  },

  computed: {

  },
  methods: {
    uploadImg(){
      this.$refs.upImgFile.click()
    },

    // 프로필 사진 썸네일 set
    uploadImgCallback(){
        const _this = this
        let fileInfo = _this.$refs.upImgFile.files[0];
        let reader = new FileReader();

        reader.onload = function() {
            _this.$refs.profileThumbnailImg.src = reader.result;
            const base64img = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");

            _this.joinInfo.user_profile_img = base64img
            _this.joinInfo.user_profile_img_type = fileInfo.type
        };

        if(fileInfo) {
          if(fileInfo.type === 'image/jpeg' || fileInfo.type === 'image/png'){
            reader.readAsDataURL(fileInfo);
          }
        }
    },

    // 닉네임 중복 체크
    checkName(){
      const _this = this
      const userNm = this.joinInfo.user_nm

      if(!userNm){ return }

      this.$store.dispatch('user/checkName', userNm).then((response) => {
        const data = response.data
        if(data.result === 'Y'){
          _this.isCheckName = true
        }else{
          _this.isCheckName = false
        }

        _this.$refs.form.validate()
      })
    },

    // 회원가입
   async join(){
      if(this.$refs.form.validate()){
          const response = await this.$axios.post('/api/authenticate/join', this.joinInfo)
          console.log(response)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
  .ct-profile-img{border-radius: 20px; border:1px solid map-get($grey, lighten-3); object-fit: cover;}
</style>