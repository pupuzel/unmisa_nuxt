export const state = () => ({
    userState: 0, // 0: 비로그인 회원, 1: 로그인한 사용자, 2: 회원가입 필요 회원
    userInfo: null,
    joinInfo: null
  })
  
export const mutations = {
  // 회원가입 정보 초기화
  removeJoinInfo(state) {
    state.joinInfo = null
  },

  // 회원상태 변경
  setUserState(state, value){
    state.userState = value
  },

  // auth 로그인 이후 사용자 정보 set
  setAuthInfo(state, userInfo){
    if(userInfo.user_id === null){
      state.userState = 2
      state.joinInfo = userInfo
    }else{
      state.userState = 1
      state.userInfo = userInfo
    }
  }
}

export const actions = {
  checkName(context, user_nm) {
    return this.$axios.post('/api/authenticate/checkName', { user_nm })
  }
}