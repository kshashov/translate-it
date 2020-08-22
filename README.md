![GitHub Pages Deploy](https://github.com/kshashov/translate-it/workflows/GitHub%20Pages%20Deploy/badge.svg)

# Translate-It

[Online demo](https://kshashov.github.io/translate-it)

## Summary

This is a frontend part of the app. The backend code is located in the [repo](https://github.com/kshashov/Translates-Api).

The application is a simple analog of [writing section of Puzzle English](https://puzzle-english.com/writing/verb-tenses).

The main entities here are multi-phrase exercises. Users are supposed to solve these exercises by gradually translating each phrase from the source language to the target language.

Users with the required permissions can modify other's user roles, solve, create, modify and delete exercises.

### Technologies
* VueJS
    * Vuetify
    * Vuelidate
* CASL
* Axios

### CI/CD
* **GitHub Pages** - deploying to [https://kshashov.github.io/translate-it](https://kshashov.github.io/translate-it)

## Pages
### Login
![login](images/login.png "login")
### Exercises
![exercises](images/exercises.png "exercises")
### Exercise
![exercise](images/exercise.png "exercise")
### User Profile
![profile](images/profile.png "profile")
### Users Admin
#### Search
![admin-users](images/admin-users.png "admin-users")
#### Edit
![admin-users-edit](images/admin-users-edit.png "admin-users-edit")
### Exercises Admin
#### Search
![admin-exercies](images/admin-exercises.png "admin-exercies")
#### Create
![admin-exercies-create](images/admin-exercises-create.png "admin-exercies-create")
#### Edit
![admin-exercies-edit](images/admin-exercises-edit.png "admin-exercies-edit")
### Security
#### Login
If user is trying to open a non-public page. 
![security-login](images/security-login.png "security-login")
#### Forbidden
If user has no required permissions. 
![security-forbidden](images/security-forbidden.png "security-forbidden")

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Required environment variables
You can create `.env` file in root of the project and write any variables there.

The app required several variables to work properly:
```dotenv
# Address of the backend server. For example
VUE_APP_TRANSLATES_API_BASE_URL=http://localhost:8084

# Relative path for the frontend location. For example
VUE_APP_TRANSLATES_PUBLIC_PATH=/
```

In case the `VUE_APP_TRANSLATES_PUBLIC_PATH` path is `/`, the `history` router mode is used, otherwise the `hash`. 
