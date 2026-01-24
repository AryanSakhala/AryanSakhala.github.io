// Refined sound effects using Web Audio API
// More soothing, subtle tones for professional feel

export function playHoverSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create a softer, more musical hover sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Soft sine wave at a pleasant frequency
    oscillator.frequency.value = 440; // A4 note
    oscillator.type = "sine";
    
    // Low-pass filter for smoothness
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    filter.Q.value = 1;
    
    // Very gentle volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.12);
  } catch {
    // Silently fail if audio isn't available
  }
}

export function playClickSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Two-tone click for confirmation feel
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Pleasant two-note chord (C and E)
    osc1.frequency.value = 523.25; // C5
    osc2.frequency.value = 659.25; // E5
    osc1.type = "sine";
    osc2.type = "sine";
    
    filter.type = "lowpass";
    filter.frequency.value = 3000;
    
    // Quick fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.025, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
    
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.08);
    osc2.stop(audioContext.currentTime + 0.08);
  } catch {
    // Silently fail
  }
}

export function playWhooshSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create white noise for whoosh
    const bufferSize = audioContext.sampleRate * 0.2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioContext.createBiquadFilter();
    const gainNode = audioContext.createGain();
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.15);
    filter.Q.value = 2;
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    
    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.2);
  } catch {
    // Silently fail
  }
}

export function playSuccessSound() {
  if (typeof window === "undefined") return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Rising arpeggio for success/confirmation
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord
    const duration = 0.3;
    
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.value = freq;
      osc.type = "sine";
      
      filter.type = "lowpass";
      filter.frequency.value = 4000;
      
      const startTime = audioContext.currentTime + (i * 0.06);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.02, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // Silently fail
  }
}
