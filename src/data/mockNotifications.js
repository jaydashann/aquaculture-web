export const mockNotifications = [
  {
    id: "n-001",
    title: "High Turbidity Detected",
    message:
      "Turbidity spiked above the 10 NTU threshold for 3 minutes. Check filters.",
    severity: "high", // high | medium | low | info
    createdAt: Date.now() - 1000 * 60 * 3,
    read: false,
    meta: { sensor: "Turbidity", value: 12.3, unit: "NTU", threshold: 10 },
  },
  {
    id: "n-002",
    title: "Temperature Normalized",
    message:
      "Temperature returned to normal range after earlier deviation.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 45,
    read: true,
    meta: { sensor: "Temperature", value: 27.4, unit: "°C" },
  },
  {
    id: "n-003",
    title: "Aerator Running",
    message:
      "Aerator has been continuously active for 2 hours.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 90,
    read: false,
    meta: { device: "Aerator", status: "Active", duration: "2h" },
  },
];
