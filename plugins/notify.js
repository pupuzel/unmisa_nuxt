export default ({ app, store }, inject) => {
    inject('notify', {
        showMessage (message) {
          store.commit('showMessage', message)
        }
    })
}