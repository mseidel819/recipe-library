"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSetTheme from "@/hooks/useSetTheme";

import TabsLayout from "./layout";

const BlogPage = () => {
  const theme = useSetTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Blog Page nothing here</h1>
      </div>
    </ThemeProvider>
  );
};

export default BlogPage;
BlogPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};
