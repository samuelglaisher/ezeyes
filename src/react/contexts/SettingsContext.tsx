import React, { createContext, useReducer, useState } from 'react';
import { Keybindings, PanelDisplayType, Settings, ThemeType, UI, UISize, WPMAttribute, WPMType, WpmRange, WpmSettings, initialSettings } from '../SettingsSchema';
import { darkTheme, lightTheme } from "@adobe/react-spectrum";
import { parseColor } from '@react-stately/color';
import { Theme } from "@react-types/provider";
import { isInRange, isValidKeybinding, compare } from '../../../src/utils';

/* istanbul ignore next */
export interface SettingsContextType {
  settings: Settings;
  showSettingsMenu: boolean;
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<Action>;
  getThemeObject: (theme: ThemeType) => Theme;
}

/* istanbul ignore next */
export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  showSettingsMenu: false,
  setShowSettingsMenu: () => {},
  dispatch: () => {},
  getThemeObject: () => lightTheme,
});

/* istanbul ignore next */
type Action =
  | { type: 'UPDATE_WPM_TYPE'; value: WPMType }
  | { type: 'UPDATE_WPM_SETTING'; wpmType: WPMType; setting: WPMAttribute; value: number }
  | { type: 'UPDATE_WORD_SEQUENCE_LENGTH'; value: number }
  | { type: 'UPDATE_UI_SIZE'; value: UISize }
  | { type: 'UPDATE_UI_THEME'; value: ThemeType }
  | { type: 'UPDATE_UI_DEFAULT_DISPLAY'; value: PanelDisplayType }
  | { type: 'UPDATE_UI_BLUR'; value: number }
  | { type: 'UPDATE_UI_BRIGHTNESS'; value: number }
  | { type: 'UPDATE_UI_CONTRAST'; value: number }
  | { type: 'UPDATE_UI_GRAYSCALE'; value: number }
  | { type: 'UPDATE_UI_HUE_ROTATE'; value: number }
  | { type: 'UPDATE_UI_INVERT'; value: number }
  | { type: 'UPDATE_UI_OPACITY'; value: number }
  | { type: 'UPDATE_UI_SATURATE'; value: number }
  | { type: 'UPDATE_UI_SEPIA'; value: number }
  | { type: 'UPDATE_UI_OVERLAY_COLOR'; value: string }
  | { type: 'UPDATE_TEXT_INPUT_FONT_SIZE'; value: number }
  | { type: 'UPDATE_READER_PANEL_FONT_SIZE'; value: number }
  | { type: 'UPDATE_KEYBINDING'; key: keyof Keybindings; value: string }
  | { type: 'RESET_SETTINGS'}

  export function settingsReducer(state: Settings, action: Action): Settings {
    switch (action.type) {
      case 'UPDATE_WPM_TYPE':
        if (action.value !== WPMType.NORMAL && action.value !== WPMType.ASSISTED) {
          return state;
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wpm: {
              ...state.processing.wpm,
              type: action.value,
            },
          },
        };

      case 'UPDATE_WPM_SETTING':
        if (action.wpmType !== 'normal' && action.wpmType !== 'assisted') {
          return state;
        }

        if (action.setting !== 'min' && action.setting !== 'max' && action.setting !== 'current') {
          return state;
        }

        const wpmMode = action.wpmType === 'normal' ? 'normal' : 'assisted';

        if (wpmMode === 'normal') {
          if (action.setting === 'min' as WPMAttribute && (action.value < state.processing.wpm.assisted.max || action.value > state.processing.wpm.normal.max )) {
            return state;
          }

          if (action.setting === 'max' as WPMAttribute && action.value < state.processing.wpm.normal.min) {
            return state;
          }

          if (action.setting === 'current' as WPMAttribute && !isInRange(action.value, initialSettings.processing.wpm.normal.min, initialSettings.processing.wpm.normal.max)) {
            return state;
          }
        }

        if (wpmMode === 'assisted') {
          if (action.setting === 'min' as WPMAttribute && (action.value <= 0 || action.value > state.processing.wpm.assisted.max)) {
            return state;
          }

          if (action.setting === 'max' as WPMAttribute && (action.value < state.processing.wpm.assisted.min || action.value > state.processing.wpm.normal.min)) {
            return state;
          }

          if (action.setting == 'current' as WPMAttribute && !isInRange(action.value, initialSettings.processing.wpm.assisted.min, initialSettings.processing.wpm.assisted.max)) {
            return state;
          }
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wpm: {
              ...state.processing.wpm,
              [wpmMode]: {
                ...state.processing.wpm[wpmMode],
                [action.setting]: action.value,
              },
            },
          },
        };

      case 'UPDATE_WORD_SEQUENCE_LENGTH':
        if (action.value < 1) {
          return state;
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wordSequenceLength: action.value,
          },
        };

      case 'UPDATE_UI_SIZE':
        if (action.value !== UISize.MEDIUM && action.value !== UISize.LARGE) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            size: action.value,
          },
        };

      case 'UPDATE_UI_THEME':
        if (action.value !== ThemeType.LIGHT && action.value !== ThemeType.DARK) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            theme: action.value,
          },
        };

      case 'UPDATE_UI_DEFAULT_DISPLAY':
        if (action.value !== PanelDisplayType.FLASHCARD && action.value !== PanelDisplayType.HORIZONTAL && action.value !== PanelDisplayType.VERTICAL && action.value !== PanelDisplayType.ZOOM) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            defaultDisplayType: action.value,
          },
        };

      case 'UPDATE_UI_BLUR':
        if (typeof action.value == "number" && (action.value < 0 || action.value > 10)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            blur: action.value,
          },
        };

      case 'UPDATE_UI_BRIGHTNESS':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 3)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            brightness: action.value,
          },
        };

      case 'UPDATE_UI_CONTRAST':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 3)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            contrast: action.value,
          },
        };

      case 'UPDATE_UI_GRAYSCALE':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 1)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            grayscale: action.value,
          },
        };

      case 'UPDATE_UI_HUE_ROTATE':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 360)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            hueRotate: action.value,
          },
        };

      case 'UPDATE_UI_INVERT':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 1)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            invert: action.value,
          },
        };

      case 'UPDATE_UI_OPACITY':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 1)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            opacity: action.value,
          },
        };

      case 'UPDATE_UI_SATURATE':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 3)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            saturate: action.value,
          },
        };

      case 'UPDATE_UI_SEPIA':
        if (typeof action.value === "number" && (action.value < 0 || action.value > 1)) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            sepia: action.value,
          },
        };

      case 'UPDATE_UI_OVERLAY_COLOR':
        try {
          parseColor(action.value);
        } catch (e) {
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            overlayColor: action.value,
          },
        };

      case 'UPDATE_TEXT_INPUT_FONT_SIZE':
        if (typeof action.value === "number" && action.value <= 0) {
          return state;
        }

        return {
          ...state,
          textInputPanel: {
            ...state.textInputPanel,
            fontSize: action.value,
          },
        };

      case 'UPDATE_READER_PANEL_FONT_SIZE':
        if (typeof action.value === "number" && action.value <= 0) {
          return state;
        }

        return {
          ...state,
          readerPanel: {
            ...state.readerPanel,
            fontSize: action.value,
          },
        };

      case 'UPDATE_KEYBINDING':
        if (!isValidKeybinding(action.key, action.value)) {
          return state;
        }

        return {
          ...state,
          keybindings: {
            ...state.keybindings,
            [action.key]: action.value,
          },
        };

      case 'RESET_SETTINGS':
        return initialSettings;

      default:
        throw new Error("Unhandled!");
    }
  }
interface SettingsProviderProps {
  children: React.ReactNode;
}

export function loadSettings() {
  try {
    const settingObj = JSON.parse(localStorage.getItem("settings"));
    const loaded = compare(initialSettings, settingObj);
    return JSON.parse(JSON.stringify(loaded));
  } catch (e) {
    console.error(`Error loading settings: ${e}`);
    return initialSettings;
  }
}

/* istanbul ignore next */
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const settingsObject = localStorage.getItem("settings") ? loadSettings() : initialSettings;
  const [settings, dispatch] = useReducer(settingsReducer, settingsObject);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const getThemeObject = (theme: ThemeType): Theme => {
    console.log("Getting theme object: ", theme)
    switch (theme) {
      case ThemeType.DARK:
        return darkTheme;
      case ThemeType.LIGHT:
        return lightTheme;
      default:
        return lightTheme;
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, showSettingsMenu, setShowSettingsMenu, dispatch, getThemeObject }}>
      {children}
    </SettingsContext.Provider>
  );
};
