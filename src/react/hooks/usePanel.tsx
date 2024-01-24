import { useEffect, useState, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { useSettings } from '../contexts/SettingsContext';

export const usePanel = () => {
  const { textContent, setCurWordSequence } = useContext(PanelContext);
  const { settings } = useSettings();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  
  useEffect(() => {
    const words = textContent.replace(/\n/g, ' ').split(' ').filter(word => word.length !== 0);
    setCurWordSequence(words.slice(currentWordIndex, currentWordIndex + settings.panels.wordSequenceLength));
  }, [textContent, currentWordIndex, settings.panels.wordSequenceLength, setCurWordSequence]);

  const navigateToStart = () => {
    setCurrentWordIndex(0);
  };
  
  const navigateForward = () => {
    setCurrentWordIndex(prevIndex => prevIndex + settings.panels.wordSequenceLength);
  };

  const navigateToPreviousParagraph = () => {
     
  };

  const navigateToNextParagraph = () => {

  };

  const navigateBackward = () => {
    setCurrentWordIndex(prevIndex => Math.max(prevIndex - settings.panels.wordSequenceLength, 0));
  };

  return { 
    navigateForward,
    navigateBackward
  };
};
