package main

import (
	"github.com/SomaTakata/task-brancher/database"
	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	database.ConnectDb()
	app := fiber.New()

	setupRoutes(app)

	app.Listen(":3000")
	// fmt.Print("Hello world")

	// app := fiber.New()

	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins: "http://localhost:3000",
	// 	AllowHeaders: "Origin, Content-Type, Accept",
	// }))

	// todos := []Todo{}

	// app.Get("/healthcheck", func(c *fiber.Ctx) error {
	// 	return c.SendString("OK")
	// })

	// app.Post("/api/todos", func(c *fiber.Ctx) error {
	// 	todo := &Todo{}

	// 	if err := c.BodyParser(todo); err != nil {
	// 		return err
	// 	}

	// 	todo.ID = len(todos) + 1

	// 	todos = append(todos, *todo)

	// 	return c.JSON(todos)

	// })

	// app.Patch("/api/todos/:id/done", func(c *fiber.Ctx) error {
	// 	id, err := c.ParamsInt("id")

	// 	if err != nil {
	// 		return c.Status(401).SendString("Invalid id")
	// 	}

	// 	for i, t := range todos {
	// 		if t.ID == id {
	// 			todos[i].Done = true
	// 			break
	// 		}
	// 	}

	// 	return c.JSON(todos)
	// })

	// app.Get("/api/todos", func(c *fiber.Ctx) error {
	// 	return c.JSON(todos)
	// })

	// log.Fatal(app.Listen(":4000"))

}
