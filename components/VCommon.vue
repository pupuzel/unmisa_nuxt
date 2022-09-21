<template>
  <div>
    <v-snackbar v-model="isCheckToast" :timeout="3000" bottom>
      {{ toastMessage }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'showMessage') {
        this.toastMessage = state.toastMessage
        this.isCheckToast = true
      }
    })
  },

  data () {
    return {
      isCheckToast: false,
      toastMessage: '',
    }
  },
}
</script>

<style>

</style>