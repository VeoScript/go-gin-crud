package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/controllers"
	"github.com/veoscript/go-gin-crud/middlewares"
)

func Blogs(route *gin.RouterGroup) {
	route.GET("/all", middlewares.RequireAuth, controllers.GetBlogs)
	route.GET("/:id", middlewares.RequireAuth, controllers.GetBlogById)
	route.POST("/create", middlewares.RequireAuth, controllers.CreateBlog)
	route.PATCH("/:id", middlewares.RequireAuth, controllers.UpdateBlog)
	route.DELETE("/:id", middlewares.RequireAuth, controllers.DeleteBlog)
}
