import { useEffect, useContext, useRef, Key } from 'react';
import { useFileManager } from './useFileManager';
import { PanelContext } from '../contexts/PanelContext';

export const useFileMenuBar = () => {
    const { promptAndLoadFile, loadFile } = useFileManager();
    const { setTextContent, setCurWordSequenceIndex } = useContext(PanelContext);

    const resetPreferences = () => {
        console.log();
    };

    const processOptions = (key: Key) => {
        if (key == "pass") {
            return;
        } else if (key == "load") {
            promptAndLoadFile();
        } else {
            loadFile(key.toString(), setTextContent, setCurWordSequenceIndex);
        }
    };

    return { processOptions };
};