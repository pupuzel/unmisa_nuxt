<template>
    <v-dialog
      content-class="ct-dialog"
      v-model="dialog"
      scrollable
      persistent
      :transition="false"
      :fullscreen="$vuetify.breakpoint.mobile"
      @click:outside="MoveBack"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import MUtils from '@/mixins/MUtils'
export default {
  mixins: [MUtils],
  asyncData({ params }){
    //console.log(params)
  },
  mounted () {
    this.DisableScroll()
  },
  destroyed () {
    this.EnableScroll()
  },
  data() {
    return {
      dialog: true
    }
  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
::v-deep .ct-dialog{
  max-width: 500px !important;
}

@include mobile{
  ::v-deep .ct-dialog{
    max-width: inherit !important
  }
}

</style>