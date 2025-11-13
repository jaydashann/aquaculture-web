import { useEffect, useState } from "react";

export default function useCSVSensorStream(csvText, intervalMs = 1000, maxRows = 100) {
  const [parsed, setParsed] = useState([]);
  const [index, setIndex] = useState(0);
  const [rows, setRows] = useState([]); // newest first

  // CSV → object list
  const parseCSV = (text) => {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
      const values = line.split(",");
      const obj = {};

      headers.forEach((h, i) => {
        obj[h] = values[i];
      });

      return obj;
    });
  };

  // When CSV uploaded → parse it
  useEffect(() => {
    if (!csvText) return;
    const data = parseCSV(csvText);
    setParsed(data);
    setIndex(0);
    setRows([]);
  }, [csvText]);

  // Stream one row every X ms
  useEffect(() => {
    if (!parsed.length) return;

    const id = setInterval(() => {
      const row = parsed[index];

      const formatted = {
        ts: new Date(row.timestamp).getTime(),
        s1: Number(row.pH),
        s2: Number(row.temperature_celsius),
        s3: Number(row.turbidity_NTU),
        s4: Number(row.tds_mg_per_L),
      };

      setRows((prev) => [formatted, ...prev].slice(0, maxRows));
      setIndex((i) => (i + 1 < parsed.length ? i + 1 : 0)); // loop
    }, intervalMs);

    return () => clearInterval(id);
  }, [parsed, index, intervalMs, maxRows]);

  return rows;
}
