"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from "prop-types"

const mockAnalysis = {
  drugName: "Lisinopril",
  genericName: "Lisinopril",
  drugClass: "ACE Inhibitor",
  manufacturer: "Various Generic Manufacturers",
  approvalDate: "1987-12-29",
  dosage: "10mg",
  frequency: "Once daily",
  duration: "30 days",
  qualityScore: 85,
  ageRange: "18 years and older",
  pregnancyCategory: "D",
  breastfeedingSafe: false,
  flaggedBy: [
    {
      agency: "FDA",
      reason: "Potential risk of birth defects if used during pregnancy",
      date: "2019-07-15",
    },
    {
      agency: "EMA",
      reason: "Monitoring for angioedema in certain populations",
      date: "2020-03-22",
    },
  ],
  recentSideEffects: [
    {
      effect: "Dry cough",
      reportDate: "2023-05-10",
      severity: "Mild",
    },
    {
      effect: "Dizziness",
      reportDate: "2023-05-08",
      severity: "Moderate",
    },
    {
      effect: "Headache",
      reportDate: "2023-05-05",
      severity: "Mild",
    },
  ],
  commonSideEffects: ["Dizziness", "Headache", "Cough", "High potassium levels"],
  rareSideEffects: ["Angioedema", "Liver failure", "Pancreatitis"],
  interactions: ["NSAIDs (e.g., ibuprofen)", "Potassium supplements", "Lithium"],
  precautions: ["Monitor blood pressure regularly", "Avoid excessive sun exposure", "Stay hydrated"],
  alternatives: ["Enalapril", "Ramipril", "Losartan"],
  foodInteractions: ["Avoid excessive potassium-rich foods", "Limit alcohol consumption"],
  storageInstructions: "Store at room temperature (68-77°F or 20-25°C) away from light and moisture",
  disposalInstructions: "Do not flush medications down the toilet. Use a medicine take-back program if available.",
  costEstimate: "$10 - $30 per month (generic)",
  insuranceCoverage: "Commonly covered by most insurance plans",
}

export function PrescriptionAnalyzer({ darkMode }) {
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [expandedSections, setExpandedSections] = useState([])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsAnalyzing(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAnalysisResult(mockAnalysis)
    setIsAnalyzing(false)
  }

  const resetAnalysis = () => {
    setFile(null)
    setAnalysisResult(null)
    setExpandedSections([])
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const getQualityScoreColor = (score) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Mild":
        return "text-yellow-500"
      case "Moderate":
        return "text-orange-500"
      case "Severe":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white ${darkMode ? "bg-gray-800" : ""} rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 text-center text-blue-600 ${darkMode ? "text-blue-400" : ""}`}>
        Detailed Prescription Analyzer
      </h2>

      {!analysisResult && (
        <div className="mb-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${darkMode ? "hover:bg-gray-800 dark:bg-gray-700" : "hover:bg-gray-100"} dark:border-gray-600 dark:hover:border-gray-500`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className={`mb-2 text-sm text-gray-500 ${darkMode ? "dark:text-gray-400" : ""}`}>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className={`text-xs text-gray-500 ${darkMode ? "dark:text-gray-400" : ""}`}>
                  PNG, JPG or PDF (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.pdf"
              />
            </label>
          </div>
          {file && (
            <div
              className={`mt-4 flex items-center justify-between bg-blue-50 ${darkMode ? "dark:bg-blue-900" : ""} p-4 rounded-lg`}
            >
              <span className={`text-sm text-blue-700 ${darkMode ? "dark:text-blue-300" : ""}`}>{file.name}</span>
              <button
                onClick={handleUpload}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${darkMode ? "dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700" : ""}`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Prescription"}
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64"
          >
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className={`mt-4 text-lg text-gray-600 ${darkMode ? "dark:text-gray-300" : ""}`}>
              Analyzing your prescription...
            </p>
          </motion.div>
        )}

        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-gray-50 ${darkMode ? "dark:bg-gray-700" : ""} p-6 rounded-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold text-gray-800 ${darkMode ? "dark:text-gray-200" : ""}`}>
                Detailed Analysis Results
              </h3>
              <button
                onClick={resetAnalysis}
                className={`text-gray-500 hover:text-gray-700 ${darkMode ? "dark:text-gray-400 dark:hover:text-gray-200" : ""}`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Basic Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Drug Name:</strong> {analysisResult.drugName}
                  </p>
                  <p>
                    <strong>Generic Name:</strong> {analysisResult.genericName}
                  </p>
                  <p>
                    <strong>Drug Class:</strong> {analysisResult.drugClass}
                  </p>
                  <p>
                    <strong>Manufacturer:</strong> {analysisResult.manufacturer}
                  </p>
                  <p>
                    <strong>Approval Date:</strong> {analysisResult.approvalDate}
                  </p>
                  <p>
                    <strong>Age Range:</strong> {analysisResult.ageRange}
                  </p>
                </div>
              </div>

              {/* Dosage Information */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Dosage Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Dosage:</strong> {analysisResult.dosage}
                  </p>
                  <p>
                    <strong>Frequency:</strong> {analysisResult.frequency}
                  </p>
                  <p>
                    <strong>Duration:</strong> {analysisResult.duration}
                  </p>
                </div>
              </div>

              {/* Quality Assessment */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Quality Assessment
                </h4>
                <p>
                  <strong>Quality Score:</strong>{" "}
                  <span className={getQualityScoreColor(analysisResult.qualityScore)}>
                    {analysisResult.qualityScore}/100
                  </span>
                </p>
              </div>

              {/* Agency Flags */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Agency Flags
                </h4>
                {analysisResult.flaggedBy.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {analysisResult.flaggedBy.map((flag, index) => (
                      <li key={index} className={`text-yellow-600 ${darkMode ? "dark:text-yellow-400" : ""}`}>
                        <strong>{flag.agency}:</strong> {flag.reason} (Flagged on: {flag.date})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No flags reported by agencies.</p>
                )}
              </div>

              {/* Recent Side Effects */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Recent Side Effects Reports
                </h4>
                <ul className="space-y-2">
                  {analysisResult.recentSideEffects.map((effect, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{effect.effect}</span>
                      <span className="text-sm text-gray-500">{effect.reportDate}</span>
                      <span className={`text-sm ${getSeverityColor(effect.severity)}`}>{effect.severity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Sections */}
              {[
                { title: "Common Side Effects", data: analysisResult.commonSideEffects },
                { title: "Rare Side Effects", data: analysisResult.rareSideEffects },
                { title: "Interactions", data: analysisResult.interactions },
                { title: "Precautions", data: analysisResult.precautions },
                { title: "Alternatives", data: analysisResult.alternatives },
                { title: "Food Interactions", data: analysisResult.foodInteractions },
              ].map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`flex justify-between items-center w-full text-left font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}
                  >
                    <span>{section.title}</span>
                    {expandedSections.includes(section.title) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.includes(section.title) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${darkMode ? "dark:text-gray-300" : ""}`}
                      >
                        {section.data.map((item, index) => (
                          <li key={index} className={`text-gray-600 ${darkMode ? "dark:text-gray-300" : ""}`}>
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Additional Information */}
              <div>
                <h4 className={`font-semibold mb-2 text-blue-600 ${darkMode ? "dark:text-blue-400" : ""}`}>
                  Additional Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Pregnancy Category:</strong> {analysisResult.pregnancyCategory}
                  </p>
                  <p>
                    <strong>Safe for Breastfeeding:</strong> {analysisResult.breastfeedingSafe ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Storage Instructions:</strong> {analysisResult.storageInstructions}
                  </p>
                  <p>
                    <strong>Disposal Instructions:</strong> {analysisResult.disposalInstructions}
                  </p>
                  <p>
                    <strong>Cost Estimate:</strong> {analysisResult.costEstimate}
                  </p>
                  <p>
                    <strong>Insurance Coverage:</strong> {analysisResult.insuranceCoverage}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${darkMode ? "dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700" : ""}`}
              >
                Consult with Doctor
              </button>
              <button
                className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ${darkMode ? "dark:bg-green-600 dark:text-white dark:hover:bg-green-700" : ""}`}
              >
                Schedule Pickup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

PrescriptionAnalyzer.propTypes = {
  darkMode: PropTypes.bool,
}

PrescriptionAnalyzer.defaultProps = {
  darkMode: false,
}
