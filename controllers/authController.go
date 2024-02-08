package controllers

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/veoscript/go-gin-crud/initializers"
	"github.com/veoscript/go-gin-crud/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var DB = initializers.DB

	// Get the email/password of req body...
	var body struct {
		Name     string
		Email    string
		Password string
	}

	c.Bind(&body)

	// Validation...
	if strings.TrimSpace(body.Name) == "" {
		c.JSON(400, gin.H{
			"message": "Name is required",
		})
		return
	}

	if strings.TrimSpace(body.Email) == "" {
		c.JSON(400, gin.H{
			"message": "Email is required",
		})
		return
	}

	if strings.TrimSpace(body.Password) == "" {
		c.JSON(400, gin.H{
			"message": "Password is required",
		})
		return
	}

	// Hash the password...
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to hash password.",
		})

		return
	}

	// Create user...
	user := models.User{
		Name:     body.Name,
		Email:    body.Email,
		Password: string(hash),
	}

	result := DB.Create(&user)

	// Error handler...
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	// Return response...
	c.JSON(200, gin.H{
		"message": "Sign up successfully!",
	})
}

func Login(c *gin.Context) {
	var DB = initializers.DB

	// Get the email and password of req body...
	var body struct {
		Email    string
		Password string
	}

	c.Bind(&body)

	// Validation...
	if strings.TrimSpace(body.Email) == "" {
		c.JSON(400, gin.H{
			"message": "Email is required",
		})
		return
	}

	if strings.TrimSpace(body.Password) == "" {
		c.JSON(400, gin.H{
			"message": "Password is required",
		})
		return
	}

	// Look up requested user...
	var user models.User

	DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(400, gin.H{
			"message": "Account not exist.",
		})
		return
	}

	// Compare sent in password with saved user hashed password...
	err := bcrypt.CompareHashAndPassword(([]byte(user.Password)), []byte(body.Password))

	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid password.",
		})
		return
	}

	// Generate a jwt token...
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		c.JSON(400, gin.H{
			"message": "Failed to create token.",
		})
		return
	}

	// Create cookie...
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("GoGinCrudAuth", tokenString, 3600*24*30, "", "", false, true)

	// Send it back to the client...
	c.JSON(200, gin.H{
		"message": "Log in successfully!",
	})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	// var userData = user.(models.User).Name

	c.JSON(200, gin.H{
		"user": user,
	})
}
