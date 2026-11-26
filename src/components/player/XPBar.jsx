
import { XP_PER_LEVEL } from "../../config/gameConfig";
import {
  getCurrentXp,
  getXpProgress,
} from "../../utils/progression";
import "../../styles/XPBar.css";

export default function XPBar({ totalXp }) {
  const currentXp = getCurrentXp(totalXp);
  const progress = getXpProgress(totalXp);

  return (
    <>
      <div
        className="xp-bar"
        role="progressbar"
        aria-label="Progression du niveau"
        aria-valuenow={currentXp}
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
      >
        <div
          className="xp-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="xp-bar-label">
        XP : {currentXp} / {XP_PER_LEVEL}
      </p>
    </>
  );
}
