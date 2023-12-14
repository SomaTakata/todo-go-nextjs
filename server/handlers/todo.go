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

func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo

	result := database.DB.Db.Delete(&todo, id)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "No note with that Id exists"})
	} else if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "error", "message": result.Error})
	}
	return c.SendStatus(fiber.StatusNoContent)
}
