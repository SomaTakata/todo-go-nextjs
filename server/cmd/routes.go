package main

import (
	"github.com/SomaTakata/task-brancher/handlers"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/todos", handlers.ListTodos)

	app.Get("/api/todos/completed", handlers.ListCompletedTodos)

	app.Get("/api/todos/uncompleted", handlers.ListUnCompletedTodos)

	app.Get("/api/todos/important", handlers.ListImportantTodos)

	app.Post("/api/todos", handlers.CreateTodo)

	app.Patch("/api/todos/:id/done", handlers.UpdateDone)

	app.Patch("/api/todos/:id/important", handlers.UpdateImportant)

	app.Delete("/api/todos/:id", handlers.DeleteTodo)
}
