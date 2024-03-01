import { useEffect, useContext, useRef } from 'react';

export const useFileMenuBar = () => {

    const retrieveFile = (inputFile: File) => {
        console.log(inputFile);
    };

    return { retrieveFile };
};