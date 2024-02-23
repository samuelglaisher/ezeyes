import { useEffect, useContext, useRef } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { FileManagerContext } from '../contexts/FileManagerContext';

export const useFileManager = () => {
    const { inputFile, setInputFile } = useContext(FileManagerContext);

    const loadFile = () => {
        console.log(inputFile);
    };

    return { loadFile };
};
