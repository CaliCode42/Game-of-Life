import { useState } from "react";
import rewardsData from "../data/rewards.json";

export default function RewardShop({ coins, setCoins }) {
  const [rewards, setRewards] = useState(rewardsData);

  const buyReward = (reward) => {
    if (coins >= reward.cost) {
      setCoins(coins - reward.cost);
      alert(`🎉 Tu as acheté : ${reward.title}`);
    } else {
      alert("❌ Pas assez de coins !");
    }
  };

  return (
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
  );
}
