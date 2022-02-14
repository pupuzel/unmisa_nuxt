<template>
  <v-app>
    <v-app-bar
      height="60"
      elevation="1"
      color="white"
      fixed
      app
    >
      <div class="cp-toolbar-content">
        <!-- 로고 -->
        <h3 class="d-flex align-center mr-2">
          <nuxt-link to="/">{{ title }}</nuxt-link>
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
        <div v-if="userState === 1" class="d-flex align-end mr-5">
          <v-icon class="font-18 mr-2" color="black">mdi-bell</v-icon>
          <img class="ct-profile-img mr-1" src="/images/user_default.jpg" width="30" height="30">
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
        </div>
        <v-divider vertical class="mx-3"></v-divider>

        <!-- 로그인 or 로그아웃 버튼 -->
        <div>
          <template v-if="userState === 1">
              <v-btn tile color="primary" @click="logout">로그아웃</v-btn>
          </template>
          <template v-else>
              <v-btn tile color="primary" nuxt to="/login">로그인</v-btn>
          </template>
        </div>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: '운동에미친사람들',
    }
  },
  methods: {
    logout() {
      window.location.replace('/logout')
    }
  },
  computed: {
      ...mapState({ userState: state => state.user.userState,
                    userInfo: state => state.user.userInfo })
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.ct-authicon-img{margin-bottom: 5px; margin-left: 2px;}
.ct-profile-img{border-radius: 50%; border:1px solid map-get($grey, lighten-1); object-fit: cover;}
.cp-toolbar-content{display: flex; justify-content: center; align-content: center; width: 1120px; margin: 0 auto;}
.cp-search-bar{width: 400px;}
</style>