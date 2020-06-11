import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound'
import Login from '../views/Login'
import OAuth2RedirectHandler from '../views/OAuth2RedirectHandler'
import Profile from '../views/Profile'
import store from '../store/'
import Forbidden from '../views/Forbidden'
import Users from '../views/Users/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true,
      title: 'Home'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      allowAnonymous: false,
      title: 'My profile'
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      allowAnonymous: false,
      permissions: ['MANAGE_USERS'],
      title: 'Users'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      allowAnonymous: true,
      title: 'Login'
    }
  },
  {
    path: '/oauth2/redirect',
    name: 'OAuth2RedirectHandler',
    component: OAuth2RedirectHandler,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      allowAnonymous: true,
      title: 'Page not found'
    }
  }
]

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
    store.commit('validatePermissions', to.meta.permissions)
    next()
  }
})

export default router
