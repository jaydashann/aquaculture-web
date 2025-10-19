import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import useMockSensorsStream from "../hooks/useMockSensorsStream";
import useFirebaseSensorsStream from "../hooks/useFirebaseSensorsStream";

export default function SensorsTableMock({ intervalMs = 1000, maxRows = 100 }) {
  const rows = useMockSensorsStream({ intervalMs, maxRows }); // newest first

  const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "-");
  const fmtDate = (ms) =>
    new Date(ms).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const fmtTime = (ms) =>
    new Date(ms).toLocaleTimeString(undefined, { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <TableContainer component={Paper} sx={{ background: "transparent", boxShadow: "none" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="right">pH Level</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Turbidity</TableCell>
            <TableCell align="right">Total Dissolved Solids (TDS)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={r.ts + "-" + i}>
              <TableCell>{fmtDate(r.ts)}</TableCell>
              <TableCell>{fmtTime(r.ts)}</TableCell>
              <TableCell align="right">{fmt(r.s1)}</TableCell>
              <TableCell align="right">{fmt(r.s2)}</TableCell>
              <TableCell align="right">{fmt(r.s3)}</TableCell>
              <TableCell align="right">{fmt(r.s4)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
