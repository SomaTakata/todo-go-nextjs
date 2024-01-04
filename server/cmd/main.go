package main

import (
	"log"

	"github.com/SomaTakata/task-brancher/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// データベースへの接続を初期化
	database.ConnectDb()
	defer database.DB.Close()

	// 新しいFiberアプリケーションのインスタンスを作成
	app := fiber.New()

	// CORSミドルウェアを設定
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// ルーティングの設定（setupRoutes関数はおそらく他の場所で定義されている）
	setupRoutes(app)

	// 新しいルートを追加：'/' で 'Hello World' を表示
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	// サーバーをポート8080で起動し、エラーが発生した場合はログに記録
	log.Fatal(app.Listen(":8080"))
}
