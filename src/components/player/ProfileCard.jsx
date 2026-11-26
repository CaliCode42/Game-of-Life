
import { getLevel } from "../../utils/progression";
import "../../styles/ProfileCard.css";

export default function ProfileCard({
  totalXp,
  coins,
  streak,
  bestStreak,
}) {
  const level = getLevel(totalXp);

  return (
    <div className="profile-card">
      <h2>👤 Profil</h2>
      <p>🎖 Niveau : {level}</p>
      <p>💰 Coins : {coins}</p>
      <p>🔥 Streak : {streak}</p>
      <p>🏆 Record : {bestStreak}</p>
    </div>
  );
}
