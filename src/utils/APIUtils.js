import { ACCESS_TOKEN } from '../constants'
import fetchClient from '../plugins/axios'
import { API_ME } from '../constants/paths'

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('No access token set.'))
  }

  return fetchClient({
    url: API_ME,
    method: 'GET'
  })
}
