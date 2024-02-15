# NODE.JS CRUD API

## Description

Implemented a simple CRUD api for work with users using in-memory database underneath.

## Easy to use:
- Download project files (project located in *crud-api* branch)
- Go to project root directory
- Run `npm install`

## Pre-defined npm scripts:
+ `npm run start:dev` -> The application is run in development mode using nodemon
+ `npm run start:prod` -> The application is run in production mode (runs the build process and then runs the bundled file)
+ `npm run test` -> Tests are launched. The tests run when the server is running.

## Application functionality:
Implemented endpoint `api/users`:
- **GET** `api/users` is used to get all persons
   - Server should answer with `status code` **200** and all users records
- **GET** `api/users/${userId}`
   - Server should answer with `status code` **200** and and record with `id === userId` if it exists
   - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
   - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
   - Server should answer with `status code` **201** and newly created record
   - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/${userId}` is used to update existing user
   - Server should answer with `status code` **200** and updated record
   - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
   - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/${userId}` is used to delete existing user from database
   - Server should answer with `status code` **204** if the record is found and deleted
   - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
   - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
