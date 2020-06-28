import Vue from 'vue'
import VueRouter from 'vue-router'
import ability from '../plugins/casl'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  if (((to.name === 'Login') || (to.name === 'OAuth2RedirectHandler')) && store.getters.authenticated) {
    // If login is not needed then redirect to home
    next({ name: 'Home' })
  } else if ((to.name === 'Login') && (!to.query.from)) {
    // If Login then add 'from' query param
    next({
      name: 'Login',
      query: {
        ...to.query,
        from: from.fullPath
      }
    })
  } else if (!to.meta.allowAnonymous && !store.getters.authenticated) {
    // If user is required but not found
    next({
      name: 'Login'
    })
  } else {
    // Validate user permissions to have required route permissions
    store.commit('setHasAccess', ability.can('view', to.name))
    next()
  }
})

router.beforeResolve((to, from, next) => {
  store.commit('appBar/setTitle', to.meta.title)
  next()
})

export default router
