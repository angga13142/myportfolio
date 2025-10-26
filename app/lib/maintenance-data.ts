// Sample maintenance records data
export interface MaintenanceRecord {
  id: string;
  date: string;
  equipmentType: string;
  equipmentId: string;
  maintenanceType: "Preventive" | "Corrective" | "Inspection" | "Repair";
  description: string;
  status: "Completed" | "In Progress" | "Scheduled";
  priority: "Low" | "Medium" | "High" | "Critical";
  performedBy: string;
  duration: number; // in hours
  cost?: number;
  partsReplaced?: string[];
  notes?: string;
}

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "M001",
    date: "2024-10-15",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Preventive",
    description: "Regular 250-hour maintenance service",
    status: "Completed",
    priority: "Medium",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 4.5,
    cost: 1500000,
    partsReplaced: ["Engine oil", "Oil filter", "Air filter", "Hydraulic oil"],
    notes: "All systems functioning normally. No issues detected.",
  },
  {
    id: "M002",
    date: "2024-10-10",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Inspection",
    description: "Pre-shift safety inspection",
    status: "Completed",
    priority: "High",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 0.5,
    notes: "Hydraulic system pressure checked and adjusted.",
  },
  {
    id: "M003",
    date: "2024-10-05",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Repair",
    description: "Hydraulic hose replacement",
    status: "Completed",
    priority: "High",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 2.0,
    cost: 850000,
    partsReplaced: ["Hydraulic hose (left boom)", "Hose clamps"],
    notes: "Minor leak detected during inspection. Replaced hose preventively.",
  },
  {
    id: "M004",
    date: "2024-09-28",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Preventive",
    description: "Track tension adjustment and undercarriage inspection",
    status: "Completed",
    priority: "Medium",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 3.0,
    cost: 650000,
    partsReplaced: ["Track pins", "Bushings"],
    notes: "Track wear within acceptable limits. Tension adjusted to spec.",
  },
  {
    id: "M005",
    date: "2024-09-20",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Inspection",
    description: "Bucket teeth and cutting edge inspection",
    status: "Completed",
    priority: "Low",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 1.0,
    notes: "Bucket teeth at 60% wear. Scheduled for replacement next month.",
  },
  {
    id: "M006",
    date: "2024-09-15",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Preventive",
    description: "Cooling system flush and refill",
    status: "Completed",
    priority: "Medium",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 2.5,
    cost: 450000,
    partsReplaced: ["Coolant", "Thermostat"],
    notes:
      "Coolant tested and replaced. System operating at optimal temperature.",
  },
  {
    id: "M007",
    date: "2024-11-05",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Preventive",
    description: "500-hour major service",
    status: "Scheduled",
    priority: "High",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 8.0,
    cost: 3500000,
    partsReplaced: [
      "Engine oil",
      "All filters",
      "Hydraulic oil",
      "Fuel filter",
      "Bucket teeth",
    ],
    notes: "Comprehensive service scheduled. All parts ordered.",
  },
  {
    id: "M008",
    date: "2024-09-01",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Corrective",
    description: "Cabin AC repair",
    status: "Completed",
    priority: "Low",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 1.5,
    cost: 750000,
    partsReplaced: ["AC compressor belt", "Refrigerant"],
    notes: "AC compressor belt worn. Replaced and recharged system.",
  },
  {
    id: "M009",
    date: "2024-08-25",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Inspection",
    description: "Electrical system diagnostic",
    status: "Completed",
    priority: "Medium",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 1.5,
    notes: "Battery terminals cleaned. All electrical systems functioning.",
  },
  {
    id: "M010",
    date: "2024-08-15",
    equipmentType: "Excavator",
    equipmentId: "EXC-320D",
    maintenanceType: "Preventive",
    description: "Greasing and lubrication service",
    status: "Completed",
    priority: "Low",
    performedBy: "Muhammad Nurhidayat Gani",
    duration: 2.0,
    cost: 350000,
    notes: "All grease points serviced. Swing bearing greased.",
  },
];

// Calculate statistics
export function getMaintenanceStats(records: MaintenanceRecord[]) {
  const completed = records.filter((r) => r.status === "Completed");

  const totalCost = completed.reduce((sum, r) => sum + (r.cost || 0), 0);
  const totalHours = completed.reduce((sum, r) => sum + r.duration, 0);
  const avgCost = totalCost / completed.length || 0;
  const avgDuration = totalHours / completed.length || 0;

  const byType = {
    Preventive: completed.filter((r) => r.maintenanceType === "Preventive")
      .length,
    Corrective: completed.filter((r) => r.maintenanceType === "Corrective")
      .length,
    Inspection: completed.filter((r) => r.maintenanceType === "Inspection")
      .length,
    Repair: completed.filter((r) => r.maintenanceType === "Repair").length,
  };

  const byPriority = {
    Low: records.filter((r) => r.priority === "Low").length,
    Medium: records.filter((r) => r.priority === "Medium").length,
    High: records.filter((r) => r.priority === "High").length,
    Critical: records.filter((r) => r.priority === "Critical").length,
  };

  return {
    totalRecords: records.length,
    completedRecords: completed.length,
    scheduledRecords: records.filter((r) => r.status === "Scheduled").length,
    totalCost,
    totalHours,
    avgCost,
    avgDuration,
    byType,
    byPriority,
  };
}

// Get monthly maintenance data for charts
export function getMonthlyData(records: MaintenanceRecord[]) {
  const monthlyMap = new Map<
    string,
    { count: number; cost: number; hours: number }
  >();

  records
    .filter((r) => r.status === "Completed")
    .forEach((record) => {
      const month = record.date.substring(0, 7); // YYYY-MM
      const existing = monthlyMap.get(month) || { count: 0, cost: 0, hours: 0 };

      monthlyMap.set(month, {
        count: existing.count + 1,
        cost: existing.cost + (record.cost || 0),
        hours: existing.hours + record.duration,
      });
    });

  return Array.from(monthlyMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
}
