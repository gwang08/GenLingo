/**
 * Sound Effects Library
 * Play simple audio effects for quiz feedback
 */

// Extend Window interface
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

/**
 * Play correct answer sound (ting/success sound)
 */
export const playCorrectSound = (): void => {
  if (typeof window === "undefined") return;

  // Web Audio API to generate "ting" sound
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  const audioContext = new AudioContextClass();
  
  // Create oscillator for the main tone
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Ting sound: High frequency, short duration
  oscillator.frequency.value = 800; // High pitch
  oscillator.type = 'sine';
  
  // Envelope for quick fade out
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);

  // Add a second harmonic for richer sound
  const oscillator2 = audioContext.createOscillator();
  const gainNode2 = audioContext.createGain();
  
  oscillator2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);
  
  oscillator2.frequency.value = 1200; // Higher harmonic
  oscillator2.type = 'sine';
  
  gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  oscillator2.start(audioContext.currentTime);
  oscillator2.stop(audioContext.currentTime + 0.2);
};

/**
 * Play incorrect answer sound (buzz/error sound)
 */
export const playIncorrectSound = (): void => {
  if (typeof window === "undefined") return;

  // Web Audio API to generate "buzz" sound
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  const audioContext = new AudioContextClass();
  
  // Create oscillator for the buzz
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Buzz sound: Low frequency, dissonant
  oscillator.frequency.value = 200; // Low pitch
  oscillator.type = 'sawtooth'; // Harsh sound
  
  // Envelope
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

/**
 * Play success/celebration sound (for perfect score)
 */
export const playSuccessSound = (): void => {
  if (typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  const audioContext = new AudioContextClass();
  
  // Play a happy ascending melody
  const notes = [523.25, 659.25, 783.99]; // C, E, G (major chord)
  
  notes.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    const startTime = audioContext.currentTime + (index * 0.15);
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.3);
  });
};
