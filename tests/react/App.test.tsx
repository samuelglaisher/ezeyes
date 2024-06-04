import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, waitFor, RenderResult } from '@testing-library/react';
import { initialSettings, PanelDisplayType, ThemeType, UISize, WPMType } from '../../src/react/SettingsSchema';
import App from '../../src/react/App';
import userEvent from '@testing-library/user-event';
import UIProvider from '../../src/react/components/UIProvider';
import { PanelContext } from '../../src/react/contexts/PanelContext';
import { SettingsContext } from '../../src/react/contexts/SettingsContext';
var Mousetrap = require('mousetrap-pause')(require('mousetrap'));
import { FileManagerContext, FileManagerContextType } from '../../src/react/contexts/FileManagerContext';
import { Provider, darkTheme } from "@adobe/react-spectrum";
import { SettingsContextType } from '../../src/react/contexts/SettingsContext';


const sampleText = 'Last year\'s El Niño caused 37 hurricanes.\nMeteorologists say that this was "pretty crazy".';
const sampleTextOneLine = 'Last year\'s El Niño caused 37 hurricanes. Meteorologists say that this was "pretty crazy".';

// Mock useFileManager
jest.mock('../../src/react/hooks/useFileManager', () => ({
  useFileManager: jest.fn(),
}));

const useFileManager = require('../../src/react/hooks/useFileManager').useFileManager;
const mockedPromptAndLoadFile = jest.fn();

useFileManager.mockImplementation(() => ({
  promptAndLoadFile: mockedPromptAndLoadFile,
}));

function predictReaderDuration(numWords: number, settings = initialSettings) {
  let numHops = Math.ceil((numWords - 1) / settings.processing.wordSequenceLength);
  let wpmInfo = settings.processing.wpm;
  let wpm = wpmInfo.type == WPMType.NORMAL ? wpmInfo.normal.current : wpmInfo.assisted.current;
  let msPerHop = (1 / wpm) * 60000;
  let ms = msPerHop * numHops;
  return ms * 1.1; // buffer to account for OS stuff
}

describe('End-To-End Tests', () => {
  let rendered: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;

  beforeEach(() => {
    rendered = render(<App />);
  });

  test('finds the panel viewport', () => {
    const divElement = rendered.container.querySelector('#panel-viewport');
    expect(divElement).toBeInTheDocument();
  });


  test('render uiprovider', async () => {
    render(<UIProvider><div>{sampleTextOneLine}</div></UIProvider>);
    expect(screen.getByText(sampleTextOneLine)).toBeInTheDocument();
  });


  test('basic reader flow', async () => {
    const reader = rendered.container.querySelector('#reader-display-panel .reader-text')
    const input = rendered.container.querySelector('#text-input-panel') || window;
    fireEvent.click(input);
    userEvent.paste(sampleText);

    let tokens = sampleText.split(' ');
    let lastWord = tokens[tokens.length - 1];
    let predictedTime = predictReaderDuration(tokens.length);

    Mousetrap.trigger(initialSettings.keybindings.play);

    setTimeout(function() {
      expect(reader).toHaveTextContent(lastWord);
    }, predictedTime);
  });
  
  // test('complex reader flow', async () => {
  //   const reader = rendered.container.querySelector('#reader-display-panel .reader-text')
  //   const input = rendered.container.querySelector('#text-input-panel') || window;
  //   fireEvent.click(input);
  //   userEvent.paste(sampleText);

  //   // expect(isPlaying).toBeTruthy()
  //   Mousetrap.trigger(initialSettings.keybindings.play);
  //   // expect(isPlaying).toBeTruthy()
  //   Mousetrap.trigger(initialSettings.keybindings.play);

  //   let tokens = sampleText.split(' ')
  //   Mousetrap.trigger(initialSettings.keybindings.nextWord);
  //   expect(reader).toHaveTextContent(tokens[1]);
  //   Mousetrap.trigger(initialSettings.keybindings.prevWord);
  //   expect(reader).toHaveTextContent(tokens[0]);

  //   let paraTokens = sampleText.split('\n')
  //   let targetWord = paraTokens[1].split(' ')[0]
  //   let targetWordIndex = paraTokens[0].split(' ').length + 1

  //   let secondParagraph = rendered.container.querySelector(`#text-input-panel:nth-child(${targetWordIndex})`) || window;
  //   fireEvent.click(secondParagraph);
  //   expect(reader).toHaveTextContent(targetWord);
  // });

  // test('file import functionality', async () => {
  //   const fileContents = {
  //     txt: 'This is a text file content.',
  //     docx: 'This is a docx file content.',
  //     pdf: 'This is a pdf file content.',
  //     rtf: 'This is a rtf file content.'
  //   } as const;
  
  //   type FileType = keyof typeof fileContents;
  
  //   const fileTypes: FileType[] = ['txt', 'docx', 'pdf', 'rtf'];
  
  //   for (const fileType of fileTypes) {
  //     mockedPromptAndLoadFile.mockClear();
  //     mockedPromptAndLoadFile.mockResolvedValue({ result: fileContents[fileType] });
  
  //     Mousetrap.trigger(initialSettings.keybindings.importFile);
  
  //     await waitFor(() => {
  //       expect(screen.getByText(fileContents[fileType])).toBeInTheDocument();
  //     });
  //   }
  // });  

  test('reader flow keybindings', async () => {
    const reader = rendered.container.querySelector('#reader-display-panel .reader-text')
    const input = rendered.container.querySelector('#text-input-panel') || window;
    const initialWPM = initialSettings.processing.wpm;

    fireEvent.click(input);
    userEvent.paste(sampleText);

    Mousetrap.trigger(initialSettings.keybindings.play);
    Mousetrap.trigger(initialSettings.keybindings.decreaseSpeed);
    Mousetrap.trigger(initialSettings.keybindings.decreaseSpeed);
    Mousetrap.trigger(initialSettings.keybindings.decreaseSpeed);
    Mousetrap.trigger(initialSettings.keybindings.increaseSpeed);
    Mousetrap.trigger(initialSettings.keybindings.increaseSpeed);
    Mousetrap.trigger(initialSettings.keybindings.increaseSpeed);

    const finalWPM = initialSettings.processing.wpm

    expect(finalWPM).toBe(initialWPM);
  });

  /*
  test('reader flow settings', async () => {
    const mockSettingsContext: SettingsContextType = {
      settings: {
        processing: {
          wpm: {
            ...initialSettings.processing.wpm,
            type: WPMType.ASSISTED,
            assisted: { min: 10, max: 100, current: 30 },
          },
          wordSequenceLength: initialSettings.processing.wordSequenceLength,
        },
        ui: {
          ...initialSettings.ui,
          overlayColor: '#ffa50033',
        },
        textInputPanel: {
          fontSize: 24,
        },
        readerPanel: {
          fontSize: 48,
        },
        keybindings: {
          ...initialSettings.keybindings,
          prevParagraph: "a"
        }
      }, 
      dispatch: jest.fn(),
      showSettingsMenu: false,
      setShowSettingsMenu: jest.fn(),
      getThemeObject: jest.fn()
    };
    render(<SettingsContext.Provider value={mockSettingsContext}><App /></SettingsContext.Provider>)

    const input = rendered.container.querySelector('#text-input-panel') || rendered.container;
    fireEvent.click(input);
    userEvent.paste(sampleText);

    Mousetrap.trigger(initialSettings.keybindings.play);
    setTimeout(() => {
      Mousetrap.trigger(initialSettings.keybindings.play);
    }, 1000);

    Mousetrap.trigger(initialSettings.keybindings.prevParagraph);

    const reader = rendered.container.querySelector('#reader-display-panel .reader-text') || rendered.container;
    let readerFontSize = (reader as HTMLElement).style.fontSize;
    expect(readerFontSize).toEqual('48px');

    let inputFontSize = (input as HTMLElement).style.fontSize;
    expect(inputFontSize).toEqual('24px');

    const overlay = rendered.container.querySelector("body::before") || rendered.container;
    let overlayColor = (overlay as HTMLElement).style.backgroundColor;
    expect(overlayColor).toEqual('rgba(255, 165, 0, 0.2)');

    let tokens = sampleText.split(' ');
    expect(reader).toHaveTextContent(tokens[0]);
  });
  */

  test('reader flow panel', async () => {
    const input = rendered.container.querySelector('#text-input-panel') || window;
    fireEvent.click(input);
    userEvent.paste(sampleText);

    Mousetrap.trigger(initialSettings.keybindings.switchView);
    Mousetrap.trigger(initialSettings.keybindings.switchView);
    Mousetrap.trigger(initialSettings.keybindings.switchView);

    const bar = rendered.container.querySelector('.resize-bar-horizontal') || window;
    let containerHeight = rendered.container.querySelector('#panel-container')?.clientHeight || 0
    let newPosition = containerHeight * 0.8

    fireEvent.mouseDown(bar);
    fireEvent.mouseMove(bar, { clientY: newPosition });
    fireEvent.mouseUp(bar);

    const readerHeight = rendered.container.querySelector('#reader-display-panel')?.clientHeight
    const textInputHeight = rendered.container.querySelector('#text-input-panel')?.clientHeight

    expect(readerHeight).toEqual(containerHeight * 0.8)
    expect(textInputHeight).toEqual(containerHeight * 0.2)
  });

  // settings change behavior
  // reader flow previous
  // reader flow error recovery
  // reader flow break
  // reader flow acceptance
  // cut (low priority + time constraints)
});
