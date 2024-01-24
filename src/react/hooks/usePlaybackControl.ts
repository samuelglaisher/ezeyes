import { useState, useEffect } from 'react';

//speed (in ms)
export const usePlaybackControl = (updateFunction: () => void, speed: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startPlayback = () => {
    if (!isPlaying) {
      const id = setInterval(updateFunction, speed);
      setIntervalId(id);
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    if (intervalId) clearInterval(intervalId);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return { isPlaying, startPlayback, stopPlayback };
};
