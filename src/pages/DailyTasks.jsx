
import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useTasks } from "../context/TasksContext";

import {
  getLevel,
  getCurrentXp,
  getStreakBonus,
} from "../utils/progression";

import QuestForm from "../components/quests/QuestForm";
import QuestList from "../components/quests/QuestList";
import XPBar from "../components/player/XPBar";

import "../styles/DailyTasks.css";

export default function DailyTasks() {
  const {
    coins,
    setCoins,
    totalXp,
    setTotalXp,
    streak,
    setStreak,
    bestStreak,
    setBestStreak,
  } = usePlayer();

  const {
    tasks,
    setTasks,
    addTask,
    removeTask,
    loading,
  } = useTasks();

  const level = getLevel(totalXp);
  const currentXp = getCurrentXp(totalXp);

  const completedCount = tasks.filter(task => task.done).length;

  const toggleTask = (id) => {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const newDone = !task.done;
    const bonus = getStreakBonus(streak);

    if (newDone) {
      setStreak(prev => prev + 1);
      setTotalXp(prev => prev + task.xp);
      setCoins(prev => prev + task.coins + bonus);
    } else {
      setTotalXp(prev => Math.max(0, prev - task.xp));
      setCoins(prev => Math.max(0, prev - task.coins - bonus));
    }

    setTasks(prevTasks =>
      prevTasks.map(item =>
        item.id === id
          ? { ...item, done: newDone }
          : item
      )
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
  }, [streak, bestStreak, setBestStreak]);

  if (loading) {
    return <div>Chargement des quêtes...</div>;
  }

  return (
    <div className="daily-tasks-page">
      <QuestForm onAdd={addTask} />

      <div className="daily-player-stats">
        <h2>🎖 Niveau : {level}</h2>
        <p>💰 Coins : {coins}</p>
        <XPBar totalXp={totalXp} />
      </div>

      <div className="daily-quests">
        <h2>Quêtes du jour</h2>

        <p>
          {tasks.every(task => task.done)
            ? "🔥 Journée parfaite !"
            : completedCount > 0
            ? "Continue comme ça 💪"
            : "Commence une quête pour lancer ta journée"}
        </p>

        <p>
          ✅ {completedCount} / {tasks.length} complétées
        </p>

        <QuestList
          title="Quêtes principales"
          tasks={tasks.filter(task => task.type === "big")}
          onToggle={toggleTask}
          onRemove={removeTask}
        />

        <QuestList
          title="Quêtes secondaires"
          tasks={tasks.filter(task => task.type === "small")}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      </div>
    </div>
  );
}
