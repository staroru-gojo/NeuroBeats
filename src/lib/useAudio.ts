import { useRef } from "react";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(() => {
      // autoplay blocked until user interaction
    });

    audioRef.current = audio;
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  return { play, stop };
}
