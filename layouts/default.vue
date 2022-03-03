<template>
  <v-app>

    <VHeader :userInfo="userInfo" :userState="userState"></VHeader>

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
import VHeader from '@/components/VTheHeader.vue';
import VCommon from '@/components/VCommon.vue'
export default {
  components: { VHeader, VCommon },
  computed: {
      ...mapState({ userState: state => state.user.userState,
                    userInfo: state => state.user.userInfo })
  }
}
</script>

<style lang="scss" scoped>

</style>