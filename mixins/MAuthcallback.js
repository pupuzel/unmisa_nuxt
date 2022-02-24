export default {
    created() {
        const userState = this.$store.state.user.userState
        if(userState === 2){
            this.$router.replace({ path: '/auth/createProfile' })
        }else{
            this.$router.replace({ path: '/' })
        }
    },
}