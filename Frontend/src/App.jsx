import { useState } from 'react'
import './App.css'
import {Landing} from './components/Landing'
import { PrescriptionAnalyzer } from './components/PrescriptionAnalyzer';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import {DrugCostOptimizer} from './components/DrugCostOptimizer'
import {SeriousMedications} from './components/seriousmedications'
import {Login} from './components/Login'
import {Signup} from './components/Signup'
import {MedEd} from './components/MedEd'
import {MedAI} from './components/MedAI'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Landing",
    element: <Landing />,
  },
  {
    path: "/PrescriptionAnalyzer",
    element: <PrescriptionAnalyzer />,
  },
  {
    path: "/DrugCostOptimizer",
    element: <DrugCostOptimizer />,
  },
  {
    path: "/SeriousMedications",
    element: <SeriousMedications />,
  },
  {
    path: "/Signup",
    element: <Signup/>,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/meded",
    element: <MedEd />,
  },
  {
    path: "/chatbot",
    element: <MedAI />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;