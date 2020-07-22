import Vue from 'vue'
import VueRouter from 'vue-router'
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
    store.dispatch('authorize', to)

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
