"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useUserStats } from "@/hooks/useUserStats";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>; // Return isAdmin
  loginWithGoogle: () => Promise<boolean>; // Return isAdmin
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signup: async () => {},
  login: async () => false,
  loginWithGoogle: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { stats } = useUserStats();

  // Check if user is admin
  const checkAdmin = async (uid: string) => {
    try {
      const adminDoc = await getDoc(doc(db, "admins", uid));
      setIsAdmin(adminDoc.exists() && adminDoc.data()?.isAdmin === true);
    } catch (error) {
      console.error("Error checking admin:", error);
      setIsAdmin(false);
    }
  };

  // Sync user stats to Firestore
  const syncUserStats = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        lastLogin: serverTimestamp(),
        stats: stats,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error syncing stats:", error);
    }
  };

  // Signup
  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      photoURL: userCredential.user.photoURL,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        quizzesCompleted: 0,
        streak: 0,
        perfectScores: 0,
        totalScore: 0, // NEW: Add totalScore
        achievements: [],
        topicsCompleted: [],
        longestStreak: 0,
        lastActive: new Date().toISOString().split("T")[0],
        dailyChallengeCompleted: false,
        soundEnabled: true,
      },
      deviceInfo: {
        platform: typeof window !== 'undefined' ? (
          /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'iOS' :
          /Android/i.test(navigator.userAgent) ? 'Android' : 'Web'
        ) : 'Unknown',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
      }
    });
  };

  // Login
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await syncUserStats(userCredential.user.uid);
    
    // Check if admin
    const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
    const isUserAdmin = adminDoc.exists() && adminDoc.data()?.isAdmin === true;
    
    return isUserAdmin;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user exists, if not create document
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          quizzesCompleted: 0,
          streak: 0,
          perfectScores: 0,
          totalScore: 0, // NEW: Add totalScore
          achievements: [],
          topicsCompleted: [],
          longestStreak: 0,
          lastActive: new Date().toISOString().split("T")[0],
          dailyChallengeCompleted: false,
          soundEnabled: true,
        },
        deviceInfo: {
          platform: typeof window !== 'undefined' ? (
            /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'iOS' :
            /Android/i.test(navigator.userAgent) ? 'Android' : 'Web'
          ) : 'Unknown',
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
        }
      });
    } else {
      await syncUserStats(userCredential.user.uid);
    }
    
    // Check if admin
    const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
    const isUserAdmin = adminDoc.exists() && adminDoc.data()?.isAdmin === true;
    
    return isUserAdmin;
  };

  // Logout
  const logout = async () => {
    if (user) {
      await syncUserStats(user.uid);
    }
    await signOut(auth);
  };

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkAdmin(user.uid);
        await syncUserStats(user.uid);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    loading,
    isAdmin,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
