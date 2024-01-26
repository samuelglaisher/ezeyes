import React, { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

interface TextInputDisplayPanelProps {
  style?: React.CSSProperties;
}

const TextInputDisplayPanel: React.FC<TextInputDisplayPanelProps> = ({ style }) => {
  const { textContent, setTextContent } = useContext(PanelContext);

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
  };

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0} >
        <p>
        {textContent}
        </p>
    </div>
  );
};

export default TextInputDisplayPanel;
