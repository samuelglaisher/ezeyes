import { useEffect, useContext, useRef, Key } from 'react';
import { useFileManager } from './useFileManager';
import { PanelContext } from '../contexts/PanelContext';
import { FileManagerContext } from '../contexts/FileManagerContext';

export const useFileMenuBar = () => {
    const { promptAndLoadFile, loadFile } = useFileManager();
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext)
    const { setTextContent, setCurWordSequenceIndex } = useContext(PanelContext);

    const resetPreferences = () => {
        setCurrentFiles([]);
        localStorage.setItem("filePaths", JSON.stringify([]));
    };

    useEffect(() => {
        saveLocal();
    }, [currentFiles]);

    const saveLocal = () => {
        if(currentFiles.length !== 0){
            localStorage.setItem("filePaths", JSON.stringify(currentFiles));
        }
    }

    const processOptions = (key: Key) => {
        if (key == "pass") {
            return;
        } else if (key == "load") {
            promptAndLoadFile();
        } else if (key == "reset") {
            resetPreferences();
        } else {
            loadFile(key.toString(), setTextContent, setCurWordSequenceIndex);
        }
    };

    return { processOptions, resetPreferences };
};