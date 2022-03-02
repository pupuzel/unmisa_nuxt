/**
 * 유저 관련 기본 API
 */
export default function({ $axios }){
    return {
        // 사용자 로그인
        UserLogin(param){
            return $axios.post('/api/authenticate/login', param)
        },

        // 사용자 회원가입
        UserJoin(param){
            return $axios.post('/api/authenticate/join', param)
        },

        // 사용자 로그아웃
        UserLogout(){
            return $axios.post('/api/authenticate/logout')
        },

        // 사용자이름 중복 체크
        CheckUserName(param){
            return $axios.post('/api/authenticate/checkName', param)
        },

        // 사용자 정보 조회
        SearchUserInfo(param){
            return $axios.post('/api/user/info', param)
        },
    }
}