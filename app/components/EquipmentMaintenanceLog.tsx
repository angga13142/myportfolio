"use client";

import { useState, useMemo } from "react";
import {
  maintenanceRecords,
  MaintenanceRecord,
  getMaintenanceStats,
  getMonthlyData,
} from "@/app/lib/maintenance-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Wrench,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";

const COLORS = {
  Preventive: "#22c55e",
  Corrective: "#f59e0b",
  Inspection: "#3b82f6",
  Repair: "#ef4444",
};

const PRIORITY_COLORS = {
  Low: "#6b7280",
  Medium: "#3b82f6",
  High: "#f59e0b",
  Critical: "#ef4444",
};

const STATUS_COLORS = {
  Completed: "#22c55e",
  "In Progress": "#f59e0b",
  Scheduled: "#3b82f6",
};

export default function EquipmentMaintenanceLog() {
  const [filter, setFilter] = useState({
    type: "All",
    status: "All",
    priority: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered records
  const filteredRecords = useMemo(() => {
    return maintenanceRecords.filter((record) => {
      const typeMatch =
        filter.type === "All" || record.maintenanceType === filter.type;
      const statusMatch =
        filter.status === "All" || record.status === filter.status;
      const priorityMatch =
        filter.priority === "All" || record.priority === filter.priority;
      const searchMatch =
        searchTerm === "" ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.equipmentId.toLowerCase().includes(searchTerm.toLowerCase());

      return typeMatch && statusMatch && priorityMatch && searchMatch;
    });
  }, [filter, searchTerm]);

  const stats = getMaintenanceStats(filteredRecords);
  const monthlyData = getMonthlyData(maintenanceRecords);

  // Prepare chart data
  const typeData = Object.entries(stats.byType).map(([name, value]) => ({
    name,
    value,
  }));

  const priorityData = Object.entries(stats.byPriority).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const handleExport = () => {
    const csv = [
      [
        "ID",
        "Date",
        "Equipment",
        "Type",
        "Description",
        "Status",
        "Priority",
        "Duration",
        "Cost",
      ],
      ...filteredRecords.map((r) => [
        r.id,
        r.date,
        r.equipmentId,
        r.maintenanceType,
        r.description,
        r.status,
        r.priority,
        r.duration,
        r.cost || 0,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `maintenance-log-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
            <Settings className="w-8 h-8 text-green-500" />
            Equipment Maintenance Log
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Systematic tracking and analysis of equipment maintenance activities
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Records
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                {stats.totalRecords}
              </p>
            </div>
            <Calendar className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {stats.completedRecords}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Cost
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                Rp {(stats.totalCost / 1000000).toFixed(1)}M
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Hours
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                {stats.totalHours.toFixed(1)}
              </p>
            </div>
            <Clock className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search description..."
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Type
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <option>All</option>
              <option>Preventive</option>
              <option>Corrective</option>
              <option>Inspection</option>
              <option>Repair</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Status
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <option>All</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Scheduled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Priority
            </label>
            <select
              value={filter.priority}
              onChange={(e) =>
                setFilter({ ...filter, priority: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance by Type */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Maintenance by Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) =>
                  `${entry.name} (${(entry.percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance by Priority */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Distribution by Priority
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e">
                {priorityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      PRIORITY_COLORS[
                        entry.name as keyof typeof PRIORITY_COLORS
                      ]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Monthly Maintenance Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="count"
              stroke="#22c55e"
              name="Count"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              name="Hours"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Maintenance Records Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Maintenance Records ({filteredRecords.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {record.equipmentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: COLORS[record.maintenanceType] + "20",
                        color: COLORS[record.maintenanceType],
                      }}
                    >
                      {record.maintenanceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                    {record.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[record.status] + "20",
                        color: STATUS_COLORS[record.status],
                      }}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor:
                          PRIORITY_COLORS[record.priority] + "20",
                        color: PRIORITY_COLORS[record.priority],
                      }}
                    >
                      {record.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {record.duration}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
