"use client";

import { useState, useEffect } from "react";
import { storage, STORAGE_KEYS, UserStats, defaultUserStats } from "@/lib/storage";
import { checkNewAchievements, Achievement } from "@/lib/achievements";

function getInitialStats(): UserStats {
  if (typeof window === "undefined") {
    return defaultUserStats;
  }
  
  const savedStats = storage.get<UserStats>(STORAGE_KEYS.USER_STATS, defaultUserStats);
  
  // Update streak
  const today = new Date().toISOString().split("T")[0];
  const lastActive = savedStats.lastActive;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  
  const updatedStats = { ...savedStats };
  
  if (lastActive === yesterday) {
    // Continue streak
    updatedStats.streak += 1;
    updatedStats.longestStreak = Math.max(updatedStats.streak, updatedStats.longestStreak);
  } else if (lastActive !== today) {
    // Reset streak
    updatedStats.streak = 1;
  }
  
  updatedStats.lastActive = today;
  storage.set(STORAGE_KEYS.USER_STATS, updatedStats);
  
  return updatedStats;
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(defaultUserStats);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load stats only on client
  useEffect(() => {
    // Use setTimeout to avoid cascading render warning
    const timer = setTimeout(() => {
      setStats(getInitialStats());
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const updateStats = (updates: Partial<UserStats>) => {
    const previousStats = { ...stats };
    const newStats = { ...stats, ...updates };
    
    // Check for new achievements
    const unlockedAchievements = checkNewAchievements(newStats, previousStats);
    
    if (unlockedAchievements.length > 0) {
      const achievementIds = unlockedAchievements.map(a => a.id);
      newStats.achievements = [...new Set([...newStats.achievements, ...achievementIds])];
      setNewAchievements(unlockedAchievements);
    }
    
    setStats(newStats);
    storage.set(STORAGE_KEYS.USER_STATS, newStats);
  };

  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  return { stats, updateStats, newAchievements, clearNewAchievements, isInitialized: mounted };
}
