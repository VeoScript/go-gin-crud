package main

import (
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/veoscript/go-gin-crud/docs"
	"github.com/veoscript/go-gin-crud/initializers"
	"github.com/veoscript/go-gin-crud/routes"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

// @title Go Gin CRUD API
// @version 1.0
// @description An API documentation for Practicing Go Gin framework by Veoscript.

// @host localhost:3333
func main() {
	router := gin.Default()

	docs.SwaggerInfo.BasePath = "/api/v1"
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	v1 := router.Group("/api/v1")

	{
		routes.Blogs(v1.Group("/blogs"))
	}

	router.Run()
}
