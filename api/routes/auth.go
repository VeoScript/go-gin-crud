package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/controllers"
	"github.com/veoscript/go-gin-crud/middlewares"
)

func Users(route *gin.RouterGroup) {
	route.POST("/signup", controllers.SignUp)
	route.POST("/signin", controllers.SignIn)
	route.GET("/validate", middlewares.RequireAuth, controllers.Validate)
}
