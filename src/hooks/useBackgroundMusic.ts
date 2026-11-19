import {useCallback, useEffect, useRef, useState} from 'react';
import {birthdayConfig} from '../config/birthdayConfig';

export interface MusicController {
  isPlaying: boolean;
  hasInteracted: boolean;
  volume: number;
  togglePlay: () => void;
  startIfIdle: () => void;
  setVolume: (nextVolume: number) => void;
}

export function useBackgroundMusic(): MusicController {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolumeState] = useState(birthdayConfig.music.volume);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(birthdayConfig.music.audioSrc);
    audio.loop = true;
    audio.volume = birthdayConfig.music.volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const startIfIdle = useCallback(() => {
    setHasInteracted(true);
    if (userPausedRef.current) return;
    const audio = audioRef.current;
    if (audio && audio.paused) {
      void attemptPlay();
    }
  }, [attemptPlay]);

  // Start gentle playback on the first visitor interaction unless autoStart is disabled
  useEffect(() => {
    if (!birthdayConfig.music.autoStartOnFirstInteraction) return;

    const onFirstInteraction = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-music-toggle="true"]')) {
        return;
      }
      setHasInteracted(true);
      if (!userPausedRef.current && audioRef.current?.paused) {
        void attemptPlay();
      }
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };

    window.addEventListener('pointerdown', onFirstInteraction, {passive: true});
    window.addEventListener('keydown', onFirstInteraction, {passive: true});

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, [attemptPlay]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);

    if (audio.paused) {
      userPausedRef.current = false;
      void attemptPlay();
    } else {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, [attemptPlay]);

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.max(0, Math.min(1, nextVolume));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  return {
    isPlaying,
    hasInteracted,
    volume,
    togglePlay,
    startIfIdle,
    setVolume,
  };
}
