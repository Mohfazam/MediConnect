import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Award, Sun, Trophy, BookOpen, X, ChevronRight, Search, DollarSign, Moon, TrendingUp, Brain, Pill, Activity, Users, Shield, Smartphone } from "lucide-react"
import { Navbar } from "./Navbar"

export const modules = [
  {
    title: "AI-Driven Personalized Medicine",
    description: "Artificial Intelligence (AI) is revolutionizing personalized medicine by analyzing vast amounts of genetic and health data. This module explores how AI algorithms can predict medication effectiveness, optimize dosing, and identify potential side effects for individual patients. Learn about real-world applications of AI in healthcare, such as IBM Watson for Oncology and Google's DeepMind Health, and understand the ethical considerations surrounding AI in medicine.",
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
    description: "Telemedicine is transforming healthcare delivery, particularly in medication management. This module delves into how remote consultations and digital health platforms are improving access to healthcare providers, enabling virtual prescriptions, and enhancing medication adherence. Learn about the benefits and challenges of telehealth in medication management, including improved patient convenience, reduced healthcare costs, and potential issues with privacy and technology access. Explore case studies of successful telemedicine implementations and their impact on patient outcomes.",
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
    description: "GLP-1 receptor agonists, initially developed for type 2 diabetes management, are now showing promise in treating various other conditions. This module explores the expanding role of these medications in managing obesity, improving heart health, and protecting kidney function. Learn about the mechanism of action of GLP-1 receptor agonists, their effects on appetite regulation and metabolism, and ongoing research into their potential applications in neurodegenerative diseases and non-alcoholic fatty liver disease (NAFLD). Discover how these medications are changing the landscape of chronic disease management.",
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
    description: "Digital therapeutics are emerging as powerful tools in managing chronic conditions. This module explores how smartphone apps, wearable devices, and other digital platforms are being used to complement traditional medications in treating diseases like diabetes, hypertension, and mental health disorders. Learn about FDA-approved digital therapeutics, their mechanisms of action, and how they're integrated into patient care plans. Discover the potential of these technologies in improving medication adherence, providing real-time health monitoring, and delivering personalized interventions.",
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
    description: "While medications play a crucial role in healthcare, nonpharmacological interventions are increasingly recognized for their importance in managing various conditions. This module explores evidence-based strategies such as mindfulness meditation, cognitive behavioral therapy, acupuncture, and lifestyle modifications that can complement or sometimes replace medication use. Learn about the science behind these interventions, their applications in pain management, mental health, and chronic disease prevention, and how they can be integrated into comprehensive treatment plans to improve patient outcomes and quality of life.",
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
    description: "Wearable health devices are revolutionizing how we monitor health and manage medications. This module delves into the various types of wearable devices, from smartwatches to continuous glucose monitors, and how they're being used to track medication effectiveness and patient health in real-time. Learn about the integration of wearable data with electronic health records, the role of these devices in improving medication adherence, and their potential in early detection of adverse drug reactions. Explore case studies showcasing how wearables are enhancing personalized care and improving health outcomes across various medical conditions.",
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
    description: "Access to essential medications remains a critical global health challenge. This module explores the complex issues surrounding medication availability and affordability worldwide, including drug pricing, patent laws, and distribution challenges in low-resource settings. Learn about global health initiatives aimed at improving access to life-saving medications, such as the WHO's Essential Medicines List and programs like PEPFAR for HIV/AIDS treatment. Discover innovative strategies being employed to overcome barriers to medication access, including public-private partnerships, generic drug programs, and local manufacturing initiatives in developing countries.",
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
    description: "Insulin therapy has come a long way since its discovery, with continuous innovations improving the lives of people with diabetes. This module explores cutting-edge advancements in insulin therapy, including ultra-long-acting insulins, smart insulin pens, and closed-loop insulin delivery systems (artificial pancreas). Learn about the pharmacokinetics of different insulin types, the benefits of newer formulations in reducing hypoglycemia risk and improving glycemic control, and emerging technologies like glucose-responsive 'smart' insulins. Discover how these innovations are transforming diabetes management and improving patient quality of life.",
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
    description: "Medication management in older adults presents unique challenges due to physiological changes, multiple chronic conditions, and polypharmacy. This module delves into the complexities of medication use in the elderly population, exploring issues such as altered drug metabolism, increased susceptibility to side effects, and drug-drug interactions. Learn about strategies for safe medication management, including medication reconciliation, deprescribing practices, and the use of tools like the Beers Criteria for potentially inappropriate medication use in older adults. Discover how healthcare providers can optimize medication regimens to improve safety and quality of life for older patients.",
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
    description: "Pharmacogenomics is at the forefront of personalized medicine, tailoring drug therapies based on an individual's genetic profile. This module explores how genetic variations influence drug metabolism, efficacy, and side effects. Learn about key pharmacogenomic markers, such as CYP450 enzymes, and their impact on medication response. Discover how pharmacogenomic testing is being integrated into clinical practice to guide medication selection and dosing, particularly in areas like oncology, psychiatry, and cardiovascular medicine. Explore the potential of pharmacogenomics in reducing adverse drug reactions, improving treatment outcomes, and optimizing medication use across diverse patient populations.",
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
    description: "Synthetic data is emerging as a powerful tool in accelerating drug development and improving clinical trial design. This module explores how artificial intelligence and machine learning techniques are used to generate realistic, privacy-preserving synthetic datasets that mimic real patient data. Learn about the applications of synthetic data in various stages of drug development, from target identification to clinical trial simulations. Discover how this approach can reduce costs, speed up the drug discovery process, and improve the accuracy of predictive models. Explore case studies showcasing successful applications of synthetic data in pharmaceutical research and development.",
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
    description: "Digital health tools are revolutionizing patient engagement and self-management of health conditions. This module explores how smartphones, wearable devices, and health apps are empowering patients to take an active role in their healthcare. Learn about the various types of digital health tools, including mobile health apps, remote monitoring devices, and personal health records. Discover how these technologies enable patients to track vital signs, manage medications, and communicate with healthcare providers in real-time. Explore the impact of digital health on chronic disease management, medication adherence, and overall health outcomes. Understand the challenges and opportunities in implementing digital health solutions, including data privacy concerns, health literacy, and the digital divide.",

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
  {
    title: "Blockchain in Medication Supply Chains",
    description: "Blockchain technology is revolutionizing the pharmaceutical supply chain, offering unprecedented levels of transparency and traceability. This module explores how blockchain is being implemented to combat counterfeit drugs, ensure medication authenticity, and improve supply chain efficiency. Learn about the principles of blockchain and its applications in tracking drug provenance, managing recalls, and enhancing regulatory compliance. Discover case studies of successful blockchain implementations in the pharmaceutical industry and their impact on patient safety and trust in medication supply.",
    icon: Shield,
    color: "bg-blue-500",
    quiz: [
      {
        question: "Blockchain in medication supply chains primarily aims to:",
        options: ["Increase drug prices", "Improve transparency", "Reduce drug effectiveness", "Slow down distribution"],
        correct: 1,
      },
      {
        question: "How does blockchain help combat counterfeit drugs?",
        options: ["By increasing production", "By tracking provenance", "By reducing drug quality", "It doesn't affect counterfeiting"],
        correct: 1,
      },
      {
        question: "A benefit of blockchain in pharmaceutical supply chains is:",
        options: ["Decreased transparency", "Improved regulatory compliance", "Increased counterfeiting", "Reduced drug efficacy"],
        correct: 1,
      },
    ],
  },
  {
    title: "3D Printing of Medications",
    description: "3D printing technology is opening new frontiers in pharmaceutical manufacturing, enabling the production of personalized medications with precise dosing and unique formulations. This module delves into the principles of 3D printing in pharmacy, exploring different printing techniques and their applications in drug delivery. Learn about the potential of 3D-printed medications in improving patient compliance, customizing drug release profiles, and creating complex multi-drug combinations. Discover the regulatory challenges and future prospects of this innovative approach to medication production.",
    icon: Pill,
    color: "bg-green-500",
    quiz: [
      {
        question: "3D printing of medications allows for:",
        options: ["Mass production only", "Personalized dosing", "Reduced drug effectiveness", "Increased medication costs"],
        correct: 1,
      },
      {
        question: "A potential benefit of 3D-printed medications is:",
        options: ["Reduced customization", "Improved patient compliance", "Increased side effects", "Limited drug combinations"],
        correct: 1,
      },
      {
        question: "3D printing in pharmacy faces challenges in:",
        options: ["Regulatory approval", "Reducing drug efficacy", "Increasing production costs", "Limiting personalization"],
        correct: 0,
      },
    ],
  },
  {
    title: "The Role of Gut Microbiome in Medication Response",
    description: "The gut microbiome plays a crucial role in human health and is increasingly recognized as a key factor in medication response and efficacy. This module explores the complex interactions between gut bacteria and drugs, including how the microbiome can influence drug metabolism, absorption, and side effects. Learn about the concept of pharmacomicrobiomics and its implications for personalized medicine. Discover how probiotics, prebiotics, and dietary interventions can be used to modulate the gut microbiome and potentially optimize treatment outcomes across various therapeutic areas.",
    icon: Brain,
    color: "bg-purple-500",
    quiz: [
      {
        question: "The gut microbiome can influence:",
        options: ["Drug metabolism", "Drug absorption", "Drug side effects", "All of the above"],
        correct: 3,
      },
      {
        question: "Pharmacomicrobiomics studies the interaction between:",
        options: ["Drugs and liver", "Drugs and gut bacteria", "Drugs and brain", "Drugs and kidneys"],
        correct: 1,
      },
      {
        question: "Modulating the gut microbiome to improve drug response can involve:",
        options: ["Probiotics", "Prebiotics", "Dietary interventions", "All of the above"],
        correct: 3,
      },
    ],
  },
  {
    title: "Medication Adherence Through Gamification",
    description: "Gamification is emerging as an innovative approach to improving medication adherence and patient engagement. This module explores how game design elements and principles are being applied to healthcare apps and interventions to make medication management more engaging and rewarding. Learn about different gamification techniques, such as point systems, challenges, and social competitions, and their psychological basis in motivation theory. Discover case studies of successful gamified medication adherence programs and their impact on patient outcomes across various chronic conditions.",
    icon: Activity,
    color: "bg-orange-500",
    quiz: [
      {
        question: "Gamification in medication adherence aims to:",
        options: ["Make medications more effective", "Make adherence more engaging", "Reduce medication doses", "Increase medication costs"],
        correct: 1,
      },
      {
        question: "Which of the following is NOT a common gamification technique?",
        options: ["Point systems", "Social competitions", "Challenges", "Increasing medication side effects"],
        correct: 3,
      },
      {
        question: "Gamification in healthcare is based on principles of:",
        options: ["Pharmacology", "Motivation theory", "Surgery", "Radiology"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Future of mRNA Vaccines",
    description: "The success of mRNA vaccines in combating COVID-19 has opened up new possibilities for this technology in preventing and treating various diseases. This module explores the principles of mRNA vaccine technology and its potential applications beyond infectious diseases. Learn about ongoing research into mRNA vaccines for cancer immunotherapy, autoimmune disorders, and rare genetic conditions. Discover the advantages of mRNA vaccines, such as rapid development and production, and the challenges in their widespread implementation. Explore the future landscape of vaccine development and how mRNA technology might transform preventive and therapeutic medicine.",
    icon: Shield,
    color: "bg-red-500",
    quiz: [
      {
        question: "mRNA vaccine technology has shown promise in treating:",
        options: ["Only COVID-19", "Infectious diseases only", "Cancer and autoimmune disorders", "None of the above"],
        correct: 2,
      },
      {
        question: "An advantage of mRNA vaccines is:",
        options: ["Slow development", "Rapid production", "Limited applications", "High production costs"],
        correct: 1,
      },
      {
        question: "The future of mRNA vaccines may include applications in:",
        options: ["Preventive medicine", "Therapeutic medicine", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
    ],
  },
  {
    title: "Medication Safety in Pediatrics",
    description: "Medication use in pediatric populations presents unique challenges due to differences in physiology, pharmacokinetics, and dosing requirements across various age groups. This module explores the critical aspects of medication safety in children, from neonates to adolescents. Learn about age-specific dosing considerations, common medication errors in pediatrics, and strategies for their prevention. Discover the importance of weight-based dosing, the role of liquid formulations, and the challenges of medication adherence in children. Explore technological solutions and best practices for improving medication safety in pediatric care settings.",
    icon: Users,
    color: "bg-pink-500",
    quiz: [
      {
        question: "A key challenge in pediatric medication safety is:",
        options: ["Age-specific dosing", "Adult-sized doses", "Avoiding liquid medications", "Using only tablets"],
        correct: 0,
      },
      {
        question: "Weight-based dosing in pediatrics is important because:",
        options: ["It's easier to calculate", "Children's weights vary greatly", "It's always less accurate", "It's only used for antibiotics"],
        correct: 1,
      },
      {
        question: "Improving medication adherence in children often involves:",
        options: ["Using only adult formulations", "Ignoring taste preferences", "Using liquid formulations", "Avoiding technology"],
        correct: 2,
      },
    ],
  },
  {
    title: "The Role of Nanotechnology in Drug Delivery",
    description: "Nanotechnology is revolutionizing drug delivery systems, offering unprecedented control over how medications are delivered to specific targets in the body. This module explores the principles of nanomedicine and its applications in improving drug efficacy and reducing side effects. Learn about various nanocarrier systems, such as liposomes, polymeric nanoparticles, and dendrimers, and their unique properties. Discover how nanotechnology enables targeted drug delivery, enhanced drug solubility, and controlled release formulations. Explore case studies of nanomedicine in cancer treatment, gene therapy, and crossing the blood-brain barrier.",
    icon: Pill,
    color: "bg-yellow-500",
    quiz: [
      {
        question: "Nanotechnology in drug delivery aims to:",
        options: ["Increase drug side effects", "Improve drug targeting", "Reduce drug efficacy", "Increase required doses"],
        correct: 1,
      },
      {
        question: "Which of the following is NOT a type of nanocarrier?",
        options: ["Liposomes", "Dendrimers", "Polymeric nanoparticles", "Macromolecules"],
        correct: 3,
      },
      {
        question: "Nanotechnology in drug delivery can help with:",
        options: ["Crossing the blood-brain barrier", "Reducing drug solubility", "Increasing systemic toxicity", "Limiting drug release"],
        correct: 0,
      },
    ],
  },
  {
    title: "Medication Management in Mental Health",
    description: "Effective medication management is crucial in the treatment of mental health conditions, but it comes with unique challenges. This module explores the complexities of psychopharmacology, including the management of side effects, drug interactions, and the importance of medication adherence in psychiatric care. Learn about strategies for optimizing medication regimens in conditions such as depression, anxiety, bipolar disorder, and schizophrenia. Discover the role of therapeutic drug monitoring, the concept of treatment-resistant disorders, and emerging digital tools for supporting patients with mental health medications.",
    icon: Brain,
    color: "bg-indigo-500",
    quiz: [
      {
        question: "A key challenge in mental health medication management is:",
        options: ["Lack of side effects", "High adherence rates", "Complex drug interactions", "Simplicity of regimens"],
        correct: 2,
      },
      {
        question: "Therapeutic drug monitoring in mental health is used to:",
        options: ["Increase side effects", "Optimize medication doses", "Reduce efficacy", "Avoid blood tests"],
        correct: 1,
      },
      {
        question: "Digital tools in mental health medication management can help with:",
        options: ["Replacing therapy", "Monitoring symptoms", "Eliminating medications", "Increasing hospitalization"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Impact of Climate Change on Medication Stability",
    description: "Climate change is posing new challenges to medication stability and efficacy, particularly in regions experiencing extreme temperatures and humidity. This module explores how environmental factors affect drug degradation, potency, and shelf life. Learn about the impact of heat waves, cold chains, and humidity on different medication formulations. Discover strategies for maintaining medication quality in changing climatic conditions, including innovative packaging solutions, temperature-controlled supply chains, and the development of climate-resilient drug formulations. Explore the global implications of climate change on medication access and the pharmaceutical industry's response to these challenges.",
    icon: Shield,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Climate change can affect medication:",
        options: ["Stability", "Efficacy", "Shelf life", "All of the above"],
        correct: 3,
      },
      {
        question: "Which environmental factor does NOT typically affect medication stability?",
        options: ["Temperature", "Humidity", "Atmospheric pressure", "Light exposure"],
        correct: 2,
      },
      {
        question: "A strategy to maintain medication quality in changing climates includes:",
        options: ["Ignoring expiration dates", "Innovative packaging", "Increasing medication doses", "Avoiding temperature control"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Role of Pharmacists in Public Health",
    description: "Pharmacists play an increasingly vital role in public health initiatives, extending their responsibilities beyond traditional medication dispensing. This module explores the expanding scope of pharmacy practice in areas such as vaccination programs, chronic disease management, health screenings, and community health education. Learn about the concept of pharmacy-based public health services and their impact on improving healthcare access and outcomes. Discover how pharmacists contribute to smoking cessation programs, diabetes management, and cardiovascular risk reduction. Explore the challenges and opportunities in integrating pharmacists more fully into public health teams and primary care settings.",
    icon: Users,
    color: "bg-purple-500",
    quiz: [
      {
        question: "Pharmacists' role in public health includes:",
        options: ["Only dispensing medications", "Vaccination programs", "Surgical procedures", "Diagnostic imaging"],
        correct: 1,
      },
      {
        question: "Pharmacy-based public health services can improve:",
        options: ["Healthcare access", "Healthcare outcomes", "Both A and B", "Neither A nor B"],
        correct: 2,
      },
      {
        question: "A challenge in expanding pharmacists' public health role is:",
        options: ["Lack of medication knowledge", "Integration into healthcare teams", "Reduced patient interest", "Excess free time"],
        correct: 1,
      },
    ],
  },
  {
    title: "Medication Errors and Prevention Strategies",
    description: "Medication errors remain a significant challenge in healthcare, with potential for serious patient harm. This module explores common types of medication errors, their causes, and evidence-based strategies for prevention. Learn about the role of systems thinking in error prevention, including the implementation of computerized physician order entry (CPOE), barcode medication administration, and clinical decision support systems. Discover the importance of a just culture in error reporting and the role of root cause analysis in improving medication safety. Explore case studies of successful medication error reduction programs and their impact on patient outcomes.",
    icon: Shield,
    color: "bg-blue-500",
    quiz: [
      {
        question: "A common strategy to prevent medication errors is:",
        options: ["Avoiding technology use", "Barcode medication administration", "Reducing staff training", "Ignoring near-misses"],
        correct: 1,
      },
      {
        question: "The concept of 'just culture' in medication safety promotes:",
        options: ["Punitive actions", "Error concealment", "Open reporting", "Blame assignment"],
        correct: 2,
      },
      {
        question: "Root cause analysis in medication errors focuses on:",
        options: ["Finding individual fault", "Systemic improvements", "Increasing workload", "Reducing documentation"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Role of Virtual Reality in Medication Education",
    description: "Virtual Reality (VR) technology is emerging as a powerful tool for medication education, offering immersive and interactive learning experiences for both patients and healthcare professionals. This module explores how VR is being used to enhance understanding of medication mechanisms, improve patient counseling, and train healthcare providers in medication administration. Learn about VR applications in visualizing drug interactions at the molecular level, simulating medication side effects, and practicing complex medication regimens. Discover case studies of VR implementation in pharmacy education and patient medication management programs.",
    icon: Smartphone,
    color: "bg-cyan-500",
    quiz: [
      {
        question: "Virtual Reality in medication education can be used for:",
        options: ["Visualizing drug interactions", "Simulating side effects", "Training healthcare providers", "All of the above"],
        correct: 3,
      },
      {
        question: "A benefit of using VR in medication education is:",
        options: ["Reduced interactivity", "Immersive learning experiences", "Increased medication errors", "Limited visual representation"],
        correct: 1,
      },
      {
        question: "VR in pharmacy education can help with:",
        options: ["Avoiding patient counseling", "Practicing medication regimens", "Reducing understanding of drug mechanisms", "Eliminating hands-on training"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Ethics of Medication Pricing",
    description: "The cost of medications is a critical issue in healthcare, with significant ethical implications for patient access and health outcomes. This module explores the complex factors influencing medication pricing, including research and development costs, market dynamics, and regulatory policies. Learn about the ethical considerations surrounding drug pricing strategies, the impact of high medication costs on patient care, and global disparities in medication access. Discover initiatives aimed at improving medication affordability, such as value-based pricing models, generic drug programs, and international efforts to negotiate fair drug prices. Explore case studies of controversial pricing decisions and their societal impact.",
    icon: DollarSign,
    color: "bg-green-500",
    quiz: [
      {
        question: "Factors influencing medication pricing include:",
        options: ["R&D costs", "Market dynamics", "Regulatory policies", "All of the above"],
        correct: 3,
      },
      {
        question: "An ethical concern in medication pricing is:",
        options: ["Ensuring maximum profits", "Patient access to essential drugs", "Limiting generic competition", "Increasing marketing budgets"],
        correct: 1,
      },
      {
        question: "A strategy to improve medication affordability is:",
        options: ["Eliminating R&D", "Value-based pricing models", "Restricting drug access", "Increasing drug prices"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Role of Artificial Organs in Medication Testing",
    description: "Artificial organs are revolutionizing the field of drug development and testing, offering more accurate and ethical alternatives to traditional animal testing methods. This module explores how artificial organs, also known as organs-on-chips or organoids, are being used to test medication safety and efficacy. Learn about the different types of artificial organs, their construction, and how they mimic human physiology. Discover the advantages of using artificial organs in drug screening, including improved predictability of human responses and reduced reliance on animal models. Explore case studies of successful drug development using artificial organ technology and its potential to accelerate the drug approval process.",
    icon: Activity,
    color: "bg-orange-500",
    quiz: [
      {
        question: "Artificial organs in drug testing aim to:",
        options: ["Replace human trials entirely", "Improve predictability of human responses", "Increase animal testing", "Slow down drug development"],
        correct: 1,
      },
      {
        question: "An advantage of using artificial organs in drug testing is:",
        options: ["Increased cost", "Reduced ethical concerns", "Less accurate results", "Longer development times"],
        correct: 1,
      },
      {
        question: "Artificial organs are also known as:",
        options: ["Synthetic bodies", "Organs-on-chips", "Robotic implants", "Virtual tissues"],
        correct: 1,
      },
    ],
  },
  {
    title: "Medication Management in Pregnancy",
    description: "Medication use during pregnancy requires careful consideration of both maternal health needs and potential risks to fetal development. This module explores the complexities of prescribing and managing medications in pregnant women. Learn about the FDA pregnancy risk categories, the importance of risk-benefit analysis, and strategies for minimizing fetal exposure to potentially harmful drugs. Discover how physiological changes during pregnancy affect drug pharmacokinetics and the implications for dosing adjustments. Explore case studies of common medical conditions in pregnancy and evidence-based approaches to their pharmacological management, including the treatment of chronic diseases, acute illnesses, and pregnancy-specific conditions.",
    icon: Users,
    color: "bg-pink-500",
    quiz: [
      {
        question: "The FDA pregnancy risk categories are used to:",
        options: ["Promote medication use in pregnancy", "Assess potential risks to the fetus", "Increase drug sales", "Avoid all medication use"],
        correct: 1,
      },
      {
        question: "Physiological changes in pregnancy can affect:",
        options: ["Drug absorption", "Drug metabolism", "Drug excretion", "All of the above"],
        correct: 3,
      },
      {
        question: "A key principle in managing medications during pregnancy is:",
        options: ["Avoiding all medications", "Risk-benefit analysis", "Using only new drugs", "Maximizing drug doses"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Role of Social Media in Medication Education",
    description: "Social media platforms have become influential channels for disseminating health information, including medication education. This module explores the opportunities and challenges of using social media for medication-related communication and education. Learn about strategies for leveraging social media to improve medication adherence, raise awareness about drug safety, and combat misinformation. Discover how healthcare providers and organizations are using platforms like Twitter, Facebook, and Instagram to engage patients and provide reliable medication information. Explore case studies of successful social media campaigns in medication education and the ethical considerations surrounding pharmaceutical marketing on social platforms.",
    icon: Smartphone,
    color: "bg-teal-500",
    quiz: [
      {
        question: "Social media in medication education can be used to:",
        options: ["Replace healthcare providers", "Improve medication adherence", "Promote off-label drug use", "Increase medication costs"],
        correct: 1,
      },
      {
        question: "A challenge of using social media for medication education is:",
        options: ["Reaching too many people", "Combating misinformation", "Reducing patient engagement", "Eliminating the need for research"],
        correct: 1,
      },
      {
        question: "Ethical considerations in pharmaceutical social media use include:",
        options: ["Marketing regulations", "Patient privacy", "Information accuracy", "All of the above"],
        correct: 3,
      },
    ],
  },
  {
    title: "The Future of Antibiotics",
    description: "The rise of antibiotic resistance poses a significant threat to global health, necessitating innovative approaches to antibiotic development and use. This module explores the current challenges in antibiotic therapy and the future directions of antimicrobial research. Learn about novel antibiotic discovery techniques, including AI-driven drug design and the exploration of extreme environments for new compounds. Discover strategies for preserving the effectiveness of existing antibiotics, such as antibiotic stewardship programs and combination therapies. Explore emerging alternatives to traditional antibiotics, including bacteriophage therapy, antimicrobial peptides, and immunomodulatory approaches to fighting bacterial infections.",
    icon: Pill,
    color: "bg-red-500",
    quiz: [
      {
        question: "A major challenge in antibiotic therapy is:",
        options: ["Excessive effectiveness", "Antibiotic resistance", "Low cost", "Limited bacterial targets"],
        correct: 1,
      },
      {
        question: "Novel antibiotic discovery techniques include:",
        options: ["Only using existing drugs", "AI-driven drug design", "Avoiding natural compounds", "Focusing on viral infections"],
        correct: 1,
      },
      {
        question: "An emerging alternative to traditional antibiotics is:",
        options: ["Increased antibiotic use", "Bacteriophage therapy", "Avoiding all antimicrobials", "Promoting bacterial growth"],
        correct: 1,
      },
    ],
  },
  {
    title: "The Role of Big Data in Medication Development",
    description: "Big data analytics is transforming the landscape of medication development, offering unprecedented insights into drug discovery, clinical trials, and patient outcomes. This module explores how large-scale data analysis is being applied across the pharmaceutical lifecycle. Learn about the use of machine learning algorithms in identifying new drug targets, predicting drug-drug interactions, and optimizing clinical trial designs. Discover how real-world evidence from electronic health records and wearable devices is informing post-market surveillance and personalized medicine approaches. Explore the challenges of managing and analyzing large healthcare datasets, including data privacy concerns and the need for robust analytical tools.",
    icon: Activity,
    color: "bg-indigo-500",
    quiz: [
      {
        question: "Big data in medication development can be used for:",
        options: ["Drug discovery", "Clinical trial optimization", "Post-market surveillance", "All of the above"],
        correct: 3,
      },
      {
        question: "Real-world evidence in pharmaceutical research comes from:",
        options: ["Only clinical trials", "Electronic health records", "Animal studies", "Theoretical models"],
        correct: 1,
      },
      {
        question: "A challenge in using big data for medication development is:",
        options: ["Too few data sources", "Data privacy concerns", "Lack of analytical tools", "Reduced drug efficacy"],
        correct: 1,
      },
    ],
  },
]

const dummyLeaderboard = [
    { username: "Sarwar", score: 950 },
    { username: "AnotherSarwar", score: 920 },
    { username: "AgainSarwar", score: 890 },
    { username: "SarwarAgain", score: 860 },
    { username: "SarwarSarwar", score: 830 },
  ]
  


  export function MedEd() {
      const [isDarkMode, setIsDarkMode] = useState(false)
      const [selectedModule, setSelectedModule] = useState(null)
      const [searchTerm, setSearchTerm] = useState("")
      const [quizStarted, setQuizStarted] = useState(false)
      const [currentQuestion, setCurrentQuestion] = useState(0)
      const [score, setScore] = useState(0)
      const [showLeaderboard, setShowLeaderboard] = useState(false)
      const [username, setUsername] = useState("")
      const [completedModules, setCompletedModules] = useState(new Set())
      const [totalScore, setTotalScore] = useState(0)
      const [leaderboard, setLeaderboard] = useState(dummyLeaderboard)
    
      const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
    
      const filteredModules = useMemo(() => {
        return modules.filter(
          (module) =>
            module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
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
            if (!completedModules.has(selectedModule.title)) {
              const newCompletedModules = new Set([...completedModules, selectedModule.title])
              setCompletedModules(newCompletedModules)
              setTotalScore(totalScore + newScore)
            }
          }
        }
    
        if (currentQuestion < selectedModule.quiz.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          setQuizStarted(false)
        }
      }
    
      useEffect(() => {
        if (username && totalScore > 0) {
          const newLeaderboard = [...leaderboard, { username, score: totalScore }]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
          setLeaderboard(newLeaderboard)
        }
      }, [username, totalScore, leaderboard])
    
      const x = useMotionValue(0)
      const background = useTransform(x, [-100, 0, 100], ["#ff008c", "#7700ff", "#00f"])
    
      const totalPossibleScore = modules.reduce((total, module) => total + module.quiz.length, 0)
    
      return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
          <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    
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
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <TrendingUp className="mr-2" size={20} />
                      <p>
                        Total Score: {totalScore} / {totalPossibleScore}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 justify-end mb-2">
                      <BookOpen className="mr-2" size={20} />
                      <p>
                        Completed Modules: {completedModules.size} / {modules.length}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${(completedModules.size / modules.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
    
              <div className="flex justify-between items-center mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search modules..."
                    className="w-full p-4 pl-12 rounded-full bg-white dark:bg-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <motion.button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLeaderboard(true)}
                >
                  <Award className="mr-2" size={20} />
                  Leaderboard
                </motion.button>
              </div>
    
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
                    <p className="text-white text-opacity-80 mb-4 line-clamp-3">{module.description}</p>
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
                      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                              <p>
                                Current Score: {score} / {currentQuestion + 1}
                              </p>
                            </div>
                          </>
                        )}
                        {!quizStarted && currentQuestion === selectedModule.quiz.length && (
                          <div className="mt-4">
                            <p className="font-semibold">
                              Quiz Complete! Score: {score} out of {selectedModule.quiz.length}
                            </p>
                            {score === selectedModule.quiz.length && (
                              <p className="text-green-600 dark:text-green-400 mt-2">Perfect score! Well done!</p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
    
              <AnimatePresence>
                {showLeaderboard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowLeaderboard(false)}
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                          <Trophy className="mr-2" size={24} />
                          Leaderboard
                        </h3>
                        <motion.button
                          onClick={() => setShowLeaderboard(false)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X size={24} />
                        </motion.button>
                      </div>
                      <div className="space-y-4">
                        {leaderboard.map((entry, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                          >
                            <span className="font-semibold">
                              {index + 1}. {entry.username}
                            </span>
                            <span>{entry.score}</span>
                          </div>
                        ))}
                      </div>
                      {!username && (
                        <div className="mt-6">
                          <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      )}
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
  




















