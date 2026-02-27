import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider, createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import ArticleList from "./components/ArticleList";
import ArticleShow from "./components/ArticleShow";
import About from "./components/About";
import { ThemeProvider } from "@mui/material";
import useColorTheme from "./theme/use-color-theme";
import HomePage from "./components/HomePage";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/articles",
        Component: ArticleList,
      },
      {
        path: "/articles/:id",
        Component: ArticleShow,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "*",
        Component: HomePage,
      },
    ],
  },
]);

function App() {
  const { theme } = useColorTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
