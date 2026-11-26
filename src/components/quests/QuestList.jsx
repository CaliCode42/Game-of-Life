
import QuestCard from "./QuestCard";

export default function QuestList({
  title,
  tasks,
  onToggle,
  onRemove,
}) {
  return (
    <section className="quest-section">
      <h3>{title}</h3>

      <div className="tasks-grid">
        {tasks.map(task => (
          <QuestCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
