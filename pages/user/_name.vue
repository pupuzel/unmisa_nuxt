<template>
    <v-row>
      <!-- 프로필 -->
      <v-col cols="12" md="3">

        <v-card class="py-3">
          <div class="ct-profile-box1">
            <div class="ct-profile-img px-2">
              <img :src="userInfo.user_profile_img" @error="errorImg">
            </div>
            <div class="ct-intro-box px-5">
              <span class="font-14 font-weight-600">{{userInfo.user_nm}}</span>
              <span class="font-9">{{userInfo.user_simple_intro}}</span>
            </div>
          </div>
        </v-card>

        <v-card class="mt-5">
          <!-- 구독 게시글 -->
          <div class="ct-profile-box2 d-flex py-2 grey--text text--darken-3">
            <div class="d-flex flex-column align-center width-per-50">
              <span>구독</span>
              <span class="mt-2 font-bold font-12">127</span>
            </div>
            <div class="d-flex flex-column align-center width-per-50">
              <span>게시글</span>
              <span class="mt-2 font-bold font-12">6</span>
            </div>
          </div>

          <!-- 부가정보 -->
          <div class="ct-profile-box3 d-flex flex-column">
            <span class="hidden-text">
              <v-icon>mdi-map-marker</v-icon>
              <label>{{ userInfo.user_area }}</label>
            </span>
            <span class="hidden-text">
              <v-icon>mdi-camera</v-icon>
              <a class="link-primary" :href="setHref(userInfo.user_sns)">{{ userInfo.user_sns }}</a>
            </span>
            <span class="hidden-text">
              <v-icon>mdi-web</v-icon>
              <a class="link-primary" :href="setHref(userInfo.user_site)">{{ userInfo.user_site }}</a>
            </span>
          </div>
        </v-card>

      </v-col>

      <!-- 컨텐츠 -->
      <v-col class="" md="9">
        <v-tabs class="mb-2" v-model="tab">
          <v-tab v-for="item in tabItems" :key="item.name" :href="'#'+item.name">
            <v-icon class="mr-2">mdi-clipboard-edit-outline</v-icon>
            {{item.text}}
          </v-tab>
        </v-tabs>

        <v-tabs-items touchless v-model="tab">
          <v-tab-item value="diary">
            <Vdiary/>
          </v-tab-item>
          <v-tab-item value="board">
            
          </v-tab-item>
          <v-tab-item value="menu">
            
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
</template>


<script>
import Vdiary from '@/components/Vdiary.vue';
import MUtils from '@/mixins/MUtils.js'

export default {
  mixins: [MUtils],
  components: { Vdiary },
  
  // 프로필 사용자 정보 조회(이름으로 조회)
  async asyncData({ params, redirect, $axios }){
    if(!params.name){ redirect('/'); return }
    
    const res = await $axios.post('/api/user/info', { user_nm: encodeURI(params.name) })
    const result = res.data.result

    if(result === 'N'){ redirect('/'); return }
      
    return { userInfo: res.data.data }

  },
  mounted () {

  },
  data() {
    return {
        tab: 'diary',
        tabItems: [{ name: 'diary', text: '운동 일기' },
                   { name: 'board', text: '게시글' },
                   { name: 'menu', text: '운동 메뉴' }],
    }
  },
  methods: {
    errorImg(img) {
      img.target.src = '/images/user_default.jpg'
    },
  },
  computed: {

  },
  watch: {

  },
}
</script>

<style lang="scss" scoped>
.ct-profile-box1{
  display: flex; flex-direction: column;
}
.ct-profile-box3{
  padding: 0px 5px;
  span{
    margin-bottom: 3px;
  }
}
.ct-profile-img{
  display: flex; justify-content: center; align-items: center;
  img{
    max-width: 100%; width: 230px; height: 230px; object-fit: cover; border-radius: 30px;
  }
}
.ct-intro-box{
  display:flex; flex-direction: column; margin-top: 10px;
  span:nth-child(1){
    margin-bottom: 5px;
  }
}


@include mobile {
  .ct-profile-box1{flex-direction: row;}
  .ct-profile-img {
    justify-content: flex-start;
    img{
      width: 100px;
      height: 100px;
    }
  }

}

</style>