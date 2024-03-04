import React, { useContext, CSSProperties } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';

interface ReaderDisplayProps {
  style?: CSSProperties;
}

const ReaderDisplay: React.FC<ReaderDisplayProps> = React.memo(({ style }) => {
    const { curWordSequence } = useContext(PanelContext);

    return (
        <div id="reader-display-panel" style={style}>
            <View>
                <Text UNSAFE_className="text">{curWordSequence}</Text>
            </View>
        </div>
    );
});

export default ReaderDisplay;
