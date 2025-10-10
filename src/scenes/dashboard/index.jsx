import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import SensorsIcon from "@mui/icons-material/Sensors";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import SensorsTableMock from "../../components/SensorsTableMock";
import useMockSensorsStream from "../../hooks/useMockSensorsStream";
import { Link as RouterLink } from "react-router-dom";
import AeratorStatus from "../../components/AeratorStatus";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // live fake data (newest first)
  const rows = useMockSensorsStream({ intervalMs: 1000, maxRows: 30 });

  // transform rows -> Nivo line series (oldest → newest)
  // const toLabel = (ms) => new Date(ms).toLocaleTimeString();
  const mkSeries = (id, key, color) => ({
    id,
    color,
    data: rows.slice().reverse().map(r => ({
      x: new Date(r.ts),   // use Date, not a preformatted string
      y: r[key],
    })),
  });

  const lineSeries = [
    mkSeries("pH", "s1", colors.greenAccent[500]),
    mkSeries("Temperature", "s2", colors.blueAccent[500]),
    mkSeries("Turbidity", "s3", colors.grey[300]),
    mkSeries("TDS", "s4", colors.primary[200]),
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
      p="0 30px"
    >
      {/* ROW 1: line chart with live random data */}
      <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]}>
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
            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
              Trends and Patterns
            </Typography>
          </Box>
        </Box>

        <Box height="250px" m="-20px 0 0 0">
          <LineChart isDashboard data={lineSeries} />
        </Box>
      </Box>

      {/* ROW 2: aerator status */}
      <Box
        gridColumn="span 5"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        p="20px"
      >
        {/* aerator status */}
        <AeratorStatus active={true} since={Date.now() - 1000 * 60 * 45} />
      </Box>

      {/* ROW 2: notifications */}
      <Box
        gridColumn="6/13"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        p="26px 0"
        component={RouterLink}
        to="/notifications"
        sx={{ textDecoration: "none", ":hover": { opacity: 0.95 } }}
      >
        <StatBox
          title={
            <Box>
              <Box display="flex" alignItems="center" gap={1.25}>
                <NotificationImportantIcon sx={{ color: colors.greenAccent[600], fontSize: 30 }} />
                <Typography variant="h3" fontWeight={700}>
                  Notifications and Alerts
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 3, color: colors.greenAccent[600] }}>
                View all
              </Typography>
            </Box>
          }
        />
      </Box>

      {/* ROW 3: Sensors table */}
      <Box
        gridColumn="span 12"
        gridRow="4/6"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        p={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SensorsIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />
          <Typography variant="h5" fontWeight={700}>Sensors</Typography>
        </Box>

        <Box mt={1} height={280} width="100%" sx={{ overflow: "auto" }}>
          {/* own mock stream */}
          <SensorsTableMock intervalMs={1000} maxRows={100} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
