import { useEffect, useState } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Title } from "./Title";

export default function ArticleList() {
  const [data, setData] = useState<{ titles: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_IP + "/all_titles")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles");
      });
  }, []);

  if (error) {
    return (
      <Box maxWidth={640} mx="auto" marginTop={6}>
        <Title>Articles</Title>
        <p>{error}</p>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" marginTop={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Title>Articles</Title>
      <List>
        {data.titles.map((title, i) => (
          <Box key={i}>
            <ListItem
              secondaryAction={
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/articles/${i}`)}
                >
                  Read more
                </Button>
              }
            >
              <Link
                to={`/articles/${i}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                  display: "block",
                }}
              >
                {title}
              </Link>{" "}
            </ListItem>
            {i < data.titles.length - 1 && (
              <Divider
                sx={{
                  marginBottom: 1,
                  marginTop: 1,
                }}
              />
            )}
          </Box>
        ))}
      </List>
    </>
  );
}
