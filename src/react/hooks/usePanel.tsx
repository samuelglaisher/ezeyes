import { useContext, useEffect, useState } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';
import nlp from 'compromise';

export const usePanel = () => {
  const [sentenceIndices, setSentenceIndices] = useState<number[]>([]);
  const [paragraphIndices, setParagraphIndices] = useState<number[]>([]);
  const [wordSequenceIndices, setWordSequenceIndices] = useState<number[]>([]);

  const {
    curWordSequence,
    setCurWordSequence,
    textContent,
    setTextContent,
    isPlaying,
    setIsPlaying,
    prevParagraphIndex,
    setPrevParagraphIndex,
    nextParagraphIndex,
    setNextParagraphIndex,
    prevSentenceIndex,
    setPrevSentenceIndex,
    nextSentenceIndex,
    setNextSentenceIndex,
    prevWordSequenceIndex,
    setPrevWordSequenceIndex,
    curWordSequenceIndex,
    setCurWordSequenceIndex,
    nextWordSequenceIndex,
    setNextWordSequenceIndex,
   } = useContext(PanelContext);

  const { settings } = useContext(SettingsContext);

  const speed = 1000 / (settings.panels.wpm.curWpm / 60);

  /**
   * Calculate the indices of all sentences and paragraphs in the text content on load.
   */
  const calculateIndicesOnLoad = () => {
    const document = nlp(textContent);
    const sentences = document.sentences().out('array');
    const paragraphs = textContent.trim().split(/\n+/);
    const words = document.terms().out('array');
    
    let curIndex = 0;

    setSentenceIndices([]);
    setParagraphIndices([]);

    for (let sentence of sentences) {
      sentenceIndices.push(textContent.indexOf(sentence, curIndex));
      curIndex += sentence.length;
    }

    curIndex = 0;

    for (let paragraph of paragraphs) {
      paragraphIndices.push(textContent.indexOf(paragraph, curIndex));
      curIndex += paragraph.length;
    }

    curIndex = 0;

    for (let i = 0; i < words.length; i += settings.panels.wordSequenceLength) {
      wordSequenceIndices.push(textContent.indexOf(words[i], curIndex));
      curIndex += words.slice(i, i + settings.panels.wordSequenceLength).join(' ').length;
      curIndex += textContent.slice(curIndex).match(/\n+/)?.[0]?.length || 0;
    }

    for (let i = 0; i < wordSequenceIndices.length; i++) {
      console.log(`Word sequence index: ${wordSequenceIndices[i]}; Word sequence: ${textContent.slice(wordSequenceIndices[i], wordSequenceIndices[i+1]).trim()}`);
    }

  };

  const calculateIndicesOnUpdate = () => {
    setPrevWordSequenceIndex(Math.max(curWordSequenceIndex - settings.panels.wordSequenceLength, 0));
    setPrevSentenceIndex(Math.max(sentenceIndices.findIndex(index => index < curWordSequenceIndex), 0));
    setPrevParagraphIndex(Math.max(paragraphIndices.findIndex(index => index < curWordSequenceIndex), 0));

    setNextSentenceIndex(Math.max(sentenceIndices.findIndex(index => index > (curWordSequenceIndex + settings.panels.wordSequenceLength - 1)), textContent.length - 1));
    setNextParagraphIndex(Math.max(paragraphIndices.findIndex(index => index > (curWordSequenceIndex + settings.panels.wordSequenceLength - 1)), textContent.length - 1));
  };

  const navigateForward = (): void => {
    // setCurWordSequence(prevIndex => prevIndex + settings.panels.wordSequenceLength);
  };

  const navigateBackward = (): void => {
    // setCurWordSequence(prevIndex => Math.max(prevIndex - settings.panels.wordSequenceLength, 0));
  };

  const { togglePlayPause } = usePlaybackControl(navigateForward, speed);

  useEffect(() => {
    calculateIndicesOnLoad();
  }, [textContent]);

  useEffect(() => {
    calculateIndicesOnUpdate();
  }, [settings.panels.wordSequenceLength, curWordSequenceIndex, sentenceIndices, paragraphIndices]);

  return {
    navigateForward,
    navigateBackward,
    togglePlayPause,
  };
};
