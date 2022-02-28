<template>
  <div class="create-box">

    <!-- head -->
    <div class="create-box-head">
      <div class="create-box-head-content">
        <v-icon @click="MoveBack" class="create-box-back">mdi-arrow-left</v-icon>
        <label class="create-box-title">{{ title }}</label>
      </div>
    </div>

    <!-- body -->
    <div class="create-box-body">
        <slot></slot>
    </div>


  </div>
</template>

<script>
export default {
    props: {
        title: String
    },

    methods: {
        MoveBack() {
            const size = window.history.length
            if(size <= 1){
                this.$router.replace('/')
            }else{
                window.history.back()
            }
        }
    },
}
</script>

<style>

</style>