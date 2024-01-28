package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/controllers"
)

func Blogs(route *gin.RouterGroup) {
	route.GET("/", controllers.GetBlogs)
	route.GET("/:id", controllers.GetBlogById)
	route.POST("/", controllers.CreateBlog)
}
