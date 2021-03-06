import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-popperjs/dist/vue-popper.css'

Vue.config.productionTip = false

// Load user on page load
const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})
Vue.prototype.$eventBus = vue
vue.$mount('#app')
