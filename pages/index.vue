<template>
    <v-row class="">
      <!-- 컨텐츠 -->
      <v-col cols="12" md="8">

        <v-row>
          <!-- 득근 베스트 -->
          <v-col cols="12">
            <div class="d-flex font-12">
              <v-icon>mdi-arm-flex</v-icon>
              <label>득근 베스트</label>
            </div>

            <v-card outlined tile>
              <v-list dense flat>
                <v-list-item-group>
                  <template v-for="item in 5">
                  <v-list-item :key="item" dense class="cp-list-item d-flex align-center font-all-8" :class="{'mt-2':item!=1}">
                    <v-chip small label class="mr-2">크로스핏 · 역도</v-chip>
                    <label>스내치 동작 하는법</label>
                    <v-spacer/>
                    <v-icon>mdi-thumb-up-outline</v-icon>
                    <label>18</label>
                  </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>

          </v-col>

          <!-- 카테고리 -->
          <v-col cols="12" md="6" v-for="(item,idx) in menuList" :key="idx">
            <div class="d-flex font-12">
              <v-icon>mdi-arm-flex</v-icon>
              <label>{{item}}</label>
              <v-spacer/>
              <span>목록 ></span>
            </div>

            <v-card outlined tile>
              <v-list dense flat>
                <v-list-item-group>
                  <template v-for="item in 5">
                  <v-list-item :key="item" dense class="cp-list-item d-flex align-center font-all-8" :class="{'mt-2':item!=1}">
                    <label>살어떻게 뺴야 할까요 ㅠ</label>
                    <v-spacer/>
                    <label>43분 전</label>
                  </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

        </v-row>

      </v-col>

      <!-- 광고 박스 -->
      <v-col class="d-none d-md-block" md="4">
        <v-card height="700"></v-card>
      </v-col>
    </v-row>
</template>


<script>
export default {
  data() {
    return {
      device: 'W'
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menuList
    }
  },
  watch: {
    '$vuetify.breakpoint.mobile'(newValue, oldValue) {
      //console.log(newValue)
    }
  },
}
</script>

<style lang="scss" scoped>
.cp-list-item{min-height: initial !important;}
</style>