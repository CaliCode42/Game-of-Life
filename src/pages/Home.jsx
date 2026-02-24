import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { usePlayer } from "../context/PlayerContext"

export default function Home() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { coins, totalXp, streak, bestStreak } = usePlayer()

  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <button
        onClick={handleSignOut}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          padding: "8px 12px",
          borderRadius: 4,
          cursor: "pointer",
          background: "#dc3545",
          color: "white",
          fontSize: 14,
          border: "none",
          zIndex: 1000
        }}
      >
        Déconnexion
      </button>
      <div
        style={{
          background: "#1e1e1e",
          color: "white",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20
        }}
      >
        <h2>👤 Profil</h2>
        <p>🎖 Niveau : {level}</p>
        <p>💰 Coins : {coins}</p>
        <p>🔥 Streak : {streak}</p>
        <p>🏆 Record : {bestStreak}</p>
      </div>

      <button
        onClick={() => navigate("/tasks")}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        📝 Quêtes du jour
      </button>

      <button
        onClick={() => navigate("/shop")}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 10
        }}
      >
        🛒 Boutique
      </button>
    </div>
  )
}