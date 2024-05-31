import React from 'react';
import { Slider } from '@adobe/react-spectrum';
import '../styles/index.css';

interface WPMSliderProps {
    wpm: number;
    minWPM: number;
    maxWPM: number;
    isVisible: boolean;
  }
  
  const WPMSlider: React.FC<WPMSliderProps> = ({ wpm, minWPM, maxWPM, isVisible }) => {
    return (
      <div className={`wpm-slider ${isVisible ? 'visible' : ''}`}>
        <Slider 
          label="Words Per Minute (WPM)" 
          value={wpm} 
          minValue={minWPM} 
          maxValue={maxWPM} 
          isDisabled 
        />
      </div>
    );
  };
  
  export default WPMSlider;