import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { PanelDisplayType, ThemeType, UISize, WPMType } from '../../src/react/SettingsSchema';
import App from '../../src/react/App';

beforeEach(() => {});

const sampleText = 'Last year\'s El Niño caused 37 hurricanes.\nMeteorologists say that this was "pretty crazy".'
const mockSettingsContext = {
  settings: {
    processing: {
      wpm: {
        type: WPMType.NORMAL,
        assisted: { min: 10, max: 100, current: 50 },
        normal: { min: 200, max: 700, current: 300 },
        delta: 1,
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

describe('End-To-End Tests', () => {
  test('render uiprovider', async () => {
    /*
      1. Render the UIProvider component with a dummy child component.
      2. Search for the dummy child component in the rendered output.
      3. Verify that the dummy child component is rendered within the UIProvider.
      The UIProvider component renders its children correctly
    */
  });

  test('basic reader flow', async () => {
    // const rendered = render(<App />);





    /*
      1. With the app open, click on the text input panel.
      2. Paste in text to read from. This should contain uppercase/lowercase letters, diacritics, numbers, punctuation, spaces and newlines.
      3. Hit the pause/play button to start reading and wait until the reader stops.
      The last word should be reached in the time predicted by the reader speed, document length, and chunk size.
    */
  });

  test('complex reader flow', async () => {
    /*
      1. Paste a sample text into the TextInputDisplayPanel
      2. Click the play button and verify that the text starts scrolling in the ReaderDisplayPanel
      3. Click the pause button and verify that the text scrolling stop
      4. Click the navigate forward button and verify that the text advances to the next word sequence
      5. Click the navigate backward button and verify that the text goes back to the previous word sequence
      6. Interact with the TextInputDisplayPanel to navigate to a specific paragraph and verify that the ReaderDisplayPanel updates accordingly
      The application correctly handles pasting text, play/pause and navigate through text
    */
  });

  test('settings change behavior', async () => {
    /*
      The application is loaded and the SettingsMenu is accessible
      1. Open the settings menu by clicking the SettingsBotton
      2. Navigate to the “Processing” tab and change the “Speed Mode” and “Words Per Minute” settings
      3. Verify that the text scrolling speed in the ReaderDisplayPanel adjusts
      4. Navigate to the “Display” tab and change the “UI Size”, “Theme” and “Default Display Type” settings
      5. Verify that the application's appearance and layout update based on the selected settings
      6. Navigate to the "Overlay" tab and modify the overlay color
      7. Verify that the overlay color on the application changes as expected
      8. Navigate to the "Filter" tab and adjust the various filter settings
      9. Verify that the application's visual filters update in real-time
      The application's behavior and appearance correctly respond to changes made in the SettingsMenu.
*/
  });
  
  test('file import functionality', async () => {
    /*
      The application is loaded and the FileMenuBar is accessible
      1. Click on the FileMenuBar to open the file menu
      2. Select the option to import a file, and choose one from the local machine
      3. Verify that the file is successfully imported and the text content is displayed in the TextInputDisplayPanel
      4. Navigate through the imported text using the play/pause, forward, and back buttons
      5. Verify that the imported text behaves as expected and matches the content of the original file
      6. Repeat for each supported file type (.txt, .docx, .pdf, .rtf)
      Users can successfully import files using the FileMenuBar, and the imported text is displayed and navigable within the application.
    */
  });

  test('reader flow keybindings', async () => {
    /*
      Reader speed is at 180 wpm.
      1. With the app open, click on the text input panel.
      2. Paste in text to read from. This should contain uppercase/lowercase letters, diacritics, numbers, punctuation, spaces and newlines.
      3. Hit the pause/play button to start reading.
      4. Hit the keybind to decrease reader speed three times and to increase speed one time, all in less than a second
      5. Verify there is no perceptible delay in performing these actions
      Reader speed is at 120 wpm.
    */
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

  test('reader flow error recovery', async () => {
    /*
      Settings are at their defaults
      1. Attempt to import a file that doesn’t exist
      2. Attempt to import a file of the wrong type
      3. Import a valid file
      4. Attempt to set reader speed to 0
      5. Attempt to set chunk size to 0
      6. Attempt to set two keybindings to the same value
      7. Hit the potentially-duplicated keybinding
      8. Unpause the reader
      Importing an invalid file does nothing, and setting an invalid setting is prevented.
      The keybinding only performs its original action.
      The reader plays as normal.
    */
  });

  test('reader flow break', async () => {
    /*
      Settings are at their defaults
      1.Import a passage from a file > 25,000 words large.
      2. Open settings and set reader speed to 600 wpm and chunk size to 10
      3. Start the reader and hold down d (switch view) for 15 seconds
      The reader imports the file in less than 5 seconds
      The reader doesn’t stutter for longer than 1 second after stress testing for 15 seconds on a machine with the lowest recommended specs (SRS 2.1.3)
      The reader stops at the word predicted given the reader speed, chunk size and read duration.
    */
  });

  test('reader flow acceptance', async () => {
    /*
      Settings are at their defaults, zoom view
      1. Increase the reader size to 32px and text input to 18px, and change the forward/back word keybindings to a and d.
      2. Import a file of the wrong type and dismiss the error message.
      3. Import a file for text and click the play/pause button to start.
      4. While reading, decrease the reader speed twice, then pause and go back to the first word in the sentence by hitting back word.
      5. Switch the view to vertical and drag the separator so that the reader takes up more than 2/3 of the window.
      6. Pause the reader, paste in text, and increase the chunk size to 3.
      7. Hit the forward sentence keybinding 5 times, then resume the reader.
      8. Pause the reader and import the previous document
      9. Scroll down the doc and click on the paragraph you stopped at
      All updated settings and view modifications are reflected in the UI
      The reader is in the position it was left at after step 4. 
    */
  });
});
