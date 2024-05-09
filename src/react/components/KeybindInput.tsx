import React, { useState, useEffect, useRef, useContext } from 'react';
import { Divider, Flex, Header } from '@adobe/react-spectrum';
import { SettingsContext } from '../contexts/SettingsContext';
import { Keybindings } from '../SettingsSchema';
var Mousetrap = require('mousetrap-record')(require('mousetrap'));

interface KeybindInputProps {
  label: string;
  keycode: string;
  keyValue: string;
}

export const handleRecord = (keycode: string, dispatch: Function, settingsKeybindings: Keybindings, setIsEditing: Function, sequence: string[]) => {
  const detectedSequence = sequence.join(' ');
  const assignedKeybinds = Object.values(settingsKeybindings);

  if (!assignedKeybinds.includes(detectedSequence)) {
    dispatch({type: "UPDATE_KEYBINDING", key: keycode, value: detectedSequence});
  }

  setIsEditing(false);
};

export const KeybindInput: React.FC<KeybindInputProps> = ({ keycode, label, keyValue }) => {
  const { settings, dispatch } = useContext(SettingsContext);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    /* instanbul ignore next */
    const handleSpaceBar = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isEditing) {
        event.preventDefault();
      }
    };

    if (isEditing) {
      inputElement.focus();
      inputElement.addEventListener('keydown', handleSpaceBar);
      inputElement.addEventListener('focusout', () => setIsEditing(false));
      Mousetrap.record((sequence: string[]) => handleRecord(keycode, dispatch, settings.keybindings, setIsEditing, sequence));

      return () => {
        inputElement.removeEventListener('keydown', handleSpaceBar);
      };
    }
  }, [isEditing, keycode, settings.keybindings, dispatch]);

  return (
    <Flex direction="column" gap="size-50">
      <Header UNSAFE_style={{userSelect: 'none'}}>{label}</Header>
      <div
        tabIndex={0}
        role="textbox"
        aria-label="Keybind"
        onClick={() => setIsEditing(true)}
        ref={inputRef}
        className='keybind-input'
        style={{
          border: '1px solid #D0D0D0',
          padding: '4px 8px',
          display: 'inline-block',
          maxWidth: '100px',
          textAlign: 'center',
          borderRadius: '8px',
          backgroundColor: '',
          fontFamily: 'var(--spectrum-global-font-family-base)',
          fontSize: 'var(--spectrum-alias-font-size-default)',
          fontWeight: 'var(--spectrum-global-font-weight-regular)',
        }}
      >
        {isEditing ? '???' : keyValue}
      </div>
    </Flex>
  );
};
