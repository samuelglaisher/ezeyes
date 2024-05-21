import '@testing-library/jest-dom';
import { PanelContextType } from '../../../src/react/contexts/PanelContext';
import React from 'react';
import { FileManagerContextType } from '../../../src/react/contexts/FileManagerContext';
import { SettingsContextType } from '../../../src/react/contexts/SettingsContext';
import { PanelDisplayType, ThemeType, UISize, WPMType } from '../../../src/react/SettingsSchema';
import { useFileMenuBar } from '../../../src/react/hooks/useFileMenuBar';
import { renderHook } from '@testing-library/react';
import { Key } from '@adobe/react-spectrum';
jest.mock('../../../src/react/hooks/useFileMenuBar');
beforeEach(() => {
	jest.clearAllMocks();
	jest.resetAllMocks();
});

const mockFileManagerContext: FileManagerContextType = {
	currentFiles: [],
  setCurrentFiles: jest.fn(),
}

const mockPanelContext: PanelContextType = {
	curWordSequence: '',
	setCurWordSequence: jest.fn(),
	textContent: '',
	setTextContent: jest.fn(),
	isPlaying: false,
	setIsPlaying: jest.fn(),
	prevParagraphIndex: 0,
	setPrevParagraphIndex: jest.fn(),
	nextParagraphIndex: 0,
	setNextParagraphIndex: jest.fn(),
	prevSentenceIndex: 0,
	setPrevSentenceIndex: jest.fn(),
	nextSentenceIndex: 0,
	setNextSentenceIndex: jest.fn(),
	prevWordSequenceIndex: 0,
	setPrevWordSequenceIndex: jest.fn(),
	curWordSequenceIndex: 0,
	setCurWordSequenceIndex: jest.fn(),
	nextWordSequenceIndex: 0,
	setNextWordSequenceIndex: jest.fn(),
	formattedTextContent: React.createElement(''),
	setFormattedTextContent: jest.fn(),
	sentenceIndices: [],
	setSentenceIndices: jest.fn(),
	paragraphIndices: [],
	setParagraphIndices: jest.fn(),
	wordSequenceIndices: [],
	setWordSequenceIndices: jest.fn(),
	wordIndices: [],
	setWordIndices: jest.fn(),
	generateWordSequenceIndicesFromIndex: jest.fn(),
	speed: 0,
	setSpeed: jest.fn(),
};

const mockSettingsContext: SettingsContextType = { 
	settings: {
    processing: {
      wpm: {
        type: WPMType.NORMAL,
        assisted: { min: 10, max: 100, current: 50 },
        normal: { min: 200, max: 700, current: 300 }
      },
      wordSequenceLength: 1,
    },
    ui: {
      size: UISize.MEDIUM,
      defaultDisplayType: PanelDisplayType.ZOOM,
      theme: ThemeType.DARK,
      blur: 0,
      brightness: 1,
      contrast: 1,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 1,
      saturate: 1,
      sepia: 0,
      overlayColor: '#ff00ff00',
    },
    textInputPanel: {
      fontSize: 16,
    },
    readerPanel: {
      fontSize: 36,
    },
    keybindings: {
      play: 'space',
      nextWord: 'right',
      prevWord: 'left',
      openSettings: 's',
      switchView: 'd',
      importFile: 'q',
      prevParagraph: "shift+up",
      nextParagraph: "shift+down",
      prevSentence: "up",
      nextSentence: "down",
      flipFlashcard: "f",
      backToTop: "ctrl+up",
      search: 'ctrl+f',
      increaseSpeed: 'shift+right',
      decreaseSpeed: 'shift+left',
    },
  }, 
  dispatch: jest.fn(),
  showSettingsMenu: false,
  setShowSettingsMenu: jest.fn(),
  getThemeObject: jest.fn()
};

const mockResetPreferences = () => {
  mockFileManagerContext.currentFiles = [];
  localStorage.setItem("filePaths", JSON.stringify([]));
  mockSettingsContext.dispatch({type: "RESET_SETTINGS"});
  reset();
}

const loadFile = jest.fn();
const promptAndLoadFile = jest.fn();
const reset = jest.fn();

const mockProcessOptions = (key: Key) => {
  if (key == "pass") {
      return;
  } else if (key == "load") {
      promptAndLoadFile();
  } else if (key == "reset") {
      mockResetPreferences();
  } else {
      loadFile(key.toString(), mockPanelContext.setTextContent, mockPanelContext.setCurWordSequenceIndex);
  }
};

describe('reset preferences functionailty', () => {
	test('process options with reset key triggers reset preferences', async () => {
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions, resetPreferences: mockResetPreferences });
    const {processOptions} = useFileMenuBar();
    processOptions("reset");
    expect(reset).toHaveBeenCalled();
	});

	test('reset preferences resets settings, current files, and updates local storage', async () => {
		mockFileManagerContext.currentFiles = ["C:\\Users\\fake\\files\\article.docx", "C:\\Users\\fake\\files\\article.pdf"];
    localStorage.setItem("filePaths", JSON.stringify(mockFileManagerContext.currentFiles));
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions, resetPreferences: mockResetPreferences });
    const {processOptions} = useFileMenuBar();
    processOptions("reset");
		expect(mockFileManagerContext.currentFiles).toEqual([]);
    expect(JSON.parse(localStorage.getItem("filePaths") as string)).toEqual([]);
    expect(mockSettingsContext.dispatch).toHaveBeenCalled();
	});
});

describe('process options', () => {
	test('process options with pass value returns undefined', async () => {
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions, resetPreferences: mockResetPreferences });
    const {processOptions} = useFileMenuBar();
    const val = processOptions("pass");
    expect(val).toBeUndefined();
	});

  test('process options with load triggers load function', async () => {
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions, resetPreferences: mockResetPreferences });
    const {processOptions} = useFileMenuBar();
    processOptions("load");
    expect(promptAndLoadFile).toHaveBeenCalled();
	});

  test('process options with any key that is not pass, load, or reset triggers file loading function', async () => {
    (useFileMenuBar as jest.Mock).mockReturnValue({ processOptions: mockProcessOptions, resetPreferences: mockResetPreferences });
    const {processOptions} = useFileMenuBar();
    processOptions("file");
    expect(loadFile).toHaveBeenCalled();
	});
});
