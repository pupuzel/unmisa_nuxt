<template>
  <v-layout column></v-layout>
</template>

<script>
import auth from '~/mixins/authcallback.js'

export default {
  mixins: [auth],
  layout: 'login',
  async fetch({ store, $axios, query, redirect }){

      if(query.error === 'login_required'){
        redirect('https://kauth.kakao.com/oauth/authorize?client_id=865a4e3f0990f09ca5780259fd6d8687&redirect_uri=http://127.0.0.1:3000/auth/callback/kakao&response_type=code')
      }else if(query.error){
        redirect('/login')
      }else if(!query.code){
        redirect('/login')
      }

      const response = await $axios.post('/api/authenticate/login', { code: query.code, auth_type: 'kakao' })
      const userInfo = response.data.data
      
      store.commit('user/setAuthInfo', userInfo)
    
  },
}
</script>