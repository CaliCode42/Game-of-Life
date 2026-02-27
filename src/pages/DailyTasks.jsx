import { useState, useEffect } from "react";
import "../styles/DailyTasks.css";
import { usePlayer } from "../context/PlayerContext";

export default function DailyTasks({ tasks, setTasks }) {
  const { coins, setCoins, totalXp, setTotalXp, streak, setStreak, bestStreak, setBestStreak } = usePlayer();

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const updateStreak = () => {
    // Note: For simplicity, assuming streak is updated daily. In a real app, track last active date in DB.
    // For now, we'll update streak on task completion if not already done today.
    // This is a simplification; ideally, store last_active in DB.
    setStreak(prev => prev + 1);
  };

  const getStreakBonus = () => {
    if (streak >= 7) return 3;
    if (streak >= 5) return 2;
    if (streak >= 3) return 1;
    return 0;
  };

  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const currentXp = totalXp % xpPerLevel;

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id !== id) return task;

        const newDone = !task.done;
        const bonus = getStreakBonus();

        if (newDone) {
          updateStreak();
          setTotalXp(prev => prev + task.xp);
          setCoins(prev => prev + task.coins + bonus);
        } else {
          setTotalXp(prev => Math.max(0, prev - task.xp));
          setCoins(prev => Math.max(0, prev - task.coins - bonus));
        }

        return { ...task, done: newDone };
      })
    );
  };

  useEffect(() => {
    if (level > 1 && currentXp === 0) {
      alert("🎉 LEVEL UP !");
    }
  }, [level]);

  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak);
    }
  }, [streak]);

  // Removed localStorage saves as data is now in Supabase

return (
  <>
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
	</div>
    <div
      style={{
        background: "#1e1e1e",
        color: "white",
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        textAlign: "center"
      }}
    >
      <h2>🎖 Niveau : {level}</h2>
      <p>💰 Coins : {coins}</p>
      <div
        style={{
          background: "#ddd",
          height: 22,
          borderRadius: 12,
          overflow: "hidden",
          marginTop: 10
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(currentXp / xpPerLevel) * 100}%`,
            background: "linear-gradient(90deg, #4caf50, #8bc34a)",
            transition: "0.4s"
          }}
        />
      </div>
      <p style={{ fontWeight: "bold", marginTop: 5 }}>
        XP : {currentXp} / {xpPerLevel}
      </p>
    </div>
    <div style={{ marginTop: 30 }}>
      <h2>Quêtes du jour</h2>
      <p>
        {tasks.every(t => t.done)
          ? "🔥 Journée parfaite !"
          : tasks.filter(t => t.done).length > 0
          ? "Continue comme ça 💪"
          : "Commence une quête pour lancer ta journée"}
      </p>
      <p>
        ✅ {tasks.filter(t => t.done).length} / {tasks.length} complétées
      </p>

	  <div>
        <h3>Quêtes principales</h3>
        <div className="tasks-grid">
          {tasks.filter(task => task.type === "big").map((task) => {
            const borderColor = "#ff9800"; // orange for big
            return (
              <div
                key={task.id}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: task.done ? "#4caf50" : "#2a2a2a",
                  color: "white",
                  borderLeft: `6px solid ${task.done ? "#8bc34a" : borderColor}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "0.2s"
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong>{task.title}</strong>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    💰 +{task.coins} coins | ⭐ +{task.xp} XP
                  </div>
                </div>
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    alignSelf: "flex-start",
                    border: "none",
                    background: "transparent",
                    fontSize: 18,
                    cursor: "pointer",
                    width: 30,
                    padding: 4,
                    color: "white",
                    marginTop: 8
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {task.done ? "✅" : "⬜"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3>Quêtes secondaires</h3>
        <div className="tasks-grid">
          {tasks.filter(task => task.type === "small").map((task) => {
            const borderColor = "#2196f3"; // blue for small
            return (
              <div
                key={task.id}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: task.done ? "#4caf50" : "#2a2a2a",
                  color: "white",
                  borderLeft: `6px solid ${task.done ? "#8bc34a" : borderColor}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "0.2s"
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong>{task.title}</strong>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    💰 +{task.coins} coins | ⭐ +{task.xp} XP
                  </div>
                </div>
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    alignSelf: "flex-start",
                    border: "none",
                    background: "transparent",
                    fontSize: 18,
                    cursor: "pointer",
                    width: 30,
                    padding: 4,
                    color: "white",
                    marginTop: 8
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {task.done ? "✅" : "⬜"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
	</>
  );
}
