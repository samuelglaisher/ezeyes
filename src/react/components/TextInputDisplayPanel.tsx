import React, { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';

const TextInputDisplayPanel: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { textContent, setTextContent } = useContext(PanelContext);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
  };

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0}>
      <View>
        <Text UNSAFE_className="text">{textContent}</Text>
      </View>
    </div>
  );
};

export default TextInputDisplayPanel;
