<template>
  <VCreateBox title="운동 메뉴 만들기">
     
  </VCreateBox>
</template>

<script>
import { mapState } from 'vuex'
import MUtils from '@/mixins/MUtils'
import authAPI from '@/api/authAPI'

export default {
    layout({ store }){ store.commit('setLayout','emptyWhite') },
    middleware: ['MWauthenticated'],
    mixins: [MUtils],
    mounted () {
      
    },
    data() {
      return {

      }
    },

    computed: {
        ...mapState({ userInfo: state => state.user.userInfo })
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
.ct-place-field{
  max-width: 350px;
  margin-bottom: 3px;
}

.ct-date-title{
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

@include mobile {
  .ct-place-field{
    max-width: 100%;
  }
}
</style>