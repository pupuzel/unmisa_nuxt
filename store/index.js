export const state = () => ({ 
    layout: 'default',
    toastMessage: '',
    menuList: ['헬스 · 다이어트',
            '필라테스 · 요가',
            '크로스핏 · 역도',
            '맨몸운동 · 체조',
            '수영 · 수상레저',
            '스키 · 스노보드',
            '배드민턴 · 테니스 · 탁구',
            '태권도 · 복싱 · MMA',
            '주짓수 · 유도 · 레슬링',
            '등산 · 클라이밍',
            '축구 · 농구 · 야구',
            '골프 · 당구',
            '자전거 · 스케이트보드'],
    keepPageList: ['pages/index.vue',
                   'pages/user/_name.vue'],
             
})

export const mutations = { 
    showMessage(state,message){
        state.toastMessage = message;
    },

    setLayout(state,name){
        state.layout = name;
    },
}

export const actions = { 
    async nuxtServerInit(storeContext, { $axios , store }){
        const response = await $axios.post('/api/user/session')
        const userInfo = response.data.data
        if(userInfo){
            store.commit('user/login', userInfo)
        }else{
            store.commit('user/logout')
        }
    }
}

