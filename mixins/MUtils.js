import * as utils from '~/assets/js/utils';

export default {
    methods: {
        ...utils,

        MoveBack() {
            const size = window.history.length
            if(size <= 1){
                this.$router.replace('/')
            }else{
                window.history.back()
            }
        },

        DisableScroll(){
            document.body.classList.add("stop-scrolling");
        },

        EnableScroll(){
            document.body.classList.remove("stop-scrolling");
        }
    },
}