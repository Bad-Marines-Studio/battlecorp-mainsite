import { useEffect, useRef } from "react";

type UiSoundKind = "default" | "play";

const CLICKABLE_SELECTOR = "button, a.btn-bc, [role='button'], [data-ui-sound]";

type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

type ToneConfig = {
  attack: number;
  delay?: number;
  duration: number;
  endFrequency: number;
  startFrequency: number;
  type: OscillatorType;
  volume: number;
};

function isElementDisabled(element: HTMLElement): boolean {
  if (element.getAttribute("aria-disabled") === "true") {
    return true;
  }

  if (element instanceof HTMLButtonElement) {
    return element.disabled;
  }

  return false;
}

function playTone(context: AudioContext, now: number, config: ToneConfig): void {
  const startAt = now + (config.delay ?? 0);
  const endAt = startAt + config.duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.startFrequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(config.endFrequency, endAt);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2200, startAt);
  filter.Q.value = 0.7;

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(config.volume, startAt + config.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(endAt + 0.01);
}

export function useUiButtonSounds(): void {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const getAudioContext = (): AudioContext | null => {
      if (contextRef.current) {
        return contextRef.current;
      }

      const AudioContextCtor =
        window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;

      if (!AudioContextCtor) {
        return null;
      }

      contextRef.current = new AudioContextCtor();
      return contextRef.current;
    };

    const playSound = async (kind: UiSoundKind): Promise<void> => {
      const audioContext = getAudioContext();
      if (!audioContext) {
        return;
      }

      if (audioContext.state === "suspended") {
        await audioContext.resume().catch(() => undefined);
      }

      const now = audioContext.currentTime;

      if (kind === "play") {
        playTone(audioContext, now, {
          type: "triangle",
          startFrequency: 360,
          endFrequency: 580,
          attack: 0.008,
          duration: 0.1,
          volume: 0.045,
        });
        playTone(audioContext, now, {
          type: "triangle",
          startFrequency: 620,
          endFrequency: 860,
          delay: 0.05,
          attack: 0.006,
          duration: 0.1,
          volume: 0.04,
        });
        return;
      }

      playTone(audioContext, now, {
        type: "sine",
        startFrequency: 520,
        endFrequency: 420,
        attack: 0.004,
        duration: 0.055,
        volume: 0.02,
      });
    };

    const handleClick = (event: MouseEvent): void => {
      if (event.button !== 0) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const clickable = target.closest<HTMLElement>(CLICKABLE_SELECTOR);
      if (!clickable || isElementDisabled(clickable)) {
        return;
      }

      if (clickable.dataset.uiSound === "none") {
        return;
      }

      void playSound(clickable.dataset.uiSound === "play" ? "play" : "default");
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      void contextRef.current?.close().catch(() => undefined);
      contextRef.current = null;
    };
  }, []);
}
