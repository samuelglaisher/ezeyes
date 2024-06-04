import React, { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { usePlaybackControl } from '../hooks/usePlaybackControl';
import Mousetrap from 'mousetrap';
import WPMSlider from './WPMSlider';
import { useWPMContext } from '../contexts/SliderVisibilityContext';
import { PanelContext } from '../contexts/PanelContext';

const WPMSliderManager: React.FC = () => {
  const { settings } = useContext(SettingsContext);
  const { isVisible, setIsVisible } = useWPMContext();
  const { isPlaying, textContent } = useContext(PanelContext);
  const [wpm, setWpm] = useState(settings.processing.wpm[settings.processing.wpm.type].current);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSlider = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsVisible(false), 2000); 
  };

  const { increaseSpeed, decreaseSpeed } = usePlaybackControl(() => {
    setWpm(settings.processing.wpm[settings.processing.wpm.type].current);
  });

  const increaseWPM = () => {
    if (!isPlaying || !textContent) return; 
    setWpm(prevWpm => prevWpm + settings.processing.wpm.delta);
    increaseSpeed();
    showSlider();
  };

  const decreaseWPM = () => {
    if (!isPlaying || !textContent) return; 
    setWpm(prevWpm => prevWpm - settings.processing.wpm.delta);
    decreaseSpeed();
    showSlider();
  };

  useEffect(() => {
    Mousetrap.bind(settings.keybindings.increaseSpeed, () => {
      increaseWPM();
      return false;
    });

    Mousetrap.bind(settings.keybindings.decreaseSpeed, () => {
      decreaseWPM();
      return false;
    });

    return () => {
      Mousetrap.unbind(settings.keybindings.increaseSpeed);
      Mousetrap.unbind(settings.keybindings.decreaseSpeed);
    };
  }, [settings.keybindings, isPlaying, textContent]);

  const minWPM = settings.processing.wpm[settings.processing.wpm.type].min;
  const maxWPM = settings.processing.wpm[settings.processing.wpm.type].max;

  return <WPMSlider wpm={wpm} minWPM={minWPM} maxWPM={maxWPM} isVisible={isVisible} />;
};

export default WPMSliderManager;
