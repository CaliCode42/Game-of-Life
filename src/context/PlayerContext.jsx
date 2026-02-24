import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPlayerData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadPlayerData = async () => {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading player data:', error);
    } else if (data) {
      setCoins(data.coins || 0);
      setTotalXp(data.total_xp || 0);
      setStreak(data.streak || 0);
      setBestStreak(data.best_streak || 0);
    } else {
      // No data, use defaults (already set)
    }
    setLoading(false);
  };

  const savePlayerData = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_data')
      .upsert({
        user_id: user.id,
        coins,
        total_xp: totalXp,
        streak,
        best_streak: bestStreak,
      });

    if (error) {
      console.error('Error saving player data:', error);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      savePlayerData();
    }
  }, [coins, totalXp, streak, bestStreak]);

  return (
    <PlayerContext.Provider value={{
      coins, setCoins,
      totalXp, setTotalXp,
      streak, setStreak,
      bestStreak, setBestStreak,
      loading
    }}>
      {children}
    </PlayerContext.Provider>
  );
};