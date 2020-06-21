import store from '../store'

export function hasPermissions (user, permissions) {
  if (!permissions || permissions.length === 0) {
    return true
  }

  if (!user) {
    return false
  }

  return user && permissions.every(p => user.permissions.includes(p))
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
