package controllers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/veoscript/go-gin-crud/initializers"
	"github.com/veoscript/go-gin-crud/models"
)

func GetBlogs(c *gin.Context) {
	var DB = initializers.DB

	// Get all blogs...
	var blogs []models.Blog
	result := DB.Find(&blogs)

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"blogs": blogs,
	})
}

func GetBlogById(c *gin.Context) {
	var DB = initializers.DB

	// Get id by request parameter...
	id := c.Param("id")

	// Get blog by id...
	var blog models.Blog
	result := DB.First(&blog, id)

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"blog": blog,
	})
}

func CreateBlog(c *gin.Context) {
	var DB = initializers.DB

	// Get data from req body (payload)...
	var body struct {
		Title       string
		Description *string
		Article     string
	}

	c.Bind(&body)

	// Validation...
	if strings.TrimSpace(body.Title) == "" {
		c.JSON(400, gin.H{
			"message": "Title is required",
		})
		return
	}

	if strings.TrimSpace(body.Article) == "" {
		c.JSON(400, gin.H{
			"message": "Article is required",
		})
		return
	}

	// Create blog...
	blogs := models.Blog{
		Title:       body.Title,
		Description: body.Description,
		Article:     body.Article,
	}

	result := DB.Create(&blogs)

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"blogs": blogs,
	})
}

func UpdateBlog(c *gin.Context) {
	var DB = initializers.DB

	// Get id by request parameter...
	id := c.Param("id")

	// Get data from req body (payload)...
	var body struct {
		Title       string
		Description *string
		Article     string
	}

	c.Bind(&body)

	// Find the blog were updating...
	var blog models.Blog
	DB.First(&blog, id)

	// Update specific blog...
	result := DB.Model(&blog).Updates(&models.Blog{
		Title:       body.Title,
		Description: body.Description,
		Article:     body.Article,
	})

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"blog": blog,
	})
}

func DeleteBlog(c *gin.Context) {
	var DB = initializers.DB

	// Get id by request parameter...
	id := c.Param("id")

	// Delete specific blog...
	var blog models.Blog
	result := DB.Delete(&blog, id)

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"message": "Deleted Sucessfully.",
	})
}
