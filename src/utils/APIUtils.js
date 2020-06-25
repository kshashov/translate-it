import { ACCESS_TOKEN } from '../constants'
import fetchClient from '../plugins/axios'

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('No access token set.'))
  }

  return fetchClient({
    url: '/api/users/me',
    method: 'GET'
  })
}
