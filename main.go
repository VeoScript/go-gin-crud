package main

import (
	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/controllers"
	"github.com/veoscript/go-gin-crud/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()
	r.POST("/blogs", controllers.BlogsCreate)
	r.Run()
}
