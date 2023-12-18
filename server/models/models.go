package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Todo 構造体は、ToDoアイテムを表します。
type Todo struct {
	// ID はToDoアイテムの一意識別子としてUUIDを使用します。
	ID uuid.UUID `gorm:"type:uuid;primaryKey"`

	// CreatedAt、UpdatedAt、DeletedAt はGORMによって自動的に管理されるタイムスタンプです。
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	// Title はToDoアイテムのタイトルを保持します。
	Title string `json:"title" gorm:"type:text;not null"`

	// Body はToDoアイテムの詳細な内容を保持します。
	Body string `json:"body" gorm:"type:text;not null"`

	// Done はToDoアイテムが完了したかどうかを示します。
	Done bool `json:"done" gorm:"not null;default:false"`

	// Important はToDoアイテムが重要かどうかを示します。
	Important bool `json:"important" gorm:"not null;default:false"`
}

// BeforeCreate はGORMのフックで、新しい Todo レコードがデータベースに保存される前に呼び出されます。
// この関数はToDoアイテムに新しいUUIDを割り当てます。
func (t *Todo) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}
