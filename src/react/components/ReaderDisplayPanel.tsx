import React, { useContext, CSSProperties } from 'react';
import { PanelContext } from '../contexts/PanelContext';

interface ReaderDisplayProps {
  style?: CSSProperties;
}

const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ style }) => {
    const { curWordSequence } = useContext(PanelContext);

    return (
        <div id="reader-display-panel" style={style} tabIndex={0}>
            {curWordSequence.join(' ')}
        </div>
    );
};

export default ReaderDisplay;
