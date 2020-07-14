import Home from '../views/home/Home'
import Profile from '../views/profile/Profile'
import Exercise from '../views/exercise/Exercise'
import UsersAdmin from '../views/admin/users/UsersAdmin'
import ExercisesAdmin from '../views/admin/exercises/ExercisesAdmin'
import OAuth2RedirectHandler from '../views/OAuth2RedirectHandler'
import NotFound from '../views/NotFound'
import ExerciseEdit from '../views/exercise/edit/ExerciseEdit'
import ExercisesAdminAppBar from '../views/admin/exercises/ExercisesAdminAppBar'
import ExerciseEditAppBar from '../views/exercise/edit/ExerciseEditAppBar'
import ExerciseAppBar from '../views/exercise/ExerciseAppBar'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'My profile'
    }
  },
  {
    path: '/exercises/:id',
    name: 'Exercise',
    props: {
      default: true,
      appBarAppend: true
    },
    components: {
      default: Exercise,
      appBarAppend: ExerciseAppBar
    },
    meta: {
      allowAnonymous: true,
      title: 'Exercise'
    }
  },
  {
    path: '/exercises/:id/edit',
    name: 'ExerciseEdit',
    props: {
      default: true,
      appBarAppend: true
    },
    components: {
      default: ExerciseEdit,
      appBarAppend: ExerciseEditAppBar
    },
    meta: {
      title: 'Edit Exercise'
    }
  },
  {
    path: '/admin/users',
    name: 'UsersAdmin',
    component: UsersAdmin,
    meta: {
      title: 'Users'
    }
  },
  {
    path: '/admin/exercises',
    name: 'ExercisesAdmin',
    components: {
      default: ExercisesAdmin,
      appBarAppend: ExercisesAdminAppBar
    },
    meta: {
      title: 'Exercises'
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
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      allowAnonymous: true,
      title: 'Page not found'
    }
  }
]
