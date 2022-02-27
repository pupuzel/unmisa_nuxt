<template>
  <v-app>

    <v-main class="v-primary-background">
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