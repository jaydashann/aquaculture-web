import { Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, CircularProgress, Box } from "@mui/material";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Line from "./scenes/line";
import Dashboard from "./scenes/dashboard";
import Notifications from "./scenes/notifications";

import Login from "./scenes/auth/Login";
import { AuthProvider, useAuth } from "./auth/AuthContext";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box display="grid" placeItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppShell = () => (
  <div className="app">
    <Sidebar />
    <main className="content">
      <Topbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/line" element={<Line />} />
        <Route path="/notifications/*" element={<Notifications />} />
      </Routes>
    </main>
  </div>
);

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <AppShell />
                </RequireAuth>
              }
            />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
};

export default App;
