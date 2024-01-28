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
	r.GET("/blogs", controllers.GetBlogs)
	r.GET("/blogs/:id", controllers.GetBlogById)
	r.POST("/blogs", controllers.CreateBlog)
	r.Run()
}
