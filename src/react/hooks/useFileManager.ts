// import { useEffect, useContext, useRef } from 'react';
// import { PanelContext } from '../contexts/PanelContext';
// import { SettingsContext } from '../contexts/SettingsContext';
import { useContext } from 'react';
import { FileManagerContext } from '../contexts/FileManagerContext';

// export const useFileManager = () => {
//     const { inputFile, setInputFile } = useContext(FileManagerContext);

//     const loadFile = () => {
//         console.log(inputFile);
//     };

//     return { loadFile };
// };
export const useFileManager = () => {
    const { ipcRenderer } = window.require('electron');
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext);

    const promptAndLoadFile = async () => {
        const { filePath, error } = await ipcRenderer.invoke('spawn-file-dialog');

        if (error) {
            console.error(error);
            return;
        }

        const fileExtension = filePath.split('.').pop() || undefined;

        let content, err;
        switch (fileExtension) {
            case "rtf":
                loadRtfFile(filePath);
                break;
            case "txt":
                const val = await loadTxtFile(filePath);
                addNew(filePath);
                break;
            case "docx":
                break;
            case "pdf":
                break;
            default:
                console.log("Unsupported file found!");
                break;
        }
    };

    const addNew = (filePath: string) => {
        const files = currentFiles;
        files.push(filePath);
        setCurrentFiles(files);
    }

    const readFile = async (filePath: string, type: string): Promise<Buffer> | undefined => {
        const { content, error } = await ipcRenderer.invoke('read', filePath, type);
        return await ipcRenderer.invoke('read', filePath, type);
    };

    const loadTxtFile = async (filePath: string): Promise<Buffer> => {
        return await readFile(filePath, "utf8");
    };

    const loadRtfFile = async (filePath: string): Promise<Buffer> => {
        const fileContent = await readFile(filePath, 'utf8');
        return fileContent;
    };

    const loadDocxFile = async (filePath: string) => {
        
    };

    const loadPdfFile = async (filePath: string) => {
        
    };

    return {
        promptAndLoadFile,
    }
};
