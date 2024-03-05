import React, { useContext, useState, useEffect } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';


const TextInputDisplayPanel: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { setCurWordSequenceIndex, setTextContent, curWordSequenceIndex, wordIndices, paragraphIndices, textContent, nextWordSequenceIndex} = useContext(PanelContext);
  const [renderHtml, setRenderHtml] = useState<React.JSX.Element[]>([]);
  const [highlightTrigger, setHighlightTrigger] = useState(0);

  const triggerHighlightUpdate = () => {
    setHighlightTrigger(prev => prev + 1);
  };

  useEffect(() => {
    triggerHighlightUpdate();
  }, [curWordSequenceIndex, nextWordSequenceIndex])
  

  useEffect(() => {
    document.querySelectorAll('.highlight').forEach(el => {
      el.classList.remove('highlight');
    });

    for (let i = curWordSequenceIndex; i < nextWordSequenceIndex; i++) {
      const element = document.getElementById(`word-${i}`);
      element?.classList.add('highlight');
    }
  }, [highlightTrigger]);

  /**
   * Render loop for rendering the highlighted HTML
   */
  useEffect(() => {
    const newRenderHtml: React.JSX.Element[] = [];

    // Function to start from a specific index, used in onClick
    const startHere = (i: number) => {
      setCurWordSequenceIndex(i);
    };

    // Traverse each word in the text
    wordIndices.forEach((wordIndex, i) => {
      const word = textContent.slice(wordIndex, wordIndices[i + 1]).trimEnd();
      const key = `word-${wordIndex}-${i}`;

      // Line break logic for paragraph indices
      if (paragraphIndices.includes(wordIndex)) {
        newRenderHtml.push(
          <span key={`paragraph-${i}`} style={{ width: "100vw" }}>
            <br onClick={() => startHere(wordIndex)} />
            <br onClick={() => startHere(wordIndex)} />
          </span>
        );
      }

      newRenderHtml.push(
        <span key={key} id={"word-" + wordIndex} onClick={() => startHere(wordIndex)}>
          <Text UNSAFE_className="text">{word + ' '}</Text>
        </span>
      );

    });

    // Update the local state to trigger a re-render with the updated content
    setRenderHtml(newRenderHtml);
  }, [textContent, paragraphIndices]);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
    setCurWordSequenceIndex(0);
  };

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0}>
      <View>{renderHtml}</View>
    </div>
  );
};

export default TextInputDisplayPanel;
