import { useState } from "react";
import rewardsData from "../data/rewards.json";

export default function RewardShop({ coins, setCoins, totalXp, streak, bestStreak }) {
  const [rewards, setRewards] = useState(rewardsData);

  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;

  const buyReward = (reward) => {
    if (coins >= reward.cost) {
      setCoins(coins - reward.cost);
      alert(`🎉 Tu as acheté : ${reward.title}`);
    } else {
      alert("❌ Pas assez de coins !");
    }
  };

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

    <div style={{ marginTop: 30 }}>
      <h2>Boutique</h2>

      {rewards.map((reward) => (
        <div key={reward.id} style={{ marginBottom: 10 }}>
          <span>
            {reward.title} — {reward.cost} coins
          </span>
          <button
			disabled={coins < reward.cost}
			style={{ marginLeft: 10 }}
			onClick={() => buyReward(reward)}
		  >
			Acheter
		</button>
        </div>
      ))}
    </div>
	</>
  );
}
