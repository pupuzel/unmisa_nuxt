/**
 * 사용자 인증이 불필요한 공통 API
 */
export default function({ $axios }){
    return {
        // 운동 일기 리스트 조회
        SelectDiaryList(param){
            return $axios.post('/api/diary/selectDiaryList', param)
        },

        // 운동 일기 조회
        SelectDiary(param){
            return $axios.post('/api/diary/selectDiary', param)
        },

        // 운동 일기 댓글 리스트
        selectDiaryCmtList(param){
            return $axios.post('/api/diary/selectDiaryCmtList', param)
        },

        // 카테고리 조회
        selectCategoryList(param){
            return $axios.post('/api/common/selectCategoryList', param)
        },
    }
}