# EZEyes

EZEyes is a reader app made for TBI survivors. By playing a slideshow of words at a fixed point on the screen, EZEyes reduces saccadic eye movement, allowing TBI patients to read longer and with less effort. EZEyes is not intended as therapy - it is an accessibility tool first and foremost.

## Deliverable Contents
### Implemented Features
- Text Input Display Panel
- Reader Display Panel
- Text Importation
  - Clipboard importation
  - File importation
    - PDF
    - DOCX
    - RTF
    - TXT 
- Four Panel Views
  - Flashcard View
  - Vertical View
  - Horizontal View
  - Zoom View
- Keybinding System
  - Play/pause
  - Next word
  - Previous word
  - Open settings
  - Switch panel view
  - Import file menu
  - Previous paragraph
  - Next paragraph
  - Previous sentence
  - Next sentence
  - Flip flashcard
  - Back to top
  - Search
  - Increase WPM speed
  - Decrease WPM speed
  - Selecting Start Location within Text
- Text Highlighting and Tracking
- Cross-Platform Functionality
  - Application builds for macOS, Windows, and GNU/Linux

### Non-implemented Features
- None
### Known & Open Issues
- Keybindings suppressed with a menu open
  - Hitting a key to open a different menu does not close the existing menu. For example, if I have the tutorial open and hit "s" to open the settings menu, nothing happens. This is only an issue on the incoming "tutorial" feature branch.

## Structure

EZEyes is a React web app written in TypeScript. Electron and electron-forge are used to package the webapp as a standalone desktop application. Node.js is used as a runtime, and yarn is used as a package manager and build coordinator. Additionally, we use .yml files to automate the build pipeline.

## Development Setup

### Install node.js and yarn

Download node.js from [their site](https://nodejs.org/en/download/), or update it through npm with the following command:

```
npm cache clean
npm install -g n
```

After node.js is installed, install yarn through [their recommended method](https://yarnpkg.com/getting-started/install). If that doesn't work, you can alternatively install yarn through npm: `npm install yarn`.

Note: electron-forge can only package executables for the platorm it's being run on - this means you need to build on Windows to get an .exe, or Mac to get a .dmg. We plan to set up automatic packaging in our pipeline in the future.

### Commands
To run all commands, first navigate to the root directory of the EZEyes repository. If you did not install the project dependencies yet, type `yarn install`.

#### Running the development build
To run the development build, use the command: `yarn start`

#### Running tests
To run the unit tests, use the command: `yarn test`

#### Building
To build the executable, use the command: `yarn make`
