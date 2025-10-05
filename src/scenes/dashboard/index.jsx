import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import SensorsIcon from '@mui/icons-material/Sensors';
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import SensorsTableMock from "../../components/SensorsTableMock";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        p="0 30px"
    >
        {/* ROW 1 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Water Quality Parameters
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Trends and Patterns
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        
        {/* ROW 2 */}
        <Box                                    // aerator status
          gridColumn="span 5"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          p="26px 0"
        >
          <StatBox
            title="Aerator Status"
            subtitle="Active"
            // increase="time active" // current run time
            icon={
              <AutorenewIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>   
        <Box                                    // notification/alert
          gridColumn="6/13"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          p="26px 0"
        >
          <StatBox
            title={
            <Box>
                {/* icon + title */}
                <Box display="flex" alignItems="center" gap={1.25}>
                <NotificationImportantIcon
                    sx={{ color: colors.greenAccent[600], fontSize: 26 }}
                />
                <Typography variant="h5" fontWeight={700}>
                    Notifications and Alerts
                </Typography>
                </Box>

                {/* Subtitle under the title */}
                <Typography
                variant="subtitle1"
                sx={{ mt: 1, color: colors.greenAccent[600] }}
                >
                notification/alert
                </Typography>
            </Box>
            }
          />
        </Box>   

        {/* ROW 3 */}
        <Box
          gridColumn="6/13"
          gridRow="4/6"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          p={2}
        >
           <StatBox/>
            <Box display="flex" alignItems="center" gap={1}>
                <SensorsIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />
                <Typography variant="h5" fontWeight={700}>Sensors</Typography>
            </Box>
            {/* data table mock */}
            <Box mt={1} height={280} width="100%" sx={{ overflow: "auto" }}>
                <SensorsTableMock intervalMs={1000} maxRows={100} /> {/* fake data from SensorTableMock */}
            </Box>
        </Box>
    </Box>
    
  );
};

export default Dashboard;
