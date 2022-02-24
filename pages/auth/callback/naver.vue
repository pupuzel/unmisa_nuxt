<template>
  <v-layout column></v-layout>
</template>

<script>
import MAuthcallback from '@/mixins/MAuthcallback.js'

export default {
  mixins: [MAuthcallback],
  layout: 'login',
    async asyncData({ app, $axios, query, store, redirect }){
      if(!query.code){
        redirect('/login')
      }

      const response = await $axios.post('/api/authenticate/login', { code: query.code, auto_login_yn: query.state === 'Y' ? true : false, auth_type: 'naver' })
      const userInfo = response.data.data
      
      store.commit('user/setUserInfo', userInfo)
    },
}
</script>