<template>
  <v-layout column></v-layout>
</template>

<script>
export default {
  layout: 'login',
    async asyncData({ app, $axios, query, store, redirect }){

      if(!query.code){
        redirect('/login')
      }

      const authenticate = await $axios.post('/api/authenticate/login', { code: query.code, auth_type: 'google' })

      console.log(authenticate)

      // const param = {
      //     grant_type: 'authorization_code',
      //     client_id: '465273390522-0baktehtbn76l5fm67bjolv79bkoek4i.apps.googleusercontent.com',
      //     client_secret: 'dY8ZAAXO09VBT7hAxgBCxgSa',
      //     redirect_uri: 'http://127.0.0.1:3000/auth/callback/google',
      //     code: query.code,
      // };

      // const queryString = await store.dispatch('queryString', param)

      // const tokenInfo = await $axios.post('https://oauth2.googleapis.com/token?' + queryString, {})

      // // scope https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid
      
      // const config = {
      //     headers: {
      //       'Authorization': `Bearer ${tokenInfo.data.access_token}`
      //     }
      // };

      // const userInfo = await $axios.get('https://www.googleapis.com/oauth2/v2/userinfo', config)
      // console.log(userInfo.data)
    },
}
</script>