import React from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsMenu: React.FC = () => {
  const { settings, dispatch } = useSettings();

//   const handleSettingChange = (key: string, value: any) => {
//     dispatch({ type: 'UPDATE_SETTING', key, value });
//   };

  return (
    <div>
      {/* <input 
        type="text" 
        value={settings.theme}
        onChange={(e) => handleSettingChange('theme', e.target.value)}
      /> */}
    </div>
  );
};

export default SettingsMenu;
