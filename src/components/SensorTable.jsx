// src/components/SensorsTable.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function SensorsTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "readings"), orderBy("ts", "desc"), limit(100));
    const unsub = onSnapshot(q, (snap) => setRows(snap.docs.map((d) => d.data())));
    return () => unsub();
  }, []);

  const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "-");
  const fmtTime = (ts) => new Date((ts > 1e12 ? ts : ts * 1000)).toLocaleTimeString();

  return (
    <TableContainer component={Paper} sx={{ background: "transparent", boxShadow: "none" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Sensor 1</TableCell>
            <TableCell align="right">Sensor 2</TableCell>
            <TableCell align="right">Sensor 3</TableCell>
            <TableCell align="right">Sensor 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={(r.ts ?? 0) + "-" + i}>
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
