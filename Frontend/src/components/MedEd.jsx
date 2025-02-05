import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { X, ChevronRight, Search, Brain, Pill, Activity, Users, Shield, Smartphone } from "lucide-react"
import { Navbar } from "./Navbar"

const modules = [
  {
    title: "AI-Driven Personalized Medicine",
    description:
      "Explore how artificial intelligence (AI) is revolutionizing personalized medicine by analyzing genetic data to tailor treatments. Learn about AI tools that predict medication effectiveness and optimize dosing for individual patients.",
    icon: Brain,
    color: "bg-purple-500",
    quiz: [
      {
        question: "What is the primary goal of AI in personalized medicine?",
        options: ["Replacing doctors", "Tailoring treatments", "Reducing costs", "Increasing medication doses"],
        correct: 1,
      },
      {
        question: "AI tools in personalized medicine can help with:",
        options: ["Predicting effectiveness", "Optimizing dosing", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
      {
        question: "Personalized medicine primarily analyzes:",
        options: ["Blood type", "Genetic data", "Height and weight", "Age"],
        correct: 1,
      },
    ],
  },
  {
    title: "Telemedicine and Medication Management",
    description:
      "Understand how telemedicine is transforming medication management, enabling remote consultations and prescriptions. Learn about the benefits of telehealth for improving adherence and access to medications.",
    icon: Smartphone,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Telemedicine allows for:",
        options: ["Remote consultations", "In-person visits only", "Surgery", "Lab tests at home"],
        correct: 0,
      },
      {
        question: "How does telehealth improve medication management?",
        options: [
          "By increasing costs",
          "By improving adherence",
          "By reducing medication effectiveness",
          "It doesn't affect medication management",
        ],
        correct: 1,
      },
      {
        question: "A key benefit of telemedicine is:",
        options: [
          "Reduced access to care",
          "Increased hospital visits",
          "Improved access to medications",
          "Higher medication costs",
        ],
        correct: 2,
      },
    ],
  },
  {
    title: "GLP-1 Receptor Agonists: Beyond Diabetes",
    description:
      "Discover the expanding role of GLP-1 receptor agonists in managing obesity, heart health, and kidney function. Learn how these medications are being used for conditions beyond type 2 diabetes.",
    icon: Pill,
    color: "bg-green-500",
    quiz: [
      {
        question: "GLP-1 receptor agonists were originally developed for:",
        options: ["Obesity", "Heart disease", "Type 2 diabetes", "Kidney disease"],
        correct: 2,
      },
      {
        question: "Which of the following is NOT a condition GLP-1 agonists are being used for?",
        options: ["Obesity", "Heart health", "Kidney function", "Alzheimer's disease"],
        correct: 3,
      },
      {
        question: "GLP-1 receptor agonists work by:",
        options: ["Increasing insulin production", "Decreasing appetite", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
    ],
  },
  {
    title: "Digital Therapeutics for Chronic Conditions",
    description:
      "Explore the rise of digital therapeutics, including apps and wearables, for managing chronic conditions like diabetes and hypertension. Learn how these tools complement traditional medications.",
    icon: Shield,
    color: "bg-blue-500",
    quiz: [
      {
        question: "Digital therapeutics include:",
        options: ["Only mobile apps", "Only wearable devices", "Both apps and wearables", "Neither apps nor wearables"],
        correct: 2,
      },
      {
        question: "How do digital therapeutics work with traditional medications?",
        options: [
          "They replace medications",
          "They complement medications",
          "They have no relation to medications",
          "They increase medication side effects",
        ],
        correct: 1,
      },
      {
        question: "Which chronic condition is NOT typically managed with digital therapeutics?",
        options: ["Diabetes", "Hypertension", "Asthma", "Broken bones"],
        correct: 3,
      },
    ],
  },
  {
    title: "Nonpharmacological Interventions",
    description:
      "Learn about nonpharmacological strategies, such as mindfulness, acupuncture, and lifestyle changes, that complement medication use. Understand their role in managing pain, mental health, and chronic diseases.",
    icon: Activity,
    color: "bg-orange-500",
    quiz: [
      {
        question: "Which of the following is a nonpharmacological intervention?",
        options: ["Antibiotics", "Mindfulness", "Chemotherapy", "Vaccines"],
        correct: 1,
      },
      {
        question: "Nonpharmacological interventions are used to:",
        options: [
          "Replace all medications",
          "Complement medications",
          "Increase medication side effects",
          "Reduce medication effectiveness",
        ],
        correct: 1,
      },
      {
        question: "Which condition can benefit from nonpharmacological interventions?",
        options: ["Pain", "Mental health", "Chronic diseases", "All of the above"],
        correct: 3,
      },
    ],
  },
  {
    title: "Wearable Health Devices and Medication Monitoring",
    description:
      "Discover how wearable devices are being used to monitor medication effectiveness and patient health in real-time. Learn about their role in improving adherence and personalized care.",
    icon: Smartphone,
    color: "bg-cyan-500",
    quiz: [
      {
        question: "Wearable health devices can monitor:",
        options: ["Medication effectiveness", "Patient health", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
      {
        question: "How do wearable devices improve medication use?",
        options: [
          "By increasing dosage",
          "By improving adherence",
          "By replacing medications",
          "They don't affect medication use",
        ],
        correct: 1,
      },
      {
        question: "Real-time monitoring with wearables can lead to:",
        options: [
          "Less personalized care",
          "More personalized care",
          "Increased medication costs",
          "Reduced medication effectiveness",
        ],
        correct: 1,
      },
    ],
  },
  {
    title: "Global Health and Medication Access",
    description:
      "Understand the challenges of medication access in underserved regions and the role of global health initiatives. Learn about strategies to improve medication availability and affordability worldwide.",
    icon: Users,
    color: "bg-pink-500",
    quiz: [
      {
        question: "A major challenge in global health is:",
        options: [
          "Too many medications",
          "Lack of medication access",
          "Overuse of medications",
          "Excessive medication production",
        ],
        correct: 1,
      },
      {
        question: "Global health initiatives aim to:",
        options: [
          "Reduce medication access",
          "Improve medication availability",
          "Increase medication costs",
          "Limit medication use",
        ],
        correct: 1,
      },
      {
        question: "Improving medication affordability is important for:",
        options: [
          "Developed countries only",
          "Developing countries only",
          "Both developed and developing countries",
          "Neither developed nor developing countries",
        ],
        correct: 2,
      },
    ],
  },
  {
    title: "Innovations in Insulin Therapy",
    description:
      "Explore the latest advancements in insulin therapy, including long-acting insulins and smart insulin pens. Learn how these innovations are improving diabetes management.",
    icon: Pill,
    color: "bg-yellow-500",
    quiz: [
      {
        question: "An example of an innovation in insulin therapy is:",
        options: ["Short-acting insulin", "Long-acting insulin", "Insulin tablets", "Insulin inhalers"],
        correct: 1,
      },
      {
        question: "Smart insulin pens can:",
        options: ["Automatically inject insulin", "Track insulin doses", "Produce insulin", "Cure diabetes"],
        correct: 1,
      },
      {
        question: "The main goal of innovations in insulin therapy is to:",
        options: [
          "Eliminate the need for insulin",
          "Improve diabetes management",
          "Increase insulin side effects",
          "Make insulin more expensive",
        ],
        correct: 1,
      },
    ],
  },
  {
    title: "Medication Safety in Older Adults",
    description:
      "Understand the unique challenges of medication use in older adults, including polypharmacy and increased side effects. Learn strategies for safe medication management in this population.",
    icon: Brain,
    color: "bg-red-500",
    quiz: [
      {
        question: "Polypharmacy refers to:",
        options: [
          "Using no medications",
          "Using one medication",
          "Using multiple medications",
          "Avoiding all medications",
        ],
        correct: 2,
      },
      {
        question: "Older adults are more susceptible to:",
        options: [
          "Fewer side effects",
          "Increased side effects",
          "No side effects",
          "Only positive effects from medications",
        ],
        correct: 1,
      },
      {
        question: "Safe medication management in older adults involves:",
        options: [
          "Increasing all medication doses",
          "Stopping all medications",
          "Regular medication reviews",
          "Ignoring side effects",
        ],
        correct: 2,
      },
    ],
  },
  {
    title: "The Role of Pharmacogenomics",
    description:
      "Discover how pharmacogenomics is shaping the future of medication by tailoring treatments based on genetic profiles. Learn about its applications in reducing adverse drug reactions and improving efficacy.",
    icon: Users,
    color: "bg-indigo-500",
    quiz: [
      {
        question: "Pharmacogenomics uses information from:",
        options: ["Blood type", "Genetic profiles", "Age", "Weight"],
        correct: 1,
      },
      {
        question: "A goal of pharmacogenomics is to:",
        options: [
          "Increase adverse drug reactions",
          "Reduce medication efficacy",
          "Improve medication efficacy",
          "Increase medication costs",
        ],
        correct: 2,
      },
      {
        question: "Pharmacogenomics can help with:",
        options: ["Predicting drug responses", "Tailoring treatments", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
    ],
  },
  {
    title: "Synthetic Data in Drug Development",
    description:
      "Learn how synthetic data is being used to accelerate drug development and clinical trials. Understand its role in reducing costs and improving the accuracy of predictive models.",
    icon: Activity,
    color: "bg-purple-500",
    quiz: [
      {
        question: "Synthetic data in drug development is used to:",
        options: [
          "Slow down clinical trials",
          "Accelerate drug development",
          "Increase drug development costs",
          "Reduce drug effectiveness",
        ],
        correct: 1,
      },
      {
        question: "The use of synthetic data can lead to:",
        options: [
          "Less accurate predictive models",
          "More accurate predictive models",
          "No change in predictive models",
          "Elimination of predictive models",
        ],
        correct: 1,
      },
      {
        question: "A benefit of using synthetic data is:",
        options: ["Increased costs", "Reduced costs", "Longer development times", "Less effective drugs"],
        correct: 1,
      },
    ],
  },
  {
    title: "Patient Empowerment Through Digital Health",
    description:
      "Explore how digital health tools, such as wearable devices and health apps, are empowering patients to take control of their health. Learn about the role of real-time data in improving outcomes.",
    icon: Smartphone,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Digital health tools include:",
        options: ["Wearable devices", "Health apps", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
      {
        question: "Digital health tools aim to:",
        options: [
          "Disempower patients",
          "Empower patients",
          "Have no effect on patients",
          "Increase patient dependence on doctors",
        ],
        correct: 1,
      },
      {
        question: "Real-time data from digital health tools can:",
        options: [
          "Worsen health outcomes",
          "Improve health outcomes",
          "Have no effect on health outcomes",
          "Only benefit healthcare providers",
        ],
        correct: 1,
      },
    ],
  },
]

export function MedEd() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedModule, setSelectedModule] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredModules, setFilteredModules] = useState(modules)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [completedModules, setCompletedModules] = useState(new Set())

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    const filtered = modules.filter(
      (module) =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredModules(filtered)
  }, [searchTerm])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
  }

  const handleAnswer = (selectedAnswer) => {
    if (selectedModule.quiz[currentQuestion].correct === selectedAnswer) {
      const newScore = score + 1
      setScore(newScore)
      
      if (currentQuestion === selectedModule.quiz.length - 1) {
        // Update total score only when module is completed for the first time
        if (!completedModules.has(selectedModule.title)) {
          setTotalScore(totalScore + newScore)
          setCompletedModules(new Set([...completedModules, selectedModule.title]))
        }
      }
    }
    
    if (currentQuestion < selectedModule.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizStarted(false)
    }
  }

  const x = useMotionValue(0)
  const background = useTransform(x, [-100, 0, 100], ["#ff008c", "#7700ff", "#00f"])

  const totalPossibleScore = modules.reduce((total, module) => total + module.quiz.length, 0)

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MED-Ed: Medication Education
          </motion.h1>

          <motion.div
            className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Total Score: {totalScore} / {totalPossibleScore}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300">
                  Completed Modules: {completedModules.size} / {modules.length}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(completedModules.size / modules.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full p-4 pl-12 rounded-full bg-white dark:bg-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {filteredModules.map((module, index) => (
              <motion.div
                key={index}
                className={`${module.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden relative`}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedModule(module)}
                layoutId={`module-${index}`}
              >
                <motion.div
                  className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <module.icon className="text-gray-800 dark:text-gray-200" size={24} />
                </motion.div>
                {completedModules.has(module.title) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-sm">
                    Completed
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2 text-white">{module.title}</h2>
                <ChevronRight className="text-white mt-2" />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedModule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedModule(null)}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                  layoutId={`module-${modules.indexOf(selectedModule)}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <motion.h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedModule.title}
                    </motion.h3>
                    <motion.button
                      onClick={() => setSelectedModule(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {selectedModule.description}
                  </motion.p>
                  <motion.div
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {!quizStarted ? (
                      <>
                        <h4 className="font-semibold mb-2">Interactive Quiz</h4>
                        <p>Test your knowledge on {selectedModule.title} with our interactive quiz!</p>
                        {completedModules.has(selectedModule.title) && (
                          <p className="text-green-600 dark:text-green-400 mt-2">
                            You've already completed this module!
                          </p>
                        )}
                        <motion.button
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={startQuiz}
                        >
                          {completedModules.has(selectedModule.title) ? "Retake Quiz" : "Start Quiz"}
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold mb-4">
                          Question {currentQuestion + 1} of {selectedModule.quiz.length}
                        </h4>
                        <p className="mb-4">{selectedModule.quiz[currentQuestion].question}</p>
                        {selectedModule.quiz[currentQuestion].options.map((option, index) => (
                          <motion.button
                            key={index}
                            className="block w-full text-left mt-2 p-2 bg-white dark:bg-gray-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(index)}
                          >
                            {option}
                          </motion.button>
                        ))}
                        <div className="mt-4">
                          <p>Current Score: {score} / {currentQuestion + 1}</p>
                        </div>
                      </>
                    )}
                    {!quizStarted && currentQuestion === selectedModule.quiz.length && (
                      <div className="mt-4">
                        <p className="font-semibold">
                          Quiz Complete! Score: {score} out of {selectedModule.quiz.length}
                        </p>
                        {score === selectedModule.quiz.length && (
                          <p className="text-green-600 dark:text-green-400 mt-2">
                            Perfect score! Well done!
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <motion.div
          className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg cursor-pointer"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          style={{ x, background }}
        >
          <Activity className="text-white" size={24} />
        </motion.div>
      </div>
    </div>
  )
}




















// import { useState, useEffect } from "react"
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
// import { X, ChevronRight, Search, Brain, Pill, Activity, Users, Shield, Smartphone } from "lucide-react"
// import { Navbar } from "./Navbar"

// const modules = [
// {
// title: "AI-Driven Personalized Medicine",
// description:
// "Explore how artificial intelligence (AI) is revolutionizing personalized medicine by analyzing genetic data to tailor treatments. Learn about AI tools that predict medication effectiveness and optimize dosing for individual patients.",
// icon: Brain,
// color: "bg-purple-500",
// quiz: [
// {
// question: "What is the primary goal of AI in personalized medicine?",
// options: ["Replacing doctors", "Tailoring treatments", "Reducing costs", "Increasing medication doses"],
// correct: 1,
// },
// {
// question: "AI tools in personalized medicine can help with:",
// options: ["Predicting effectiveness", "Optimizing dosing", "Both A and B", "Neither A nor B"],
// correct: 2,
// },
// {
// question: "Personalized medicine primarily analyzes:",
// options: ["Blood type", "Genetic data", "Height and weight", "Age"],
// correct: 1,
// },
// ],
// },
// {
// title: "Telemedicine and Medication Management",
// description:
// "Understand how telemedicine is transforming medication management, enabling remote consultations and prescriptions. Learn about the benefits of telehealth for improving adherence and access to medications.",
// icon: Smartphone,
// color: "bg-teal-500",
// quiz: [
// {
// question: "Telemedicine allows for:",
// options: ["Remote consultations", "In-person visits only", "Surgery", "Lab tests at home"],
// correct: 0,
// },
// {
// question: "How does telehealth improve medication management?",
// options: [
// "By increasing costs",
// "By improving adherence",
// "By reducing medication effectiveness",
// "It doesn't affect medication management",
// ],
// correct: 1,
// },
// {
// question: "A key benefit of telemedicine is:",
// options: [
// "Reduced access to care",
// "Increased hospital visits",
// "Improved access to medications",
// "Higher medication costs",
// ],
// correct: 2,
// },
// ],
// },
// {
// title: "GLP-1 Receptor Agonists: Beyond Diabetes",
// description:
// "Discover the expanding role of GLP-1 receptor agonists in managing obesity, heart health, and kidney function. Learn how these medications are being used for conditions beyond type 2 diabetes.",
// icon: Pill,
// color: "bg-green-500",
// quiz: [
// {
// question: "GLP-1 receptor agonists were originally developed for:",
// options: ["Obesity", "Heart disease", "Type 2 diabetes", "Kidney disease"],
// correct: 2,
// },
// {
// question: "Which of the following is NOT a condition GLP-1 agonists are being used for?",
// options: ["Obesity", "Heart health", "Kidney function", "Alzheimer's disease"],
// correct: 3,
// },
// {
// question: "GLP-1 receptor agonists work by:",
// options: ["Increasing insulin production", "Decreasing appetite", "Both A and B", "Neither A nor B"],
// correct: 2,
// },
// ],
// },
// {
// title: "Digital Therapeutics for Chronic Conditions",
// description:
// "Explore the rise of digital therapeutics, including apps and wearables, for managing chronic conditions like diabetes and hypertension. Learn how these tools complement traditional medications.",
// icon: Shield,
// color: "bg-blue-500",
// quiz: [
// {
// question: "Digital therapeutics include:",
// options: ["Only mobile apps", "Only wearable devices", "Both apps and wearables", "Neither apps nor wearables"],
// correct: 2,
// },
// {
// question: "How do digital therapeutics work with traditional medications?",
// options: [
// "They replace medications",
// "They complement medications",
// "They have no relation to medications",
// "They increase medication side effects",
// ],
// correct: 1,
// },
// {
// question: "Which chronic condition is NOT typically managed with digital therapeutics?",
// options: ["Diabetes", "Hypertension", "Asthma", "Broken bones"],
// correct: 3,
// },
// ],
// },
// {
// title: "Nonpharmacological Interventions",
// description:
// "Learn about nonpharmacological strategies, such as mindfulness, acupuncture, and lifestyle changes, that complement medication use. Understand their role in managing pain, mental health, and chronic diseases.",
// icon: Activity,
// color: "bg-orange-500",
// quiz: [
// {
// question: "Which of the following is a nonpharmacological intervention?",
// options: ["Antibiotics", "Mindfulness", "Chemotherapy", "Vaccines"],
// correct: 1,
// },
// {
// question: "Nonpharmacological interventions are used to:",
// options: [
// "Replace all medications",
// "Complement medications",
// "Increase medication side effects",
// "Reduce medication effectiveness",
// ],
// correct: 1,
// },
// {
// question: "Which condition can benefit from nonpharmacological interventions?",
// options: ["Pain", "Mental health", "Chronic diseases", "All of the above"],
// correct: 3,
// },
// ],
// },
// {
// title: "Wearable Health Devices and Medication Monitoring",
// description:
// "Discover how wearable devices are being used to monitor medication effectiveness and patient health in real-time. Learn about their role in improving adherence and personalized care.",
// icon: Smartphone,
// color: "bg-cyan-500",
// quiz: [
// {
// question: "Wearable health devices can monitor:",
// options: ["Medication effectiveness", "Patient health", "Both A and B", "Neither A nor B"],
// correct: 2,
// },
// {
// question: "How do wearable devices improve medication use?",
// options: [
// "By increasing dosage",
// "By improving adherence",
// "By replacing medications",
// "They don't affect medication use",
// ],
// correct: 1,
// },
// {
// question: "Real-time monitoring with wearables can lead to:",
// options: [
// "Less personalized care",
// "More personalized care",
// "Increased medication costs",
// "Reduced medication effectiveness",
// ],
// correct: 1,
// },
// ],
// },
// {
// title: "Global Health and Medication Access",
// description:
// "Understand the challenges of medication access in underserved regions and the role of global health initiatives. Learn about strategies to improve medication availability and affordability worldwide.",
// icon: Users,
// color: "bg-pink-500",
// quiz: [
// {
// question: "A major challenge in global health is:",
// options: [
// "Too many medications",
// "Lack of medication access",
// "Overuse of medications",
// "Excessive medication production",
// ],
// correct: 1,
// },
// {
// question: "Global health initiatives aim to:",
// options: [
// "Reduce medication access",
// "Improve medication availability",
// "Increase medication costs",
// "Limit medication use",
// ],
// correct: 1,
// },
// {
// question: "Improving medication affordability is important for:",
// options: [
// "Developed countries only",
// "Developing countries only",
// "Both developed and developing countries",
// "Neither developed nor developing countries",
// ],
// correct: 2,
// },
// ],
// },
// {
// title: "Innovations in Insulin Therapy",
// description:
// "Explore the latest advancements in insulin therapy, including long-acting insulins and smart insulin pens. Learn how these innovations are improving diabetes management.",
// icon: Pill,
// color: "bg-yellow-500",
// quiz: [
// {
// question: "An example of an innovation in insulin therapy is:",
// options: ["Short-acting insulin", "Long-acting insulin", "Insulin tablets", "Insulin inhalers"],
// correct: 1,
// },
// {
// question: "Smart insulin pens can:",
// options: ["Automatically inject insulin", "Track insulin doses", "Produce insulin", "Cure diabetes"],
// correct: 1,
// },
// {
// question: "The main goal of innovations in insulin therapy is to:",
// options: [
// "Eliminate the need for insulin",
// "Improve diabetes management",
// "Increase insulin side effects",
// "Make insulin more expensive",
// ],
// correct: 1,
// },
// ],
// },
// {
// title: "Medication Safety in Older Adults",
// description:
// "Understand the unique challenges of medication use in older adults, including polypharmacy and increased side effects. Learn strategies for safe medication management in this population.",
// icon: Brain,
// color: "bg-red-500",
// quiz: [
// {
// question: "Polypharmacy refers to:",
// options: [
// "Using no medications",
// "Using one medication",
// "Using multiple medications",
// "Avoiding all medications",
// ],
// correct: 2,
// },
// {
// question: "Older adults are more susceptible to:",
// options: [
// "Fewer side effects",
// "Increased side effects",
// "No side effects",
// "Only positive effects from medications",
// ],
// correct: 1,
// },
// {
// question: "Safe medication management in older adults involves:",
// options: [
// "Increasing all medication doses",
// "Stopping all medications",
// "Regular medication reviews",
// "Ignoring side effects",
// ],
// correct: 2,
// },
// ],
// },
// {
// title: "The Role of Pharmacogenomics",
// description:
// "Discover how pharmacogenomics is shaping the future of medication by tailoring treatments based on genetic profiles. Learn about its applications in reducing adverse drug reactions and improving efficacy.",
// icon: Users,
// color: "bg-indigo-500",
// quiz: [
// {
// question: "Pharmacogenomics uses information from:",
// options: ["Blood type", "Genetic profiles", "Age", "Weight"],
// correct: 1,
// },
// {
// question: "A goal of pharmacogenomics is to:",
// options: [
// "Increase adverse drug reactions",
// "Reduce medication efficacy",
// "Improve medication efficacy",
// "Increase medication costs",
// ],
// correct: 2,
// },
// {
// question: "Pharmacogenomics can help with:",
// options: ["Predicting drug responses", "Tailoring treatments", "Both A and B", "Neither A nor B"],
// correct: 2,
// },
// ],
// },
// {
// title: "Synthetic Data in Drug Development",
// description:
// "Learn how synthetic data is being used to accelerate drug development and clinical trials. Understand its role in reducing costs and improving the accuracy of predictive models.",
// icon: Activity,
// color: "bg-purple-500",
// quiz: [
// {
// question: "Synthetic data in drug development is used to:",
// options: [
// "Slow down clinical trials",
// "Accelerate drug development",
// "Increase drug development costs",
// "Reduce drug effectiveness",
// ],
// correct: 1,
// },
// {
// question: "The use of synthetic data can lead to:",
// options: [
// "Less accurate predictive models",
// "More accurate predictive models",
// "No change in predictive models",
// "Elimination of predictive models",
// ],
// correct: 1,
// },
// {
// question: "A benefit of using synthetic data is:",
// options: ["Increased costs", "Reduced costs", "Longer development times", "Less effective drugs"],
// correct: 1,
// },
// ],
// },
// {
// title: "Patient Empowerment Through Digital Health",
// description:
// "Explore how digital health tools, such as wearable devices and health apps, are empowering patients to take control of their health. Learn about the role of real-time data in improving outcomes.",
// icon: Smartphone,
// color: "bg-teal-500",
// quiz: [
// {
// question: "Digital health tools include:",
// options: ["Wearable devices", "Health apps", "Both A and B", "Neither A nor B"],
// correct: 2,
// },
// {
// question: "Digital health tools aim to:",
// options: [
// "Disempower patients",
// "Empower patients",
// "Have no effect on patients",
// "Increase patient dependence on doctors",
// ],
// correct: 1,
// },
// {
// question: "Real-time data from digital health tools can:",
// options: [
// "Worsen health outcomes",
// "Improve health outcomes",
// "Have no effect on health outcomes",
// "Only benefit healthcare providers",
// ],
// correct: 1,
// },
// ],
// },
// ]

// export function MedEd() {
// const [isDarkMode, setIsDarkMode] = useState(false)
// const [selectedModule, setSelectedModule] = useState(null)
// const [searchTerm, setSearchTerm] = useState("")
// const [filteredModules, setFilteredModules] = useState(modules)
// const [quizStarted, setQuizStarted] = useState(false)
// const [currentQuestion, setCurrentQuestion] = useState(0)
// const [score, setScore] = useState(0)
// const [totalScore, setTotalScore] = useState(0)
// const [completedModules, setCompletedModules] = useState(new Set())

// const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

// useEffect(() => {
// const filtered = modules.filter(
// (module) =>
// module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// module.description.toLowerCase().includes(searchTerm.toLowerCase()),
// )
// setFilteredModules(filtered)
// }, [searchTerm])

// const startQuiz = () => {
// setQuizStarted(true)
// setCurrentQuestion(0)
// setScore(0)
// }

// const handleAnswer = (selectedAnswer) => {
// if (selectedModule.quiz[currentQuestion].correct === selectedAnswer) {
// const newScore = score + 1
// setScore(newScore)


//   if (currentQuestion === selectedModule.quiz.length - 1) {
//     // Update total score only when module is completed for the first time
//     if (!completedModules.has(selectedModule.title)) {
//       setTotalScore(totalScore + newScore)
//       setCompletedModules(new Set([...completedModules, selectedModule.title]))
//     }
//   }
// }

// if (currentQuestion < selectedModule.quiz.length - 1) {
//   setCurrentQuestion(currentQuestion + 1)
// } else {
//   setQuizStarted(false)
// }
// }

// const x = useMotionValue(0)
// const background = useTransform(x, [-100, 0, 100], ["#ff008c", "#7700ff", "#00f"])

// const totalPossibleScore = modules.reduce((total, module) => total + module.quiz.length, 0)

// return (
// <div className={min-h-screen ${isDarkMode ? "dark" : ""}}>
// <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
// <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />


//     <main className="container mx-auto px-4 py-8">
//       <motion.h1
//         className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         MED-Ed: Medication Education
//       </motion.h1>

//       <motion.div
//         className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Total Score: {totalScore} / {totalPossibleScore}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-600 dark:text-gray-300">
//               Completed Modules: {completedModules.size} / {modules.length}
//             </p>
//             <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
//                 style={{ width: `${(completedModules.size / modules.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="mb-8 relative"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <input
//           type="text"
//           placeholder="Search modules..."
//           className="w-full p-4 pl-12 rounded-full bg-white dark:bg-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       </motion.div>

//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         {filteredModules.map((module, index) => (
//           <motion.div
//             key={index}
//             className={`${module.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden relative`}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setSelectedModule(module)}
//             layoutId={`module-${index}`}
//           >
//             <motion.div
//               className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <module.icon className="text-gray-800 dark:text-gray-200" size={24} />
//             </motion.div>
//             {completedModules.has(module.title) && (
//               <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-sm">
//                 Completed
//               </div>
//             )}
//             <h2 className="text-xl font-semibold mb-2 text-white">{module.title}</h2>
//             <ChevronRight className="text-white mt-2" />
//           </motion.div>
//         ))}
//       </motion.div>

//       <AnimatePresence>
//         {selectedModule && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setSelectedModule(null)}
//           >
//             <motion.div
//               className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full"
//               onClick={(e) => e.stopPropagation()}
//               layoutId={`module-${modules.indexOf(selectedModule)}`}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <motion.h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//                   {selectedModule.title}
//                 </motion.h3>
//                 <motion.button
//                   onClick={() => setSelectedModule(null)}
//                   className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   whileHover={{ rotate: 90 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <X size={24} />
//                 </motion.button>
//               </div>
//               <motion.p
//                 className="text-gray-600 dark:text-gray-300 mb-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 {selectedModule.description}
//               </motion.p>
//               <motion.div
//                 className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 {!quizStarted ? (
//                   <>
//                     <h4 className="font-semibold mb-2">Interactive Quiz</h4>
//                     <p>Test your knowledge on {selectedModule.title} with our interactive quiz!</p>
//                     {completedModules.has(selectedModule.title) && (
//                       <p className="text-green-600 dark:text-green-400 mt-2">
//                         You've already completed this module!
//                       </p>
//                     )}
//                     <motion.button
//                       className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={startQuiz}
//                     >
//                       {completedModules.has(selectedModule.title) ? "Retake Quiz" : "Start Quiz"}
//                     </motion.button>
//                   </>
//                 ) : (
//                   <>
//                     <h4 className="font-semibold mb-4">
//                       Question {currentQuestion + 1} of {selectedModule.quiz.length}
//                     </h4>
//                     <p className="mb-4">{selectedModule.quiz[currentQuestion].question}</p>
//                     {selectedModule.quiz[currentQuestion].options.map((option, index) => (
//                       <motion.button
//                         key={index}
//                         className="block w-full text-left mt-2 p-2 bg-white dark:bg-gray-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleAnswer(index)}
//                       >
//                         {option}
//                       </motion.button>
//                     ))}
//                     <div className="mt-4">
//                       <p>Current Score: {score} / {currentQuestion + 1}</p>
//                     </div>
//                   </>
//                 )}
//                 {!quizStarted && currentQuestion === selectedModule.quiz.length && (
//                   <div className="mt-4">
//                     <p className="font-semibold">
//                       Quiz Complete! Score: {score} out of {selectedModule.quiz.length}
//                     </p>
//                     {score === selectedModule.quiz.length && (
//                       <p className="text-green-600 dark:text-green-400 mt-2">
//                         Perfect score! Well done!
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>

//     <motion.div
//       className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg cursor-pointer"
//       drag
//       dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//       style={{ x, background }}
//     >
//       <Activity className="text-white" size={24} />
//     </motion.div>
//   </div>
// </div>
// )
// }

// add them in to this code, and then give me the full code. and the modules are should be explanatory the modules you gave is more like an title which will be follow uo to an link but in this page user should be learning about them so instead of redirecting them to different pages explain them here only, maybe make it a n paragraph with some points. right now there are 12 modules make them explanatory and below are more 22 do the same with them too

// Blockchain in Medication Supply Chains Description: Learn how blockchain technology is being used to improve transparency and traceability in medication supply chains, reducing counterfeit drugs and ensuring patient safety.
// Icon: Shield

// Color: bg-blue-500

// 3D Printing of Medications Description: Explore how 3D printing is revolutionizing the production of personalized medications, enabling precise dosing and unique drug formulations tailored to individual needs.
// Icon: Pill

// Color: bg-green-500

// The Role of Gut Microbiome in Medication Response Description: Discover how the gut microbiome influences medication effectiveness and side effects. Learn about probiotics and dietary interventions that can optimize treatment outcomes.
// Icon: Brain

// Color: bg-purple-500

// Medication Adherence Through Gamification Description: Understand how gamification techniques, such as apps and reward systems, are being used to improve medication adherence and patient engagement.
// Icon: Activity

// Color: bg-orange-500

// The Future of mRNA Vaccines Description: Explore the potential of mRNA vaccine technology beyond COVID-19, including its applications in cancer treatment and infectious diseases.
// Icon: Shield

// Color: bg-red-500

// Medication Safety in Pediatrics Description: Learn about the unique challenges of medication use in children, including dosing accuracy and safety considerations. Discover strategies for safe pediatric medication management.
// Icon: Users

// Color: bg-pink-500

// The Role of Nanotechnology in Drug Delivery Description: Discover how nanotechnology is being used to improve drug delivery systems, enabling targeted therapy and reducing side effects.
// Icon: Pill

// Color: bg-yellow-500

// Medication Management in Mental Health Description: Explore the challenges of medication adherence and management in mental health conditions. Learn about tools and strategies to support patients with psychiatric medications.
// Icon: Brain

// Color: bg-indigo-500

// The Impact of Climate Change on Medication Stability Description: Understand how climate change affects the stability and efficacy of medications. Learn about storage solutions and best practices for maintaining medication quality.
// Icon: Shield

// Color: bg-teal-500

// The Role of Pharmacists in Public Health Description: Discover the expanding role of pharmacists in public health initiatives, including vaccination programs, chronic disease management, and health education.
// Icon: Users

// Color: bg-purple-500

// Medication Errors and Prevention Strategies Description: Learn about common medication errors and how to prevent them. Explore strategies for improving medication safety in healthcare settings.
// Icon: Shield

// Color: bg-blue-500

// The Role of Virtual Reality in Medication Education Description: Explore how virtual reality (VR) is being used to educate patients and healthcare professionals about medication use and management.
// Icon: Smartphone

// Color: bg-cyan-500

// The Ethics of Medication Pricing Description: Understand the ethical considerations surrounding medication pricing and access. Learn about initiatives to make essential medications more affordable.
// Icon: DollarSign

// Color: bg-green-500

// The Role of Artificial Organs in Medication Testing Description: Discover how artificial organs are being used to test medication safety and efficacy, reducing the need for animal testing and improving drug development.
// Icon: Activity

// Color: bg-orange-500

// Medication Management in Pregnancy Description: Learn about the challenges of medication use during pregnancy and the importance of balancing maternal health with fetal safety.
// Icon: Users

// Color: bg-pink-500

// The Role of Social Media in Medication Education Description: Explore how social media platforms are being used to educate patients about medication use, adherence, and safety.
// Icon: Smartphone

// Color: bg-teal-500

// The Future of Antibiotics Description: Understand the challenges of antibiotic resistance and the development of new antibiotics. Learn about strategies to preserve the effectiveness of existing antibiotics.
// Icon: Pill

// Color: bg-red-500

// The Role of Big Data in Medication Development Description: Discover how big data analytics is being used to accelerate medication development, improve clinical trials, and predict patient outcomes.
// Icon: Activity

// Color: bg-indigo-500