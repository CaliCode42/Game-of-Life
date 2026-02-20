import { useState, useEffect } from "react";
import objectives from "../data/objectives.json";

export default function DailyTasks({ coins, setCoins }) {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("lifeRPG_tasks")
  return saved ? JSON.parse(saved) : objectives
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

const today = new Date().toDateString()

const yesterday = new Date(Date.now() - 86400000).toDateString()

const updateStreak = () => {
  const lastActive = localStorage.getItem("lifeRPG_lastActive")

  if (lastActive === today) return

  if (lastActive === yesterday) {
    setStreak(prev => prev + 1)
  } else {
    setStreak(1)
  }

  localStorage.setItem("lifeRPG_lastActive", today)
}

const getStreakBonus = () => {
  if (streak >= 7) return 3
  if (streak >= 5) return 2
  if (streak >= 3) return 1
  return 0
}
  const xpPerLevel = 10;
  
  // Calcul automatique du niveau
  const level = Math.floor(totalXp / xpPerLevel) + 1
  const currentXp = totalXp % xpPerLevel

  const toggleTask = (id) => {
  setTasks(prevTasks =>
    prevTasks.map(task => {
      if (task.id !== id) return task

      const newDone = !task.done
	  const bonus = getStreakBonus()

      if (newDone) {
		updateStreak()
        setTotalXp(prev => prev + task.xp)
		setCoins(prev => prev + task.xp + bonus)
      } else {
        setTotalXp(prev => Math.max(0, prev - task.xp))
		setCoins(prev => Math.max(0, prev - task.xp - bonus))
      }

      return { ...task, done: newDone }
    })
  )
}

  useEffect(() => {
  if (level > 1 && currentXp === 0) {
    alert("🎉 LEVEL UP !")
  }
}, [level])

  useEffect(() => {
  if (streak > bestStreak) {
    setBestStreak(streak)
  }
}, [streak])

  useEffect(() => {
  localStorage.setItem("lifeRPG_tasks", JSON.stringify(tasks))
  localStorage.setItem("lifeRPG_totalXp", totalXp)
  localStorage.setItem("lifeRPG_streak", streak)
  localStorage.setItem("lifeRPG_bestStreak", bestStreak)
}, [tasks, totalXp, streak, bestStreak])

return (
  <>
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

	<div
	  style={{
		background: "#ddd",
		height: 22,
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 10
	  }}>
	<div
	  style={{
		height: "100%",
		width: `${(currentXp / xpPerLevel) * 100}%`,
		background: "linear-gradient(90deg, #4caf50, #8bc34a)",
		transition: "0.4s"
	  }} />
		</div>

	<p style={{ fontWeight: "bold" }}>
	  XP : {currentXp} / {xpPerLevel}
	</p>
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
	{tasks.map((task) => (
	  <div 
		key={task.id}
		style={{
			marginBottom: 5,
			padding: 12,
			borderRadius: 8,
			background: task.done ? "#6cb87d" : "#8b8383",
			transition: "0.2s",
			display: "flex",
      		alignItems: "center",   // centre verticalement
    		gap: 12                 // espace entre bouton et texte
			}}
	  >
	  <button
		onClick={() => toggleTask(task.id)}
		style={{
			border: "none",
			background: "transparent",
			fontSize: 18,
			cursor: "pointer",
			width: 30,
			padding: 4,
		}}
		onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"}
		onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
	  >
		{task.done ? "✅" : "⬜"}
	  </button>
	    {task.title} (+{task.xp} XP)
	  </div>
	))}
	</>
  );
}
