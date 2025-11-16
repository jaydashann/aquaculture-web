import { Box, Typography, useTheme, FormControlLabel, Checkbox } from "@mui/material";
import { tokens } from "../../theme";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import SensorsIcon from "@mui/icons-material/Sensors";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import SensorsTableMock from "../../components/SensorsTableMock";
import AeratorStatus from "../../components/AeratorStatus";
import useCSVSensorStream from "../../hooks/useCSVSensorStream";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { mockNotifications } from "../../data/mockNotifications";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // CSV text loaded from Sidebar
  const [csvText, setCSVText] = useState(null);

  // Allow Sidebar CSV upload to trigger Dashboard data
  useEffect(() => {
    window.__setCSVContent = (csv) => setCSVText(csv);
  }, []);

  // Stream rows from CSV (newest first)
  const rows = useCSVSensorStream(csvText, 1000, 100);

  // Expose rows globally for Sidebar "Export CSV"
  useEffect(() => {
    window.__getCurrentRows = () => rows;
  }, [rows]);

  // Interactive chart toggles
  const [hiddenSeries, setHiddenSeries] = useState([]);
  const toggle = (id) => {
    setHiddenSeries((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Helper for building series
  const mkSeries = (id, key, color) => ({
    id,
    color,
    data: rows
      .slice()
      .reverse()
      .map((r) => ({
        x: new Date(r.ts),
        y: r[key],
      })),
  });

  // Series for the chart
  const lineSeries = [
    mkSeries("pH", "s1", colors.greenAccent[500]),
    mkSeries("Temperature", "s2", colors.blueAccent[500]),
    mkSeries("Turbidity", "s3", colors.grey[300]),
    mkSeries("TDS", "s4", colors.primary[200]),
  ];

  // 🔥 Get the most recent notification
  const latestNotification = [...mockNotifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
      p="0 30px"
    >
      {/* ---------------------- ROW 1: LINE CHART ---------------------- */}
      <Box
        gridColumn="span 12"
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight={600} color={colors.grey[100]}>
              Water Quality Parameters
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Forecasted Data
            </Typography>
          </Box>
        </Box>

        {/* TOGGLES */}
        <Box 
          display="flex" 
          gap={2} 
          ml={3} 
          mt={1} 
          justifyContent="center" 
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => toggle("pH")}
                sx={{ color: colors.greenAccent[500] }}
              />
            }
            label="pH"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => toggle("Temperature")}
                sx={{ color: colors.blueAccent[500] }}
              />
            }
            label="Temperature"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => toggle("Turbidity")}
                sx={{ color: colors.grey[300] }}
              />
            }
            label="Turbidity"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => toggle("TDS")}
                sx={{ color: 'colors.primary[200]' }}
              />
            }
            label="TDS"
          />
        </Box>

        <Box height="350px" m="-20px 0 0 0">
          <LineChart isDashboard data={lineSeries} hiddenSeries={hiddenSeries} />
        </Box>
      </Box>

      {/* ---------------------- ROW 2: AERATOR STATUS ---------------------- */}
      <Box
        gridColumn="span 3"
        gridRow="4/6"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        p="20px"
      >
        <AeratorStatus active={false} since={Date.now() - 1000 * 60 * 45} />
      </Box>

      {/* ---------------------- ROW 2: NOTIFICATION PREVIEW ---------------------- */}
      <Box
        gridColumn="4/13"
        gridRow="4/6"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        p="20px"
        component={RouterLink}
        to="/notifications"
        sx={{ textDecoration: "none", ":hover": { opacity: 0.95 }}}
      >
        <Box display="flex" alignItems="center" gap={1.25} mb={2} sx={{ p: 2 }}>
          <NotificationImportantIcon
            sx={{ color: colors.greenAccent[600], fontSize: 30 }}
          />
          <Typography variant="h3" fontWeight={700} color="white">
            Notifications and Alerts
          </Typography>
        </Box>

        {/* 🔥 Latest Notification Preview with Outline */}
        <Box
          p={3}
          border={`2px solid ${colors.greenAccent[600]}`}
          borderRadius="8px"
          backgroundColor={colors.primary[500]}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: colors.greenAccent[500],
              backgroundColor: colors.primary[600],
            },
            padding: 6
          }}
        >
          <Typography variant="h4" fontWeight={600} color={colors.grey[100]}>
            {latestNotification.title}
          </Typography>

          <Typography variant="body1" color={colors.grey[300]} mt={1}>
            {latestNotification.message}
          </Typography>

          <Typography 
            variant="body2" 
            color={colors.greenAccent[600]} 
            display="block"
            mt={1.5}
          >
            {new Date(latestNotification.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* ---------------------- ROW 3: SENSOR TABLE ---------------------- */}
      <Box
        gridColumn="span 12"
        gridRow="6/8"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        p={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SensorsIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />
          <Typography variant="h3" fontWeight={700} sx={{ p: 1 }}>
            Sensor Stream
          </Typography>
        </Box>

        <Box mt={1} height={280} width="100%" sx={{ overflow: "auto" }}>
          <SensorsTableMock rows={rows} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
