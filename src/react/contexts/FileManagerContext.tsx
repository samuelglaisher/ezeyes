import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FileManagerContextType {
    inputFile: File,
    setInputFile: React.Dispatch<React.SetStateAction<File>>;
    currentFiles: string[];
    setCurrentFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultContextValue: FileManagerContextType = {
    inputFile: null,
    setInputFile: () => {},
    currentFiles: [],
    setCurrentFiles: () => {}
};

export const FileManagerContext = createContext<FileManagerContextType>(defaultContextValue);

export const FileManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentFiles, setCurrentFiles] = useState<string[]>(defaultContextValue.currentFiles);
    const [inputFile, setInputFile] = useState<File>(defaultContextValue.inputFile); 

    return (
        <FileManagerContext.Provider value={{ inputFile, setInputFile, currentFiles, setCurrentFiles }}>
            {children}
        </FileManagerContext.Provider>
    );
};
