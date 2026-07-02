/**
 * AUDIO CONFIGURATION & SOUND ENGINE
 * Powered by Tone.js
 * 
 * LEGAL WARNING: Do NOT drop in a copyrighted Quranic recitation, azan, or nasheed 
 * unless you have explicitly verified that it is in the public domain or you hold 
 * a valid license to use it. Reciters' performances are copyrighted works.
 * 
 * If you have a licensed file, place it in the `/public/audio` directory 
 * and set the path below (e.g. "/audio/licensed-recitation.mp3").
 */
import * as Tone from "tone";

export const licensedAudioPath = null; // e.g. "/audio/licensed-recitation.mp3"

// Singleton reference for the licensed audio player
let licensedPlayer = null;

/**
 * Global audio state wrapper
 */
export const getAudioState = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("tribute_audio_enabled") === "true";
};

export const setAudioState = async (enabled) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("tribute_audio_enabled", enabled ? "true" : "false");
  
  if (enabled) {
    // Unlocking the AudioContext on first user interaction
    await Tone.start();
    Tone.Destination.mute = false;
  } else {
    // Instantly mute active sounds
    Tone.Destination.mute = true;
    if (licensedPlayer) {
      licensedPlayer.stop();
    }
  }
};

/**
 * 1. INTRO DRONE
 * Low, sustained ambient tone (approx 4s) with reverb.
 * Returns a function to gracefully fade it out early if needed.
 */
export const playIntroDrone = () => {
  if (!getAudioState()) return () => {};

  if (licensedAudioPath) {
    if (!licensedPlayer) {
      licensedPlayer = new Tone.Player(licensedAudioPath).toDestination();
      licensedPlayer.volume.value = -10; // quiet
    }
    Tone.loaded().then(() => {
      licensedPlayer.start();
    });
    return () => {
      if (licensedPlayer) licensedPlayer.stop("+0.5"); // small fade if supported or just stop
    };
  }

  // Fallback programmatic tone
  const filter = new Tone.Filter(400, "lowpass").toDestination();
  const reverb = new Tone.Reverb({ decay: 4, wet: 0.5 }).connect(filter);
  const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: {
      attack: 1,
      decay: 0.5,
      sustain: 0.8,
      release: 2
    }
  }).connect(reverb);
  
  synth.volume.value = -15; // Keep it very low and respectful
  
  const now = Tone.now();
  synth.triggerAttack("A2", now);
  synth.triggerRelease(now + 2.5); // Fade out naturally starting at 2.5s -> completes around 4.5s

  // Return a cancellation callback for graceful mid-session mute/skip
  return () => {
    synth.triggerRelease(Tone.now());
  };
};

/**
 * 2. WELCOME CHIME
 * Two gentle sine notes a fifth apart. 
 * "Quiet chime" not an app ping.
 */
export const playWelcomeChime = () => {
  if (!getAudioState()) return;

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.05, decay: 0.3, sustain: 0.1, release: 1 }
  }).toDestination();
  
  synth.volume.value = -20;
  const now = Tone.now();
  
  // Play two notes a fifth apart slightly staggered
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("G4", "8n", now + 0.15);
};

/**
 * 3. ALERT SEQUENCE
 * Three-note ascending sequence for urgent announcements.
 */
export const playAlertChime = () => {
  if (!getAudioState()) return;

  const synth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.2, release: 1 }
  }).toDestination();
  
  synth.volume.value = -18;
  const now = Tone.now();
  
  synth.triggerAttackRelease("C4", "16n", now);
  synth.triggerAttackRelease("E4", "16n", now + 0.2);
  synth.triggerAttackRelease("G4", "8n", now + 0.4);
};

/**
 * 4. GUESTBOOK PING
 * Single, very quiet note for incoming messages so it doesn't blur with alerts.
 */
export const playGuestbookChime = () => {
  if (!getAudioState()) return;

  const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.5 }
  }).toDestination();
  
  synth.volume.value = -25;
  synth.triggerAttackRelease("E5", "16n", Tone.now());
};
