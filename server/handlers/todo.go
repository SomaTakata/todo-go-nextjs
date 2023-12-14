package handlers

import (
	"github.com/SomaTakata/task-brancher/database"
	"github.com/SomaTakata/task-brancher/models"
	"github.com/gofiber/fiber/v2"
)

// ListTodos はデータベースから全てのTodoアイテムを取得し、返します。
func ListTodos(c *fiber.Ctx) error {
	todos := []models.Todo{}
	database.DB.Db.Find(&todos)
	return c.Status(fiber.StatusOK).JSON(todos)
}

// CreateTodo はリクエストボディから新しいTodoアイテムを作成し、データベースに保存します。
func CreateTodo(c *fiber.Ctx) error {
	todo := new(models.Todo)

	if err := c.BodyParser(todo); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	result := database.DB.Db.Create(&todo)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(todo)
}

// DeleteTodo は指定されたIDのTodoアイテムをデータベースから削除します。
func DeleteTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	var todo models.Todo
	result := database.DB.Db.Delete(&todo, id)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	} else if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "No Todo with that ID exists",
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

// UpdateDone は指定されたIDのTodoアイテムのDoneステータスを切り替えます。
func UpdateDone(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id")
	}

	var todo models.Todo
	result := database.DB.Db.First(&todo, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).SendString("Todo not found")
	}

	todo.Done = !todo.Done
	database.DB.Db.Save(&todo)

	return c.JSON(todo)
}
