import { useNavigate } from "react-router-dom"

export default function Home({ coins, setCoins, totalXp, level, streak, bestStreak }) {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
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
          cursor: "pointer"
        }}
      >
        🛒 Boutique
      </button>
    </div>
  )
}