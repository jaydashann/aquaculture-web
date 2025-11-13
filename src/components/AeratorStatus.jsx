import { Box, Chip, Typography, useTheme } from "@mui/material";
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
      "0%": { boxShadow: `0 0 0 0 rgba(76, 175, 80, 0.65)` },
      "70%": { boxShadow: `0 0 0 10px rgba(76, 175, 80, 0)` },
      "100%": { boxShadow: `0 0 0 0 rgba(76, 175, 80, 0)` },
    },
  };

  const statusColor = active ? "success" : "error";
  const statusText = active ? "Active" : "Inactive";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* Square Card */}
      <Box
        sx={{
          width: "85%",
          height: "85%",
          background: colors.primary[500],
          borderRadius: "12px",
          border: `2px solid ${colors.primary[600]}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 2,
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            ...pulse,
            ...(active && { animation: "pulse 2s infinite" }),
            borderRadius: "50%",
            padding: 2,
            background: active 
              ? theme.palette.success.main 
              : theme.palette.error.main,
            display: "grid",
            placeItems: "center",
          }}
        >
          {active ? (
            <AutorenewIcon
              sx={{
                ...spin,
                animation: "spin 1.4s linear infinite",
                fontSize: 30,
                color: "white",
              }}
            />
          ) : (
            <PowerSettingsNewIcon sx={{ fontSize: 36, color: "white" }} />
          )}
        </Box>

        {/* Label */}
        <Typography variant="h3" fontWeight={700} color="white">
          Aerator
        </Typography>

        {/* Status Chip */}
        <Chip
          size="medium"
          color={statusColor}
          label={statusText}
          icon={<CircleIcon sx={{ fontSize: 14 }} />}
          sx={{
            "& .MuiChip-icon": { color: "inherit" },
            fontWeight: 700,
          }}
        />

        {/* Since / Note */}
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
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
