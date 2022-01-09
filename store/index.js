export const state = () => ({ 
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
            '자전거 · 스케이트보드'] 
})

export const mutations = { 
    test(state) { 
        
    },

}

export const actions = { 
    queryString(context, param){
        return Object.keys(param)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
        .join('&');
    }
}

