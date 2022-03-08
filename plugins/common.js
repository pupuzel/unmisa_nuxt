import Vue from 'vue'
import PortalVue from 'portal-vue'
import InfiniteLoading from "vue-infinite-loading";

// used PortalVue
Vue.use(PortalVue)

// used InfiniteLoading
Vue.use(InfiniteLoading, {
    slots: {
        noMore: ''
    },
    props: { spinner: "circles" },
});