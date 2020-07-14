import Vue from 'vue'
import { abilitiesPlugin } from '@casl/vue'
import { Ability, defineAbility } from '@casl/ability'
import { permissions } from '../constants/permissions'

const ability = new Ability()

/**
 * The convention to name abilities is:
 * - CRUD (create, read, update, delete) - for models. For example `can('read', 'User')`,
 * - 'view' for pages. For example `cannot('view', 'admin')`
 *   To determine 'view' name please visit config/router/index
 *
 * @param user
 */
export const definePermissions = (user) => {
  const has = perm => !!user.permissions.includes(perm)

  const rules = defineAbility((can, cannot) => {
    can('view', 'Home')
    can('view', 'Login')
    can('view', 'OAuth2RedirectHandler')
    can('view', 'NotFound')
    can('view', 'Exercise')

    // First time the user is 'null' and then it always an object.
    if (user) {
      cannot('view', 'Login')
      can('view', 'Logout')
      can('view', 'Profile')

      if (has(permissions.solveExercises)) {
        can('solve', 'Exercise')
      }

      if (has(permissions.manageUsers)) {
        can('view', 'Admin')
        can('view', 'UsersAdmin')
      }

      if (has(permissions.manageExercises)) {
        can('view', 'Admin')
        can('view', 'ExercisesAdmin')
        can('view', 'ExerciseEdit')
      }
    }
  }).rules

  ability.update(rules)
}

const guest = null

// For the first time we've define abilities for non-authenticated user.
definePermissions(guest)

Vue.use(abilitiesPlugin, ability)

export default ability
