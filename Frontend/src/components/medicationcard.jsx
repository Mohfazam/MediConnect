import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Activity, AlertOctagon, Shield, ExternalLink, Info, Calendar, PillIcon } from "lucide-react";

const getSeverityBadge = (status) => {
  switch (status) {
    case "critical":
      return <AlertOctagon className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "safe":
      return <Shield className="w-5 h-5 text-green-500" />;
    default:
      return null;
  }
};

const getSeverityColor = (score) => {
  if (score >= 90) {
    return "text-red-500";
  } else if (score >= 70) {
    return "text-orange-500";
  } else {
    return "text-yellow-500";
  }
};

export function MedicationCard({ medication }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group mb-6"
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
                {medication.organizations?.map((org, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-sm border ${
                      org.organization === "WHO"
                        ? "border-blue-500 text-blue-600"
                        : org.organization === "FDA"
                        ? "border-green-500 text-green-600"
                        : "border-purple-500 text-purple-600"
                    }`}
                  >
                    {org.organization}
                    {org.flaggedAt && (
                      <span className="ml-2 text-xs text-gray-500">
                        {new Date(org.flaggedAt).toLocaleDateString()}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-6 space-y-4">
            {/* Incidents */}
            {medication.incidents && medication.incidents.length > 0 && (
              <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => document.getElementById(`incidents-${medication._id}`).classList.toggle("hidden")}
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Reported Incidents
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id={`incidents-${medication._id}`} className="hidden p-4 space-y-4">
                  {medication.incidents.map((incident, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{incident.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {incident.location} • {new Date(incident.occuredAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {incident.affectedPatients?.toLocaleString()} affected
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings & Updates */}
            {(medication.warnings?.length > 0 || medication.recentUpdates?.length > 0) && (
              <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => document.getElementById(`warnings-${medication._id}`).classList.toggle("hidden")}
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Warnings & Updates
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id={`warnings-${medication._id}`} className="hidden p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {medication.warnings?.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Warnings</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {medication.warnings.map((warning, index) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">
                              {warning.content || warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {medication.recentUpdates?.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Recent Updates</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {medication.recentUpdates.map((update, index) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">
                              {update.title || update}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Alternatives */}
            {medication.alternatives?.length > 0 && (
              <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => document.getElementById(`alternatives-${medication._id}`).classList.toggle("hidden")}
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Alternatives
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id={`alternatives-${medication._id}`} className="hidden p-4">
                  <div className="flex flex-wrap gap-2">
                    {medication.alternatives.map((alt, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {alt.name || alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Last updated: {new Date(medication.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
            <ExternalLink className="w-4 h-4" />
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}