import { useContext, useEffect, useRef, useState } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';
import nlp from 'compromise';

export const usePanel = () => {
  const [sentenceIndices, setSentenceIndices] = useState<number[]>([]);
  const [paragraphIndices, setParagraphIndices] = useState<number[]>([]);
  const [wordSequenceIndices, setWordSequenceIndices] = useState<number[]>([]);

  const paragraphIndicesRef: React.MutableRefObject<number[]>  = useRef();
  paragraphIndicesRef.current = paragraphIndices;

  const {
    curWordSequence,
    setCurWordSequence,
    textContent,
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
    setFormattedTextContent
  } = useContext(PanelContext);

  const curWordSequenceRef = useRef(curWordSequence);
  const textContentRef = useRef(textContent);
  const prevParagraphIndexRef = useRef(prevParagraphIndex);
  const nextParagraphIndexRef = useRef(nextParagraphIndex);
  const prevSentenceIndexRef = useRef(prevSentenceIndex);
  const nextSentenceIndexRef = useRef(nextSentenceIndex);
  const prevWordSequenceIndexRef = useRef(prevWordSequenceIndex);
  const curWordSequenceIndexRef = useRef(curWordSequenceIndex);
  const nextWordSequenceIndexRef = useRef(nextWordSequenceIndex);

  // Synchronize each ref with its corresponding state in the context
  useEffect(() => {
    curWordSequenceRef.current = curWordSequence;
    textContentRef.current = textContent;
    prevParagraphIndexRef.current = prevParagraphIndex;
    nextParagraphIndexRef.current = nextParagraphIndex;
    prevSentenceIndexRef.current = prevSentenceIndex;
    nextSentenceIndexRef.current = nextSentenceIndex;
    prevWordSequenceIndexRef.current = prevWordSequenceIndex;
    curWordSequenceIndexRef.current = curWordSequenceIndex;
    nextWordSequenceIndexRef.current = nextWordSequenceIndex;
  }, [
    curWordSequence,
    textContent,
    prevParagraphIndex,
    nextParagraphIndex,
    prevSentenceIndex,
    nextSentenceIndex,
    prevWordSequenceIndex,
    curWordSequenceIndex,
    nextWordSequenceIndex,
  ]);

  const { settings } = useContext(SettingsContext);

  const speed = 1000 / (settings.panels.wpm.curWpm / 60);

  /**
   * Obtains the indices to every sentence, paragraph, and word sequence
   * when new text content is inserted into the application.
   */
  const calculateIndicesOnLoad = () => {
    const document = nlp(textContent);
    const sentences = document.sentences().out('array');
    const paragraphs = textContent.trim().split(/\n+/);
    const words = document.terms().out('array');

    let newSentenceIndices: number[] = [];
    let newParagraphIndices: number[] = [];
    let newWordSequenceIndices = [];
    let curIndex = 0;

    sentences.forEach((sentence: string) => {
      const index = textContent.indexOf(sentence, curIndex);
      newSentenceIndices.push(index);
      curIndex = index + sentence.length;
    });

    curIndex = 0;
    paragraphs.forEach(paragraph => {
      const index = textContent.indexOf(paragraph, curIndex);
      newParagraphIndices.push(index);
      curIndex = index + paragraph.length;
    });

    curIndex = 0;
    for (let i = 0; i < words.length; i += settings.panels.wordSequenceLength) {
      const word = words[i];
      const index = textContent.indexOf(word, curIndex);
      newWordSequenceIndices.push(index);
      curIndex = index + words.slice(i, i + settings.panels.wordSequenceLength).join('').length;
    }

    setSentenceIndices(newSentenceIndices);
    setParagraphIndices(newParagraphIndices);
    setWordSequenceIndices(newWordSequenceIndices);

    //In case we have leading spaces or tabs, set to the start of the first word sequence index!
    setCurWordSequenceIndex(newWordSequenceIndices[0]);
  };


  function getLargestLesserValue(elems: number[], target: number) {
    let max = -1;

    for (let i = 0; elems[i] < target; i++) {
      if (elems[i] > max && elems[i] < target) {
        max = elems[i];
      }
    }

    return max;
  }

  function getSmallestLargerValue(elems: number[], target: number) {
    let min = Infinity;

    for (let i = elems.length - 1; elems[i] > target; i--) {
      if (elems[i] < min && elems[i] > target) {
        min = elems[i];
      }
    }

    return min;
  }


  /**
   * Updates the list of word sequences and all
   * relative sentence, paragraph, and word sequence
   * indices.
   * 
   * This function is triggered any time our current
   * index marker tracking the start of a word sequence
   * has been updated.
   */
  const calculateIndicesOnUpdate = () => {
    //store new relative paragraph indices
    //store new relative sentence indices
    //generate the new list of word sequence indices (since they may have changed depending whether our alignment is on a sentence start, paragraph start, etc.)
    //   - In other words, moving our word sequence index marker to another location may change the word sequences relative to that index
    //   - Moving to the previous paragraph may mean that our previous word sequence no longer exists and is a part of another word sequence RELATIVE to that point
    // once new word seq indices generated, store new relative word sequence indices

    /**
     * ALL OF THESE MUST BE CALCULATED RELATIVE TO THE CURRENT WORD SEQ INDEX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */

    //Set relative paragraph indices
    setPrevParagraphIndex(Math.max(getLargestLesserValue(paragraphIndices, curWordSequenceIndex), 0));
    setNextParagraphIndex(Math.min(getSmallestLargerValue(paragraphIndices, curWordSequenceIndex), textContent.length - 1));

    //Set relative sentence indices
    setPrevSentenceIndex(Math.max(getLargestLesserValue(sentenceIndices, curWordSequenceIndex), 0));
    setNextSentenceIndex(Math.min(getSmallestLargerValue(sentenceIndices, curWordSequenceIndex), textContent.length - 1));

    //Generate the new list of word sequence indices
    setWordSequenceIndices([]);
    const document = nlp(textContent);
    const words = document.terms().out('array');
    const newWordSequenceIndices: number[] = [];
    let curTextContentIndex = 0;

    //Need to calculate relative to current word sequence index!!!!! (FIX)
    for (let i = 0; i < words.length; i += settings.panels.wordSequenceLength) {
      const startingWord = words[i];
      console.log("--------------------------------------")
      console.log("Finding index to word: ", startingWord);
      console.log("here's what we currently see: " + textContent.slice(curTextContentIndex));
      console.log("Index of the first word of sequence in text: " + textContent.indexOf(startingWord, curTextContentIndex) + "; repositioning in the text: " + textContent.slice(textContent.indexOf(startingWord, curTextContentIndex)));
      console.log("identified word sequence: " + words.slice(i, i + settings.panels.wordSequenceLength));
      console.log("first word of the NEXT sequence: " + words[i + settings.panels.wordSequenceLength]);
      const wordSequenceStartIndex = textContent.indexOf(startingWord, curTextContentIndex);
      console.log("Here's the identified starting index of the word sequence in the text: " + wordSequenceStartIndex);
      console.log("New text structure with word sequence as starting sentence: " + textContent.slice(wordSequenceStartIndex));
      newWordSequenceIndices.push(wordSequenceStartIndex);
      console.log("Length of the current word sequence to be added: " + words.slice(i, i + settings.panels.wordSequenceLength).join('').length);
      curTextContentIndex = wordSequenceStartIndex + words.slice(i, i + settings.panels.wordSequenceLength).join('').length;
      console.log("We add " + words.slice(i, i + settings.panels.wordSequenceLength).join('').length + " to get to: " + textContent.slice(curTextContentIndex))
      console.log("Set the cur text content index to start at: " + textContent.slice(curTextContentIndex));
    }

    setWordSequenceIndices(newWordSequenceIndices);

    //Find the CLOSEST matching index entry!!!

    //Set relative word sequence indices
    setPrevWordSequenceIndex(Math.max(getLargestLesserValue(newWordSequenceIndices, curWordSequenceIndex), newWordSequenceIndices[0]));
    const nextWordSeqIdx = Math.min(getSmallestLargerValue(newWordSequenceIndices, curWordSequenceIndex), textContent.length - 1);
    setNextWordSequenceIndex(nextWordSeqIdx);

    //Set the new word sequence
    console.log(wordSequenceIndices)
    console.log(curWordSequenceIndex, nextWordSeqIdx)
    console.log(textContent.slice(curWordSequenceIndex, nextWordSeqIdx))
    setCurWordSequence(textContent.slice(curWordSequenceIndex, nextWordSeqIdx));
  };

  const navigateForward = () => {
    console.log(nextWordSequenceIndexRef.current);
    setCurWordSequenceIndex(nextWordSequenceIndexRef.current);
  };

  const navigateBackward = () => {
    setCurWordSequenceIndex(prevWordSequenceIndexRef.current);
  };

  const navigateToPrevParagraph = () => {
    setCurWordSequenceIndex(prevParagraphIndexRef.current);
  };

  const navigateToNextParagraph = () => {
    setCurWordSequenceIndex(nextParagraphIndexRef.current);
  };

  const navigateToPrevSentence = () => {
    setCurWordSequenceIndex(prevSentenceIndexRef.current);
  };

  const navigateToNextSentence = () => {
    setCurWordSequenceIndex(nextSentenceIndexRef.current);
  };

  const generateHighlightedText = () => {
    
  };

  const { togglePlayPause } = usePlaybackControl(navigateForward, speed);

  //If our overall text content has changed, initialize all index buffers AND update the relative indices
  useEffect(() => {
    calculateIndicesOnLoad();
  }, [textContent]);

  //Runs only initially after text content loaded in to generate index values
  //We need to do this because we can't move to the next word sequence and trigger the next effect without having the initial index values already populated.
  useEffect(() => {
    calculateIndicesOnUpdate();
  }, [paragraphIndices]);

  //Call update if word sequence index has changed
  useEffect(() => {
    //Update indices
    calculateIndicesOnUpdate();
  }, [curWordSequenceIndex]);

  return {
    navigateToPrevParagraph,
    navigateToNextParagraph,
    navigateToPrevSentence,
    navigateToNextSentence,
    navigateForward,
    navigateBackward,
    togglePlayPause,
    generateHighlightedText,
  };
};
