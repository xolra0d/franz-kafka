# Frontend

ReactJS frontend with TypeScript. 
Uses Redux to manage light/dark mode, saves it to localStorage. 
Loads from `VITE_BACKEND_IP` env API each article.

## Routes

- `GET /`: displays info about Franz Kafka.
- `GET /articles`: displays all titles.
- `GET /articles/:index`: displays specific Article.
- `GET /about`: displays information about website.
