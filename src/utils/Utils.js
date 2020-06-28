import store from '../store'

export const Alert = {
  error (text) {
    store.dispatch('snack/setError', { text: text })
  },
  info (text) {
    store.dispatch('snack/setInfo', { text: text })
  },
  success (text) {
    store.dispatch('snack/setSuccess', { text: text })
  }
}
