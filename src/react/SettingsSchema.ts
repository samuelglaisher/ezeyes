export interface Keybindings {
    nextWord: string;
    prevWord: string;
    openSettings: string;
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
        'nextWord': 'ArrowRight',
        'prevWord': 'ArrowLeft',
        'openSettings': 'Ctrl+O',
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
