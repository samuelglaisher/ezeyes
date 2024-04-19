import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { FileManagerProvider, FileManagerContext, FileManagerContextType } from '../../../src/react/contexts/FileManagerContext';

const TestFileManagerContext = () => {
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext);

    return (
        <>
            <div data-testid="currentFiles">{JSON.stringify(currentFiles)}</div>
            <button onClick={() => setCurrentFiles(["test"])}>Update Files</button>
            <button onClick={() => setCurrentFiles(JSON.parse(localStorage.getItem("filePaths")))}>Loading Files</button>
        </>
    );
};

describe('FileManagerContext', () => {
    test('loading with default files values (no saved paths)', () => {
        render(
            <FileManagerProvider>
                <TestFileManagerContext />
            </FileManagerProvider>
        );

        const currentFiles = screen.getByTestId('currentFiles');
        expect(currentFiles).toHaveTextContent("[]");
    });

    test('loading with saved paths', () => {
        render(
            <FileManagerProvider>
                <TestFileManagerContext />
            </FileManagerProvider>
        );

        localStorage.setItem("filePaths", JSON.stringify(["saved_path"]));

        const button = screen.getByRole('button', { name: /loading files/i });
        act(() => {
            button.click();
        });

        const currentFiles = screen.getByTestId('currentFiles');
        expect(currentFiles).toHaveTextContent("[\"saved_path\"]");
    });

    test('updates context value when setCurrentFiles is called', () => {
        render(
            <FileManagerProvider>
                <TestFileManagerContext />
            </FileManagerProvider>
        );

        const button = screen.getByRole('button', { name: /update files/i });
        act(() => {
            button.click();
        });

        const currentFiles = screen.getByTestId('currentFiles');
        expect(currentFiles).toHaveTextContent("[\"test\"]");
    });
});
