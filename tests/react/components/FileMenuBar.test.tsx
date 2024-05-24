import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileMenuBar from '../../../src/react/components/FileMenuBar';
import { jest } from '@jest/globals';
import { FileManagerContext, FileManagerContextType } from '../../../src/react/contexts/FileManagerContext';
import { useFileMenuBar } from '../../../src/react/hooks/useFileMenuBar';
import { Provider, darkTheme } from "@adobe/react-spectrum";

jest.mock('../../../src/react/hooks/useFileMenuBar');

beforeEach(() => {
	jest.clearAllMocks();
	jest.resetAllMocks();
	mockFileManagerContext.currentFiles = [];
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions });
});

const mockFileManagerContext: FileManagerContextType = {
    currentFiles: [],
    setCurrentFiles: jest.fn(),
};

const mockProcessOptions = jest.fn();

describe('FileMenuBar component', () => {
    it('renders the menu bar/file button', () => {
        render(<FileMenuBar />);
        expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('calls processOptions with "pass" when clicked', () => {
      render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockProcessOptions).toHaveBeenCalledWith("pass");
    });
});

describe('Load File component', () => {
    it('renders the load file button in the file menu bar', () => {
        render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText('Load File')).toBeInTheDocument();
    });

    it('calls processOptions with "load" when clicked', () => {
      render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      const loadButton = screen.getByText("Load File");
      fireEvent.click(loadButton);
      expect(mockProcessOptions).toHaveBeenCalledWith("load");
    });
});

describe('Import Previous component', () => {
    it('renders the import previous button in the file menu bar', () => {
        render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText('Import Previous')).toBeInTheDocument();
    });

    it('import previous submenu renders a single item saying "(none)" when there are no current files', () => {
        render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const importButton = screen.getByText("Import Previous");
        fireEvent.click(importButton);
        expect(screen.getByText('(none)')).toBeInTheDocument();
    });

    it('calls processOptions with "pass" when "(none)" is clicked', () => {
        render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const importButton = screen.getByText("Import Previous");
        fireEvent.click(importButton);
        const noneButton = screen.getByText("(none)");
        fireEvent.click(noneButton);
        expect(mockProcessOptions).toHaveBeenCalledWith("pass");
    });

    it('import previous submenu renders a single item saying the file name when there is one current file', () => {
        mockFileManagerContext.currentFiles = ["C:\\Users\\fake\\files\\article.docx"];
        render(<Provider theme={darkTheme}><FileManagerContext.Provider value={mockFileManagerContext} ><FileMenuBar /></FileManagerContext.Provider></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const importButton = screen.getByText("Import Previous");
        fireEvent.click(importButton);
        expect(screen.getByText('article.docx')).toBeInTheDocument();
    });

    it('import previous submenu renders a new item saying the file name after load file is used', () => {
        const {rerender} = render(<Provider theme={darkTheme}><FileManagerContext.Provider value={mockFileManagerContext} ><FileMenuBar /></FileManagerContext.Provider></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const importTButton = screen.getByText("Import Previous");
        fireEvent.click(importTButton);
        expect(screen.getByText('(none)')).toBeInTheDocument();
        const loadButton = screen.getByText("Load File");
        fireEvent.click(loadButton);
        mockFileManagerContext.currentFiles = ["C:\\Users\\fake\\files\\article.pdf"];
        rerender(<Provider theme={darkTheme}><FileManagerContext.Provider value={mockFileManagerContext} ><FileMenuBar /></FileManagerContext.Provider></Provider>);
        fireEvent.click(button);
        const importButton = screen.getByText("Import Previous");
        fireEvent.click(importButton);
        expect(screen.getByText('article.pdf')).toBeInTheDocument();
    });

    it('calls processOptions with file path when respective previous file is clicked', () => {
        mockFileManagerContext.currentFiles = ["C:\\Users\\fake\\files\\article.docx"];
        const {rerender} = render(<Provider theme={darkTheme}><FileManagerContext.Provider value={mockFileManagerContext} ><FileMenuBar /></FileManagerContext.Provider></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const loadButton = screen.getByText("Load File");
        fireEvent.click(loadButton);
        mockFileManagerContext.currentFiles = ["C:\\Users\\fake\\files\\article.docx", "C:\\Users\\fake\\files\\article.pdf"];
        rerender(<Provider theme={darkTheme}><FileManagerContext.Provider value={mockFileManagerContext} ><FileMenuBar /></FileManagerContext.Provider></Provider>);
        fireEvent.click(button);
        const importButton = screen.getByText("Import Previous");
        fireEvent.click(importButton);
        const firstButton = screen.getByText("article.docx");
        fireEvent.click(firstButton);
        expect(mockProcessOptions).toHaveBeenCalledWith("C:\\Users\\fake\\files\\article.docx");
        fireEvent.click(button);
        const importTButton = screen.getByText("Import Previous");
        fireEvent.click(importTButton);
        const secondButton = screen.getByText("article.pdf");
        fireEvent.click(secondButton);
        expect(mockProcessOptions).toHaveBeenCalledWith("C:\\Users\\fake\\files\\article.pdf");
    });
});

describe('Reset Preferences component', () => {
    it('renders the reset preferences button in the file menu bar', () => {
        render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText('Reset Preferences')).toBeInTheDocument();
    });

    it('calls processOptions with "reset" when clicked', () => {
      render(<Provider theme={darkTheme}><FileMenuBar /></Provider>);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      const resetButton = screen.getByText("Reset Preferences");
      fireEvent.click(resetButton);
      expect(mockProcessOptions).toHaveBeenCalledWith("reset");
    });
});
