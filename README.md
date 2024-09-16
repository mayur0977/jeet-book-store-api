# Getting Started with NodeJs, Express and MongoDB

Do `npm install` after clone/download the code.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\

Open postman and add url [http://localhost:3001](http://localhost:3001) or [http://127.0.0.1:3001/api/](http://127.0.0.1:3001/api/) to access the APIs.

## Folder and Files

- **controllers**: - Controllers handle the application's logic by processing incoming requests and sending responses. Each controller typically corresponds to a specific route or resource.
- **models**: - Models represent the data structures and schema of your application. They interact with the database to perform CRUD (Create, Read, Update, Delete) operations.
- **routes**: - This directory contains route files that define the endpoints of your application. Each route file typically corresponds to a specific set of related routes, such as user routes, product routes, etc.
- **utils**: - this folder contain all the shared business login like common API Features, appError handling, handle async error handling.
