<template>
  <div>
  </div>
</template>

<script>
import userAPI from '@/api/userAPI'

export default {
  layout: 'LEmpty',
  async asyncData({ app, redirect }){
    if(process.server){
      await userAPI(app).UserLogout()
      redirect('/')
    }else{
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>