package models

import "gorm.io/gorm"

type Blog struct {
	gorm.Model
	Title       string
	Description *string
	Article     string
}
