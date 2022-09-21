<template>
  <v-icon 
    @click="LikeChange"
    class="ct-like font-18 mr-1 cursor animate__animated" 
    :class="{ 'red--text text--lighten-2': likeYn,
              'animate__heartBeat': isAnimation }">
    mdi-heart
  </v-icon>
</template>

<script>
export default {
    props: {
        likeYn: Boolean,
        onLike: Function
    },

    data() {
        return {
            isAnimation: false 
        }
    },

    methods: {
        LikeChange() {
            if(this.$auth()){
                if(this.likeYn){
                    this.isAnimation = false
                    this.onLike(false)
                }else{
                    this.isAnimation = true
                    this.onLike(true)
                }
            }
        }
    },
}
</script>

<style lang="scss">
.ct-like{
    &:hover{
        //animation-name: pulse;
        opacity: 0.6;
    }
}
</style>