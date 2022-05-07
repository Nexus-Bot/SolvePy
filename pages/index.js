import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/mode-python");
    require("ace-builds/src-noconflict/theme-monokai");
    return ace;
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => <CircularProgress color="primary" />,
    ssr: false,
  }
);

export default function Home() {
  const [editorCode, seteditorCode] = useState("");
  const [fixedCode, setfixedCode] = useState("");
  const [isLoading, setIsLoading] = useState(undefined);

  const handleEditorChange = (value) => {
    seteditorCode(value);
  };

  const handleSolverChange = (value) => {};

  const getOpenAIResponse = async () => {
    setIsLoading(true);
    const text = `##### Fix bugs in the below function
 
### Buggy Python
${editorCode}`;

    const res = await fetch(`/api/openai`, {
      body: JSON.stringify({
        code: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    setfixedCode(data.text.trim());
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <>
          <Box m="2rem" textAlign="center">
            <Typography variant="h3" fontWeight={600} color="aliceblue">
              SolvePy
            </Typography>
            <Typography variant="caption" color="ActiveCaption">
              Fix your buggy python code in a snap. Just paste/write your python
              code in left/up side editor and click on solve. You will get your
              fixed code in right/down side editor in no time
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Card>
                <CardHeader
                  title="Your Code"
                  subheader="Insert your buggy code here"
                />
                <AceEditor
                  mode="python"
                  theme="monokai"
                  onChange={handleEditorChange}
                  name="Code editor"
                  editorProps={{ $blockScrolling: true }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Button
                  variant="contained"
                  onClick={getOpenAIResponse}
                  disabled={isLoading}
                >
                  Solve
                </Button>
                {isLoading !== undefined && !isLoading && (
                  <Typography m="1rem" color="Highlight" textAlign="center">
                    If you dont think the answer is correct please click the
                    solve button again.
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              {isLoading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CircularProgress />
                </Box>
              )}
              {!isLoading && (
                <Card>
                  <CardHeader
                    title="Fixed Code"
                    subheader="The fixed version of your code willl appear here"
                  />
                  <AceEditor
                    mode="python"
                    theme="monokai"
                    value={fixedCode}
                    onChange={handleSolverChange}
                    name="Solver"
                    editorProps={{ $blockScrolling: true }}
                  />
                </Card>
              )}
            </Grid>
            <Typography m="auto" p="2rem" color="Highlight" textAlign="center">
              Copyright &#xA9; {`${new Date().getFullYear()} Jr. Nexus`}
            </Typography>
          </Grid>
        </>
      </Container>
    </ThemeProvider>
  );
}
