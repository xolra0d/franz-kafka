# Backend

Simple API using `Gin`. Uses `sqlite` as database.

## Routes

- `GET /titles?start:int&count:int`: returns specific titles. Format: `{"ok": false, reason: string} OR {"ok": true, "titles": list[string]}`.
- `GET /all_titles`: returns all titles. Format: `{"titles": list[string]}`.
- `GET /articles/:index`: returns specific `Article`. Format: `{"ok": false, "reason": string} OR {"ok": true, "article": Article}`.
- `GET /all_articles`: returns all `Article`s. Format: `{"articles": list[Article]}`.

## Index

- [func GetAllArticles\(app \*App\) func\(c \*gin.Context\)](<#GetAllArticles>)
- [func GetAllTitles\(app \*App\) func\(c \*gin.Context\)](<#GetAllTitles>)
- [func GetArticle\(app \*App\) func\(c \*gin.Context\)](<#GetArticle>)
- [func GetTitles\(app \*App\) func\(c \*gin.Context\)](<#GetTitles>)
- [type App](<#App>)
  - [func \(a \*App\) GetAllArticles\(\) \[\]Article](<#App.GetAllArticles>)
  - [func \(a \*App\) GetAllTitles\(\) \[\]string](<#App.GetAllTitles>)
  - [func \(a \*App\) GetArticle\(index int\) \(Article, error\)](<#App.GetArticle>)
  - [func \(a \*App\) GetTitles\(startIndex, titleCount int\) \(\[\]string, error\)](<#App.GetTitles>)
  - [func \(a \*App\) InitTable\(\) error](<#App.InitTable>)
  - [func \(a \*App\) RetrieveArticles\(\) error](<#App.RetrieveArticles>)
- [type Article](<#Article>)


<a name="GetAllArticles"></a>
## func GetAllArticles

```go
func GetAllArticles(app *App) func(c *gin.Context)
```

Returns all cached articles. Calls \`App.GetAllArticles\` inside.

<a name="GetAllTitles"></a>
## func GetAllTitles

```go
func GetAllTitles(app *App) func(c *gin.Context)
```

Returns all cached titles. Calls \`App.GetAllTitles\` inside.

<a name="GetArticle"></a>
## func GetArticle

```go
func GetArticle(app *App) func(c *gin.Context)
```

Returns specific articles. Requires query parameters: \- \`index\`: non\-negative int, position in cached articles. Calls \`App.GetArticle\` inside.

<a name="GetTitles"></a>
## func GetTitles

```go
func GetTitles(app *App) func(c *gin.Context)
```

Returns specific titles. Requires query parameters: \- \`start\`: non\-negative int, offset from cached articles. \- \`count\`: how many articles to load. Could load less, if it goes out\-of\-bounds. Calls \`App.GetTitles\` inside.

<a name="App"></a>
## type App

Represents application state.

```go
type App struct {
    // List of cached articles.
    Articles []Article
    // Database connection.
    Conn *sql.DB
    // contains filtered or unexported fields
}
```

<a name="App.GetAllArticles"></a>
### func \(\*App\) GetAllArticles

```go
func (a *App) GetAllArticles() []Article
```

Returns all cached articles.

<a name="App.GetAllTitles"></a>
### func \(\*App\) GetAllTitles

```go
func (a *App) GetAllTitles() []string
```

Returns all cached titles.

<a name="App.GetArticle"></a>
### func \(\*App\) GetArticle

```go
func (a *App) GetArticle(index int) (Article, error)
```

Returns specified cached article. If index is negative, or \`\>= len\(cachedArticles\)\`, returns error.

<a name="App.GetTitles"></a>
### func \(\*App\) GetTitles

```go
func (a *App) GetTitles(startIndex, titleCount int) ([]string, error)
```

Returns only list of cached titles from \`startIndex\` to \`min\(startIndex\+titleCount, len\(cachedArticles\)\)\`. If any of inputs is negative, returns error. If \`startIndex \>= len\(cachedArticles\)\`, returns error.

<a name="App.InitTable"></a>
### func \(\*App\) InitTable

```go
func (a *App) InitTable() error
```

Creates table for articles, if not exists.

<a name="App.RetrieveArticles"></a>
### func \(\*App\) RetrieveArticles

```go
func (a *App) RetrieveArticles() error
```

Retrieves and puts in cache articles from database. Useful at startup or after updates.

<a name="Article"></a>
## type Article

Represents cached in memory article.

```go
type Article struct {
    // Internal identifier, used for updates.
    Id  int `json:"-"`
    // Title of the article.
    Title string `json:"title"`
    // Content of article.
    Content string `json:"content"`
    // Date of the article. Can be used for partially known dates, e.g., `Winter 1921`.
    // It's recommended to follow format: `dd mmmm yyyy`.
    WrittenDate string `json:"written_date"`
}
```
