export default ({ app, store }, inject) => {
    inject('bus', {
      // VUserNameDId --> VDiaryContent
      diaryLikeHit(val) {
          if(typeof val === 'function'){
            $nuxt.$on('diaryLikeHit', val)
          }else{
            $nuxt.$emit('diaryLikeHit', val)
          }
      },

      off(EventBus){
        $nuxt.$off(EventBus)
      }
    })

}