import { useRef, useEffect, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { WPMAttribute } from '../SettingsSchema';

export const usePlaybackControl = (navigateForward: () => void) => {
  const { isPlaying, setIsPlaying } = useContext(PanelContext);
  const { settings, dispatch } = useContext(SettingsContext);

  const intervalId = useRef(null);
  const wpmRef = useRef(settings.processing.wpm[settings.processing.wpm.type].current);
  const typeRef = useRef(settings.processing.wpm.type);
  const wpmDelta = useRef(settings.processing.wpm.delta);

  useEffect(() => {
    if (isPlaying) {
      setupWordSequencePlayback();
    } else {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [isPlaying]);

  useEffect(() => {
    typeRef.current = settings.processing.wpm.type;
    wpmRef.current = settings.processing.wpm[typeRef.current].current;
    wpmDelta.current = settings.processing.wpm.delta;

    if (isPlaying) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }

      setupWordSequencePlayback();
    }

  }, [settings.processing.wpm.type, settings.processing.wpm]);

  const setupWordSequencePlayback = () => {
    clearInterval(intervalId.current);
    const speed = 1000 / (wpmRef.current / 60);
    intervalId.current = window.setInterval(() => navigateForward(), speed);
  };

  const togglePlayPause = () => {
    setIsPlaying(isPlaying => !isPlaying);
  };

  const increaseSpeed = () => {
    const type = typeRef.current;
    const newSpeed = wpmRef.current + wpmDelta.current;
    dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: type, setting: WPMAttribute.CURRENT, value: newSpeed });
  };

  const decreaseSpeed = () => {
    const type = typeRef.current;
    const newSpeed = wpmRef.current - wpmDelta.current;
    dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: type, setting: WPMAttribute.CURRENT, value: newSpeed });
  };

  return { togglePlayPause, increaseSpeed, decreaseSpeed };
};
