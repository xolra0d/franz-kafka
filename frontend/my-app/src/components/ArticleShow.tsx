import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router";
import { Paragraph } from "./Paragraph";
import { Title } from "./Title";

type Article = {
  title: string;
  content: string;
  written_date: string;
};

type ApiResponse =
  | { ok: true; article: Article }
  | { ok: false; reason: string };

export default function ArticleShow() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_IP + `/articles/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json: ApiResponse) => setData(json))
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (!data && !error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        minHeight="40vh"
      >
        <CircularProgress size={36} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Loading article…
        </Typography>
      </Box>
    );
  }

  const failed = (reason: string) => {
    return (
      <Box maxWidth={640} mx="auto" marginTop={6}>
        <Alert severity="error">Failed to load article: {reason}</Alert>
      </Box>
    );
  };
  if (error) {
    return failed(error);
  }
  if (!data) {
    return (
      <Box display="flex" justifyContent="center" marginTop={6}>
        <CircularProgress />
      </Box>
    );
  }
  if (!data.ok) {
    return failed(data.reason);
  }

  const { title, written_date } = data.article;
  const content = data.article.content.replaceAll("\\n", "\n");

  return (
    <>
      <Title>{title}</Title>
      <Typography variant="body2" color="text.secondary" marginBottom={1}>
        {written_date}
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Paragraph>{content}</Paragraph>
    </>
  );
}
