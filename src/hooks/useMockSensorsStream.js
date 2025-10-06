import { useEffect, useRef, useState } from "react";

export default function useMockSensorsStream({ intervalMs = 1000, maxRows = 60 } = {}) {
  const [rows, setRows] = useState([]);   // newest first
  const timer = useRef(null);

  useEffect(() => {
    const push = () => {
      const rand = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
      setRows(prev => {
        const next = [{
          ts: Date.now(),          // ms timestamp
          s1: rand(20, 30),        // pH
          s2: rand(24, 34),        // Temperature °C
          s3: rand(0, 100),        // Turbidity NTU
          s4: rand(100, 500),      // TDS ppm
        }, ...prev];
        return next.slice(0, maxRows);
      });
    };
    timer.current = setInterval(push, intervalMs);
    return () => clearInterval(timer.current);
  }, [intervalMs, maxRows]);

  return rows;
}
