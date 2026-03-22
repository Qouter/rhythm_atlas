/**
 * Realistic instrument synthesis using Web Audio API
 * Each instrument uses multiple oscillators, noise, and filters
 * to approximate the real sound characteristics
 */

export type InstrumentType = "clave" | "conga" | "bass" | "bell" | "palmas" | "cajon";

interface AudioContextWithNodes {
  ctx: AudioContext;
  masterGain: GainNode;
}

let audioSystem: AudioContextWithNodes | null = null;

export function initAudio(): AudioContextWithNodes {
  if (audioSystem) return audioSystem;
  
  const ctx = new AudioContext();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.7;
  masterGain.connect(ctx.destination);
  
  audioSystem = { ctx, masterGain };
  return audioSystem;
}

// Create noise buffer for percussive attacks
function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * CLAVE - Two wooden sticks
 * Characteristics: Sharp attack, two resonant frequencies, woody tone
 */
function playClave(ctx: AudioContext, dest: AudioNode, velocity: number, time: number) {
  // Two resonant frequencies for wood
  const freqs = [2500, 3200];
  
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = "sine";
    osc.frequency.value = freq;
    
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 30;
    
    const vol = velocity * (i === 0 ? 0.4 : 0.25);
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    
    osc.start(time);
    osc.stop(time + 0.08);
  });
  
  // Click transient
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "square";
  clickOsc.frequency.value = 4000;
  clickGain.gain.setValueAtTime(velocity * 0.15, time);
  clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.01);
  clickOsc.connect(clickGain);
  clickGain.connect(dest);
  clickOsc.start(time);
  clickOsc.stop(time + 0.02);
}

/**
 * CONGA - Hand drum with membrane
 * Characteristics: Open tone (resonant) vs slap (sharp), warm bass
 */
function playConga(ctx: AudioContext, dest: AudioNode, velocity: number, time: number, isSlap = false) {
  const baseFreq = isSlap ? 350 : 200;
  
  // Fundamental
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(baseFreq * 1.2, time);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq, time + 0.02);
  
  const decay = isSlap ? 0.08 : 0.25;
  gain1.gain.setValueAtTime(velocity * 0.5, time);
  gain1.gain.exponentialRampToValueAtTime(0.001, time + decay);
  
  osc1.connect(gain1);
  gain1.connect(dest);
  osc1.start(time);
  osc1.stop(time + decay + 0.05);
  
  // Overtone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.value = baseFreq * 2.4;
  gain2.gain.setValueAtTime(velocity * 0.2, time);
  gain2.gain.exponentialRampToValueAtTime(0.001, time + decay * 0.5);
  
  osc2.connect(gain2);
  gain2.connect(dest);
  osc2.start(time);
  osc2.stop(time + decay);
  
  // Slap noise component
  if (isSlap || velocity > 0.7) {
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.05);
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 2000;
    
    noiseGain.gain.setValueAtTime(velocity * 0.15, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(dest);
    noise.start(time);
  }
}

/**
 * BASS - Electric/acoustic bass tumbao
 * Characteristics: Deep fundamental, subtle harmonics, sustain
 */
function playBass(ctx: AudioContext, dest: AudioNode, velocity: number, time: number) {
  const freq = 65; // Low E roughly
  
  // Fundamental (sub bass)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.value = freq;
  
  gain1.gain.setValueAtTime(0, time);
  gain1.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.01);
  gain1.gain.exponentialRampToValueAtTime(velocity * 0.4, time + 0.1);
  gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  
  osc1.connect(gain1);
  gain1.connect(dest);
  osc1.start(time);
  osc1.stop(time + 0.45);
  
  // First harmonic
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.value = freq * 2;
  
  gain2.gain.setValueAtTime(0, time);
  gain2.gain.linearRampToValueAtTime(velocity * 0.2, time + 0.005);
  gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
  
  osc2.connect(gain2);
  gain2.connect(dest);
  osc2.start(time);
  osc2.stop(time + 0.25);
  
  // Attack click
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "triangle";
  clickOsc.frequency.value = 1200;
  clickGain.gain.setValueAtTime(velocity * 0.08, time);
  clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
  clickOsc.connect(clickGain);
  clickGain.connect(dest);
  clickOsc.start(time);
  clickOsc.stop(time + 0.02);
}

/**
 * BELL (Campana) - Metal cowbell
 * Characteristics: Metallic, inharmonic partials, bright
 */
function playBell(ctx: AudioContext, dest: AudioNode, velocity: number, time: number) {
  // Inharmonic frequencies typical of metal
  const freqs = [800, 1260, 1580, 2100];
  const gains = [0.4, 0.3, 0.2, 0.1];
  
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    osc.frequency.value = freq;
    
    const vol = velocity * gains[i];
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(vol * 0.3, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    
    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.18);
  });
}

/**
 * PALMAS - Hand claps
 * Characteristics: Noise burst, very short, sharp
 */
function playPalmas(ctx: AudioContext, dest: AudioNode, velocity: number, time: number) {
  // Multiple short noise bursts (hands hitting)
  const delays = [0, 0.007, 0.012]; // Slight spread for realism
  
  delays.forEach((delay, i) => {
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.04);
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800 + i * 200;
    filter.Q.value = 2;
    
    const gain = ctx.createGain();
    const t = time + delay;
    const vol = velocity * (i === 0 ? 0.35 : 0.2);
    
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(t);
  });
  
  // Body resonance
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 400;
  oscGain.gain.setValueAtTime(velocity * 0.1, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  osc.connect(oscGain);
  oscGain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.03);
}

/**
 * CAJÓN - Peruvian box drum
 * Characteristics: Bass tone (center) vs slap (edge), wooden resonance
 */
function playCajon(ctx: AudioContext, dest: AudioNode, velocity: number, time: number, isSlap = false) {
  if (isSlap || velocity > 0.7) {
    // High slap - edge hit
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.08);
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3500;
    filter.Q.value = 4;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(velocity * 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(time);
    
    // Wood resonance
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 280;
    oscGain.gain.setValueAtTime(velocity * 0.25, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.connect(oscGain);
    oscGain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.1);
  } else {
    // Bass tone - center hit
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.05);
    
    gain.gain.setValueAtTime(velocity * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    
    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.3);
    
    // Body resonance
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.value = 180;
    gain2.gain.setValueAtTime(velocity * 0.2, time);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    osc2.connect(gain2);
    gain2.connect(dest);
    osc2.start(time);
    osc2.stop(time + 0.2);
  }
}

/**
 * Main play function - dispatches to specific instrument
 */
export function playInstrument(
  instrument: InstrumentType, 
  velocity: number,
  options?: { isSlap?: boolean }
): void {
  const audio = initAudio();
  const time = audio.ctx.currentTime;
  
  switch (instrument) {
    case "clave":
      playClave(audio.ctx, audio.masterGain, velocity, time);
      break;
    case "conga":
      playConga(audio.ctx, audio.masterGain, velocity, time, options?.isSlap);
      break;
    case "bass":
      playBass(audio.ctx, audio.masterGain, velocity, time);
      break;
    case "bell":
      playBell(audio.ctx, audio.masterGain, velocity, time);
      break;
    case "palmas":
      playPalmas(audio.ctx, audio.masterGain, velocity, time);
      break;
    case "cajon":
      playCajon(audio.ctx, audio.masterGain, velocity, time, options?.isSlap);
      break;
  }
}
