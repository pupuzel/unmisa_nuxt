export default ({ app, store, env }) => {
    app.router.beforeEach((to, from, next) => {
        if(from.name === 'user-name' && to.name === 'user-diary-id'){
            if(Object.keys(to.params).length < 2){
                next({ name: to.name, params: { ...to.params, ...from.params } })
            }else{
                next()
            }
        }else{
            next()
        }
    })
}