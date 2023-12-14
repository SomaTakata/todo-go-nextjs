package main

import (
	"github.com/SomaTakata/task-brancher/handlers"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/", handlers.ListTodos)

	app.Post("/todo", handlers.CreateTodo)
	app.Delete("/todo/:id", handlers.DeleteTodo)
}
