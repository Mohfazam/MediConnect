"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  AlertTriangle,
  Skull,
  Activity,
  Search,
  AlertOctagon,
  History,
  PillIcon,
  Shield,
  ExternalLink,
  Share2,
  Bell,
  Zap,
  Eye,
} from "lucide-react"
import { Navbar } from "./Navbar"

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
  const [showNotification, setShowNotification] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isComparing, setIsComparing] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState([])
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMed = FLAGGED_MEDICATIONS[Math.floor(Math.random() * FLAGGED_MEDICATIONS.length)]
      const newNotification = {
        id: Date.now(),
        title: `Update for ${randomMed.name}`,
        message: `New safety data available for ${randomMed.name}`,
        timestamp: new Date().toISOString(),
      }
      setNotifications((prev) => [newNotification, ...prev].slice(0, 5))
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleCompareSelect = (medId) => {
    if (selectedForComparison.includes(medId)) {
      setSelectedForComparison((prev) => prev.filter((id) => id !== medId))
    } else if (selectedForComparison.length < 2) {
      setSelectedForComparison((prev) => [...prev, medId])
    }
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 z-50" style={{ scaleX }} />

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && notifications[0] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 z-50 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <div>
                <h4 className="font-semibold">{notifications[0].title}</h4>
                <p className="text-sm">{notifications[0].message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Floating Action Button */}
          <button
            onClick={() => setIsComparing(!isComparing)}
            className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg z-40 transition-transform hover:scale-105 active:scale-95"
          >
            <Share2 className="w-6 h-6" />
          </button>

          {/* Compare Mode Banner */}
          <AnimatePresence>
            {isComparing && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Compare Mode: Select two medications to compare</span>
                  </div>
                  <span className="text-sm">{selectedForComparison.length}/2 selected</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="space-y-4 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-8 rounded-lg text-white">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-bold">Serious Medications Watch</h1>
                <p className="text-gray-100">Real-time tracking of medications with significant health concerns</p>
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
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
            <AnimatePresence>
              {filteredMedications.map((medication) => (
                <motion.div
                  key={medication.id}
                  variants={itemVariants}
                  layoutId={medication.id}
                  className={`${selectedForComparison.includes(medication.id) ? "ring-2 ring-blue-500" : ""}`}
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

                      {/* Recent Activity */}
                      <div className="p-4 border-t dark:border-gray-700">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <History className="w-4 h-4" />
                          Recent Activity
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                            <span className="font-medium">
                              {new Date(medication.recentUpdates[0]?.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Affected Batches</span>
                            <span className="font-medium">{medication.affectedBatches}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Footer */}
                    <div className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleCompareSelect(medication.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            selectedForComparison.includes(medication.id)
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-transform hover:scale-105 active:scale-95"
                          onClick={() => {
                            // Add to watchlist functionality
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 text-sm transition-transform hover:scale-105 active:scale-95">
                        Learn More <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

