
import rewardsData from "../data/rewards.json";
import { usePlayer } from "../context/PlayerContext";
import { getLevel } from "../utils/progression";
import RewardCard from "../components/rewards/RewardCard";
import "../styles/RewardShop.css";

export default function RewardShop() {
  const { coins, setCoins, totalXp } = usePlayer();
  const level = getLevel(totalXp);

  const buyReward = (reward) => {
    if (level < reward.levelRequired) return;

    if (coins >= reward.cost) {
      setCoins(prev => prev - reward.cost);
      alert(`🎉 Tu as acheté : ${reward.title}`);
    } else {
      alert("❌ Pas assez de coins !");
    }
  };

  return (
    <>
      <div className="shop-wallet">
        <h2>💰 Coins : {coins}</h2>
      </div>

      <div className="shop-page">
        <h2>Boutique</h2>

        <div className="reward-grid">
          {rewardsData.map(reward => (
            <RewardCard
              key={reward.id}
              reward={reward}
              level={level}
              coins={coins}
              onBuy={buyReward}
            />
          ))}
        </div>
      </div>
    </>
  );
}
