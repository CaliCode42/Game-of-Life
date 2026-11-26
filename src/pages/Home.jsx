
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import ProfileCard from "../components/player/ProfileCard";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { coins, totalXp, streak, bestStreak } = usePlayer();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="home-page">
      <button
        className="logout-button"
        onClick={handleSignOut}
      >
        Déconnexion
      </button>

      <ProfileCard
        totalXp={totalXp}
        coins={coins}
        streak={streak}
        bestStreak={bestStreak}
      />

      <button
        className="home-navigation-button"
        onClick={() => navigate("/tasks")}
      >
        📝 Quêtes du jour
      </button>

      <button
        className="home-navigation-button"
        onClick={() => navigate("/shop")}
      >
        🛒 Boutique
      </button>
    </div>
  );
}
