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

	// 新しいFiberアプリケーションのインスタンスを作成
	app := fiber.New()

	// CORSミドルウェアを設定
	// これにより、localhost:3000 からのリクエストを受け入れることができる
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// ルーティングの設定（setupRoutes関数はおそらく他の場所で定義されている）
	setupRoutes(app)

	// サーバーをポート8080で起動し、エラーが発生した場合はログに記録
	log.Fatal(app.Listen(":8080"))
}
