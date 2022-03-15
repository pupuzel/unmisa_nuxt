<template>
  <v-app>
    <VTheHeader 
      v-show="layout === 'default'" 
      :user-info="userInfo" 
      :user-state="userState"></VTheHeader>

    <v-main :class="{'v-primary-background': layout !== 'emptyWhite',
                     'v-white-background': layout === 'emptyWhite'}">
      <v-container fluid>
        <Nuxt keep-alive :keep-alive-props="{ include: keepPageList }" />
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
                    userInfo: state => state.user.userInfo,
                    keepPageList: state => state.keepPageList,
                    layout: state => state.layout })
  }
}
</script>

<style lang="scss" scoped>

</style>