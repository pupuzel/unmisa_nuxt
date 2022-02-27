<template>
  <v-card class="my-2 py-1 px-2" max-width="600" elevation="3">
    <div class="ct-title">2021-06-03 (수)</div>
    <div class="ct-content">오늘 부상 당함 ㅠㅠ</div>
    <div class="ct-tag-box">
      <v-chip class="font-8" color="primary" text-color="white" label small>
        <v-icon class="font-12" left>mdi-map-marker</v-icon>
        크로스핏 팬덤
      </v-chip>
    </div>
    <div class="ct-footer">
      <div class="d-flex align-center">
        <v-icon class="font-18 mr-1">mdi-heart</v-icon>
        <label class="font-bold">12명</label>이 좋아해요
      </div>
      <div class="d-flex align-center">
        <label class="font-weight-600">댓글 15개</label>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.ct-title{font-size:1rem; font-weight: 600; margin-bottom: 10px; margin-top:5px;}
.ct-content{font-size:0.9rem; padding: 3px;}
.ct-tag-box{margin-bottom: 10px;}
.ct-footer{display: flex; flex-direction: row; justify-content:space-between; margin-top:5px; font-size:0.9rem;}
</style>