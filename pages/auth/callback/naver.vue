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

      const authenticate = await $axios.post('/api/authenticate/login', { code: query.code, auth_type: 'naver' })

      console.log(authenticate)

      // const param = {
      //     grant_type: 'authorization_code',
      //     client_id: '0dChYllU1ncvhUyN3E8R',
      //     client_secret: '1YSu8roSc8',
      //     code: query.code,
      // };
      
      // const queryString = await store.dispatch('queryString', param)

      // const tokenInfo = await $axios.post('https://nid.naver.com/oauth2.0/token?' + queryString, {})

      // const config = {
      //     headers: {
      //       'Authorization': `Bearer ${tokenInfo.data.access_token}`
      //     }
      // };

      // const userInfo = await $axios.post('https://openapi.naver.com/v1/nid/me', {}, config)
      // console.log(userInfo.data)

    },
}
</script>