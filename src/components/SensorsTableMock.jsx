import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export default function SensorsTableMock({ rows }) {
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
            <TableCell sx={{ fontSize: "14px" }}>Date</TableCell>
            <TableCell sx={{ fontSize: "14px" }}>Time</TableCell>
            <TableCell align="right" sx={{ fontSize: "14px" }}>pH Level</TableCell>
            <TableCell align="right" sx={{ fontSize: "14px" }}>Temperature</TableCell>
            <TableCell align="right" sx={{ fontSize: "14px" }}>Turbidity</TableCell>
            <TableCell align="right" sx={{ fontSize: "14px" }}>Total Dissolved Solids (TDS)</TableCell>
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
