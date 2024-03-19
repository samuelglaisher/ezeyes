import React, { useState, useEffect, useRef } from 'react';
import { Flex } from '@adobe/react-spectrum';
import Mousetrap, { ExtendedKeyboardEvent } from 'mousetrap';

interface KeybindInputProps {
  label: string;
  keyValue: string;
  onChange: (key: string) => void;
}

export const KeybindInput: React.FC<KeybindInputProps> = ({ label, keyValue, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mousetrap = new Mousetrap(inputRef.current);

    if (isEditing && inputRef.current) {
        const oldHandleKey = mousetrap.handleKey;

        mousetrap.handleKey = (character: string, modifiers: string[], e: ExtendedKeyboardEvent) => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          timerRef.current = setTimeout(() => {
            onChange(character);
            setIsEditing(false);
          }, 1000);

        inputRef.current.focus();

        return () => {
          mousetrap.unbind('keypress');
          mousetrap.handleKey = oldHandleKey;
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      }
    }

  }, [isEditing, onChange]);

  return (
    <Flex direction="column" gap="size-50">
      <div>{label}:</div>
      <div
        tabIndex={0}
        role="textbox"
        aria-label="Keybind"
        onClick={() => setIsEditing(true)}
        ref={inputRef}
        style={{
          border: '1px solid black',
          padding: '4px 8px',
          display: 'inline-block',
          maxWidth: '100px',
          textAlign: 'center',
          backgroundColor: isEditing ? 'lightgrey' : '',
        }}
      >
        {isEditing ? '???' : keyValue}
      </div>
    </Flex>
  );
};
