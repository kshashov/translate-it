import Home from '../views/home/Home'
import Profile from '../views/profile/Profile'
import Exercise from '../views/exercise/Exercise'
import UsersAdmin from '../views/admin/users/UsersAdmin'
import ExercisesAdmin from '../views/admin/exercises/ExercisesAdmin'
import OAuth2RedirectHandler from '../views/OAuth2RedirectHandler'
import NotFound from '../views/NotFound'
import ExerciseEdit from '../views/exercise/edit/ExerciseEdit'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true,
      title: 'Translates'
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
    component: Exercise,
    props: true,
    meta: {
      title: 'Exercise'
    }
  },
  {
    path: '/exercises/:id/edit',
    name: 'ExerciseEdit',
    component: ExerciseEdit,
    props: true,
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
    component: ExercisesAdmin,
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
