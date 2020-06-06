import { API_BASE_URL, ACCESS_TOKEN, CURRENT_USER } from '../constants';
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if (response.status === 401) {
                localStorage.removeItem(CURRENT_USER);
                Alert.error('User is not found. Try to refresh the page or relogin to the app');
            } else if (response.status === 403) {
                Alert.error('You have no permission to perform this action');
            }

            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/users/me",
        method: 'GET'
    });
}

// export function login(loginRequest) {
//     return request({
//         url: API_BASE_URL + "/auth/login",
//         method: 'POST',
//         body: JSON.stringify(loginRequest)
//     });
// }
//
// export function signup(signupRequest) {
//     return request({
//         url: API_BASE_URL + "/auth/signup",
//         method: 'POST',
//         body: JSON.stringify(signupRequest)
//     });
// }