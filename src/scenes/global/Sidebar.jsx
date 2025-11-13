import { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../../auth/AuthContext";
import { tokens } from "../../theme";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const DRAWER_WIDTH = 260;

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const initials = useMemo(() => {
    const name = user?.displayName || user?.email || "Guest";
    return name
      .split(/[.@\s_-]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("");
  }, [user]);

  const linkStyle = ({ isActive }) => ({
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: isActive ? colors.primary[400] : "transparent",
    padding: "12px 16px", // Increased padding
  });

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: 'theme.palette.background.default',
      }}
    >
      {/* Scrollable content area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          p: 2,
          display: "flex",
          flexDirection: "column",
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* User block - Made bigger */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {user?.photoURL ? (
            <Avatar src={user.photoURL} sx={{ width: 48, height: 48 }} />
          ) : (
            <Avatar sx={{ width: 48, height: 48, fontSize: "1.25rem" }}>
              {initials || "G"}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} fontSize="1.1rem">
              {user?.displayName || "Guest"}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontSize="0.85rem">
              {user?.isAnonymous ? "guest mode" : user?.email || ""}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Nav - Made bigger and more apparent */}
        <List dense={false} sx={{ mb: 2 }}>
          <ListItemButton
            component={NavLink}
            to="/"
            style={linkStyle}
            selected={location.pathname === "/"}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <DashboardIcon sx={{ fontSize: 26 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{ 
                fontSize: "1rem", 
                fontWeight: 600 
              }} 
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/notifications"
            style={linkStyle}
            selected={location.pathname.startsWith("/notifications")}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <NotificationsIcon sx={{ fontSize: 26 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Notifications" 
              primaryTypographyProps={{ 
                fontSize: "1rem", 
                fontWeight: 600 
              }} 
            />
          </ListItemButton>
        </List>

        {/* CSV UPLOAD */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Upload CSV Data
          </Typography>
          <Button
            component="label"
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            fullWidth
          >
            Upload CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  // Send CSV text to global callback
                  window.__setCSVContent(reader.result);
                };
                reader.readAsText(file);
              }}
            />
          </Button>
        </Box>

        {/* EXPORT CSV */}
        <Button
          variant="outlined"
          color="577BC1"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            const rows = window.__getCurrentRows?.() || [];
            if (!rows.length) {
              alert("No data available to export.");
              return;
            }

            // Convert to CSV
            const header = "timestamp,temperature_celsius,pH,tds_mg_per_L,turbidity_NTU\n";
            const csvBody = rows
              .slice() // newest first -> oldest first
              .reverse()
              .map(r =>
                [
                  new Date(r.ts).toISOString(),
                  r.s2, // temperature
                  r.s1, // pH
                  r.s4, // TDS
                  r.s3  // Turbidity
                ].join(",")
              )
              .join("\n");

            const csv = header + csvBody;
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `sensor_data_${Date.now()}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export CSV
        </Button>

        {/* Spacer to push actions to bottom */}
        <Box sx={{ flex: 1 }} />

        {/* Actions at bottom */}
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1.25}>
            {user?.isAnonymous && (
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                fullWidth
                component={NavLink}
                to="/login"
              >
                Create account
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              fullWidth
              onClick={signOut}
              color="577BC1"
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;