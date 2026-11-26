
import "../../styles/QuestCard.css";

export default function QuestCard({
  task,
  onToggle,
  onRemove,
}) {
  const typeClass = task.type === "big"
    ? "quest-card--big"
    : "quest-card--small";

  return (
    <div
      className={`quest-card ${typeClass} ${task.done ? "quest-card--done" : ""}`}
    >
      <div className="quest-content">
        <strong>{task.title}</strong>

        <div className="quest-rewards">
          💰 +{task.coins} coins | ⭐ +{task.xp} XP
        </div>
      </div>

      <div className="quest-actions">
        <button
          className="quest-action-button"
          onClick={() => onToggle(task.id)}
          aria-label={task.done ? "Annuler la validation" : "Valider la quête"}
          aria-pressed={task.done}
        >
          {task.done ? "✅" : "⬜"}
        </button>

        <button
          className="quest-action-button"
          onClick={() => onRemove(task.id)}
          aria-label="Supprimer la quête"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
