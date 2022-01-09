<template>
  <v-layout column></v-layout>
</template>

<script>
export default {
  layout: 'login',
   async asyncData({ app, $axios, query, store, redirect }){

      if(query.error === 'login_required'){
        redirect('https://kauth.kakao.com/oauth/authorize?client_id=865a4e3f0990f09ca5780259fd6d8687&redirect_uri=http://127.0.0.1:3000/auth/callback/kakao&response_type=code')
      }else if(query.error){
        redirect('/login')
      }else if(!query.code){
        redirect('/login')
      }

      const authenticate = await $axios.post('/api/authenticate/login', { code: query.code, auth_type: 'kakao' })

      console.log(authenticate)

      // const config = {
      //     headers: {
      //       'Content-type': 'applicat  ion/x-www-form-urlencoded;charset=utf-8',
      //       'Authorization': 'Bearer '
      //     }
      // };
      // const param = {
      //     grant_type: 'authorization_code',
      //     client_id: '865a4e3f0990f09ca5780259fd6d8687',
      //     redirect_uri: 'http://127.0.0.1:3000/auth/callback/kakao',
      //     code: query.code,
      // };

      // const queryString = await store.dispatch('queryString', param)

      // try {
      //   const tokenInfo = await $axios.post('https://kauth.kakao.com/oauth/token?' + queryString, {}, config)

      //   config.headers.Authorization += tokenInfo.data.access_token

      //   const userInfo = await $axios.post('https://kapi.kakao.com/v2/user/me', {}, config)

      //   const info = {
      //     id: userInfo.data.id,
      //     access_token: tokenInfo.data.access_token,
      //     auth_type: 'kakao',
      //     age: userInfo.data.kakao_account.age_range,
      //     gender: userInfo.data.kakao_account.gender,
      //     nick_name: userInfo.data.properties.nickname,
      //     profile_image: userInfo.data.properties.profile_image,
      //   }

      //   const authenticate = await $axios.post('http://localhost:7000/authenticate/login', info)
      //   if(authenticate.data.result === 'Y'){
      //     redirect('/')  
      //   }else{
      //     console.log(authenticate.data.message)
      //     redirect('/error/401')
      //   }

      // } catch (e) {
      //   console.log(e)
      //   redirect('/')
      // }
    
    },
}
</script>