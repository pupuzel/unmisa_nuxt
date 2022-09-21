<template>
  <v-layout column></v-layout>
</template>

<script>
import MAuthcallback from '@/mixins/MAuthcallback.js'
import userAPI from '@/api/userAPI'

export default {
  mixins: [MAuthcallback],
  layout: 'login',
    async asyncData({ app, $axios, query, store, redirect }){
      if(!query.code){
        redirect('/login')
      }

      const param = { code: query.code, auto_login_yn: query.state === 'Y' ? true : false, auth_type: 'naver' }
      const response = await userAPI(app).UserLogin(param)

      const userInfo = response.data.data
      
      store.commit('user/setUserInfo', userInfo)
    },
}
</script>