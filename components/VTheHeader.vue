<template>
    <v-app-bar
      height="60"
      elevation="1"
      color="white"
      fixed
      app
    >
      <div class="cp-toolbar-content">
        <!-- 로고 -->
        <h3 class="d-flex align-center mr-5">
          <nuxt-link class="link-primary" to="/">{{ title }}</nuxt-link>
        </h3>

        <!-- 검색바 -->
        <div class="cp-search-bar d-flex justify-center align-center">
          <v-text-field
            placeholder="검색할 내용을 입력해주세요"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            outlined
            dense
          ></v-text-field>
        </div>

        <v-spacer></v-spacer>

        <!-- 로그인 사용자 정보 -->
        <div v-if="userState === 1" class="d-flex align-end mr-1">

          <!-- 글 추가 -->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
              class="font-20 mr-5 cursor" 
              color="grey darken-3"
              v-bind="attrs"
              v-on="on">mdi-plus-box-multiple-outline</v-icon>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="MoveCreate('board')">게시글 작성</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="MoveCreate('diary')"> 일기 쓰기</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="MoveCreate('menu')">운동 메뉴 만들기</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- 알람 아이콘 -->
          <v-icon class="font-18 mr-2 cursor" color="black">mdi-bell</v-icon>

          <!-- 프로필 아이콘 -->
          <div class="d-flex align-end cursor" @click="MoveProfile">
            <img class="ct-profile-img mr-1" src="/images/user_default.jpg" width="30" height="30">
<!--             
            <label class="font-8 font-bold-700">{{ userInfo.user_nm}}</label>
            <template v-if="userInfo.oauth_type === 'kakao'">
              <img class="ct-authicon-img" src="/icon/icon_kakao.png" width="15" height="15">
            </template>
            <template v-else-if="userInfo.oauth_type === 'naver'">
              <img class="ct-authicon-img" src="/icon/icon_naver.png" width="15" height="15">
            </template>
            <template v-else-if="userInfo.oauth_type === 'google'">
              <img class="ct-authicon-img" src="/icon/icon_google.png" width="15" height="15">
            </template> 
-->

          </div>
        </div>
        <v-divider vertical class="mx-3"></v-divider>

        <!-- 로그인 or 로그아웃 버튼 -->
        <div>
          <template v-if="userState === 1">
              <v-btn tile color="primary" @click="Logout">로그아웃</v-btn>
          </template>
          <template v-else>
              <v-btn tile color="primary" nuxt to="/login">로그인</v-btn>
          </template>
        </div>
      </div>
    </v-app-bar>  
</template>

<script>
import MUtils from '@/mixins/MUtils.js'
import authAPI from '@/api/authAPI'
export default {
  mixins: [MUtils],
  props: {
      userState: Number,
      userInfo: Object
  },
  data () {
    return {
      title: '운동에미친사람들',
    }
  },

  methods: {
    // 사용자 로그아웃
    Logout() {
      window.location.replace('/logout')
    },

    // 사용자 프로필 이동
    MoveProfile(){
      this.$router.push('/user/' + this.userInfo.user_nm)
    },

    // 타입별 글쓰기(게시글,일기,메뉴) 이동 
    async MoveCreate(type){
      if(!this.userInfo){ this.$router.push('/login') }

      // 일기는 하루에 한번만 작성가능 체크
      if(type === 'diary'){
        const diary_ymd = this.convertDateYYYYMMDD(new Date(), true)
        const api = await authAPI(this).CheckDiaryAvailable({ diary_ymd })
        
        if(api.data.result === 'Y'){
          this.$router.push('/create/' + type)
        }else{
          this.$notify.showMessage('일기는 하루에 한번 작성 가능합니다')
        }
      }else if(type === 'board'){
        //
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.ct-authicon-img{margin-bottom: 5px; margin-left: 2px;}
.ct-profile-img{border-radius: 50%; border:1px solid map-get($grey, lighten-1); object-fit: cover;}
.cp-toolbar-content{display: flex; justify-content: center; align-content: center; width: 1120px; margin: 0 auto;}
.cp-search-bar{width: 400px;}
</style>