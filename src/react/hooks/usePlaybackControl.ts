// import { useEffect, useRef, useContext } from 'react';
// import { PanelContext } from '../contexts/PanelContext';

// export const usePlaybackControl = (updateFunction: () => void, initialSpeed: number) => {
//   const { isPlaying, setIsPlaying } = useContext(PanelContext);
//   const speedRef = useRef(initialSpeed);  

//   useEffect(() => {
//     let intervalId: NodeJS.Timeout | null = null;

//     if (isPlaying) {
//       intervalId = setInterval(updateFunction, speedRef.current);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isPlaying, updateFunction]); 

//   const togglePlayPause = () => {
//     setIsPlaying(isPlaying => !isPlaying);
//   };

//   const handleSpeedChange = (increment: boolean) => {
//     // Adjust speed by incrementing or decrementing
//     if (increment) {
//       speedRef.current += 100;  // Increase speed
//     } else {
//       speedRef.current = Math.max(100, speedRef.current - 100); 
//     }
//     console.log('Updated speed:', speedRef.current);
//   };

//   return { togglePlayPause, handleSpeedChange };
// };


// import { useState, useEffect, useContext } from 'react';
// import { PanelContext } from '../contexts/PanelContext';

// export const usePlaybackControl = (
//   navigateForward: () => void,
//   initialSpeed: number,
//   onSpeedChange: (newSpeed: number) => void  // Adding a callback to handle speed updates
// ) => {
//   const { isPlaying, setIsPlaying } = useContext(PanelContext);
//   const [speed, setSpeed] = useState<number>(initialSpeed);

//   useEffect(() => {
//     let intervalId: NodeJS.Timeout | null = null;

//     // Clear the interval if it exists
//     //if (intervalId) clearInterval(intervalId);

//     if (isPlaying) {
//       intervalId = setInterval(() => {
//         navigateForward();
//       }, speed);
//     } 
//     else {
//       if (intervalId) clearInterval(intervalId);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isPlaying, navigateForward, speed]);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleSpeedChange = () => {
//     alert("speed: " + speed);
//     const newSpeed = speed + 100;
//     setSpeed(newSpeed);
//     alert("speed in handle" + newSpeed)
//     onSpeedChange(newSpeed);  
//   };

//   return { togglePlayPause, handleSpeedChange, speed };
// };

import { useState, useEffect, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

export const usePlaybackControl = (
  navigateForward: () => void,
  initialSpeed: number,
  onSpeedChange: (newSpeed: number) => void  
) => {
  const { isPlaying, setIsPlaying } = useContext(PanelContext);
  const [speed, setSpeed] = useState<number>(initialSpeed);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        navigateForward();
      }, speed);
    } 
    else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, navigateForward, speed]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    alert("Current speed: " + speed);  // Log the current speed
  
    const newSpeed = speed + 100;
    alert("New speed: " + newSpeed);  // Log the new speed
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);  // Notify `usePanel` of the speed change
  };

  return { togglePlayPause, handleSpeedChange, speed };
};