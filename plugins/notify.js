export default ({ app, store }, inject) => {
    inject('notify', {
        showMessage (message) {
          store.commit('showMessage', message)
        }
    })

    inject('auth', (message) => {
      if(store.state.user.userState !== 1){ // 로그인 사용자가 아니면
        if(message){
          store.commit('showMessage', message)
        }else{
          store.commit('showMessage', '로그인을 먼저 해주세요')
        }
      }else{
        return true
      }
      
    })
}