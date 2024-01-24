import { Settings } from '../SettingsSchema';

type SettingsAction = {
  type: string;
  payload?: any;
};

export const settingsReducer = (state: Settings, action: SettingsAction): Settings => {
  switch (action.type) {
    // Define cases for different actions
    default:
      return state;
  }
};
