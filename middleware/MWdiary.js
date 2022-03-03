import { removeDatebar, convertDateYYYYMMDD, dateDiff } from '@/assets/js/utils'
import authAPI from '@/api/authAPI'

export default async function({ app, redirect }){
    const diary_ymd = convertDateYYYYMMDD(new Date(), true)
    const api = await authAPI(app).CheckDiaryAvailable({ diary_ymd })

    if(api.data.result === 'N'){
        redirect('/')
    }
}