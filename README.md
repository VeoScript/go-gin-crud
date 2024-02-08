## Experimenting NextJS with Go/Gin/Gorm
A basic CRUD operation with cookie based Authentication.

## Client (React/NextJS)
- Step 1: `cd ./client`
- Step 2: `yarn install`
- Step 3: `yarn dev`

## API (Go/Gin)
You must create your database first and run the migration in migration folder. I am using PostgreSQL.

- Step 1: `cd ./api`
- Step 2: `go build`
- Step 3: `CompileDaemon -command="./go-gin-crud"`
- Step 4: Go to http://localhost:3333/api/v1/blogs/

> VEOSCRIPT
