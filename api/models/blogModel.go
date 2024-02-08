package models

import "gorm.io/gorm"

type Blog struct {
	gorm.Model
	Image       *string
	Title       string
	Description *string
	Article     string
}
