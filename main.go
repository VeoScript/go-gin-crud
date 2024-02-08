package main

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
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

	// CORS Config...
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_ORIGIN_URL")},
		AllowMethods:     []string{"GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Content-Type, Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == os.Getenv("FRONTEND_ORIGIN_URL")
		},
		MaxAge: 12 * time.Hour,
	}))

	// Swagger Config...
	docs.SwaggerInfo.BasePath = "/api/v1"
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	v1 := router.Group("/api/v1")

	{
		routes.Users(v1.Group("/auth"))
		routes.Blogs(v1.Group("/blogs"))
	}

	router.Run()
}
