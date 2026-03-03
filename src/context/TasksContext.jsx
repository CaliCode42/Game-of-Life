import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';
import objectives from '../data/objectives.json';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('user_tasks')
      .select('items')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading tasks:', error);
      setTasks(objectives.map(t => ({ ...t, done: false })));
    } else if (data && data.items) {
      setTasks(data.items);
    } else {
      setTasks(objectives.map(t => ({ ...t, done: false })));
    }
    setLoading(false);
  };

  const saveTasks = async tasksToSave => {
    if (!user) return;
    const { error } = await supabase
      .from('user_tasks')
      .upsert({ user_id: user.id, items: tasksToSave });

    if (error) {
      console.error('Error saving tasks:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !loading) {
      saveTasks(tasks);
    }
  }, [tasks, user, loading]);

  const addTask = task => {
    setTasks(prev => [
      ...prev,
      { ...task, id: Date.now(), done: false }
    ]);
  };

  const removeTask = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskDone = id => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        toggleTaskDone,
        loading
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
