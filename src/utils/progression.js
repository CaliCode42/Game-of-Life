
import {
  XP_PER_LEVEL,
  STREAK_BONUSES,
} from "../config/gameConfig";

export function getLevel(totalXp) {
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
}

export function getCurrentXp(totalXp) {
  return totalXp % XP_PER_LEVEL;
}

export function getXpProgress(totalXp) {
  return (getCurrentXp(totalXp) / XP_PER_LEVEL) * 100;
}

export function getStreakBonus(streak) {
  if (streak >= 7) return STREAK_BONUSES[7];
  if (streak >= 5) return STREAK_BONUSES[5];
  if (streak >= 3) return STREAK_BONUSES[3];

  return 0;
}
