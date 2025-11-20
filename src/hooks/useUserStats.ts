"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { UserStats, defaultUserStats, calculateTotalScore } from "@/lib/storage";
import { checkNewAchievements, Achievement } from "@/lib/achievements";

export function useUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(defaultUserStats);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load stats from Firestore
  useEffect(() => {
    const loadStats = async () => {
      if (!user) {
        // No user = no stats (guest can't do quizzes anyway)
        setStats(defaultUserStats);
        setMounted(true);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().stats) {
          const firestoreStats = userDoc.data().stats;
          
          // Update streak
          const today = new Date().toISOString().split("T")[0];
          const lastActive = firestoreStats.lastActive;
          const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
          
          if (lastActive === yesterday) {
            // Continue streak
            firestoreStats.streak += 1;
            firestoreStats.longestStreak = Math.max(firestoreStats.streak, firestoreStats.longestStreak);
          } else if (lastActive !== today) {
            // Reset streak
            firestoreStats.streak = 1;
          }
          
          firestoreStats.lastActive = today;
          
          // IMPORTANT: Calculate totalScore if missing
          if (firestoreStats.totalScore === undefined || firestoreStats.totalScore === null) {
            firestoreStats.totalScore = calculateTotalScore(firestoreStats);
          }
          
          setStats(firestoreStats);
          
          // Save updated streak and totalScore
          await setDoc(doc(db, "users", user.uid), {
            stats: firestoreStats,
            updatedAt: serverTimestamp(),
          }, { merge: true });
        } else {
          // New user, use defaults
          setStats(defaultUserStats);
        }
      } catch (error) {
        console.error("Error loading stats from Firestore:", error);
        setStats(defaultUserStats);
      }
      
      setMounted(true);
    };

    loadStats();
  }, [user]);

  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user) {
      console.warn("Cannot update stats: User not logged in");
      return;
    }

    const previousStats = { ...stats };
    const newStats = { ...stats, ...updates };
    
    // Auto-calculate total score
    newStats.totalScore = calculateTotalScore(newStats);
    
    // Check for new achievements
    const unlockedAchievements = checkNewAchievements(newStats, previousStats);
    
    if (unlockedAchievements.length > 0) {
      const achievementIds = unlockedAchievements.map(a => a.id);
      newStats.achievements = [...new Set([...newStats.achievements, ...achievementIds])];
      // Recalculate score after adding achievements
      newStats.totalScore = calculateTotalScore(newStats);
      setNewAchievements(unlockedAchievements);
    }
    
    setStats(newStats);
    
    // Save to Firestore
    try {
      await setDoc(doc(db, "users", user.uid), {
        stats: newStats,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error saving stats to Firestore:", error);
    }
  };

  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  return { stats, updateStats, newAchievements, clearNewAchievements, isInitialized: mounted };
}
