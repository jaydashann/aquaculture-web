import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, query, limitToLast } from "firebase/database";

export default function useFirebaseSensorsStream({ maxRows = 60 } = {}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(ref(db, "sensor_data"), limitToLast(maxRows));
    const unsub = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.values(data)
          .sort((a, b) => b.ts - a.ts); // newest first
        setRows(entries);
      }
    });
    return () => unsub();
  }, [maxRows]);

  return rows;
}
