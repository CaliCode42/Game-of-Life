import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DailyTasks from "./pages/DailyTasks"
import RewardShop from "./pages/RewardShop"
import objectives from "./data/objectives.json";

function App() {

  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("lifeRPG_coins")
    return saved ? Number(saved) : 0
  })

  const [totalXp, setTotalXp] = useState(() => {
    const saved = localStorage.getItem("lifeRPG_totalXp")
    return saved ? Number(saved) : 0
  })

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("lifeRPG_streak")
    return saved ? Number(saved) : 0
  })

  const [bestStreak, setBestStreak] = useState(() => {
    const saved = localStorage.getItem("lifeRPG_bestStreak")
    return saved ? Number(saved) : 0
  })

  const [tasks, setTasks] = useState(objectives)
//   const [tasks, setTasks] = useState(() => {
//   const saved = localStorage.getItem("lifeRPG_tasks")
//   return saved ? JSON.parse(saved) : objectives
// })

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <Home
              coins={coins}
              totalXp={totalXp}
              streak={streak}
              bestStreak={bestStreak}
            />
          }
        />

        <Route
          path="/tasks"
          element={
            <DailyTasks
              coins={coins}
              setCoins={setCoins}
              totalXp={totalXp}
              setTotalXp={setTotalXp}
              streak={streak}
              setStreak={setStreak}
              bestStreak={bestStreak}
              setBestStreak={setBestStreak}
			  tasks={tasks}
			  setTasks={setTasks}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <RewardShop
              coins={coins}
              setCoins={setCoins}
              totalXp={totalXp}
              streak={streak}
              bestStreak={bestStreak}
            />
          }
        />

      </Routes>
    </Router>
  )
}

export default App