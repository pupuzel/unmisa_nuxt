<template>
  <div>
    <VDiaryContent></VDiaryContent>
  </div>
</template>

<script>
import commonAPI from '@/api/commonAPI'

export default {
  props: {
    userInfo: Object
  },

  fetch(){
    this.SelectDiaryList()
  },

  data() {
    return {
      diaryList: []
    }
  },
  methods: {
    async SelectDiaryList(){
      const param = { user: { user_id: this.userInfo.user_id } }
      const res = await commonAPI(this).SelectDiaryList(param)
      
    }
  },
}
</script>

<style lang="scss" scoped>

</style>