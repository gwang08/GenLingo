import { GRAMMAR_TOPICS } from "@/data/grammar/grammarCore";

/**
 * Get today's challenge topic (same topic for the whole day)
 */
export function getDailyChallengeTopic() {
  const today = new Date().toISOString().split("T")[0];
  
  // Use date as seed for consistent random
  const seed = today.split("-").join("");
  const hash = parseInt(seed) % GRAMMAR_TOPICS.length;
  
  return GRAMMAR_TOPICS[hash];
}

/**
 * Check if daily challenge is completed today
 */
export function isDailyChallengeCompleted(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const today = new Date().toISOString().split("T")[0];
    const saved = window.localStorage.getItem("thpt_daily_challenge_date");
    return saved === today;
  } catch {
    return false;
  }
}

/**
 * Mark daily challenge as completed
 */
export function markDailyChallengeCompleted(): void {
  if (typeof window === "undefined") return;
  
  try {
    const today = new Date().toISOString().split("T")[0];
    window.localStorage.setItem("thpt_daily_challenge_date", today);
  } catch (error) {
    console.error("Error saving daily challenge:", error);
  }
}
