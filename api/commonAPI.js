/**
 * 사용자 인증이 불필요한 공통 API
 */
export default function({ $axios }){
    return {
        SelectDiaryList(param){
            return $axios.post('/api/diary/selectDiaryList', param)
        },

        SelectDiary(param){
            return $axios.post('/api/diary/selectDiary', param)
        },

    }
}