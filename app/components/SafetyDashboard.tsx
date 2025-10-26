"use client";
import { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Award,
  Clock,
  Calendar,
  Activity,
} from "lucide-react";

interface SafetyMetric {
  month: string;
  incidents: number;
  nearMiss: number;
  p2hCompliance: number;
  trainingHours: number;
}

const safetyData: SafetyMetric[] = [
  {
    month: "Jan",
    incidents: 0,
    nearMiss: 2,
    p2hCompliance: 95,
    trainingHours: 8,
  },
  {
    month: "Feb",
    incidents: 0,
    nearMiss: 1,
    p2hCompliance: 96,
    trainingHours: 6,
  },
  {
    month: "Mar",
    incidents: 0,
    nearMiss: 1,
    p2hCompliance: 97,
    trainingHours: 10,
  },
  {
    month: "Apr",
    incidents: 0,
    nearMiss: 0,
    p2hCompliance: 98,
    trainingHours: 8,
  },
  {
    month: "May",
    incidents: 0,
    nearMiss: 1,
    p2hCompliance: 98,
    trainingHours: 12,
  },
  {
    month: "Jun",
    incidents: 0,
    nearMiss: 0,
    p2hCompliance: 99,
    trainingHours: 8,
  },
];

export function SafetyDashboard() {
  const [daysWithoutIncident, setDaysWithoutIncident] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<
    "incidents" | "nearMiss" | "p2hCompliance"
  >("incidents");

  // Calculate days without incident (from start of 2024)
  useEffect(() => {
    const startDate = new Date("2024-01-01");
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysWithoutIncident(diffDays);
  }, []);

  // Calculate statistics
  const totalIncidents = safetyData.reduce((sum, d) => sum + d.incidents, 0);
  const totalNearMiss = safetyData.reduce((sum, d) => sum + d.nearMiss, 0);
  const avgCompliance = Math.round(
    safetyData.reduce((sum, d) => sum + d.p2hCompliance, 0) / safetyData.length
  );
  const totalTrainingHours = safetyData.reduce(
    (sum, d) => sum + d.trainingHours,
    0
  );

  // Chart scaling
  const maxValue = Math.max(
    ...safetyData.map((d) => {
      if (selectedMetric === "p2hCompliance") return 100;
      return selectedMetric === "incidents" ? d.incidents : d.nearMiss;
    })
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Safety Performance Dashboard
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Real-time tracking of safety metrics and compliance standards
        </p>
      </div>

      {/* Days Without Incident Counter */}
      <div className="glass p-8 rounded-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-500/20 rounded-full">
              <Shield className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <div className="text-6xl md:text-8xl font-bold text-green-400 mb-2 tabular-nums">
            {daysWithoutIncident}
          </div>
          <div className="text-xl text-zinc-300 font-medium mb-1">
            Days Without Incident
          </div>
          <div className="text-sm text-zinc-500">
            Perfect safety record maintained
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-xl hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-zinc-400">Total Incidents</span>
          </div>
          <div className="text-4xl font-bold text-green-400">
            {totalIncidents}
          </div>
          <div className="text-xs text-zinc-500 mt-1">6 months record</div>
        </div>

        <div className="glass p-6 rounded-xl hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm text-zinc-400">Near-Miss</span>
          </div>
          <div className="text-4xl font-bold text-yellow-400">
            {totalNearMiss}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Reported & resolved</div>
        </div>

        <div className="glass p-6 rounded-xl hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-zinc-400">P2H Compliance</span>
          </div>
          <div className="text-4xl font-bold text-blue-400">
            {avgCompliance}%
          </div>
          <div className="text-xs text-zinc-500 mt-1">Average rate</div>
        </div>

        <div className="glass p-6 rounded-xl hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-zinc-400">Training Hours</span>
          </div>
          <div className="text-4xl font-bold text-purple-400">
            {totalTrainingHours}
          </div>
          <div className="text-xs text-zinc-500 mt-1">YTD total</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass p-6 rounded-xl">
        {/* Chart Controls */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedMetric("incidents")}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedMetric === "incidents"
                ? "bg-green-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            Incidents
          </button>
          <button
            onClick={() => setSelectedMetric("nearMiss")}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedMetric === "nearMiss"
                ? "bg-yellow-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            Near-Miss Events
          </button>
          <button
            onClick={() => setSelectedMetric("p2hCompliance")}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedMetric === "p2hCompliance"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            P2H Compliance
          </button>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {safetyData.map((data, i) => {
            const value =
              selectedMetric === "p2hCompliance"
                ? data.p2hCompliance
                : selectedMetric === "incidents"
                ? data.incidents
                : data.nearMiss;

            const percentage =
              selectedMetric === "p2hCompliance"
                ? value
                : maxValue > 0
                ? (value / maxValue) * 100
                : 0;

            const color =
              selectedMetric === "p2hCompliance"
                ? "from-blue-500 to-cyan-500"
                : selectedMetric === "incidents"
                ? "from-green-500 to-emerald-500"
                : "from-yellow-500 to-orange-500";

            return (
              <div key={i} className="group">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-sm text-zinc-400 font-medium">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="h-10 bg-zinc-900 rounded-lg overflow-hidden relative">
                      <div
                        className={`h-full bg-gradient-to-r ${color} rounded-lg transition-all duration-1000 flex items-center justify-end px-3`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-sm font-bold text-white">
                          {selectedMetric === "p2hCompliance"
                            ? `${value}%`
                            : value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Inspection Heat Map */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          P2H Inspection Completion Rate
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {/* Day labels */}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-xs text-zinc-500 text-center py-1">
              {day}
            </div>
          ))}

          {/* Mock heat map data (4 weeks) */}
          {Array.from({ length: 28 }).map((_, i) => {
            // Simulate completion: most days 100%, occasional 95%
            const completion = i % 7 === 0 ? 95 : i % 11 === 0 ? 90 : 100;
            const bgColor =
              completion === 100
                ? "bg-green-500"
                : completion >= 95
                ? "bg-green-400"
                : "bg-yellow-400";

            return (
              <div
                key={i}
                className={`aspect-square ${bgColor} rounded transition-transform hover:scale-110 cursor-pointer`}
                title={`Day ${i + 1}: ${completion}% completion`}
              />
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded" />
            <span>90-94%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded" />
            <span>95-99%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Safety Achievements */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Safety Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg mt-1">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200 mb-1">
                  Zero Incident Record
                </div>
                <div className="text-sm text-zinc-400">
                  Maintained perfect safety record for {daysWithoutIncident}+
                  days
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200 mb-1">
                  Excellent P2H Compliance
                </div>
                <div className="text-sm text-zinc-400">
                  {avgCompliance}% average completion rate across all
                  inspections
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200 mb-1">
                  Continuous Training
                </div>
                <div className="text-sm text-zinc-400">
                  {totalTrainingHours} hours of safety training completed this
                  year
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg mt-1">
                <TrendingDown className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200 mb-1">
                  Proactive Safety
                </div>
                <div className="text-sm text-zinc-400">
                  All {totalNearMiss} near-miss events reported and resolved
                  immediately
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
