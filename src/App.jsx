import { useState, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserExercisePage from "./pages/UserExercisePage";
import UserShoesPage from "./pages/UserShoesPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Header from "./components/headerfooter/Header";
// import Footer from "./components/headerfooter/Footer";
import { createContext } from "react";
import { Box } from "@mui/material";
import CreateExercisePage from "./pages/CreateExercisePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import CreateShoePage from "./pages/CreateShoePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StatisticsPage from "./pages/StatisticsPage";
import StravaPage from "./pages/StravaPage";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
const queryClient = new QueryClient();

const App = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#f3f3f3" : "#121212",
            paper: mode === "light" ? "#d6d6d6" : "#121212",
          },
          primary: {
            main: "#00845a",
          },
          secondary: {
            main: "#84002a",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Header />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Routes>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<LoginPage />} />
                  <Route path="" element={<PrivateRoute />}>
                    <Route exact path="/" element={<HomePage />} />{" "}
                    <Route
                      exact
                      path="/my-exercises"
                      element={<UserExercisePage />}
                    />
                    <Route
                      exact
                      path="/statistics"
                      element={<StatisticsPage />}
                    />
                    <Route exact path="/my-shoes" element={<UserShoesPage />} />
                    <Route
                      exact
                      path="/create-shoe"
                      element={<CreateShoePage />}
                    />
                    <Route
                      exact
                      path="/create-exercise"
                      element={<CreateExercisePage />}
                    />
                    <Route exact path="/strava" element={<StravaPage />} />
                  </Route>
                </Routes>
              </Box>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
