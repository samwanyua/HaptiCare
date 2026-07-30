// Utility for Web Audio API tone synthesis and Navigator Haptics API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function triggerHapticFeedback(pattern: 'hazard' | 'traffic' | 'baby' | 'name' | 'call' | 'custom', intensity: 'low' | 'medium' | 'high' = 'high') {
  // Web Vibration API
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    let vibePattern: number[] = [200, 100, 200];
    switch (pattern) {
      case 'hazard':
        vibePattern = [300, 50, 300, 50, 300, 50, 400];
        break;
      case 'traffic':
        vibePattern = [250, 100, 250, 100];
        break;
      case 'baby':
        vibePattern = [150, 150, 150, 150, 150];
        break;
      case 'name':
        vibePattern = [100, 50, 100, 50, 200];
        break;
      case 'call':
        vibePattern = [400, 200, 400, 200, 400];
        break;
      case 'custom':
        const intensityMult = intensity === 'low' ? 100 : intensity === 'medium' ? 200 : 350;
        vibePattern = [intensityMult, 80, intensityMult, 80, intensityMult];
        break;
    }
    try {
      navigator.vibrate(vibePattern);
    } catch (e) {
      console.log('Vibration failed', e);
    }
  }

  // Audio synthesizer feedback (so user can hear/feel frequency response on desktop too)
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = pattern === 'hazard' ? 'sawtooth' : pattern === 'traffic' ? 'square' : 'sine';
    const freq = pattern === 'hazard' ? 880 : pattern === 'traffic' ? 440 : pattern === 'baby' ? 620 : 320;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const volume = intensity === 'low' ? 0.08 : intensity === 'medium' ? 0.15 : 0.25;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (err) {
    // Audio context initialization blocked before click
  }
}
