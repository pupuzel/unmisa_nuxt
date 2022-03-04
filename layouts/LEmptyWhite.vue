<template>
  <v-app>

    <v-main class="v-white-background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <VCommon></VCommon>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.cp-toolbar-content{display: flex; justify-content: center; align-content: center; width: 1120px; margin: 0 auto;}
.cp-search-bar{width: 400px;}
</style>