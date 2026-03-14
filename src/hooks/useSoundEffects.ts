let ctx: AudioContext | null = null;
let muted = false;

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
}

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

function shouldPlay(): boolean {
  return !muted;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15,
) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export const sfx = {
  textBlip() {
    if (!shouldPlay()) return;
    playTone(800, 0.03, 'square', 0.04);
  },

  choiceSelect() {
    if (!shouldPlay()) return;
    playTone(440, 0.08, 'sine', 0.1);
    setTimeout(() => { if (shouldPlay()) playTone(660, 0.1, 'sine', 0.08); }, 60);
  },

  choiceLocked() {
    if (!shouldPlay()) return;
    playTone(150, 0.15, 'square', 0.08);
  },

  sceneTransition() {
    if (!shouldPlay()) return;
    playTone(300, 0.15, 'sine', 0.06);
    setTimeout(() => { if (shouldPlay()) playTone(450, 0.2, 'sine', 0.08); }, 100);
  },

  itemPickup() {
    if (!shouldPlay()) return;
    playTone(500, 0.1, 'square', 0.08);
    setTimeout(() => { if (shouldPlay()) playTone(700, 0.1, 'square', 0.08); }, 80);
    setTimeout(() => { if (shouldPlay()) playTone(900, 0.15, 'square', 0.1); }, 160);
  },

  damage() {
    if (!shouldPlay()) return;
    playTone(200, 0.2, 'sawtooth', 0.12);
    setTimeout(() => { if (shouldPlay()) playTone(150, 0.25, 'square', 0.08); }, 100);
  },

  collapse() {
    if (!shouldPlay()) return;
    playTone(400, 0.25, 'square', 0.1);
    setTimeout(() => { if (shouldPlay()) playTone(300, 0.25, 'square', 0.1); }, 200);
    setTimeout(() => { if (shouldPlay()) playTone(200, 0.25, 'square', 0.1); }, 400);
    setTimeout(() => { if (shouldPlay()) playTone(100, 0.5, 'square', 0.12); }, 600);
  },
};
