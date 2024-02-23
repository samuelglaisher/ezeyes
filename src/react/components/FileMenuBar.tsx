import React, { Key, useContext, useRef } from 'react';
import {Menu, MenuTrigger, ActionButton, Item} from '@adobe/react-spectrum';
import { useFileManager } from '../hooks/useFileManager';
import { useFileMenuBar } from '../hooks/useFileMenuBar';
import { FileManagerContext } from '../contexts/FileManagerContext';


function FileMenuBar() {
    const { retrieveFile } = useFileMenuBar();
    const { inputFile, setInputFile } = useContext(FileManagerContext);
    const input = useRef<HTMLInputElement | null>(null);

    const actions = (key: Key) => {
        if (key == "load") {
            input.current.click();
        }
    };

    const handler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        console.log(target.files);
        setInputFile(target.files[0]);
    };

    return (
        <div>
        <MenuTrigger>
            <ActionButton>
                File
            </ActionButton>
            <Menu onAction={(key) => actions(key)}>
                <Item key="load">Load File</Item>
            </Menu>
        </MenuTrigger>
        <input type='file' id='file' ref={input} style={{display: 'none'}} onChange={handler}/>
        </div>
    );
}

export default FileMenuBar;
