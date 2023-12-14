package main

import (
	"github.com/SomaTakata/task-brancher/handlers"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/todos", handlers.ListTodos)

	app.Post("/api/todos", handlers.CreateTodo)

	app.Patch("/api/todos/:id/done", handlers.UpdateDone)

	app.Delete("/api/todos/:id", handlers.DeleteTodo)
}
