import { motion } from "framer-motion"
import {
  AlertTriangle,
  Skull,
  Activity,
  AlertOctagon,
  Shield,
  ExternalLink,
  Info,
  Calendar,
  PillIcon,
} from "lucide-react"

const getSeverityColor = (score) => {
  if (score >= 90) return "text-red-500 dark:text-red-400"
  if (score >= 70) return "text-orange-500 dark:text-orange-400"
  return "text-yellow-500 dark:text-yellow-400"
}

const getSeverityBadge = (status) => {
  switch (status) {
    case "Banned":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
          <Skull className="w-3 h-3" /> Banned
        </span>
      )
    case "Restricted":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
          <AlertOctagon className="w-3 h-3" /> Restricted
        </span>
      )
    case "Under Review":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
          <Activity className="w-3 h-3" /> Under Review
        </span>
      )
    case "Warning Issued":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200">
          <AlertTriangle className="w-3 h-3" /> Warning Issued
        </span>
      )
    default:
      return null
  }
}

export function MedicationCard({ medication }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <div className="overflow-hidden border rounded-lg shadow-sm dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <PillIcon className="w-5 h-5" />
                {medication.name}
                <span className="text-sm text-gray-500 dark:text-gray-400">({medication.genericName})</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{medication.category}</p>
            </div>
            <div className="flex items-center gap-2">{getSeverityBadge(medication.status)}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scores */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" /> Risk Scores
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Bad Effect Score</span>
                    <span className={`font-bold ${getSeverityColor(medication.badEffectScore)}`}>
                      {medication.badEffectScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        medication.badEffectScore >= 90
                          ? "bg-red-500"
                          : medication.badEffectScore >= 70
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${medication.badEffectScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Flagged By Score</span>
                    <span className={`font-bold ${getSeverityColor(medication.flaggedByScore)}`}>
                      {medication.flaggedByScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        medication.flaggedByScore >= 90
                          ? "bg-red-500"
                          : medication.flaggedByScore >= 70
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${medication.flaggedByScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Organizations */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" /> Flagged By
              </h3>
              <div className="flex flex-wrap gap-2">
                {medication.organizations.map((org) => (
                  <span
                    key={org}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-sm border ${
                      org === "WHO"
                        ? "border-blue-500 text-blue-600"
                        : org === "FDA"
                          ? "border-green-500 text-green-600"
                          : "border-purple-500 text-purple-600"
                    }`}
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-6 space-y-4">
            {/* Incidents */}
            <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => document.getElementById(`incidents-${medication.id}`).classList.toggle("hidden")}
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Reported Incidents
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id={`incidents-${medication.id}`} className="hidden p-4 space-y-4">
                {medication.incidents.map((incident, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{incident.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {incident.location} • {incident.date}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {incident.affectedPatients.toLocaleString()} affected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings & Updates */}
            <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => document.getElementById(`warnings-${medication.id}`).classList.toggle("hidden")}
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Warnings & Updates
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id={`warnings-${medication.id}`} className="hidden p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Warnings</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {medication.warnings.map((warning, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recent Updates</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {medication.recentUpdates.map((update, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400">
                          {update}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives */}
            <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => document.getElementById(`alternatives-${medication.id}`).classList.toggle("hidden")}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Alternatives
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id={`alternatives-${medication.id}`} className="hidden p-4">
                <div className="flex flex-wrap gap-2">
                  {medication.alternatives.map((alt, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Last updated: {medication.incidents[0].date}</span>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
            <ExternalLink className="w-4 h-4" />
            Learn More
          </button>
        </div> 
      </div>
    </motion.div>
  )
}

