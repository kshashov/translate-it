import { API_BASE_URL, ACCESS_TOKEN, CURRENT_USER } from '../constants'

export const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (response.status === 401) {
          localStorage.removeItem(CURRENT_USER)
          // Alert.error('User is not found. Try to refresh the page or relogin to the app')
        } else if (response.status === 403) {
          // Alert.error('You have no permission to perform this action')
        }

        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
    )
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('No access token set.'))
  }

  return request({
    url: API_BASE_URL + '/api/users/me',
    method: 'GET'
  })
}
