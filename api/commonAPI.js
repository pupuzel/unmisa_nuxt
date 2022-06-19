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

        // 운동 일기 댓글 리스트
        selectDiaryCmtList(param){
            return $axios.post('/api/diary/selectDiaryCmtList', param)
        },
    }
}