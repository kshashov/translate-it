export const API_BASE_URL = process.env.VUE_APP_TRANSLATES_API_BASE_URL
export const BASE_URL = process.env.VUE_APP_TRANSLATES_BASE_URL

export const ACCESS_TOKEN = 'accessToken'

export const OAUTH2_REDIRECT_URI = BASE_URL + '/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri='
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri='
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri='

export const permissions = {
  manageUsers: 'MANAGE_USERS',
  manageExercises: 'MANAGE_EXERCISES'
}
