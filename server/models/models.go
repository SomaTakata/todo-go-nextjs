package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title string `json:"title" gorm:text;not null;default:null`
	Body  string `json:"body"  gorm:text;not null;default:null`
}
