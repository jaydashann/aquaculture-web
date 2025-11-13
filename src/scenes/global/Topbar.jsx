import { Box, IconButton, useTheme, Badge, Tooltip } from "@mui/material";
import { useContext, useMemo } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link as RouterLink, useLocation } from "react-router-dom";

// TEMP source for unread count; swap with your store/API later
import { mockNotifications } from "../../data/mockNotifications";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  // show home button
  const showHome = location.pathname.startsWith("/notifications");

  // replace with global store / API for live unread count
  const unread = useMemo(
    () => mockNotifications.filter((n) => !n.read).length,
    []
  );

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* spacer */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" />

      {/* icons */}
      <Box display="flex" alignItems="center" gap={1.5}>
        {/* home button in notification screen */}
        {showHome && (
          <Tooltip title="Home">
            <IconButton
              component={RouterLink}
              to="/"
              aria-label="Go to Home"
              size="large"
            >
              <HomeOutlinedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Notifications">
          <IconButton
            component={RouterLink}
            to="/notifications"
            aria-label="Open notifications"
            size="large"
          >
            <Badge color="error" badgeContent={unread} overlap="circular">
              <NotificationsOutlinedIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
