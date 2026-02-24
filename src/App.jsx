import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider, useAuth } from './context/AuthContext'
import { PlayerProvider, usePlayer } from './context/PlayerContext'
import Home from "./pages/Home"
import DailyTasks from "./pages/DailyTasks"
import RewardShop from "./pages/RewardShop"
import Login from "./pages/Login"
import objectives from "./data/objectives.json";

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { loading: playerLoading } = usePlayer();

  const [tasks, setTasks] = useState(objectives);

  if (authLoading || playerLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<DailyTasks tasks={tasks} setTasks={setTasks} />} />
      <Route path="/shop" element={<RewardShop />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <AppContent />
        </Router>
      </PlayerProvider>
    </AuthProvider>
  )
}

export default App