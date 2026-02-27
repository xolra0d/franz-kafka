package main

import (
	"database/sql"
	"fmt"
	"sync"
)

type Article struct {
	Id          int    `json:"-"`
	Title       string `json:"title"`
	Content     string `json:"content"`
	WrittenDate string `json:"written_date"`
}

type App struct {
	Articles []Article
	Conn     *sql.DB
	lock     sync.RWMutex
}

func (a *App) InitTable() error {
	_, err := a.Conn.Exec(`
		CREATE TABLE IF NOT EXISTS articles (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			content TEXT NOT NULL,
			written_date TEXT NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT NULL
		);
	`)
	return err
}

func (a *App) UpdateArticles() error {
	a.lock.Lock()
	defer a.lock.Unlock()

	rows, err := a.Conn.Query("SELECT id, title, content, written_date FROM articles")
	if err != nil {
		return err
	}

	defer rows.Close()
	var articles []Article

	for rows.Next() {
		var t Article
		if err := rows.Scan(&t.Id, &t.Title, &t.Content, &t.WrittenDate); err != nil {
			return err
		}
		articles = append(articles, t)
	}
	if err := rows.Err(); err != nil {
		return err
	}
	a.Articles = articles
	return nil
}

func (a *App) GetArticles() []Article {
	a.lock.RLock()
	defer a.lock.RUnlock()

	result := make([]Article, len(a.Articles))
	copy(result, a.Articles)
	return result
}

func (a *App) GetTitles(startIndex, titleCount int) ([]string, error) {
	if startIndex < 0 {
		return nil, fmt.Errorf("start index is negative")
	}
	if titleCount < 0 {
		return nil, fmt.Errorf("title count is negative")
	}

	a.lock.RLock()
	defer a.lock.RUnlock()

	if startIndex >= len(a.Articles) {
		return nil, fmt.Errorf("start index out of bounds")
	}

	end := min(startIndex+titleCount, len(a.Articles))
	titles := make([]string, 0, end-startIndex)
	for _, article := range a.Articles[startIndex:end] {
		titles = append(titles, article.Title)
	}
	return titles, nil
}

func (a *App) GetAllTitles() []string {
	a.lock.RLock()
	defer a.lock.RUnlock()

	titles := make([]string, 0, len(a.Articles))
	for _, article := range a.Articles {
		titles = append(titles, article.Title)
	}
	return titles
}

func (a *App) GetArticle(index int) (Article, error) {
	if index < 0 {
		return Article{}, fmt.Errorf("index is negative")
	}

	a.lock.RLock()
	defer a.lock.RUnlock()

	if index >= len(a.Articles) {
		return Article{}, fmt.Errorf("index is out of bounds. Max index is %d", len(a.Articles)-1)
	}
	return a.Articles[index], nil
}
