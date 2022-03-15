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
import MUtils from '@/mixins/MUtils'
export default {
    mixins: [MUtils],
    props: {
        title: String
    },
}
</script>

<style>

</style>