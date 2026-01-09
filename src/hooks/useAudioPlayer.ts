import { useRef, useEffect, useCallback, useState } from 'react';

export type TaskType = 'MATH' | 'READING' | 'CODING' | 'CREATIVE';

// Placeholder audio URLs - replace with actual audio files
const AUDIO_TRACKS: Record<TaskType, string> = {
  MATH: '/audio/math-focus.mp3',
  READING: '/audio/reading-ambient.mp3',
  CODING: '/audio/coding-rhythm.mp3',
  CREATIVE: '/audio/creative-flow.mp3',
};

const FADE_DURATION = 1000; // 1 second fade

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentTask: TaskType | null;
  volume: number;
  isLoading: boolean;
  hasInteracted: boolean;
  play: (task: TaskType) => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  requestPlayback: () => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pendingTask, setPendingTask] = useState<TaskType | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Fade audio in/out smoothly
  const fadeAudio = useCallback((targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = FADE_DURATION / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeDiff * eased));

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        audio.volume = targetVolume;
        onComplete?.();
      }
    }, stepDuration);
  }, []);

  // Play audio for a specific task
  const play = useCallback((task: TaskType) => {
    if (!hasInteracted) {
      setPendingTask(task);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    // If same task, just resume
    if (currentTask === task && !isPlaying) {
      fadeAudio(volume);
      audio.play().catch(console.error);
      setIsPlaying(true);
      return;
    }

    // If different task, fade out then switch
    if (currentTask && currentTask !== task && isPlaying) {
      fadeAudio(0, () => {
        audio.src = AUDIO_TRACKS[task];
        setIsLoading(true);
        
        audio.oncanplaythrough = () => {
          setIsLoading(false);
          audio.play().catch(console.error);
          fadeAudio(volume);
          setIsPlaying(true);
          setCurrentTask(task);
        };
        
        audio.load();
      });
    } else {
      // Fresh start
      audio.src = AUDIO_TRACKS[task];
      setIsLoading(true);
      
      audio.oncanplaythrough = () => {
        setIsLoading(false);
        audio.play().catch(console.error);
        fadeAudio(volume);
        setIsPlaying(true);
        setCurrentTask(task);
      };
      
      audio.onerror = () => {
        setIsLoading(false);
        // Fallback: still show as playing for demo purposes
        setIsPlaying(true);
        setCurrentTask(task);
      };
      
      audio.load();
    }
  }, [currentTask, fadeAudio, hasInteracted, isPlaying, volume]);

  // Pause audio
  const pause = useCallback(() => {
    fadeAudio(0, () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    });
  }, [fadeAudio]);

  // Stop audio completely
  const stop = useCallback(() => {
    fadeAudio(0, () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTask(null);
    });
  }, [fadeAudio]);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = newVolume;
    }
  }, [isPlaying]);

  // Request playback (user interaction handler)
  const requestPlayback = useCallback(() => {
    setHasInteracted(true);
    if (pendingTask) {
      play(pendingTask);
      setPendingTask(null);
    }
  }, [pendingTask, play]);

  // Handle pending task when interaction happens
  useEffect(() => {
    if (hasInteracted && pendingTask) {
      play(pendingTask);
      setPendingTask(null);
    }
  }, [hasInteracted, pendingTask, play]);

  return {
    isPlaying,
    currentTask,
    volume,
    isLoading,
    hasInteracted,
    play,
    pause,
    stop,
    setVolume,
    requestPlayback,
  };
}
