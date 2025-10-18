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
    marginBottom: 6,
    backgroundColor: isActive ? colors.primary[400] : "transparent",
  });

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* User block */}
      <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
        {user?.photoURL ? <Avatar src={user.photoURL} /> : <Avatar>{initials || "G"}</Avatar>}
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {user?.displayName || "Guest"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.isAnonymous ? "guest mode" : user?.email || ""}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* Nav */}
      <List dense>
        <ListItemButton
          component={NavLink}
          to="/"
          style={linkStyle}
          selected={location.pathname === "/"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/notifications"
          style={linkStyle}
          selected={location.pathname.startsWith("/notifications")}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>

      {/* Actions at bottom — show Create Account (if anonymous) + always show Logout */}
      <Box sx={{ mt: "auto" }}>
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
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;
