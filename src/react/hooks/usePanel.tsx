import { useContext, useEffect, useState } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';

export const usePanel = () => {
  const { textContent, setCurWordSequence } = useContext(PanelContext);
  const { settings } = useContext(SettingsContext);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const navigateForward = (): void => {
    setCurrentWordIndex(prevIndex => prevIndex + settings.panels.wordSequenceLength);
  };

  const navigateBackward = (): void => {
    setCurrentWordIndex(prevIndex => Math.max(prevIndex - settings.panels.wordSequenceLength, 0));
  };

  const speed = 1000 / (settings.panels.wpm.curWpm / 60);
  const { togglePlayPause } = usePlaybackControl(navigateForward, speed);

  useEffect(() => {
    const words = textContent.replace(/\n/g, ' ').split(' ').filter(word => word.length !== 0);
    const wordSequenceLength = settings.panels.wordSequenceLength;
    const highlightedWords = words.slice(currentWordIndex, currentWordIndex + wordSequenceLength).join(' ');

    setCurWordSequence([highlightedWords]);
  }, [textContent, currentWordIndex, settings.panels.wordSequenceLength, setCurWordSequence]);

  const usePanelContext = () => {
    const context = useContext(PanelContext);
    if (!context) {
      throw new Error('usePanelContext must be used within a PanelProvider');
    }
    return context;
  };

  return {
    usePanelContext,
    navigateForward,
    navigateBackward,
    togglePlayPause,
  };
};
