package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Todo struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"` // UUID を主キーとして使用
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Title     string         `json:"title" gorm:"type:text;not null"`
	Body      string         `json:"body" gorm:"type:text;not null"`
	Done      bool           `json:"done" gorm:"not null;default:false"`
	Important bool           `json:"important" gorm:"not null;default:false"`
}

// GORMフック - BeforeCreate
// 新しい Todo 構造体が作成される前に新しい UUID を設定します。
func (t *Todo) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}
