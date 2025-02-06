import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Pill,
  DollarSign,
  Sun,
  Moon,
  Wind,
  CloudRain,
  Clock,
  Utensils,
  Activity,
  BookOpen,
  Printer,
} from "lucide-react";
import PropTypes from "prop-types";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import * as d3 from "d3";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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
      count: 15,
    },
    {
      effect: "Dizziness",
      reportDate: "2023-05-08",
      severity: "Moderate",
      count: 8,
    },
    {
      effect: "Headache",
      reportDate: "2023-05-05",
      severity: "Mild",
      count: 12,
    },
    { effect: "Fatigue", reportDate: "2023-05-03", severity: "Mild", count: 7 },
    {
      effect: "Nausea",
      reportDate: "2023-05-01",
      severity: "Moderate",
      count: 5,
    },
  ],
  commonSideEffects: [
    "Dizziness",
    "Headache",
    "Cough",
    "High potassium levels",
  ],
  rareSideEffects: ["Angioedema", "Liver failure", "Pancreatitis"],
  interactions: [
    {
      drug: "NSAIDs (e.g., ibuprofen)",
      severity: "Moderate",
      effect: "May reduce effectiveness of Lisinopril",
    },
    {
      drug: "Potassium supplements",
      severity: "Severe",
      effect: "Risk of hyperkalemia (high potassium levels)",
    },
    {
      drug: "Lithium",
      severity: "Moderate",
      effect: "May increase lithium levels in the blood",
    },
    {
      drug: "Diuretics",
      severity: "Mild",
      effect: "May enhance blood pressure-lowering effect",
    },
    {
      drug: "Aliskiren",
      severity: "Severe",
      effect: "Increased risk of kidney problems and high potassium levels",
    },
  ],
  precautions: [
    "Monitor blood pressure regularly",
    "Avoid excessive sun exposure",
    "Stay hydrated",
    "Report any signs of allergic reactions immediately",
    "Avoid alcohol consumption",
  ],
  alternatives: ["Enalapril", "Ramipril", "Losartan"],
  foodInteractions: [
    { food: "Bananas", effect: "May increase potassium levels" },
    { food: "Salt substitutes", effect: "May increase potassium levels" },
    { food: "Alcohol", effect: "May enhance blood pressure-lowering effect" },
  ],
  storageInstructions:
    "Store at room temperature (68-77°F or 20-25°C) away from light and moisture",
  disposalInstructions:
    "Do not flush medications down the toilet. Use a medicine take-back program if available.",
  costEstimate: "₹500 - ₹1500 per month (generic)",
  insuranceCoverage: "Commonly covered by most insurance plans",
  patientReviews: [
    {
      rating: 4,
      comment: "Helped lower my blood pressure with minimal side effects.",
    },
    { rating: 3, comment: "Effective, but the dry cough is annoying." },
    { rating: 5, comment: "Great medication, no issues so far." },
    {
      rating: 2,
      comment: "Caused dizziness, had to switch to an alternative.",
    },
  ],
  efficacyData: [
    { month: 1, efficacy: 70 },
    { month: 2, efficacy: 75 },
    { month: 3, efficacy: 82 },
    { month: 4, efficacy: 85 },
    { month: 5, efficacy: 88 },
    { month: 6, efficacy: 90 },
  ],
  administrationTips: [
    "Take at the same time each day",
    "Can be taken with or without food",
    "Do not crush or chew the tablet",
    "If you miss a dose, take it as soon as you remember, unless it's close to your next scheduled dose",
  ],
  environmentalImpact: {
    productionFootprint: "Low",
    disposalImpact: "Moderate",
    recyclingOptions: "Blister pack recycling available in some areas",
  },
  halfLife: "12 hours",
  exerciseRecommendations: [
    "Moderate aerobic exercise for 30 minutes, 5 days a week",
    "Light strength training, 2-3 times a week",
    "Avoid high-intensity workouts without consulting your doctor",
  ],
  patientEducationMaterials: [
    { title: "Understanding ACE Inhibitors", url: "#" },
    { title: "Managing Hypertension", url: "#" },
    { title: "Lifestyle Changes for Heart Health", url: "#" },
  ],
  adherenceTracking: {
    lastWeek: [true, true, false, true, true, true, true],
    overallAdherence: 85,
  },
};

export function PrescriptionAnalyzer({ darkMode }) {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");
  const [showPatientReviews, setShowPatientReviews] = useState(false);
  const [showEfficacyChart, setShowEfficacyChart] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [adherenceData, setAdherenceData] = useState(
    mockAnalysis.adherenceTracking
  );

  const navigate = useNavigate();
  const interactionsRef = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAnalysisResult(mockAnalysis);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisResult(null);
    setExpandedSections([]);
    setSearchTerm("");
    setSelectedTimeOfDay("morning");
    setShowPatientReviews(false);
    setShowEfficacyChart(false);
    setAdherenceData(mockAnalysis.adherenceTracking);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Mild":
        return "text-yellow-500";
      case "Moderate":
        return "text-orange-500";
      case "Severe":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "Mild":
        return <Info className="w-5 h-5 text-yellow-500" />;
      case "Moderate":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "Severe":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const toggleAdherence = (index) => {
    setAdherenceData((prev) => {
      const newLastWeek = [...prev.lastWeek];
      newLastWeek[index] = !newLastWeek[index];
      const adherencePercentage =
        (newLastWeek.filter(Boolean).length / 7) * 100;
      return {
        lastWeek: newLastWeek,
        overallAdherence: Math.round(adherencePercentage),
      };
    });
  };

  useEffect(() => {
    if (analysisResult && interactionsRef.current) {
      renderInteractionsNetwork(
        analysisResult.interactions,
        interactionsRef.current,
        darkMode
      );
    }
  }, [analysisResult, darkMode]);

  useEffect(() => {
    // Simulating weather API call
    const fetchWeather = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentWeather({
        temperature: 72,
        condition: "Sunny",
        humidity: 60,
      });
    };
    fetchWeather();
  }, []);

  const filteredSections = Object.keys(analysisResult || {}).filter(
    (key) =>
      typeof analysisResult[key] === "string" &&
      analysisResult[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderWeatherInfo = () => {
    if (!currentWeather) return null;

    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          darkMode ? "bg-gray-700" : "bg-blue-50"
        }`}
      >
        <h4
          className={`text-lg font-semibold mb-2 ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Current Weather
        </h4>
        <div className="flex items-center space-x-4">
          {currentWeather.condition === "Sunny" ? (
            <Sun
              className={`w-8 h-8 ${
                darkMode ? "text-yellow-300" : "text-yellow-500"
              }`}
            />
          ) : currentWeather.condition === "Rainy" ? (
            <CloudRain
              className={`w-8 h-8 ${
                darkMode ? "text-blue-300" : "text-blue-500"
              }`}
            />
          ) : (
            <Wind
              className={`w-8 h-8 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
          )}
          <div>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {currentWeather.temperature}°F, {currentWeather.condition}
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Humidity: {currentWeather.humidity}%
            </p>
          </div>
        </div>
        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Remember to stay hydrated and protect yourself from the sun while
          taking this medication.
        </p>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Prescription Analyzer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze your prescriptions to understand their effects,
            interactions, and cost-effectiveness.
          </p>
        </div>

        {!analysisResult && (
          <div className="mb-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                  darkMode
                    ? "dark:hover:bg-gray-800 dark:bg-gray-700"
                    : "hover:bg-gray-100"
                } dark:border-gray-600 dark:hover:border-gray-500`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p
                    className={`mb-2 text-sm text-gray-500 ${
                      darkMode ? "dark:text-gray-400" : ""
                    }`}
                  >
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p
                    className={`text-xs text-gray-500 ${
                      darkMode ? "dark:text-gray-400" : ""
                    }`}
                  >
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
                className={`mt-4 flex items-center justify-between bg-blue-50 ${
                  darkMode ? "dark:bg-blue-900" : ""
                } p-4 rounded-lg`}
              >
                <span
                  className={`text-sm text-blue-700 ${
                    darkMode ? "dark:text-blue-300" : ""
                  }`}
                >
                  {file.name}
                </span>
                <button
                  onClick={handleUpload}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
                    darkMode
                      ? "dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                      : ""
                  }`}
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
              <p
                className={`mt-4 text-lg text-gray-600 ${
                  darkMode ? "dark:text-gray-300" : ""
                }`}
              >
                Analyzing your prescription...
              </p>
            </motion.div>
          )}

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-gray-50 ${
                darkMode ? "dark:bg-gray-700" : ""
              } p-6 rounded-lg`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-2xl font-semibold text-gray-800 ${
                    darkMode ? "dark:text-gray-200" : ""
                  }`}
                >
                  Analysis Results: {analysisResult.drugName}
                </h3>
                <button
                  onClick={resetAnalysis}
                  className={`text-gray-500 hover:text-gray-700 ${
                    darkMode
                      ? "dark:text-gray-400 dark:hover:text-gray-200"
                      : ""
                  }`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* New: Search functionality */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search analysis results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full p-2 pl-10 pr-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
                {searchTerm && (
                  <div className="mt-2">
                    <h4
                      className={`text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Matching sections:
                    </h4>
                    <ul className="list-disc list-inside">
                      {filteredSections.map((section) => (
                        <li
                          key={section}
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoCard
                      label="Generic Name"
                      value={analysisResult.genericName}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Drug Class"
                      value={analysisResult.drugClass}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Manufacturer"
                      value={analysisResult.manufacturer}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Approval Date"
                      value={analysisResult.approvalDate}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Age Range"
                      value={analysisResult.ageRange}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Pregnancy Category"
                      value={analysisResult.pregnancyCategory}
                      darkMode={darkMode}
                      highlight
                    />
                  </div>
                </div>

                {/* Dosage Information */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Dosage Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoCard
                      label="Dosage"
                      value={analysisResult.dosage}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Frequency"
                      value={analysisResult.frequency}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Duration"
                      value={analysisResult.duration}
                      darkMode={darkMode}
                    />
                  </div>
                  {/* New: Time of day selector */}
                  <div className="mt-4">
                    <h5
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Recommended time of day:
                    </h5>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setSelectedTimeOfDay("morning")}
                        className={`px-4 py-2 rounded-lg ${
                          selectedTimeOfDay === "morning"
                            ? "bg-blue-500 text-white"
                            : darkMode
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <Sun size={18} className="inline-block mr-2" />
                        Morning
                      </button>
                      <button
                        onClick={() => setSelectedTimeOfDay("evening")}
                        className={`px-4 py-2 rounded-lg ${
                          selectedTimeOfDay === "evening"
                            ? "bg-blue-500 text-white"
                            : darkMode
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <Moon size={18} className="inline-block mr-2" />
                        Evening
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quality Assessment */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Quality Assessment
                  </h4>
                  <div className="flex items-center justify-center">
                    <QualityScoreGauge
                      score={analysisResult.qualityScore}
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {/* Agency Flags */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Agency Flags
                  </h4>
                  {analysisResult.flaggedBy.length > 0 ? (
                    <ul className="space-y-2">
                      {analysisResult.flaggedBy.map((flag, index) => (
                        <li
                          key={index}
                          className={`flex items-start p-3 rounded-lg ${
                            darkMode
                              ? "bg-gray-700 text-yellow-400"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          <AlertTriangle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <strong>{flag.agency}:</strong> {flag.reason}
                            <div
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Flagged on: {flag.date}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className={`text-green-600 ${
                        darkMode ? "dark:text-green-400" : ""
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      No flags reported by agencies.
                    </p>
                  )}
                </div>

                {/* Side Effects */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Side Effects
                  </h4>
                  <SideEffectsChart
                    sideEffects={analysisResult.recentSideEffects}
                    darkMode={darkMode}
                  />
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ExpandableSection
                      title="Common Side Effects"
                      items={analysisResult.commonSideEffects}
                      darkMode={darkMode}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                    />
                    <ExpandableSection
                      title="Rare Side Effects"
                      items={analysisResult.rareSideEffects}
                      darkMode={darkMode}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                    />
                  </div>
                </div>

                {/* Interactions */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Interactions
                  </h4>
                  <div ref={interactionsRef} className="w-full h-64 mb-4"></div>
                  <div className="mt-4">
                    <h5
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Interaction Details:
                    </h5>
                    <ul className="space-y-2">
                      {analysisResult.interactions.map((interaction, index) => (
                        <li
                          key={index}
                          className={`p-3 rounded-lg ${
                            darkMode ? "bg-gray-600" : "bg-gray-100"
                          } ${getSeverityColor(interaction.severity)}`}
                        >
                          <div className="flex items-center">
                            {getSeverityIcon(interaction.severity)}
                            <span className="ml-2 font-semibold">
                              {interaction.drug}
                            </span>
                          </div>
                          <p
                            className={`mt-1 text-sm ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {interaction.effect}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <ExpandableSection
                      title="Precautions"
                      items={analysisResult.precautions}
                      darkMode={darkMode}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                    />
                  </div>
                </div>

                {/* Alternatives */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Alternatives
                  </h4>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {analysisResult.alternatives.map((alternative, index) => (
                      <li
                        key={index}
                        className={`p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-blue-300"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {alternative}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* New: Administration Tips */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Administration Tips
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.administrationTips.map((tip, index) => (
                      <li
                        key={index}
                        className={`flex items-center p-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-600 text-gray-200"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Pill className="w-5 h-5 mr-2 text-blue-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* New: Patient Reviews */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Patient Reviews
                  </h4>
                  <button
                    onClick={() => setShowPatientReviews(!showPatientReviews)}
                    className={`mb-4 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {showPatientReviews ? "Hide Reviews" : "Show Reviews"}
                  </button>
                  {showPatientReviews && (
                    <ul className="space-y-4">
                      {analysisResult.patientReviews.map((review, index) => (
                        <li
                          key={index}
                          className={`p-4 rounded-lg ${
                            darkMode
                              ? "bg-gray-600 text-gray-200"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* New: Efficacy Data */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Efficacy Data
                  </h4>
                  <button
                    onClick={() => setShowEfficacyChart(!showEfficacyChart)}
                    className={`mb-4 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {showEfficacyChart ? "Hide Chart" : "Show Chart"}
                  </button>
                  {showEfficacyChart && (
                    <EfficacyChart
                      data={analysisResult.efficacyData}
                      darkMode={darkMode}
                    />
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      label="Storage Instructions"
                      value={analysisResult.storageInstructions}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Disposal Instructions"
                      value={analysisResult.disposalInstructions}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Cost Estimate"
                      value={analysisResult.costEstimate}
                      darkMode={darkMode}
                      icon={<DollarSign className="w-5 h-5 text-green-500" />}
                    />
                    <InfoCard
                      label="Insurance Coverage"
                      value={analysisResult.insuranceCoverage}
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {/* New: Environmental Impact */}
                <div>
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Environmental Impact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard
                      label="Production Footprint"
                      value={
                        analysisResult.environmentalImpact.productionFootprint
                      }
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Disposal Impact"
                      value={analysisResult.environmentalImpact.disposalImpact}
                      darkMode={darkMode}
                    />
                    <InfoCard
                      label="Recycling Options"
                      value={
                        analysisResult.environmentalImpact.recyclingOptions
                      }
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {/* New: Half-Life Information */}
                <div className="mt-8">
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Pharmacokinetics
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span
                      className={`font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Half-Life:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {analysisResult.halfLife}
                    </span>
                  </div>
                </div>

                {/* New: Food Interactions */}
                <div className="mt-8">
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Food Interactions
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.foodInteractions.map(
                      (interaction, index) => (
                        <li
                          key={index}
                          className={`flex items-start space-x-2 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Utensils className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">
                              {interaction.food}:
                            </span>{" "}
                            {interaction.effect}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* New: Exercise Recommendations */}
                <div className="mt-8">
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Exercise Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.exerciseRecommendations.map(
                      (recommendation, index) => (
                        <li
                          key={index}
                          className={`flex items-start space-x-2 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Activity className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                          <span>{recommendation}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* New: Patient Education Materials */}
                <div className="mt-8">
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Patient Education Materials
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.patientEducationMaterials.map(
                      (material, index) => (
                        <li key={index}>
                          <a
                            href={material.url}
                            className={`flex items-center space-x-2 ${
                              darkMode
                                ? "text-blue-300 hover:text-blue-200"
                                : "text-blue-600 hover:text-blue-700"
                            }`}
                          >
                            <BookOpen className="w-5 h-5" />
                            <span>{material.title}</span>
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* New: Adherence Tracking */}
                <div className="mt-8">
                  <h4
                    className={`text-xl font-semibold mb-4 text-blue-600 ${
                      darkMode ? "dark:text-blue-400" : ""
                    }`}
                  >
                    Adherence Tracking
                  </h4>
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={`text-lg font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Overall Adherence: {adherenceData.overallAdherence}%
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Last 7 days
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {adherenceData.lastWeek.map((taken, index) => (
                      <button
                        key={index}
                        onClick={() => toggleAdherence(index)}
                        className={`w-8 h-8 rounded-full ${
                          taken
                            ? darkMode
                              ? "bg-green-500"
                              : "bg-green-600"
                            : darkMode
                            ? "bg-gray-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {taken && (
                          <CheckCircle className="w-6 h-6 text-white mx-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Print Prescription Summary */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => window.print()}
                    className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
                      darkMode ? "dark:bg-blue-500 dark:hover:bg-blue-600" : ""
                    }`}
                  >
                    <Printer className="w-5 h-5" />
                    <span>Print Prescription Summary</span>
                  </button>
                </div>

                {/* New: Weather Information */}
                {renderWeatherInfo()}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button onClick={() => {navigate("/")}}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
                    darkMode
                      ? "dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                      : ""
                  }`}
                >
                  Home
                </button>
                <button onClick={() => {navigate("/DrugCostOptimizer")}}
                  className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ${
                    darkMode
                      ? "dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
                      : ""
                  }`}
                >
                  CostOptmizer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const InfoCard = ({ label, value, darkMode, highlight, icon }) => (
  <div
    className={`p-3 rounded-lg ${
      highlight
        ? darkMode
          ? "bg-yellow-900 text-yellow-100"
          : "bg-yellow-100 text-yellow-800"
        : darkMode
        ? "bg-gray-700"
        : "bg-gray-100"
    }`}
  >
    <div className="flex items-center justify-between">
      <div
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {icon} {label}
      </div>
      <div
        className={`font-semibold ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {value}
      </div>
    </div>
  </div>
);

const ExpandableSection = ({
  title,
  items,
  darkMode,
  expandedSections,
  toggleSection,
}) => (
  <div>
    <button
      onClick={() => toggleSection(title)}
      className={`flex justify-between items-center w-full text-left font-semibold mb-2 text-blue-600 ${
        darkMode ? "dark:text-blue-400" : ""
      }`}
    >
      <span>{title}</span>
      {expandedSections.includes(title) ? (
        <ChevronUp size={20} />
      ) : (
        <ChevronDown size={20} />
      )}
    </button>
    <AnimatePresence>
      {expandedSections.includes(title) && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`list-disc list-inside ml-4 mt-2 space-y-1 ${
            darkMode ? "dark:text-gray-300" : ""
          }`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`text-gray-600 ${
                darkMode ? "dark:text-gray-300" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
);

const QualityScoreGauge = ({ score, darkMode }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 dark:text-gray-700 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <motion.circle
          className={`${getScoreColor(score)} stroke-current`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
      <div
        className={`text-center mt-2 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Quality Score
      </div>
    </div>
  );
};

const SideEffectsChart = ({ sideEffects, darkMode }) => {
  const data = {
    labels: sideEffects.map((effect) => effect.effect),
    datasets: [
      {
        label: "Reported Cases",
        data: sideEffects.map((effect) => effect.count),
        backgroundColor: sideEffects.map((effect) => {
          switch (effect.severity) {
            case "Mild":
              return "rgba(255, 206, 86, 0.7)";
            case "Moderate":
              return "rgba(255, 159, 64, 0.7)";
            case "Severe":
              return "rgba(255, 99, 132, 0.7)";
            default:
              return "rgba(75, 192, 192, 0.7)";
          }
        }),
        borderColor: sideEffects.map((effect) => {
          switch (effect.severity) {
            case "Mild":
              return "rgb(255, 206, 86)";
            case "Moderate":
              return "rgb(255, 159, 64)";
            case "Severe":
              return "rgb(255, 99, 132)";
            default:
              return "rgb(75, 192, 192)";
          }
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Recent Side Effects Reports",
        color: darkMode ? "#e2e8f0" : "#1e293b",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#e2e8f0" : "#1e293b",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "#e2e8f0" : "#1e293b",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const renderInteractionsNetwork = (interactions, container, darkMode) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const nodes = [
    { id: "Lisinopril", group: 0 },
    ...interactions.map((i, index) => ({ id: i.drug, group: 1 })),
  ];
  const links = interactions.map((i, index) => ({
    source: "Lisinopril",
    target: i.drug,
    value: i.severity,
  }));

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => {
      switch (d.value) {
        case "Mild":
          return "#fde047";
        case "Moderate":
          return "#fb923c";
        case "Severe":
          return "#ef4444";
        default:
          return "#94a3b8";
      }
    })
    .attr("stroke-width", 2);

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => (d.group === 0 ? 8 : 5))
    .attr("fill", (d) => (d.group === 0 ? "#3b82f6" : "#94a3b8"));

  node.append("title").text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });
};

const Star = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const EfficacyChart = ({ data, darkMode }) => {
  const chartData = {
    labels: data.map((d) => `Month ${d.month}`),
    datasets: [
      {
        label: "Efficacy",
        data: data.map((d) => d.efficacy),
        fill: false,
        borderColor: darkMode ? "rgb(59, 130, 246)" : "rgb(37, 99, 235)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Medication Efficacy Over Time",
        color: darkMode ? "#e2e8f0" : "#1e293b",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#e2e8f0" : "#1e293b",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "#e2e8f0" : "#1e293b",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

PrescriptionAnalyzer.propTypes = {
  darkMode: PropTypes.bool,
};

PrescriptionAnalyzer.defaultProps = {
  darkMode: false,
};
