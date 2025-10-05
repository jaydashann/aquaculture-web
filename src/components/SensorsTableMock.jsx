import { useEffect, useRef, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export default function SensorsTableMock({ intervalMs = 1000, maxRows = 100 }) {
  const [rows, setRows] = useState([]);
  const timer = useRef(null);

  useEffect(() => {
    const pushRandom = () => {
      const rand = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
      setRows(prev => {
        const next = [{
          ts: Date.now(),          // ms since epoch
          s1: rand(20, 30),
          s2: rand(40, 60),
          s3: rand(70, 90),
          s4: rand(0, 10),
        }, ...prev];
        return next.slice(0, maxRows);
      });
    };

    timer.current = setInterval(pushRandom, intervalMs);
    return () => clearInterval(timer.current);
  }, [intervalMs, maxRows]);

  const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "-");
  const fmtTime = (ms) => new Date(ms).toLocaleTimeString();

  return (
    <TableContainer component={Paper} sx={{ background: "transparent", boxShadow: "none" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
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
