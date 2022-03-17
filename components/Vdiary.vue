<template>
  <div>
    <template v-for="obj in diaryList">
      <VDiaryContent :key="obj.diary_id" :diary="obj"></VDiaryContent>
    </template>
    <client-only>
      <VlistLoading v-if="diaryList.length" class="ct-list-loading" @infinite="SelectDiaryList(true, $event)"></VlistLoading>
    </client-only>
  </div>
</template>

<script>
import VlistLoading from 'vue-infinite-loading'
import commonAPI from '@/api/commonAPI'
export default {
  props: {
    userInfo: Object
  },

  components: { VlistLoading },
  fetchOnServer: false,
  async fetch(){
    await this.SelectDiaryList()
  },

  data() {
    return {
      diaryList: []
    }
  },
  methods: {
     SelectDiaryList(isCheckPage, $state){
      const param = { user: { user_id: this.userInfo.user_id } }
      const lastObj = this.diaryList[this.diaryList.length - 1]

      if(isCheckPage){
        param.diary_id = lastObj.diary_id
      }

      return commonAPI(this).SelectDiaryList(param).then((res) => {
        if(res.data.result === 'Y'){
          if(isCheckPage){
            this.diaryList.push(...res.data.data)
          }else{
            this.diaryList = res.data.data
          }

          if($state){
            $state.loaded()
          }
         
        }else{
          if($state){
            $state.complete()
          }
        }
      })

    },

  },
}
</script>

<style lang="scss" scoped>
.ct-list-loading{ max-width: 600px;}
</style>