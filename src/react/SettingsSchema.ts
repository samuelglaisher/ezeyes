export interface Keybindings {
    play: string;
    pause: string;
    nextWord: string;
    prevWord: string;
    openSettings: string;
    switchView: string;
}

export enum PanelDisplayType {
    HORIZONTAL,
    VERTICAL,
    ZOOM,
    FLASHCARD
}

export interface Panels {
    textInputPanel: Object;
    readerPanel: Object;
    wpm: number;
    wordSequenceLength: number;
    displayType: PanelDisplayType;
}

export interface Settings {
    keybindings: Keybindings;
    panels: Panels
}

export const initialSettings: Settings = {
    keybindings: {
        play: 'space',
        pause: 'space',
        nextWord: 'right',
        prevWord: 'left',
        openSettings: 'ctrl+o',
        switchView: "p",
    },
    panels: {
        textInputPanel: {
            appearance: {
                fontSize: '16px',
                theme: 'light',
            }
        },
        readerPanel: {
            appearance: {
                fontSize: '16px',
                theme: 'light',
            }
        },
        wpm: 120,
        wordSequenceLength: 4,
        displayType: PanelDisplayType.ZOOM
    },
};
