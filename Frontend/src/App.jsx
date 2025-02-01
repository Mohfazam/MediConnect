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

const router = createBrowserRouter([
  {
    path: "/",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;