export const API_BASE_URL = process.env.VUE_APP_TRANSLATES_API_BASE_URL

export const BASE_URL = process.env.VUE_APP_TRANSLATES_BASE_URL

export const OAUTH2_REDIRECT_URI = BASE_URL + '/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri='
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri='

export const API_LANGS = 'api/langs'
export const API_TAGS = 'api/tags'
export const API_ROLES = 'api/roles'
export const API_USER_ANSWERS = 'api/userAnswers'

export const API_EXERCISES = '/api/exercises'
export const API_EXERCISES_PUBLIC = '/api/exercises/public'
export const API_EXERCISES_STATS = '/api/exercises/stats'
export const API_EXERCISE = '/api/exercises/:exerciseId'
export const API_EXERCISE_STEPS = '/api/exercises/:exerciseId/steps'

export const API_USERS = 'api/users'
export const API_USER = 'api/users/:userId'
export const API_ME = 'api/users/me'
export const API_USER_ROLE = 'api/users/:userId/role'
