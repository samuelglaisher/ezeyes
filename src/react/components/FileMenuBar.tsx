import React, { useContext, useMemo } from 'react';
import { Menu, MenuTrigger, ActionButton, Item } from '@adobe/react-spectrum';
import { SubmenuTrigger } from '@react-spectrum/menu';
import { useFileMenuBar } from '../hooks/useFileMenuBar';
import { FileManagerContext } from '../contexts/FileManagerContext';

function FileMenuBar() {
    const { processOptions } = useFileMenuBar();
    const { currentFiles } = useContext(FileManagerContext);

    const render = useMemo(() => () => {
        const renderItems: React.JSX.Element[] = [];

        if (currentFiles.length === 0) {
            return <Item key="pass">(none)</Item>
        }

        currentFiles.forEach((filePath) => {
            renderItems.push(
                <Item key={filePath}>{filePath.split('\\').pop()}</Item>
            );
        });

        return renderItems;
    }, [currentFiles]);

    return (
        <div>
        <MenuTrigger>
            <ActionButton>
                File
            </ActionButton>
            <Menu onAction={(key) => processOptions(key)}>
                <Item key="load">Load File</Item>
                <SubmenuTrigger>
                    <Item>Import Previous</Item>
                    <Menu onAction={(key) => processOptions(key)} items={currentFiles}>
                        { render() }
                    </Menu>
                </SubmenuTrigger>
            </Menu>
        </MenuTrigger>
        </div>
    );
};

export default FileMenuBar;
