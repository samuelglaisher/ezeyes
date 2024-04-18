import { useRef, useEffect, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

const WPM = 1000 / 60;

export const usePlaybackControl = (navigateForward: () => void) => {

  const { isPlaying, setIsPlaying } = useContext(PanelContext);
  const { speed, setSpeed } = useContext(PanelContext);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [
    speed,
  ]);

  useEffect(() => {
    let intervalId = null;

    if (isPlaying) {
      const interval = (60 / speedRef.current) * 1000;
      intervalId = setInterval(navigateForward, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, navigateForward, speed]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const increaseSpeed = () => {
    console.log("Current speed: " + speedRef.current);  // Log the current speed
  
    const newSpeed = speedRef.current *2 ;
    console.log("New speed: " + newSpeed);
    setSpeed(newSpeed)
  };

  return { togglePlayPause, increaseSpeed };
};
