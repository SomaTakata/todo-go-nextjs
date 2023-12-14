package handlers

import (
	"github.com/SomaTakata/task-brancher/database"
	"github.com/SomaTakata/task-brancher/models"
	"github.com/gofiber/fiber/v2"
)

func ListTodos(c *fiber.Ctx) error {
	todos := []models.Todo{}

	database.DB.Db.Find(&todos)

	return c.Status(200).JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	todo := new(models.Todo)
	if err := c.BodyParser(todo); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	database.DB.Db.Create(&todo)

	return c.Status(200).JSON(todo)
}
