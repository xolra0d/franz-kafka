package main

import (
	"database/sql"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	conn, err := sql.Open("sqlite3", "articles.db")
	if err != nil {
		log.Fatal(err)
	}

	app := &App{Conn: conn}
	err = app.InitTable()
	if err != nil {
		log.Fatal(err)
	}
	err = app.UpdateArticles()
	if err != nil {
		log.Fatal(err)
	}

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/titles", GetTitles(app))
	router.GET("/all_titles", GetAllTitles(app))
	router.GET("/articles/:index", GetArticle(app))

	log.Fatal(router.Run("0.0.0.0:80"))
}
