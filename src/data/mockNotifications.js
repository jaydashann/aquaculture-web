export const mockNotifications = [
  {
    id: "n-001",
    title: "High Turbidity Detected",
    message:
      "Turbidity spiked above the 10 NTU threshold for 3 minutes. Check filters.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 3,
    read: false,
    meta: { sensor: "Turbidity", value: 12.3, unit: "NTU", threshold: 10 },
  },

  {
    id: "n-002",
    title: "Temperature Normalized",
    message: "Temperature returned to normal range after earlier deviation.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 45,
    read: true,
    meta: { sensor: "Temperature", value: 27.4, unit: "°C" },
  },

  {
    id: "n-003",
    title: "Aerator Running",
    message: "Aerator has been continuously active for 2 hours.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 90,
    read: false,
    meta: { device: "Aerator", status: "Active", duration: "2h" },
  },

  // --- MORE NOTIFICATIONS START HERE ---
  {
    id: "n-004",
    title: "Low pH Warning",
    message: "pH dropped below the safe range (6.5). Immediate action required.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 12,
    read: false,
    meta: { sensor: "pH", value: 6.1, unit: "pH", threshold: 6.5 },
  },

  {
    id: "n-005",
    title: "Temperature Too High",
    message: "Water temperature exceeded 32°C, which may stress fish.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 21,
    read: false,
    meta: { sensor: "Temperature", value: 33.2, unit: "°C", threshold: 32 },
  },

  {
    id: "n-006",
    title: "Aerator Turned Off",
    message: "Aerator has been turned off manually.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 30,
    read: false,
    meta: { device: "Aerator", status: "Off" },
  },

  {
    id: "n-007",
    title: "High TDS Level",
    message:
      "TDS reading reached 1200 ppm, exceeding the recommended limit.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 40,
    read: true,
    meta: { sensor: "TDS", value: 1200, unit: "ppm", threshold: 1000 },
  },

  {
    id: "n-008",
    title: "Critical Multi-Parameter Alert",
    message:
      "pH, turbidity, and temperature are all beyond safe limits. Immediate inspection required.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 5,
    read: false,
    meta: {
      sensors: {
        pH: { value: 6.0, threshold: 6.5 },
        Turbidity: { value: 15, threshold: 10 },
        Temperature: { value: 34, threshold: 32 },
      },
    },
  },

  {
    id: "n-009",
    title: "Turbidity Stabilized",
    message: "Turbidity returned to normal levels after earlier spike.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 56,
    read: false,
    meta: { sensor: "Turbidity", value: 8.9, unit: "NTU" },
  },

  {
    id: "n-010",
    title: "Low TDS Level",
    message: "TDS dropped below the minimum required nutrient level.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 20,
    read: false,
    meta: { sensor: "TDS", value: 450, unit: "ppm", threshold: 500 },
  },

  {
    id: "n-011",
    title: "Aerator Auto-Activated",
    message:
      "Aerator automatically activated due to low oxygen detected.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 7,
    read: false,
    meta: { device: "Aerator", status: "Active", cause: "Low oxygen" },
  },

  {
    id: "n-012",
    title: "pH Returned to Normal",
    message: "pH stabilized within safe range.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 16,
    read: true,
    meta: { sensor: "pH", value: 7.1, unit: "pH" },
  },

  {
    id: "n-013",
    title: "High Temp + High TDS",
    message:
      "Temperature and TDS are above normal limits. Monitor fish behavior.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 8,
    read: false,
    meta: {
      sensors: {
        Temperature: { value: 33, unit: "°C", threshold: 32 },
        TDS: { value: 1150, unit: "ppm", threshold: 1000 },
      },
    },
  },

  {
    id: "n-014",
    title: "Rapid pH Drop",
    message:
      "pH dropped by 0.7 within 10 minutes. Sudden changes can shock fish.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 11,
    read: false,
    meta: { sensor: "pH", change: "-0.7", interval: "10 min" },
  },

  {
    id: "n-015",
    title: "Sensor Communication Lost",
    message: "No data received from temperature sensor for 2 minutes.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 2,
    read: false,
    meta: { sensor: "Temperature", status: "Offline" },
  },

  {
    id: "n-016",
    title: "Aerator Irregular Cycle Detected",
    message:
      "Aerator turned on and off repeatedly within a short period.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 15,
    read: false,
    meta: { device: "Aerator", cycleCount: 4 },
  },

  {
    id: "n-017",
    title: "Moderate Turbidity Increase",
    message:
      "Turbidity slowly rising. Monitor water clarity to prevent fish stress.",
    severity: "low",
    createdAt: Date.now() - 1000 * 60 * 50,
    read: true,
    meta: { sensor: "Turbidity", value: 9.2, unit: "NTU" },
  },

  {
    id: "n-018",
    title: "Temperature Drop Warning",
    message: "Water temperature dropped to 23°C, below optimal range.",
    severity: "medium",
    createdAt: Date.now() - 1000 * 60 * 13,
    read: false,
    meta: { sensor: "Temperature", value: 23, unit: "°C", threshold: 25 },
  },

  {
    id: "n-019",
    title: "pH + Turbidity Out of Range",
    message:
      "Both pH and turbidity are outside normal ranges. Conditions may deteriorate quickly.",
    severity: "high",
    createdAt: Date.now() - 1000 * 60 * 9,
    read: false,
    meta: {
      sensors: {
        pH: { value: 6.3, threshold: 6.5 },
        Turbidity: { value: 14, threshold: 10 },
      },
    },
  },

  {
    id: "n-020",
    title: "System Operating Normally",
    message:
      "All sensors are within optimal ranges. No current issues detected.",
    severity: "info",
    createdAt: Date.now() - 1000 * 60 * 70,
    read: true,
    meta: { system: "All sensors stable" },
  },
];
