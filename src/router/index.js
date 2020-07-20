import Vue from 'vue'
import VueRouter from 'vue-router'
import ability from '../plugins/casl'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.VUE_APP_TRANSLATES_PUBLIC_PATH,
  routes,
  mode: process.env.VUE_APP_TRANSLATES_PUBLIC_PATH === '/' ? 'history' : 'hash'
})

router.beforeEach(async (to, from, next) => {
  if ((to.name === 'OAuth2RedirectHandler') && store.getters.authenticated) {
    // If login is not needed then redirect to home
    next({ name: 'Home' })
  } else {
    // Show login dialog if necessary
    if (!to.meta.allowAnonymous) {
      store.commit('setShowLogin', !store.getters.authenticated)
    }

    // Validate user permissions to have required route permissions
    store.commit('setHasAccess', ability.can('view', to.name))

    // Hide search from appbar by default
    store.commit('appBar/hideSearch')

    next()
  }
})

router.beforeResolve((to, from, next) => {
  store.commit('appBar/setTitle', to.meta.title)
  next()
})

export default router
