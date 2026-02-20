import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import DailyTasks from "./pages/DailyTasks"
import RewardShop from "./pages/RewardShop"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<DailyTasks />} />
        <Route path="/shop" element={<RewardShop />} />
      </Routes>
    </Router>
  )
}

export default App;
