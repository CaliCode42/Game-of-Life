
import { RARITY_COLORS } from "../../config/gameConfig";
import "../../styles/RewardCard.css";

export default function RewardCard({
  reward,
  level,
  coins,
  onBuy,
}) {
  const isLocked = level < reward.levelRequired;
  const canBuy = coins >= reward.cost && !isLocked;
  const rarityColor = RARITY_COLORS[reward.rarity];

  return (
    <div
      className={`reward-card ${isLocked ? "reward-card--locked" : ""}`}
      style={{ "--rarity-color": rarityColor }}
    >
      <strong className="reward-title">
        {reward.title}
      </strong>

      <div className="reward-cost">
        💰 {reward.cost} coins
      </div>

      <div className="reward-rarity">
        ⭐ {reward.rarity.toUpperCase()}
      </div>

      {isLocked && (
        <div className="reward-requirement">
          🔒 Niveau {reward.levelRequired} requis
        </div>
      )}

      <button
        className="reward-buy-button"
        disabled={!canBuy}
        onClick={() => onBuy(reward)}
      >
        Acheter
      </button>
    </div>
  );
}
