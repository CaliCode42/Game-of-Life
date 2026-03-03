import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider, useAuth } from './context/AuthContext'
import { PlayerProvider, usePlayer } from './context/PlayerContext'
import { TasksProvider } from './context/TasksContext'
import Home from "./pages/Home"
import DailyTasks from "./pages/DailyTasks"
import RewardShop from "./pages/RewardShop"
import Login from "./pages/Login"

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { loading: playerLoading } = usePlayer();

  if (authLoading || playerLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <TasksProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<DailyTasks />} />
        <Route path="/shop" element={<RewardShop />} />
      </Routes>
    </TasksProvider>
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