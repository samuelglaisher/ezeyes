import React, { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

interface TextInputDisplayPanelProps {
  style?: React.CSSProperties;
}

const TextInputDisplayPanel: React.FC<TextInputDisplayPanelProps> = ({ style }) => {
  const { textContent } = useContext(PanelContext);

  return (
    <div id="text-input-panel" style={style}>
        <p>
        {textContent}
        </p>
    </div>
  );
};

export default TextInputDisplayPanel;
