// src/components/AeratorStatus.jsx
import { Box, Chip, Typography, Tooltip, useTheme } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CircleIcon from "@mui/icons-material/Circle";
import { tokens } from "../theme";

export default function AeratorStatus({ active = true, since = null, note = "" }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const spin = {
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  };

  const pulse = {
    "@keyframes pulse": {
      "0%":   { boxShadow: `0 0 0 0 rgba(76, 175, 80, 0.65)` },
      "70%":  { boxShadow: `0 0 0 10px rgba(76, 175, 80, 0)` },
      "100%": { boxShadow: `0 0 0 0 rgba(76, 175, 80, 0)` },
    },
  };

  const statusColor = active ? "success" : "error";
  const statusText  = active ? "Active" : "Inactive";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        background: colors.primary[400],
        border: `1px solid ${colors.primary[500]}`,
      }}
    >
      {/* Icon + glow */}
      <Box
        sx={{
          ...pulse,
          ...(active && { animation: "pulse 2s infinite" }),
          borderRadius: "9999px",
          p: 1.25,
          background:
            active
              ? theme.palette.success.main
              : theme.palette.error.main,
          color: theme.palette.getContrastText(
            active ? theme.palette.success.main : theme.palette.error.main
          ),
          display: "grid",
          placeItems: "center",
        }}
      >
        {active ? (
          <AutorenewIcon
            sx={{
              ...spin,
              animation: "spin 1.2s linear infinite",
              fontSize: 24,
            }}
          />
        ) : (
          <PowerSettingsNewIcon sx={{ fontSize: 24, opacity: 0.9 }} />
        )}
      </Box>

      {/* Texts */}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Typography variant="h6" fontWeight={800}>
            Aerator
          </Typography>
          <Chip
            size="small"
            color={statusColor}
            label={statusText}
            icon={<CircleIcon sx={{ fontSize: 12 }} />}
            sx={{
              "& .MuiChip-icon": { color: "inherit", ml: 0.5 },
              fontWeight: 700,
            }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{ mt: 0.5, maxWidth: 420 }}
          title={note || (since ? `Since ${new Date(since).toLocaleString()}` : "")}
        >
          {note
            ? note
            : since
            ? `Since ${new Date(since).toLocaleString()}`
            : active
            ? "Running nominally"
            : "Stopped"}
        </Typography>
      </Box>
    </Box>
  );
}
