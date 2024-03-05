import React, { useContext, useMemo } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';

const TextInputDisplayPanel: React.FC<{ style?: React.CSSProperties }> = React.memo(({ style }) => {

  const { textContent, setTextContent, setCurWordSequenceIndex, curWordSequenceIndex, nextWordSequenceIndex, wordIndices, paragraphIndices } = useContext(PanelContext);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
    setCurWordSequenceIndex(0);
  };

  const startHere = useMemo(() => (i: number) => {
    setCurWordSequenceIndex(i);
  }, [setCurWordSequenceIndex]);

  const render = useMemo(() => () => {
    const renderHtml: React.JSX.Element[] = [];

    //Traverse each word in the text
    for (let i = 0; i < wordIndices.length; i++) {
      const word = textContent.slice(wordIndices[i], wordIndices[i + 1]).trimEnd();

      //If the word index aligns on a paragraph index, add a line break
      //Don't add a line break for the first paragraph
      if (i > 0 && paragraphIndices.includes(wordIndices[i])) {
        renderHtml.push(
          <span key={`paragraph-${i}`} style={{width:"100vw"}}>
            <br onClick={() => startHere(wordIndices[i])} />
            <br onClick={() => startHere(wordIndices[i])} />
          </span>);
      }

      const key = `word-${wordIndices[i]}-${i}`;

      //If the word index aligns on the current word sequence index, highlight the word, otherwise just add the regular word
      if (wordIndices[i+1] == nextWordSequenceIndex) {
        renderHtml.push(
          <span key={key} onClick={() => startHere(wordIndices[i])}>
            <mark key={key}>
              <Text UNSAFE_className="text">
                {word}
              </Text>
            </mark>
            <Text UNSAFE_className="text">
              {' '}
            </Text>
          </span>
        );
      } else if (wordIndices[i] >= curWordSequenceIndex && wordIndices[i] < nextWordSequenceIndex) {
        renderHtml.push(
          <mark key={key} onClick={() => startHere(wordIndices[i])}>
            <Text UNSAFE_className="text">
              {word + ' '}
            </Text>
          </mark>
        );
      } else {
        renderHtml.push(
          <span key={key} onClick={() => startHere(wordIndices[i])}>
            <Text UNSAFE_className="text">
              {word + ' '}
            </Text>
          </span>
        );
      }
    }

    return renderHtml;
  }, [wordIndices, textContent, paragraphIndices, curWordSequenceIndex, nextWordSequenceIndex, startHere]);

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0}>
      <View>
        { render() }
      </View>
    </div>
  );
});

export default TextInputDisplayPanel;
