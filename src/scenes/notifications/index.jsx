import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Badge,
  Chip,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useNavigate, useParams, Routes, Route, useLocation, Link as RouterLink } from "react-router-dom";
import { mockNotifications as seed } from "../../data/mockNotifications";

// small helpers
const SIDEBAR_W = 380;
const TOPBAR_H = 72;
const formatDate = (ts) => new Date(ts).toLocaleString();

const severityChip = (sev) => {
  switch (sev) {
    case "high":   return <Chip label="High"   color="error"   size="small" />;
    case "medium": return <Chip label="Medium" color="warning" size="small" />;
    case "low":    return <Chip label="Low"    color="success" size="small" />;
    default:       return <Chip label="Info"   color="info"    size="small" />;
  }
};

const severityIcon = (sev) => {
  switch (sev) {
    case "high":   return <PriorityHighIcon />;
    case "medium": return <WarningAmberIcon />;
    case "low":    return <NotificationsActiveIcon />;
    default:       return <InfoOutlinedIcon />;
  }
};

// local state (swap with API/store later)
function useNotificationsState() {
  const [items, setItems] = useState(seed);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markRead = (id, read = true) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read } : n)));

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return { items, setItems, unreadCount, markRead, markAllRead };
}

// left list
const ListPanel = ({ items, unreadCount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        (n.meta && Object.values(n.meta).join(" ").toLowerCase().includes(q))
    );
  }, [items, query]);

  return (
    <Box
      sx={{
        width: SIDEBAR_W,
        borderRight: `2px solid ${theme.palette.divider}`,
        height: `calc(100vh - ${TOPBAR_H}px)`,
        overflow: "auto",
      }}
    >
      <Box p={3} display="flex" alignItems="center" gap={1}>
        <Badge badgeContent={unreadCount} color="error">
          <Typography variant="h2" fontWeight={700}>Notifications</Typography>
        </Badge>
      </Box>

      <Box
        px={2}
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ background: colors.primary[400] }}
      >
        <SearchIcon />
        <InputBase
          fullWidth
          placeholder="Search notification"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ py: 1 }}
          inputProps={{ "aria-label": "Search notifications" }}
        />
      </Box>

      <Divider />

      <List dense disablePadding>
        {filtered.map((n) => {
          const selected = location.pathname.endsWith(n.id);
          return (
            <ListItem
              key={n.id}
              disablePadding
              secondaryAction={
                !n.read ? <Chip size="small" label="New" color="error" /> : null
              }
            >
              <ListItemButton
                component={RouterLink}
                to={`/notifications/${n.id}`}
                selected={selected}
                sx={{ alignItems: "flex-start", py: 1.25 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: !n.read ? "error.main" : "primary.dark" }}>
                    {severityIcon(n.severity)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {n.title}
                      </Typography>
                      {severityChip(n.severity)}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {n.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {formatDate(n.createdAt)}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {!filtered.length && (
          <Box p={3}>
            <Typography color="text.secondary">No notifications found.</Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

// right panel
const DetailPanel = ({ items, markRead }) => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const item = useMemo(() => items.find((n) => n.id === id), [items, id]);

  useEffect(() => {
    if (item && !item.read) markRead(item.id, true);
  }, [item, markRead]);

  if (!item) {
    return (
      <Box flex={1} display="grid" placeItems="center">
        <Typography color="text.secondary">
          Select a notification to view details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box flex={1} p={3} sx={{ height: `calc(100vh - ${TOPBAR_H}px)`, overflow: "auto" }}>
      <Card sx={{ background: colors.primary[400] }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {severityChip(item.severity)}
            <Typography variant="caption" color="text.disabled">
              {formatDate(item.createdAt)}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} mb={1}>
            {item.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {item.message}
          </Typography>

          {item.meta && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Details
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(160px, 1fr))"
                gap={1.5}
              >
                {Object.entries(item.meta).map(([k, v]) => (
                  <Box
                    key={k}
                    p={1.25}
                    sx={{ bgcolor: colors.primary[500], borderRadius: 1 }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      {k}
                    </Typography>
                    <Typography variant="body2">{String(v)}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              startIcon={<MarkEmailUnreadIcon />}
              onClick={() => markRead(item.id, false)}
              variant="outlined"
              color="577BC1"
            >
              Mark unread
            </Button>
            <Button
              size="small"
              startIcon={<MarkEmailReadIcon />}
              onClick={() => markRead(item.id, true)}
              variant="contained"
            >
              Mark read
            </Button>
          </Box>
          <Button size="small" onClick={() => navigate("/notifications")} color="577BC1">
            Back to list
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

// home button
const NotificationsHeader = ({ onMarkAllRead }) => {
  return (
    <Box
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 1,
        borderBottom: `2px solid ${theme.palette.divider}`,
        background: theme.palette.background.default,
      })}
    >
    </Box>
  );
};

// layout and export
const NotificationsLayout = ({ state }) => {
  return (
    <Box display="flex" width="100%">
      <ListPanel items={state.items} unreadCount={state.unreadCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Box flex={1} display="grid" placeItems="center" sx={{ p: 5 }}>
              <Typography color="text.secondary">
                Select a notification to view details.
              </Typography>
            </Box>
          }
        />
        <Route
          path=":id"
          element={<DetailPanel items={state.items} markRead={state.markRead} />}
        />
      </Routes>
    </Box>
  );
};

export default function Notifications() {
  const state = useNotificationsState();
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <NotificationsHeader onMarkAllRead={state.markAllRead} />
      <NotificationsLayout state={state} />
    </Box>
  );
}
