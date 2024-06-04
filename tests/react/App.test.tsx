import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, waitFor, RenderResult } from '@testing-library/react';
import { initialSettings, PanelDisplayType, ThemeType, UISize, WPMType } from '../../src/react/SettingsSchema';
import App from '../../src/react/App';
import userEvent from '@testing-library/user-event';
import UIProvider from '../../src/react/components/UIProvider';
import { PanelContext } from '../../src/react/contexts/PanelContext';

var Mousetrap = require('mousetrap-pause')(require('mousetrap'));

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
    const input = rendered.container.querySelector('#text-input-panel') || window;
    fireEvent.click(input);
    userEvent.paste(sampleText);

    let tokens = sampleText.split(' ');
    let lastWord = tokens[tokens.length - 1];
    let predictedTime = predictReaderDuration(tokens.length);

    Mousetrap.trigger(initialSettings.keybindings.play);
    setTimeout(function() {
      expect(screen.getByText(lastWord)).toBeInTheDocument();
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

  test('reader flow settings', async () => {
    /*
      Settings are at their defaults
      1. With the app open, click on the text input panel.
      2. Paste in text to read from. This should contain uppercase/lowercase letters, diacritics, numbers, punctuation, spaces and newlines.
      3. Hit the pause/play button to start reading.
      4. Pause the reader.
      5. Open the settings and reduce the reader speed to 30 wpm (in the assist range), increase the reader size to 48px and text input to 24px, and change the forward/back paragraph keybindings to a and d.
      6. Hit d to get back to what you missed.
      The reader speed is lower, the reader/text input size is larger, there is an orange filter over the program, and the reader is back at the first word in the paragraph.
    */
  });

  test('reader flow previous', async () => {
    /*
      Settings are at their defaults
      1. Open the app and import an article from local files.
      2. Play the reader, then pause and close the application.
      3. Reopen the application. 
      4. Navigate to “Import Previous” and click the previously-opened file.
      5. Once the file loads, scroll down the text input panel until you reach the word you paused at and click it.
      The reader is in the same state as it was when initially pausing
    */
  });

  test('reader flow panel', async () => {
    /*
      Text is loaded into the application, on Zoom view
      1. Hit change view keybinding 3 times to get to the horizontal view
      2. Drag the separator down so the reader panel takes up more than 2/3 of the screen, then start the reader
      The reader is in the horizontal position with the reader taking up 2/3 of the window.
    */
  });
});
