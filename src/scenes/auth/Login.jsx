import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Login = () => {
  const { signIn, signUp, continueAsGuest } = useAuth();
  const [tab, setTab] = useState(0); // 0 = Sign In, 1 = Create Account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (tab === 0) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate("/", { replace: true });
    } catch (error) {
      setErr(error.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleGuest = async () => {
    try {
      setBusy(true);
      await continueAsGuest();
      navigate("/", { replace: true });
    } catch (error) {
      setErr(error.message || "Could not start guest session");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "transparent", // keep original look
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "black", // your original color
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            textAlign="center"
            sx={{ p: 2 }}
          >
            Welcome!
          </Typography>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 2,
              "& .MuiTab-root": { color: "#858796" },
              "& .MuiTabs-indicator": { backgroundColor: "#577BC1" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete={tab === 0 ? "email" : "new-email"}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === 0 ? "current-password" : "new-password"}
            />

            {err && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {err}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={busy}
            >
              {tab === 0 ? "Sign In" : "Create Account"}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="outlined"
            fullWidth
            onClick={handleGuest}
            disabled={busy}
            color="577BC1"
          >
            Continue as Guest
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
