import React, { useContext } from 'react';
import { useSettings } from '../hooks/useSettings';
import { SettingsContext } from '../contexts/SettingsContext';

const SettingsMenu: React.FC = () => {
  const { settings, showSettingsMenu } = useContext(SettingsContext);

  const { changePanelSetting } = useSettings();

  if (!showSettingsMenu) {
    return null;
  }

  return (
    <div>
      <label>
        WPM:
        <select 
          value={settings.panels.wpm}
          onChange={(e) => changePanelSetting("wpm", e.target.value)}
        >
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
        </select>
      </label>
    </div>
  );
};

export default SettingsMenu;
