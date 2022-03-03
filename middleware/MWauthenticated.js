export default function({ store, redirect }){
    //store.dispatch('nuxtServerInit')
    const userState = store.state.user.userState
    if(userState !== 1){
        redirect('/login')
    }
    
}