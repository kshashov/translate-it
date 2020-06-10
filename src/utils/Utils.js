import store from '../store'

export function hasRoutePermissions (user, route) {
  if (!user) {
    return false
  }

  const permissions = route.meta.permissions
  return !permissions || permissions.every(p => user.permissions.includes(p))
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
