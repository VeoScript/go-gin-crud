package controllers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/initializers"
	"github.com/veoscript/go-gin-crud/models"
)

func BlogsCreate(c *gin.Context) {
	var DB = initializers.DB

	// Get data from req body (payload)...
	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	// Validation...
	if strings.TrimSpace(body.Title) == "" {
		c.JSON(400, gin.H{
			"message": "Title is required",
		})
		return
	}

	if strings.TrimSpace(body.Description) == "" {
		c.JSON(400, gin.H{
			"message": "Description is required",
		})
		return
	}

	// Create blog...
	blogs := models.Blog{
		Title:       body.Title,
		Description: body.Description,
	}

	result := DB.Create(&blogs)

	// Error handler...
	if result.Error != nil {
		c.JSON(400, gin.H{
			"message": result.Error,
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"blogs": blogs,
	})
}
