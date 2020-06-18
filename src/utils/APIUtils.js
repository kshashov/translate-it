import { API_BASE_URL, ACCESS_TOKEN } from '../constants'
import { Alert } from './Utils'
import * as axios from 'axios'

const fetchClient = axios.create({
  baseURL: API_BASE_URL,
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Set the AUTH token for any request
fetchClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(ACCESS_TOKEN)
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default fetchClient

export const request = async (options) => {
  try {
    const response = await fetchClient(options)
    return response.data
  } catch (error) {
    if (!error.response) {
      Alert.error('Unexpected error. Try again later')
    } else {
      if (error.response.status === 401) {
        Alert.error('User not found. Try to refresh the page or relogin')
      } else if (error.response.status === 403) {
        Alert.error('You have no permission to perform this action')
      } else if (error.response.data.message) {
        Alert.error(error.response.data.message)
      } else {
        Alert.error('Unexpected error. Try again later')
      }
    }
    console.log(error)
    throw error
  }
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('No access token set.'))
  }

  return request({
    url: '/api/users/me',
    method: 'GET'
  })
}
