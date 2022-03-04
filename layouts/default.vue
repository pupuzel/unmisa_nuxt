<template>
  <v-app>

    <VTheHeader :userInfo="userInfo" :userState="userState"></VTheHeader>

    <v-main class="v-primary-background">
      <v-container fluid>
        <Nuxt/>
      </v-container>
    </v-main>
    
    <VCommon></VCommon>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
      ...mapState({ userState: state => state.user.userState,
                    userInfo: state => state.user.userInfo })
  }
}
</script>

<style lang="scss" scoped>

</style>