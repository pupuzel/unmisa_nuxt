import colors from 'vuetify/es5/util/colors'
import path from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-unmisa',
    title: 'nuxt-unmisa',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/css/common.scss',
    'animate.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js'},
    { src: '~/plugins/notify.js'},
    { src: '~/plugins/router.js'},
    { src: '~/plugins/common.js'},
    { src: '~/plugins/bus.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/components'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {
      target: "http://localhost:28301/",
      //pathRewrite: { "^/api/": "" }
    }
  },

  router: {
    scrollBehavior (to, from, savedPosition) {
      
    },
    extendRoutes (routes, resolve) {
      let userName = routes.find((route) => {
        return route.name === 'user-name'
      })

      userName.children.push({
          path: "/d/:id",
          component: resolve(__dirname, 'pages/user/name/d/_id.vue'),
          name: "user-diary-id"
      })
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    breakpoint: {
      mobileBreakpoint: 'sm'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.indigo.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  loading: {
    color: colors.indigo.darken1,
    height: '5px'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
