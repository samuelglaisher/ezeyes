import React, { useContext, CSSProperties } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';

interface ReaderDisplayProps {
  style?: CSSProperties;
}

const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ style }) => {
    const { curWordSequence } = useContext(PanelContext);

    return (
        <div id="reader-display-panel" style={style} tabIndex={0}>
            <View>
                <Text UNSAFE_className="text">{curWordSequence.join(' ')}</Text>
            </View>
        </div>
    );
};

export default ReaderDisplay;
