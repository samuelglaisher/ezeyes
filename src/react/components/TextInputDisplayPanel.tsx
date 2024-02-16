import React, { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { View, Text } from '@adobe/react-spectrum';

const TextInputDisplayPanel: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { textContent, setTextContent } = useContext(PanelContext);
  const { curWordIndex, setCurWordIndex } = useContext(PanelContext);
  const { settings } = useContext(SettingsContext);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
    setCurWordIndex(0);
  };

  const wordSequenceLength = settings.panels.wordSequenceLength;

  const startHere = (word: string, i: number) => {
    setCurWordIndex(i);
  };

  let r = 0;
  const render = () => Array.from(textContent.split('\n').join(' \n ').split(' ').filter(word => word.length !== 0)).map((word, i) => {
    const dex_value = i-r;
    if (word == '\n') {
      r += 1;
      return <Text UNSAFE_className="text" key={Math.random()}>{word+' '}</Text>
    } else if (dex_value >= curWordIndex && dex_value < curWordIndex+wordSequenceLength) {
      return <mark data-dex={dex_value} key={Math.random()} onClick={() => startHere(word, dex_value)}><Text UNSAFE_className="text" key={Math.random()}>{word+' '}</Text></mark>
    } else {
      return <span data-dex={dex_value} key={Math.random()} onClick={() => startHere(word, dex_value)}><Text UNSAFE_className="text" key={Math.random()}>{word+' '}</Text></span>
    }
  });

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0}>
      <View>
        {/* <Text UNSAFE_className="text">{textContent}</Text> */}
        { render() }
      </View>
    </div>
  );
};

export default TextInputDisplayPanel;
