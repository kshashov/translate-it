import store from '../store'
import { forEach } from 'lodash'

export const resolve = (path, args) => {
  let build = path
  forEach(args, (val, key) => {
    build = build.replace(`:${key}`, val)
  })
  return build
}
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
