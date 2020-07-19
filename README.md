[![Heroku](http://heroku-badge.herokuapp.com/?app=translate-it&svg=1)](https://translate-it.herokuapp.com)

# Translate-It

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

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Required environment variables
You can create `.env` file in root of the project and write any variables there.

The app required several variables to work properly:
```dotenv
# Address of the backend server. For example
TRANSLATES_API_BASE_URL=http://localhost:8084

# Address of the fronted server. For example
TRANSLATES_BASE_URL=http://localhost:3000
```

### CI/CD
* **Heroku** - deploying to [https://translate-it.herokuapp.com](https://translate-it.herokuapp.com)

