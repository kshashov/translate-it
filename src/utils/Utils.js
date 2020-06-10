
export function hasPermissions (store, router) {
  if (!store.state.user) {
    return false
  }

  const permissions = router.currentRoute.meta.permissions
  return !permissions || permissions.every(p => store.state.user.permissions.includes(p))
}
