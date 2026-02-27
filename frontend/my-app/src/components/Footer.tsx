import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import OutlookIcon from "./OutlookIcon";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Paper
      sx={{
        bottom: 0,
      }}
      component="footer"
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={4}
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <Button href="https://www.youtube.com/watch?v=WDCNlqMgnvo">
            <YouTubeIcon />
          </Button>
          <Button href="https://github.com/xolra0d/franz-kafka">
            <GitHubIcon />
          </Button>
          <Button href="mailto:serhii.nikolaiev@outlook.com">
            <OutlookIcon />
          </Button>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Link
            href="https://en.wikipedia.org/wiki/Franz_Kafka"
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Read more
          </Link>
        </Box>
      </Container>
    </Paper>
  );
}
