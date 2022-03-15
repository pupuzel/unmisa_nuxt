<template>
    <div class="d-flex flex-column align-center ma-auto">
      <h1 class="mt-15">로그인</h1>
      <v-row class="align-center">
        <v-icon class="font-30 grey--text text--lighten-1">mdi-alert-circle</v-icon>
        <label class="font-8 grey--text text--darken-1">
            <span class="grey--text text--darken-4 font-bold">운미사</span>는 회원가입 없이 소셜 로그인으로 이용할 수 있어요
        </label>
      </v-row>
      <div class="cp-login-box white">
        <v-btn tile class="cp-login-btn-kakao" @click="Login('kakao')">
         <img class="cp-login-btn-icon" src="/icon/icon_kakao.png">
         <label>카카오로 계속하기</label>
        </v-btn>
        <v-btn tile class="cp-login-btn-naver" @click="Login('naver')">
         <img class="cp-login-btn-icon" src="/icon/icon_naver.png">
         <label>네이버로 계속하기</label>
        </v-btn>          
        <v-btn tile outlined class="cp-login-btn-google" @click="Login('google')">
         <img class="cp-login-btn-icon" src="/icon/icon_google.png">
         <label>구글로 계속하기</label>
        </v-btn>
        <div class="d-flex justify-start" style="width:350px;">
          <v-checkbox
            v-model="autoLogin"
            dense
            label="로그인 유지"
          ></v-checkbox>
        </div>
        <v-divider class="my-5 width-per-90"></v-divider>
        <div class="d-flex font-8 width-per-90">
          <a>이용약관</a>
          <v-spacer></v-spacer>
          <a>개인정보 처리지침</a>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  layout({ store }){ store.commit('setLayout','empty') },
  mounted () {
   
  },
  data() {
    return {
      autoLogin: false
    }
  },
  computed: {

  },
  methods: {
    Login(type){
      const autoLogin = this.autoLogin ? 'Y' : 'N'

      if(type === 'kakao'){
        window.location.href = 'https://kauth.kakao.com/oauth/authorize'
                          + '?client_id=2cb8c9ef012ae465cdbfbf9a91d2d58f'
                          + '&redirect_uri=http://127.0.0.1:3000/auth/callback/kakao'
                          + '&response_type=code'
                          + '&prompt=none'
                          + `&state=${autoLogin}`
      }else if(type === 'naver'){
        window.location.href = 'https://nid.naver.com/oauth2.0/authorize'
                          + '?client_id=0dChYllU1ncvhUyN3E8R'
                          + '&redirect_uri=http://127.0.0.1:3000/auth/callback/naver'
                          + '&response_type=code'
                          + `&state=${autoLogin}`
      }else if(type === 'google'){
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth'
                          + '?client_id=465273390522-0baktehtbn76l5fm67bjolv79bkoek4i.apps.googleusercontent.com'
                          + '&redirect_uri=http://127.0.0.1:3000/auth/callback/google'
                          + '&response_type=code'
                          + `&state=${autoLogin}`
                          + '&scope=email profile https://www.googleapis.com/auth/profile.agerange.read';
      }
      
    }
  },
  watch: {

  },
}
</script>

<style lang="scss" scoped>
.cp-login-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-top: 30px;
  padding-top: 40px;
  padding-bottom: 20px;

  button{ width: 350px; margin: 5px 0px;}
}

.cp-login-btn-icon{
  margin: 0px 10px;
  height: 20px;
  width: auto;
}

.cp-login-btn-kakao{background: $color-kakao !important;}
.cp-login-btn-naver{background: $color-naver !important; color: white;}
.cp-login-btn-google{background: $color-google !important;}
</style>