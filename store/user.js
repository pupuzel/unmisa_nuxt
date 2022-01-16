export const state = () => ({
    userState: 0, // 0: 비로그인 회원, 1: 로그인한 사용자, 2: 회원가입 필요 회원
    userInfo: null,
    joinInfo: null
  })
  
export const mutations = {
  removeJoinInfo(state) {
    state.joinInfo = null
  },
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
  updateValue({ commit }, payload) {
    commit('updateValue', payload);
  }
}