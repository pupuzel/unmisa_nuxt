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
        <h3 class="d-flex align-center mr-2">
          <nuxt-link to="/">{{title}}</nuxt-link>
        </h3>
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
        <v-divider vertical class="mx-3"></v-divider>
        <div>
          <v-btn tile color="primary">
            <label class="font-18">+</label>
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
          <v-btn tile color="primary" nuxt to="/login">로그인</v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: '운동에미친사람들'
    }
  }
}
</script>

<style lang="scss" scoped>
.cp-toolbar-content{display: flex; justify-content: center; align-content: center; width: 1120px; margin: 0 auto;}
.cp-search-bar{width: 400px;}
</style>