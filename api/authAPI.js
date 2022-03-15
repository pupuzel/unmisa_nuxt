/**
 * 사용자 인증이 필요한 공통 API
 */
export default function({ $axios }){
    return {
        CreateDiary(param){
            return $axios.post('/api/diary/create', param)
        },

        CheckDiaryAvailable(param){
            return $axios.post('/api/diary/checkAvailable', param)
        },

        SaveDiaryLike(param){
            return $axios.post('/api/diary/saveDiaryLike', param)
        },
    }
}