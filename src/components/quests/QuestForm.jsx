
import { useState } from "react";

export default function QuestForm({ onAdd }) {
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("small");
  const [newXp, setNewXp] = useState(0);
  const [newCoins, setNewCoins] = useState(0);

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    onAdd({
      title: newTitle,
      type: newType,
      xp: Number(newXp),
      coins: Number(newCoins),
    });

    setNewTitle("");
    setNewXp(0);
    setNewCoins(0);
  };

  return (
    <div className="task-editor">
      <h3>Ajouter une quête</h3>

      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="Titre"
        aria-label="Titre de la quête"
      />

      <select
        value={newType}
        onChange={e => setNewType(e.target.value)}
        aria-label="Type de quête"
      >
        <option value="small">Petit</option>
        <option value="big">Grand</option>
      </select>

      <input
        type="number"
        value={newXp}
        onChange={e => setNewXp(e.target.value)}
        placeholder="XP"
        aria-label="Récompense en XP"
      />

      <input
        type="number"
        value={newCoins}
        onChange={e => setNewCoins(e.target.value)}
        placeholder="Coins"
        aria-label="Récompense en coins"
      />

      <button onClick={handleAdd}>
        Ajouter
      </button>
    </div>
  );
}
