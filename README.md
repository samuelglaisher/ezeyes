# EZEyes

EZEyes is a reader app made for TBI survivors. By playing a slideshow of words at a fixed point on the screen, EZEyes reduces saccadic eye movement, allowing TBI patients to read longer and with less effort. EZEyes is not intended as therapy - it is an accessibility tool first and foremost.

## Application Manual
An [application manual](https://github.com/asdf57/ezeyes/blob/dev/ezeyes_application_manual.pdf) exists to provide non-technical users an overview of the EZEyes application, specifically in what it does, how it works, and how to use it. Detailed installation instructions are also provided in this manual.

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
  - Open settings menu
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
  - Open help menu
- Text Highlighting and Tracking
- Cross-Platform Functionality
  - Application builds for macOS, Windows, and GNU/Linux

### Non-implemented Features
- None
### Known & Open Issues
- Keybindings suppressed with a menu open
  - Hitting a key to open a different menu does not close the existing menu. For example, if I have the tutorial open and hit "s" to open the settings menu, nothing happens. This is only an issue on the incoming "tutorial" feature branch.
- Performance
  - The EZEyes application as it currently stands struggles to handle very large passages of text (e.g., a novel). In it's current form, it supports its primary target of reading materials which are article-length text passages. This is a known limitation and something that we did not have enough time to address during our development. Please note that loading in large passages of text will result in long loading times (e.g., 5 minutes) and will result in slow text highlighting.

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

To generate a code coverage report, use the command: `yarn test:coverage`

#### Building
To build the executable, use the command: `yarn make`

## Installation
1. Navigate to https://github.com/asdf57/ezeyes/releases
2. Click on a release version (e.g., v0.0.1)
3. Download the zip file corresponding to your computer’s operating system beneath the `Assets` section of the release.
4. Unzip the file and locate the EZEyes application. Launch the application using the mechanism provided by your operating system.

### Windows Troubleshooting
For Windows users, a one-time setup process may be required if the following popup occurs when attempting to launch the EZEyes application:

<img width="372" alt="Screenshot 2024-06-02 at 16 00 18" src="https://github.com/asdf57/ezeyes/assets/53836417/5fc5228c-96ce-43b5-8fea-56c677f55bd4">

If this popup occurs for you, click on the More Info text in the popup and then select the Run Now option.
### macOS Troubleshooting
For macOS users, a one-time setup process may be required if the following popup occurs when attempting to launch the EZEyes application:

<img width="200" alt="Screenshot 2024-06-02 at 15 39 28" src="https://github.com/asdf57/ezeyes/assets/53836417/052b5a71-181e-4a52-8466-ad835c2d1c32">

If this occurs for you, first click Cancel and then hold the Control key on your keyboard and single-click on the EZEyes application file again. This should prompt you with a series of menu options like in the image below:

<img width="372" alt="Screenshot 2024-06-02 at 15 42 36" src="https://github.com/asdf57/ezeyes/assets/53836417/579cf194-ad85-4b6d-a026-c9e9146c4d9e">

Click on Open, which should then bring up a pop-up like in the below image:

<img width="372" alt="Screenshot 2024-06-02 at 15 45 14" src="https://github.com/asdf57/ezeyes/assets/53836417/40d014c9-750e-4aba-a4ff-d41c72373d2d">

Finally, click on the Open option of this popup menu and the application should launch.
