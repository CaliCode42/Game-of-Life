import { useState } from "react";
import rewardsData from "../data/rewards.json";

export default function RewardShop({ coins, setCoins, totalXp }) {
  const [rewards] = useState(rewardsData);

  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;

  const buyReward = (reward) => {
    if (coins >= reward.cost) {
      setCoins(prev => prev - reward.cost);
      alert(`🎉 Tu as acheté : ${reward.title}`);
    } else {
      alert("❌ Pas assez de coins !");
    }
  };

  const rarityColors = {
    common: "#b0b0b0",
    uncommon: "#4caf50",
    rare: "#2196f3",
    epic: "#9c27b0",
    legendary: "#ff9800"
  };

  return (
    <>
      <div
        style={{
          background: "#1e1e1e",
          color: "aqua",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
          textAlign: "center"
        }}
      >
        <h2>💰 Coins : {coins}</h2>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center" // important pour que le grid fonctionne correctement
        }}
      >
        <h2>Boutique</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
            justifyContent: "center" // centre les colonnes si l'écran est large
          }}
        >
          {rewards.map((reward) => {
            const isLocked = level < reward.levelRequired;
            const canBuy = coins >= reward.cost && !isLocked;

            return (
              <div
                key={reward.id}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "#2a2a2a",
                  borderLeft: `6px solid ${rarityColors[reward.rarity]}`,
                  opacity: isLocked ? 0.5 : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}
              >
                <strong style={{ color: rarityColors[reward.rarity] }}>
                  {reward.title}
                </strong>

                <div style={{ fontSize: 12, marginTop: 6 }}>
                  💰 {reward.cost} coins
                </div>

                <div style={{ fontSize: 12 }}>
                  ⭐ {reward.rarity.toUpperCase()}
                </div>

                {isLocked && (
                  <div style={{ fontSize: 12, color: "#aaa" }}>
                    🔒 Niveau {reward.levelRequired} requis
                  </div>
                )}

                <button
                  disabled={!canBuy}
                  style={{
                    marginTop: 8,
                    backgroundColor: canBuy ? "#4caf50" : "#555",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: canBuy ? "pointer" : "not-allowed",
                    transition: "0.2s"
                  }}
                  onClick={() => buyReward(reward)}
                  onMouseOver={e =>
                    canBuy && (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Acheter
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}