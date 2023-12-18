package main

import (
	"github.com/SomaTakata/task-brancher/handlers"
	"github.com/gofiber/fiber/v2"
)

// setupRoutes はWebサーバーのルート（エンドポイント）を設定します。
func setupRoutes(app *fiber.App) {
	// 全てのToDoアイテムを取得
	app.Get("/api/todos", handlers.ListTodos)

	// 完了したToDoアイテムを取得
	app.Get("/api/todos/completed", handlers.ListCompletedTodos)

	// 未完了のToDoアイテムを取得
	app.Get("/api/todos/uncompleted", handlers.ListUnCompletedTodos)

	// 重要なToDoアイテムを取得
	app.Get("/api/todos/important", handlers.ListImportantTodos)

	// 新しいToDoアイテムを作成
	app.Post("/api/todos", handlers.CreateTodo)

	// 指定されたIDのToDoアイテムの完了状態を更新
	app.Patch("/api/todos/:id/done", handlers.UpdateDone)

	// 指定されたIDのToDoアイテムの重要状態を更新
	app.Patch("/api/todos/:id/important", handlers.UpdateImportant)

	// 指定されたIDのToDoアイテムを削除
	app.Delete("/api/todos/:id", handlers.DeleteTodo)
}
