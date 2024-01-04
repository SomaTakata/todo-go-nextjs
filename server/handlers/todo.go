package handlers

import (
	"fmt"
	"time"

	"github.com/SomaTakata/task-brancher/database"
	"github.com/SomaTakata/task-brancher/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func SaveUserId(c *fiber.Ctx) error {
	var payload struct {
		UserID   string `json:"userId"`
		UserName string `json:"userName"` // Clerkから取得したユーザー名
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse request"})
	}

	// データベースにユーザーIDとユーザー名を保存
	// 重複したユーザーIDの挿入を避けるために、UPSERT（挿入または更新）を使用する
	_, err := database.DB.Exec(
		"INSERT INTO users (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name",
		payload.UserID, payload.UserName,
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusOK)
}

// ListTodos はデータベースから全てのTodoアイテムを取得し、返します。
func ListTodos(c *fiber.Ctx) error {
	// リクエストからユーザーIDを取得
	userID := c.Query("userId")

	// ユーザーIDに基づいてTodoアイテムをフィルタリング
	rows, err := database.DB.Query("SELECT id, title, done, important FROM todos WHERE user_id = $1", userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var todos []models.Todo
	for rows.Next() {
		var todo models.Todo
		if err := rows.Scan(&todo.ID, &todo.Title, &todo.Done, &todo.Important); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	todo := new(models.Todo)
	if err := c.BodyParser(todo); err != nil {
		fmt.Println("リクエストボディの解析エラー:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	// 新しい Todo の ID とタイムスタンプを設定
	todo.ID = uuid.New()
	currentTime := time.Now()
	todo.CreatedAt = currentTime
	todo.UpdatedAt = currentTime
	// DeletedAt が nullable かデフォルト値を持つことを前提とします

	_, err := database.DB.Exec("INSERT INTO todos (id, created_at, updated_at, title, body, done, important, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		todo.ID, todo.CreatedAt, todo.UpdatedAt, todo.Title, todo.Body, todo.Done, todo.Important, todo.UserID)
	if err != nil {
		fmt.Println("SQL インサート実行エラー:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	fmt.Println("Todo が正常に作成されました, ID:", todo.ID)

	return c.Status(fiber.StatusOK).JSON(todo)
}

func DeleteTodo(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	_, err = database.DB.Exec("DELETE FROM todos WHERE id = $1", id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
func UpdateDone(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	_, err = database.DB.Exec("UPDATE todos SET done = NOT done WHERE id = $1", id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusOK)
}
func UpdateImportant(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	_, err = database.DB.Exec("UPDATE todos SET important = NOT important WHERE id = $1", id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusOK)
}
func ListCompletedTodos(c *fiber.Ctx) error {

	// リクエストからユーザーIDを取得
	userID := c.Query("userId") // クエリパラメータから取得

	var todos []models.Todo
	rows, err := database.DB.Query("SELECT id, title, done, important FROM todos WHERE done = true AND user_id = $1", userID)
	if err != nil {
		fmt.Println("Error querying database:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	for rows.Next() {
		var todo models.Todo
		if err := rows.Scan(&todo.ID, &todo.Title, &todo.Done, &todo.Important); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(todos)
}

func ListUnCompletedTodos(c *fiber.Ctx) error {

	// リクエストからユーザーIDを取得
	userID := c.Query("userId") // クエリパラメータから取得

	fmt.Println(userID)

	var todos []models.Todo
	rows, err := database.DB.Query("SELECT id, title, done, important FROM todos WHERE done = false AND user_id = $1", userID)
	if err != nil {
		fmt.Println("Error querying database for uncompleted todos:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	for rows.Next() {
		var todo models.Todo
		if err := rows.Scan(&todo.ID, &todo.Title, &todo.Done, &todo.Important); err != nil {
			fmt.Println("Error scanning row for uncompleted todos:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration for uncompleted todos:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(todos)
}

func ListImportantTodos(c *fiber.Ctx) error {

	// リクエストからユーザーIDを取得
	userID := c.Query("userId") // クエリパラメータから取得

	rows, err := database.DB.Query("SELECT id, title, done, important FROM todos WHERE important = true AND user_id = $1", userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var todos []models.Todo
	for rows.Next() {
		var todo models.Todo
		if err := rows.Scan(&todo.ID, &todo.Title, &todo.Done, &todo.Important); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(todos)
}
