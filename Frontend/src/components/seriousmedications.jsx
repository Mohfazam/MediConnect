"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  Skull,
  Activity,
  Search,
  AlertOctagon,
  History,
  PillIcon,
  Shield,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { Navbar } from "./Navbar" // Import the Navbar component

// Sample data structure for serious medications
const FLAGGED_MEDICATIONS = [
  {
    id: "1",
    name: "Ranitidine (Zantac)",
    category: "Acid Reducer",
    status: "Recalled",
    badEffectScore: 85,
    flaggedByScore: 95,
    dateIdentified: "2019-09-13",
    organizations: ["FDA", "WHO", "ICMR"],
    healthImpacts: [
      {
        type: "Cancer Risk",
        description: "Potential carcinogenic effects due to NDMA contamination",
        severity: "High",
        evidenceLevel: "Strong",
      },
    ],
    affectedBatches: "All batches manufactured before 2020",
    alternatives: ["Famotidine", "Omeprazole", "Esomeprazole"],
    recentUpdates: [
      {
        date: "2023-12-15",
        title: "New Study Results",
        description: "Long-term exposure study confirms increased cancer risk",
      },
    ],
  },
  {
    id: "2",
    name: "Metformin Extended Release",
    category: "Diabetes Medication",
    status: "Under Investigation",
    badEffectScore: 75,
    flaggedByScore: 80,
    dateIdentified: "2020-05-28",
    organizations: ["FDA", "ICMR"],
    healthImpacts: [
      {
        type: "Contamination",
        description: "NDMA levels above acceptable daily intake limit",
        severity: "Moderate",
        evidenceLevel: "Moderate",
      },
    ],
    affectedBatches: "Select batches from specific manufacturers",
    alternatives: ["Immediate-release Metformin", "Sulfonylureas", "DPP-4 inhibitors"],
    recentUpdates: [
      {
        date: "2024-01-10",
        title: "Ongoing Investigation",
        description: "Additional manufacturers being tested for NDMA contamination",
      },
    ],
  },
  {
    id: "3",
    name: "Valsartan",
    category: "Blood Pressure Medication",
    status: "Partially Recalled",
    badEffectScore: 90,
    flaggedByScore: 88,
    dateIdentified: "2018-07-13",
    organizations: ["FDA", "WHO", "ICMR"],
    healthImpacts: [
      {
        type: "Cancer Risk",
        description: "NDMA and NDEA contamination",
        severity: "High",
        evidenceLevel: "Strong",
      },
      {
        type: "Liver Damage",
        description: "Potential liver function abnormalities",
        severity: "Moderate",
        evidenceLevel: "Moderate",
      },
    ],
    affectedBatches: "Multiple batches from various manufacturers",
    alternatives: ["Losartan", "Olmesartan", "Telmisartan"],
    recentUpdates: [
      {
        date: "2024-01-20",
        title: "Manufacturing Changes",
        description: "New production processes implemented to prevent contamination",
      },
    ],
  },
]

const SEVERITY_COLORS = {
  High: "text-red-500 dark:text-red-400",
  Moderate: "text-orange-500 dark:text-orange-400",
  Low: "text-yellow-500 dark:text-yellow-400",
}

const EVIDENCE_COLORS = {
  Strong: "bg-green-500",
  Moderate: "bg-yellow-500",
  Limited: "bg-orange-500",
}

export function SeriousMedications() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedOrganization, setSelectedOrganization] = useState("all")
  const [expandedMedication, setExpandedMedication] = useState(null)
  const [sortBy, setSortBy] = useState("badEffectScore")

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Get unique categories
  const categories = Array.from(new Set(FLAGGED_MEDICATIONS.map((med) => med.category)))

  // Get unique organizations
  const organizations = Array.from(new Set(FLAGGED_MEDICATIONS.flatMap((med) => med.organizations)))

  // Filter and sort medications
  const filteredMedications = FLAGGED_MEDICATIONS.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || med.category === selectedCategory
    const matchesOrganization = selectedOrganization === "all" || med.organizations.includes(selectedOrganization)
    return matchesSearch && matchesCategory && matchesOrganization
  }).sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-12 h-12 text-red-500" />
              <div>
                <h1 className="text-3xl font-bold">Serious Medications Watch</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Tracking medications with significant health concerns and regulatory warnings
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
            >
              <option value="all">All Organizations</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            <select
              className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="badEffectScore">Sort by Risk Score</option>
              <option value="flaggedByScore">Sort by Warning Level</option>
            </select>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">High Risk Medications</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {FLAGGED_MEDICATIONS.filter((med) => med.badEffectScore >= 85).length}
                  </p>
                </div>
                <Skull className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Under Investigation</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {FLAGGED_MEDICATIONS.filter((med) => med.status === "Under Investigation").length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Recent Updates</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {
                      FLAGGED_MEDICATIONS.filter(
                        (med) => new Date(med.recentUpdates[0]?.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                      ).length
                    }
                  </p>
                </div>
                <History className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Medications List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMedications.map((medication) => (
                <motion.div
                  key={medication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <PillIcon className="w-5 h-5 text-red-500" />
                            <h3 className="text-lg font-semibold">{medication.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{medication.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {medication.status === "Recalled" && (
                            <span className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <AlertOctagon className="w-3 h-3" /> Recalled
                            </span>
                          )}
                          {medication.status === "Under Investigation" && (
                            <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Activity className="w-3 h-3" /> Under Investigation
                            </span>
                          )}
                          {medication.status === "Partially Recalled" && (
                            <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Partially Recalled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Risk Scores */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
                            <span
                              className={`font-bold ${
                                medication.badEffectScore >= 85
                                  ? "text-red-500 dark:text-red-400"
                                  : medication.badEffectScore >= 70
                                    ? "text-orange-500 dark:text-orange-400"
                                    : "text-yellow-500 dark:text-yellow-400"
                              }`}
                            >
                              {medication.badEffectScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                medication.badEffectScore >= 85
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
                            <span className="text-sm text-gray-600 dark:text-gray-400">Warning Level</span>
                            <span
                              className={`font-bold ${
                                medication.flaggedByScore >= 85
                                  ? "text-red-500 dark:text-red-400"
                                  : medication.flaggedByScore >= 70
                                    ? "text-orange-500 dark:text-orange-400"
                                    : "text-yellow-500 dark:text-yellow-400"
                              }`}
                            >
                              {medication.flaggedByScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                medication.flaggedByScore >= 85
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

                      {/* Organizations */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Flagged By</h4>
                        <div className="flex flex-wrap gap-2">
                          {medication.organizations.map((org) => (
                            <span
                              key={org}
                              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                            >
                              <Shield className="w-3 h-3" />
                              {org}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Health Impacts */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Health Impacts</h4>
                        <div className="space-y-3">
                          {medication.healthImpacts.map((impact, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium">{impact.type}</h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{impact.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${SEVERITY_COLORS[impact.severity]}`}
                                  >
                                    {impact.severity} Severity
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full text-white ${
                                      EVIDENCE_COLORS[impact.evidenceLevel]
                                    }`}
                                  >
                                    {impact.evidenceLevel} Evidence
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Alternatives */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Alternative Medications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {medication.alternatives.map((alt, index) => (
                            <span
                              key={index}
                              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm"
                            >
                              {alt}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recent Updates */}
                      {medication.recentUpdates.length > 0 && (
                        <div className="border-t dark:border-gray-700 pt-4 mt-4">
                          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                            <History className="w-4 h-4" />
                            Recent Updates
                          </h4>
                          <div className="space-y-2">
                            {medication.recentUpdates.map((update, index) => (
                              <div key={index} className="text-sm">
                                <p className="text-gray-500 dark:text-gray-400">
                                  {new Date(update.date).toLocaleDateString()}
                                </p>
                                <p className="font-medium">{update.title}</p>
                                <p className="text-gray-600 dark:text-gray-400">{update.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        Identified: {new Date(medication.dateIdentified).toLocaleDateString()}
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 text-sm">
                        Learn More <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

