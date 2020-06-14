import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5C6BC0',
        secondary: '#424242',
        accent: '#fa4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#349037',
        warning: '#FFC107',
        background: '#fff'
      }
    }
  }
})
