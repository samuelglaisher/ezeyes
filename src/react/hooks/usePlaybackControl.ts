import { useRef, useEffect, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

export const usePlaybackControl = (navigateForward: () => void) => {
  const { isPlaying, setIsPlaying } = useContext(PanelContext);
  const { speed, setSpeed } = useContext(PanelContext);
  const speedRef = useRef(speed);
  const navigateForwardRef = useRef(navigateForward);

  useEffect(() => {
    speedRef.current = speed;
    if (isPlaying) {
      setupInterval();
    }
  }, [speed]);

  useEffect(() => {
    navigateForwardRef.current = navigateForward;
  }, [navigateForward]);

  useEffect(() => {
    if (isPlaying) {
      setupInterval();
    } else {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [isPlaying]);

  const intervalId = useRef(null);

  const setupInterval = () => {
    clearInterval(intervalId.current);
    const interval = (60 / speedRef.current) * 1000;
    intervalId.current = window.setInterval(() => navigateForwardRef.current(), interval);
  };

  const togglePlayPause = () => {
    setIsPlaying(isPlaying => !isPlaying);
  };

  const increaseSpeed = () => {
    const newSpeed = speedRef.current + 10;
    setSpeed(newSpeed);
  };

  const decreaseSpeed = () => {
    const newSpeed = speedRef.current - 10;

    if (newSpeed <= 0) {
      // do nothing
    } else {
      setSpeed(newSpeed);
    }
  };

  return { togglePlayPause, increaseSpeed, decreaseSpeed };
};
