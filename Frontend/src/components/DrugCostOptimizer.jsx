import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  PillIcon,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  History,
  Star,
  MapPin,
  Phone,
  Calendar,
  Shield,
  DollarSign,
  Truck,
  Heart,
  Receipt,
  ExternalLink,
  Building2,
  CreditCard,
  PiggyBank,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";

// Add mockAnalysis from PrescriptionAnalyzer
const mockAnalysis = {
  drugName: "Lisinopril",
  drugClass: "ACE Inhibitor",
  dosage: "10mg",
  frequency: "Once daily",
  costEstimate: "₹1,999",
  insuranceCoverage: "Covered under your plan",
  genericName: "Lisinopril",
  manufacturer: "Lupin",
  qualityScore: 92,
  patientReviews: [
    {
      rating: 5,
      comment: "Great drug, works well for me.",
      reportDate: "2024-01-15",
    },
    {
      rating: 4,
      comment: "Effective, but some side effects.",
      reportDate: "2024-01-20",
    },
  ],
  recentSideEffects: [
    {
      sideEffect: "Dizziness",
      severity: "Mild",
      reportDate: "2024-01-25",
    },
  ],
};

const MEDICATIONS_DATABASE = {
  Lisinopril: {
    brandName: "Generic",
    class: mockAnalysis.drugClass,
    purpose: "Blood pressure control",
    strength: [mockAnalysis.dosage],
    rating: 4.2,
    reviewCount: mockAnalysis.patientReviews.length,
    insurance: {
      covered: true,
      copayment: 10,
      coverage: 90,
      tier: 1,
      priorAuthRequired: false,
      restrictions: "None",
      networkProviders: ["Aetna", "Blue Cross", "Cigna", "UnitedHealth"],
    },
    generic: {
      available: true,
      name: mockAnalysis.genericName,
      savings: 80,
      manufacturers: [mockAnalysis.manufacturer],
      averagePrices: {
        brand: 9999,
        generic: 1999,
      },
      qualityRatings: {
        effectiveness: mockAnalysis.qualityScore,
        safety: 90,
        consistency: 88,
      },
    },
    pharmacyPrices: [
      {
        name: "Apollo Pharmacy",
        price: 1999,
        distance: "0.5 miles",
        stock: true,
        discount: 12,
        address: "123 Main St",
        phone: "(555) 123-4567",
        hours: "8AM-10PM",
        deliveryAvailable: true,
        deliveryFee: 0,
      },
      {
        name: "MedPlus",
        price: 1899,
        distance: "1.2 miles",
        stock: true,
        discount: 15,
        address: "456 Oak Ave",
        phone: "(555) 234-5678",
        hours: "24 hours",
        deliveryAvailable: true,
        deliveryFee: 4.99,
      },
      {
        name: "Wellness Forever",
        price: 1799,
        distance: "2.5 miles",
        stock: true,
        discount: 20,
        address: "789 Market St",
        phone: "(555) 345-6789",
        hours: "9AM-9PM",
        deliveryAvailable: false,
        deliveryFee: null,
      },
    ],
    discountPrograms: [
      {
        name: "GoodRx",
        discount: 80,
        enrollment: "Free",
        price: 1699,
        features: [
          "No membership fees",
          "Digital card",
          "All pharmacies accepted",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Show card at pharmacy",
      },
      {
        name: "SingleCare",
        discount: 75,
        enrollment: "Free",
        price: 1799,
        features: [
          "Instant savings",
          "No registration required",
          "Mobile app available",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Present card to pharmacist",
      },
      {
        name: "WellRx",
        discount: 70,
        enrollment: "Free",
        price: 1899,
        features: [
          "Print or digital card",
          "Pet medications covered",
          "Mail order available",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Show digital card on phone",
      },
    ],
    subscriptionOptions: [
      {
        name: "Monthly Supply",
        price: 1499,
        savings: 35,
        features: ["Auto-refill", "Free delivery", "24/7 support"],
        cancellationPolicy: "Cancel anytime",
        nextDeliveryDate: "2024-02-15",
        shippingInfo: "2-day shipping",
      },
      {
        name: "90-Day Supply",
        price: 3999,
        savings: 45,
        features: ["Bulk savings", "Free delivery", "Priority support"],
        cancellationPolicy: "Cancel anytime",
        nextDeliveryDate: "2024-02-15",
        shippingInfo: "Free expedited shipping",
      },
    ],
    costHistory: [
      { month: "Jan", amount: 1999, trend: "stable" },
      { month: "Feb", amount: 1899, trend: "decreasing" },
      { month: "Mar", amount: 1799, trend: "decreasing" },
      { month: "Apr", amount: 1699, trend: "decreasing" },
      { month: "May", amount: 1599, trend: "stable" },
      { month: "Jun", amount: 1499, trend: "decreasing" },
    ],
    patientAssistance: {
      programs: [
        {
          name: "Novartis Patient Assistance Program",
          eligibility: "Income below 250% FPL",
          coverage: "Full cost",
          application: "Online/Phone",
          documents: ["Income proof", "Insurance denial", "Prescription"],
        },
      ],
      medicareInfo: {
        partD: "Covered",
        donutHole: "Applies",
        catastrophicCoverage: "Yes",
      },
    },
    additionalSavings: {
      manufacturerCoupons: {
        available: true,
        maxSavings: 75,
        expirationDate: "2024-12-31",
        terms: "Must have commercial insurance",
      },
      bulkPurchase: {
        available: true,
        minQuantity: 90,
        savings: 25,
      },
      mailOrder: {
        available: true,
        savings: 30,
        shippingTime: "3-5 days",
      },
    },
  },
  Atorvastatin: {
    brandName: "Lipitor",
    class: "Statin",
    purpose: "Cholesterol reduction",
    strength: ["10mg", "20mg", "40mg", "80mg"],
    rating: 4.5,
    reviewCount: 1250,
    insurance: {
      covered: true,
      copayment: 15,
      coverage: 85,
      tier: 2,
      priorAuthRequired: false,
      restrictions: "None",
      networkProviders: ["Aetna", "Blue Cross", "Cigna", "UnitedHealth"],
    },
    generic: {
      available: true,
      name: "Atorvastatin Calcium",
      savings: 85,
      manufacturers: ["Mylan", "Teva", "Apotex"],
      averagePrices: {
        brand: 24999,
        generic: 3999,
      },
      qualityRatings: {
        effectiveness: 95,
        safety: 92,
        consistency: 90,
      },
    },
    pharmacyPrices: [
      {
        name: "Apollo Pharmacy",
        price: 3599,
        distance: "0.5 miles",
        stock: true,
        discount: 12,
        address: "123 Main St",
        phone: "(555) 123-4567",
        hours: "8AM-10PM",
        deliveryAvailable: true,
        deliveryFee: 0,
      },
      {
        name: "MedPlus",
        price: 3499,
        distance: "1.2 miles",
        stock: true,
        discount: 15,
        address: "456 Oak Ave",
        phone: "(555) 234-5678",
        hours: "24 hours",
        deliveryAvailable: true,
        deliveryFee: 4.99,
      },
      {
        name: "Wellness Forever",
        price: 3299,
        distance: "2.5 miles",
        stock: true,
        discount: 20,
        address: "789 Market St",
        phone: "(555) 345-6789",
        hours: "9AM-9PM",
        deliveryAvailable: false,
        deliveryFee: null,
      },
    ],
    discountPrograms: [
      {
        name: "GoodRx",
        discount: 80,
        enrollment: "Free",
        price: 2799,
        features: [
          "No membership fees",
          "Digital card",
          "All pharmacies accepted",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Show card at pharmacy",
      },
      {
        name: "SingleCare",
        discount: 75,
        enrollment: "Free",
        price: 2999,
        features: [
          "Instant savings",
          "No registration required",
          "Mobile app available",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Present card to pharmacist",
      },
      {
        name: "WellRx",
        discount: 70,
        enrollment: "Free",
        price: 3099,
        features: [
          "Print or digital card",
          "Pet medications covered",
          "Mail order available",
        ],
        expirationDate: "None",
        restrictions: "None",
        howToUse: "Show digital card on phone",
      },
    ],
    subscriptionOptions: [
      {
        name: "Monthly Supply",
        price: 2999,
        savings: 35,
        features: ["Auto-refill", "Free delivery", "24/7 support"],
        cancellationPolicy: "Cancel anytime",
        nextDeliveryDate: "2024-02-15",
        shippingInfo: "2-day shipping",
      },
      {
        name: "90-Day Supply",
        price: 7999,
        savings: 45,
        features: ["Bulk savings", "Free delivery", "Priority support"],
        cancellationPolicy: "Cancel anytime",
        nextDeliveryDate: "2024-02-15",
        shippingInfo: "Free expedited shipping",
      },
    ],
    costHistory: [
      { month: "Jan", amount: 3999, trend: "stable" },
      { month: "Feb", amount: 3599, trend: "decreasing" },
      { month: "Mar", amount: 3499, trend: "decreasing" },
      { month: "Apr", amount: 3299, trend: "decreasing" },
      { month: "May", amount: 3099, trend: "stable" },
      { month: "Jun", amount: 2799, trend: "decreasing" },
    ],
    patientAssistance: {
      programs: [
        {
          name: "Pfizer RxPathways",
          eligibility: "Income below 400% FPL",
          coverage: "Full cost",
          application: "Online/Phone",
          documents: ["Income proof", "Insurance denial", "Prescription"],
        },
      ],
      medicareInfo: {
        partD: "Covered",
        donutHole: "Applies",
        catastrophicCoverage: "Yes",
      },
    },
    additionalSavings: {
      manufacturerCoupons: {
        available: true,
        maxSavings: 75,
        expirationDate: "2024-12-31",
        terms: "Must have commercial insurance",
      },
      bulkPurchase: {
        available: true,
        minQuantity: 90,
        savings: 25,
      },
      mailOrder: {
        available: true,
        savings: 30,
        shippingTime: "3-5 days",
      },
    },
  },
};

// Recent searches storage
const RECENT_SEARCHES_KEY = "recentMedicationSearches";

// Similar medications suggestions
const SIMILAR_MEDICATIONS = {
  Atorvastatin: ["Simvastatin", "Rosuvastatin", "Pravastatin", "Lovastatin"],
  Lisinopril: ["Ramipril", "Enalapril", "Captopril", "Perindopril"],
};

export function DrugCostOptimizer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [activeTab, setActiveTab] = useState("insurance");
  const [isLoading, setIsLoading] = useState(false);
  const [showSavingsAlert, setShowSavingsAlert] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const resultsSectionRef = useRef(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToResults = () => {
    resultsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const drug = MEDICATIONS_DATABASE[term];
      setSelectedDrug(drug || null);
      setIsLoading(false);

      if (drug) {
        // Update recent searches
        const updated = [
          term,
          ...recentSearches.filter((s) => s !== term),
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));

        setShowSavingsAlert(true);
        setTimeout(() => setShowSavingsAlert(false), 5000);

        // Set default strength
        setSelectedStrength(drug.strength[0]);
      }
    }, 500);
  };

  const getSimilarMedications = (term) => {
    return SIMILAR_MEDICATIONS[term] || [];
  };

  const handleStrengthChange = (strength) => {
    setSelectedStrength(strength);
    // In a real app, this would trigger price updates
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Drug Cost Optimizer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the most cost-effective options for your medications through insurance coverage, generic alternatives,
            and discount programs.
          </p>
        </div>

        {/* Enhanced Search and Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Search Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    placeholder="Enter medication name (e.g., Atorvastatin)..."
                    className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-5 text-gray-400 w-6 h-6" />
                  {isLoading && (
                    <div className="absolute right-4 top-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Search Dropdown */}
                {showSearchDropdown &&
                  (searchTerm || recentSearches.length > 0) && (
                    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {/* Latest Prescription Section */}
                      <div className="p-2 border-b">
                        <div className="flex items-center justify-between text-sm text-gray-500 px-3 py-2">
                          <div className="flex items-center">
                            <Receipt className="w-4 h-4 mr-2" />
                            Latest Analyzed Prescription
                          </div>
                        </div>
                        <div className="px-3 py-2">
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center">
                              <PillIcon className="w-4 h-4 mr-2 text-blue-500" />
                              <div>
                                <div className="font-medium">
                                  {mockAnalysis.drugName} {mockAnalysis.dosage}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {mockAnalysis.frequency} • Analyzed on{" "}
                                  {mockAnalysis.recentSideEffects[0].reportDate}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                handleSearch("Lisinopril");
                                setShowSearchDropdown(false);
                              }}
                              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                            >
                              View Costs →
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {mockAnalysis.insuranceCoverage}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3 text-green-500" />
                              Estimated cost: {mockAnalysis.costEstimate}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="p-2 border-b">
                          <div className="flex items-center text-sm text-gray-500 px-3 py-2">
                            <History className="w-4 h-4 mr-2" />
                            Recent Searches
                          </div>
                          {recentSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                handleSearch(term);
                                setShowSearchDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center"
                            >
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              {term}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Similar Medications */}
                      {searchTerm && SIMILAR_MEDICATIONS[searchTerm] && (
                        <div className="p-2">
                          <div className="flex items-center text-sm text-gray-500 px-3 py-2">
                            <PillIcon className="w-4 h-4 mr-2" />
                            Similar Medications
                          </div>
                          {getSimilarMedications(searchTerm).map(
                            (med, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  handleSearch(med);
                                  setShowSearchDropdown(false);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center"
                              >
                                {med}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {/* Quick Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200">
                  Generic Only
                </button>
                <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200">
                  Insurance Covered
                </button>
                <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200">
                  Home Delivery
                </button>
                <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200">
                  Lowest Price
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    handleSearch("Lisinopril");
                    setShowSearchDropdown(false);
                    scrollToResults();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 group mb-4"
                >
                  <div className="flex items-center">
                    <Receipt className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <span className="font-medium">
                        Use Latest Prescription
                      </span>
                      <p className="text-sm text-gray-500">
                        Analyze costs for {mockAnalysis.drugName}{" "}
                        {mockAnalysis.dosage}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 group">
                  <div className="flex items-center">
                    <Receipt className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Upload New Prescription</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 group">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Find Nearby Pharmacy</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 group">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Insurance Information</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 group">
                  <div className="flex items-center">
                    <PiggyBank className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Savings Programs</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Savings</p>
                <p className="text-2xl font-bold text-green-600">₹9,750</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <PiggyBank className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Prescriptions</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Next refill in 7 days</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nearby Pharmacies</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Within 5 miles</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Discounts</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <Star className="w-4 h-4 mr-1" />
              <span>3 new this week</span>
            </div>
          </div>
        </div>

        {/* Savings Alert */}
        <AnimatePresence>
          {showSavingsAlert && selectedDrug && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg"
            >
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <p className="text-green-700">
                  Potential savings of up to {selectedDrug?.generic.savings}%
                  found for {searchTerm}!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medication Overview */}
        {selectedDrug && (
          <div
            ref={resultsSectionRef}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Medication Info
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Brand Name: {selectedDrug.brandName}
                  </p>
                  <p className="text-gray-600">Class: {selectedDrug.class}</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>
                      {" "}
                      Continuing from where we left off in the
                      DrugCostOptimizer.tsx file:
                      {selectedDrug.rating} ({selectedDrug.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Strength Selection
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDrug.strength.map((str) => (
                    <button
                      key={str}
                      onClick={() => handleStrengthChange(str)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedStrength === str
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {str}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Best Price
                </h3>
                <div className="text-3xl font-bold text-green-600">
                  ₹
                  {Math.min(...selectedDrug.pharmacyPrices.map((p) => p.price))}
                </div>
                <p className="text-sm text-gray-500">with discounts applied</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Savings Available
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Insurance Coverage
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Generic Available
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Discount Programs
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        {selectedDrug && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TabButton
              id="insurance"
              icon={Shield}
              label="Insurance Coverage"
              alert={selectedDrug.insurance.covered}
              onClick={() => setActiveTab("insurance")}
              isActive={activeTab === "insurance"}
            />
            <TabButton
              id="generic"
              icon={PillIcon}
              label="Generic Options"
              alert={selectedDrug.generic.available}
              onClick={() => setActiveTab("generic")}
              isActive={activeTab === "generic"}
            />
            <TabButton
              id="pharmacy"
              icon={MapPin}
              label="Pharmacy Finder"
              onClick={() => setActiveTab("pharmacy")}
              isActive={activeTab === "pharmacy"}
            />
            <TabButton
              id="discounts"
              icon={DollarSign}
              label="Discount Programs"
              onClick={() => setActiveTab("discounts")}
              isActive={activeTab === "discounts"}
            />
            <TabButton
              id="subscription"
              icon={Calendar}
              label="Subscription Plans"
              onClick={() => setActiveTab("subscription")}
              isActive={activeTab === "subscription"}
            />
            <TabButton
              id="assistance"
              icon={Heart}
              label="Patient Assistance"
              onClick={() => setActiveTab("assistance")}
              isActive={activeTab === "assistance"}
            />
          </div>
        )}

        {/* Content Panels */}
        <AnimatePresence mode="wait">
          {selectedDrug && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* Insurance Panel */}
              {activeTab === "insurance" && (
                <InsurancePanel
                  insurance={selectedDrug.insurance}
                  drugName={selectedDrug.brandName}
                />
              )}

              {/* Generic Panel */}
              {activeTab === "generic" && (
                <GenericPanel
                  generic={selectedDrug.generic}
                  brandName={selectedDrug.brandName}
                />
              )}

              {/* Pharmacy Panel */}
              {activeTab === "pharmacy" && (
                <PharmacyPanel
                  pharmacies={selectedDrug.pharmacyPrices}
                  selectedStrength={selectedStrength}
                />
              )}

              {/* Discounts Panel */}
              {activeTab === "discounts" && (
                <DiscountsPanel
                  discounts={selectedDrug.discountPrograms}
                  additionalSavings={selectedDrug.additionalSavings}
                />
              )}

              {/* Subscription Panel */}
              {activeTab === "subscription" && (
                <SubscriptionPanel
                  options={selectedDrug.subscriptionOptions}
                  selectedStrength={selectedStrength}
                />
              )}

              {/* Patient Assistance Panel */}
              {activeTab === "assistance" && (
                <AssistancePanel
                  assistance={selectedDrug.patientAssistance}
                  drugName={selectedDrug.brandName}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        {!selectedDrug && !isLoading && searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any information for "{searchTerm}". Please check
              the spelling or try another medication.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Tab Button Component
const TabButton = ({ id, icon: Icon, label, alert, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full p-4 rounded-lg transition-all transform hover:scale-105 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-white text-gray-700 hover:bg-blue-50 shadow"
    }`}
  >
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </div>
    {alert && (
      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
        Save 85%
      </span>
    )}
  </button>
);

// Panel Components
const InsurancePanel = ({ insurance, drugName }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Insurance Coverage Details
    </h3>
    <div
      className={`p-6 rounded-xl ${
        insurance.covered
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="flex items-start">
        {insurance.covered ? (
          <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1" />
        )}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">
            {insurance.covered
              ? "Covered by Insurance"
              : "Not Covered by Insurance"}
          </h4>
          {insurance.covered && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Copayment</p>
                  <p className="text-xl font-bold text-gray-800">
                    ₹{insurance.copayment}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coverage</p>
                  <p className="text-xl font-bold text-gray-800">
                    {insurance.coverage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tier</p>
                  <p className="text-xl font-bold text-gray-800">
                    {insurance.tier}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">
                  Network Providers
                </h5>
                <div className="flex flex-wrap gap-2">
                  {insurance.networkProviders.map((provider, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm text-blue-600"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

const GenericPanel = ({ generic, brandName }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Generic Alternative Options
    </h3>
    {generic.available ? (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">
            Generic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Generic Name</p>
              <p className="font-semibold text-gray-800">{generic.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Potential Savings</p>
              <p className="font-semibold text-green-600">{generic.savings}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(generic.qualityRatings).map(([key, value]) => (
            <div key={key} className="bg-white border rounded-lg p-4">
              <p className="text-sm text-gray-600 capitalize">{key}</p>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{value}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Price Comparison
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Brand Name Price</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{generic.averagePrices.brand}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Generic Price</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{generic.averagePrices.generic}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Available Manufacturers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generic.manufacturers.map((manufacturer, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg text-center"
              >
                {manufacturer}
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
        <Info className="w-6 h-6 text-yellow-500 mr-3" />
        <p className="text-yellow-700">
          No generic alternatives available for {brandName}.
        </p>
      </div>
    )}
  </div>
);

const PharmacyPanel = ({ pharmacies, selectedStrength }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Pharmacy Price Comparison
    </h3>
    <div className="grid gap-4">
      {pharmacies.map((pharmacy, index) => (
        <div
          key={index}
          className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-lg">{pharmacy.name}</h4>
              <p className="text-gray-500 text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {pharmacy.distance}
              </p>
              <p className="text-gray-500 text-sm flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {pharmacy.phone}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{pharmacy.hours}</p>
              {pharmacy.deliveryAvailable && (
                <p className="text-green-600 flex items-center mt-1">
                  <Truck className="w-4 h-4 mr-1" />
                  {pharmacy.deliveryFee === 0
                    ? "Free delivery"
                    : `Delivery: ₹${pharmacy.deliveryFee}`}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                ₹{pharmacy.price}
              </p>
              <p className="text-sm text-green-500">
                Save {pharmacy.discount}%
              </p>
              {pharmacy.stock ? (
                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Directions
          </button>
        </div>
      ))}
    </div>
  </div>
);

const DiscountsPanel = ({ discounts, additionalSavings }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Available Discount Programs
    </h3>

    {/* Discount Cards */}
    <div className="grid gap-6">
      {discounts.map((program, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-semibold">{program.name}</h4>
              <p className="text-green-600 font-medium">
                Save up to {program.discount}%
              </p>
              <p className="text-gray-500">Enrollment: {program.enrollment}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                ₹{program.price}
              </p>
              <p className="text-sm text-gray-500">with discount</p>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="font-medium text-gray-700 mb-2">Features:</h5>
            <ul className="space-y-2">
              {program.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-medium">How to use:</span>{" "}
              {program.howToUse}
            </p>
            {program.restrictions !== "None" && (
              <p className="text-sm text-yellow-600 mt-2">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Restrictions: {program.restrictions}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Additional Savings Options */}
    <div className="mt-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">
        Additional Savings Options
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manufacturer Coupons */}
        {additionalSavings.manufacturerCoupons.available && (
          <div className="bg-white border rounded-lg p-4">
            <h5 className="font-medium text-lg mb-2">Manufacturer Coupons</h5>
            <p className="text-green-600 font-bold">
              Save up to {additionalSavings.manufacturerCoupons.maxSavings}%
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Expires: {additionalSavings.manufacturerCoupons.expirationDate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {additionalSavings.manufacturerCoupons.terms}
            </p>
          </div>
        )}

        {/* Bulk Purchase */}
        {additionalSavings.bulkPurchase.available && (
          <div className="bg-white border rounded-lg p-4">
            <h5 className="font-medium text-lg mb-2">Bulk Purchase Savings</h5>
            <p className="text-green-600 font-bold">
              Save {additionalSavings.bulkPurchase.savings}%
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Minimum quantity: {additionalSavings.bulkPurchase.minQuantity}{" "}
              days supply
            </p>
          </div>
        )}

        {/* Mail Order */}
        {additionalSavings.mailOrder.available && (
          <div className="bg-white border rounded-lg p-4">
            <h5 className="font-medium text-lg mb-2">Mail Order Savings</h5>
            <p className="text-green-600 font-bold">
              Save {additionalSavings.mailOrder.savings}%
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Shipping time: {additionalSavings.mailOrder.shippingTime}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const SubscriptionPanel = ({ options, selectedStrength }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Subscription Plans
    </h3>
    <div className="grid md:grid-cols-2 gap-6">
      {options.map((plan, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
          <div className="mb-4">
            <p className="text-3xl font-bold text-blue-600">₹{plan.price}</p>
            <p className="text-green-600">Save {plan.savings}%</p>
          </div>
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="text-sm text-gray-600">
              <Calendar className="w-4 h-4 inline mr-1" />
              Next delivery: {plan.nextDeliveryDate}
            </p>
            <p className="text-sm text-gray-600">
              <Truck className="w-4 h-4 inline mr-1" />
              {plan.shippingInfo}
            </p>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

const AssistancePanel = ({ assistance, drugName }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">
      Patient Assistance Programs
    </h3>

    {/* Programs List */}
    <div className="space-y-4">
      {assistance.programs.map((program, index) => (
        <div key={index} className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3">{program.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Eligibility</p>
              <p className="font-medium">{program.eligibility}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Coverage</p>
              <p className="font-medium">{program.coverage}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Required Documents:</p>
            <ul className="mt-2 space-y-1">
              {program.documents.map((doc, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      ))}
    </div>

    {/* Medicare Information */}
    <div className="bg-blue-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-blue-800 mb-4">
        Medicare Coverage Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600">Part D Coverage</p>
          <p className="font-medium text-blue-600">
            {assistance.medicareInfo.partD}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600">Donut Hole</p>
          <p className="font-medium text-blue-600">
            {assistance.medicareInfo.donutHole}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600">Catastrophic Coverage</p>
          <p className="font-medium text-blue-600">
            {assistance.medicareInfo.catastrophicCoverage}
          </p>
        </div>
      </div>
    </div>
  </div>
);
