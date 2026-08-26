// Audio synthesizer utility using Web Audio API for timer notifications
// Ensures zero external audio asset dependency issues

export function playTimerChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    
    const now = ctx.currentTime;
    
    // Play a dual pleasant chime tone (C6 -> G6 -> C7)
    const notes = [1046.50, 1318.51, 1567.98, 2093.00];
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.15);
      
      gain.gain.setValueAtTime(0.001, now + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.15 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.15 + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 0.85);
    });
  } catch (e) {
    console.warn('Audio chime playback failed:', e);
  }
}

export function playClickSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore muted sound contexts
  }
}
