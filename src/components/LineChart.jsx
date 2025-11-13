import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as staticData } from "../data/mockData";

const LineChart = ({ 
  data, 
  hiddenSeries = [], 
  isCustomLineColors = false, 
  isDashboard = false 
}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartData = (data && data.length) ? data : staticData;

  // Filter OUT the hidden series
  const visibleData = chartData.filter(series => !hiddenSeries.includes(series.id));

  return (
    <ResponsiveLine
      data={visibleData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100], fontSize: 12 } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { color: colors.primary[500] } },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 80, bottom: 100, left: 80 }} // more bottom margin for date labels
      xScale={{ type: "time", format: "native", precision: "second", useUTC: false }}
      xFormat="time:%H:%M:%S"
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,           // make ticks visible
        tickPadding: 10,
        tickRotation: -45,     // rotate for better readability
        format: "%b %d, %I:%M %p", // nicer date/time format: "Nov 13, 10:30 AM"
        legend: isDashboard ? undefined : "Date & Time",
        legendOffset: 50,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        legend: isDashboard ? undefined : "Value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}               // slightly larger points
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}         // thicker border for points
      pointBorderColor={{ from: "serieColor" }}
      useMesh
      lineWidth={4}                 // MAKE THE LINE THICKER
    />
  );
};

export default LineChart;
