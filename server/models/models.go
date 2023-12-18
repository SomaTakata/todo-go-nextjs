package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title     string `json:"title" gorm:text;not null;default:null`
	Body      string `json:"body" gorm:text;not null;default:null`
	Done      bool   `json:"done" gorm:not null;default:false`
	Important bool   `json:"important" gorm:not null;default:false`
}
