package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// Returns specific titles. Requires query parameters:
// - `start`: non-negative int, offset from cached articles.
// - `count`: how many articles to load. Could load less, if it goes out-of-bounds.
// Calls `App.GetTitles` inside.
func GetTitles(app *App) func(c *gin.Context) {
	return func(c *gin.Context) {
		start := c.Query("start")
		count := c.Query("count")

		if start == "" || count == "" {
			c.JSON(200, gin.H{"ok": false, "reason": "Expected: `start` & `count` query parameters."})
			return
		}

		startIndex, err := strconv.ParseInt(start, 10, 64)
		if err != nil {
			c.JSON(200, gin.H{"ok": false, "reason": err.Error()})
			return
		}
		titleCount, err := strconv.ParseInt(count, 10, 64)
		if err != nil {
			c.JSON(200, gin.H{"ok": false, "reason": err.Error()})
			return
		}

		titles, err := app.GetTitles(int(startIndex), int(titleCount))
		if err != nil {
			c.JSON(200, gin.H{"ok": false, "reason": err.Error()})
			return
		}
		c.JSON(200, gin.H{"ok": true, "titles": titles})
	}
}

// Returns all cached titles.
// Calls `App.GetAllTitles` inside.
func GetAllTitles(app *App) func(c *gin.Context) {
	return func(c *gin.Context) {
		titles := app.GetAllTitles()
		c.JSON(200, gin.H{"titles": titles})
	}
}

// Returns specific articles. Requires query parameters:
// - `index`: non-negative int, position in cached articles.
// Calls `App.GetArticle` inside.
func GetArticle(app *App) func(c *gin.Context) {
	return func(c *gin.Context) {
		index := c.Param("index")
		indexInt, err := strconv.ParseInt(index, 10, 64)
		if err != nil {
			c.JSON(200, gin.H{"ok": false, "reason": err.Error()})
			return
		}
		article, err := app.GetArticle(int(indexInt))
		if err != nil {
			c.JSON(200, gin.H{"ok": false, "reason": err.Error()})
			return
		}
		c.JSON(200, gin.H{"ok": true, "article": article})
	}
}

// Returns all cached articles.
// Calls `App.GetAllArticles` inside.
func GetAllArticles(app *App) func(c *gin.Context) {
	return func(c *gin.Context) {
		articles := app.GetAllArticles()
		c.JSON(200, gin.H{"articles": articles})
	}
}
