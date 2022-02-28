<template>
  <div>
  </div>
</template>

<script>
export default {
  layout: 'LEmpty',
  async asyncData({ env, $axios, redirect }){
    if(process.server){
      await $axios.post('/api/authenticate/logout')
      redirect('/')
    }else{
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>