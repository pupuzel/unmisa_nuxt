<template>
  <v-layout column></v-layout>
</template>

<script>
import MAuthcallback from '@/mixins/MAuthcallback.js'
import userAPI from '@/api/userAPI'

export default {
  mixins: [MAuthcallback],
  layout: 'login',
  async fetch({ app, store, query, redirect }){
      if(query.error === 'login_required'){
        redirect('https://kauth.kakao.com/oauth/authorize?client_id=865a4e3f0990f09ca5780259fd6d8687&redirect_uri=http://127.0.0.1:3000/auth/callback/kakao&response_type=code')
      }else if(query.error){
        redirect('/login')
      }else if(!query.code){
        redirect('/login')
      }
      const param = { code: query.code, auto_login_yn: query.state === 'Y' ? true : false, auth_type: 'kakao' }
      const response = await userAPI(app).UserLogin(param)

      const userInfo = response.data.data
      
      store.commit('user/setUserInfo', userInfo)
    
  },
}
</script>