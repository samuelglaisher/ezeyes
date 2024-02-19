import { useContext, useEffect, useRef, useState } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';
import nlp from 'compromise';

export const usePanel = () => {
  const [sentenceIndices, setSentenceIndices] = useState<number[]>([]);
  const [paragraphIndices, setParagraphIndices] = useState<number[]>([]);
  const [wordSequenceIndices, setWordSequenceIndices] = useState<number[]>([]);

  const paragraphIndicesRef: React.MutableRefObject<number[]>  = useRef(paragraphIndices);
  const sentenceIndicesRef: React.MutableRefObject<number[]> = useRef(sentenceIndices);
  const wordSequenceIndicesRef: React.MutableRefObject<number[]>  = useRef(wordSequenceIndices);

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
    paragraphIndicesRef.current = paragraphIndices;
    sentenceIndicesRef.current = sentenceIndices;
    wordSequenceIndicesRef.current = wordSequenceIndices;
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
    paragraphIndices,
    wordSequenceIndices,
  ]);

  const { settings } = useContext(SettingsContext);

  const speed = 1000 / (settings.panels.wpm.curWpm / 60);

  /**
   * Generates a list of word sequences relative to the current index into the text content.
   * @param text - Input text
   * @param index - Starting index aligned on a word boundary and relative to the text content.
   */
  const generateWordSequenceIndicesFromIndex = (text: string, index: number, wordSeqLen: number) => {
    const wordSequenceIndices: number[] = [];
    let marker = index;

    let backtext = text.slice(0, index);
    let document = nlp(backtext);
    let backwords = document.terms().out('array');

    const fronttext = text.slice(index, text.length)
    document = nlp(fronttext)
    const frontwords = document.terms().out('array');

    //Backwards search
    for (let i = backwords.length - 1; i >= 0; i -= wordSeqLen) {
      //Grab the sequence in reversed order (last word comes first)
      //This is used to find word sequences from the current index to the beggining of the text
      const sequenceStartIndex = (i - wordSeqLen + 1) >= 0 ? i - wordSeqLen + 1 : 0;
  
      const wordSequence = backwords.slice(sequenceStartIndex, i + 1).reverse();

      //Get the index of the last word in the current sequence
      let seqEndingWordIndex = backtext.lastIndexOf(wordSequence[0], marker);

      if (seqEndingWordIndex !== -1) {
        //Set global text marker to the last word in the current sequence
        marker = seqEndingWordIndex;

        //For the rest of the words in the sequence, move marker past them
        for (let j = 1; j < wordSequence.length; j++) {
          const nextWordIndex = backtext.lastIndexOf(wordSequence[j], marker);
          if (nextWordIndex !== -1) {
            marker = nextWordIndex;
            seqEndingWordIndex = marker;
          }
        }

        wordSequenceIndices.unshift(seqEndingWordIndex)
      }
    }

    //Frontwards search
    marker = index;
    for (let i = 0; i < frontwords.length; i += wordSeqLen) {
      const sequence = frontwords.slice(i, i + wordSeqLen);
      let seqStartingWordIndex = text.indexOf(sequence[0], marker);

      if (seqStartingWordIndex !== -1) {
        marker = seqStartingWordIndex + sequence[0].length;

        for (let j = 1; j < sequence.length; j++) {
          const nextWordIndex = text.indexOf(sequence[j], marker);

          if (nextWordIndex !== -1) {
            marker = nextWordIndex + sequence[j].length;
          }
        }
        
        if (seqStartingWordIndex >= index)
          wordSequenceIndices.push(seqStartingWordIndex);
      }
    }

    return wordSequenceIndices;
  };

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
      const trimmedParagraph = paragraph.trimStart();
      const index = textContent.indexOf(trimmedParagraph, curIndex);
      if (index !== -1) {
        newParagraphIndices.push(index);
        curIndex = index + paragraph.length;
      }
    });

    newWordSequenceIndices = generateWordSequenceIndicesFromIndex(textContentRef.current, 0, settings.panels.wordSequenceLength);

    setSentenceIndices(newSentenceIndices);
    setParagraphIndices(newParagraphIndices);
    setWordSequenceIndices(newWordSequenceIndices);

    //In case we have leading spaces or tabs, set to the start of the first word sequence index!
    setCurWordSequenceIndex(newWordSequenceIndices[0]);
  };

  function getLargestLesserValue(elems: number[], target: number) {
    elems = elems.sort((a,b) => a - b);
    for (let i = 0; i < elems.length; i++) {
      if (elems[i] === target) {
        return elems[i-1];
      }
    }

    return undefined;
  }

  function getSmallestLargerValue(elems: number[], target: number) {
    elems = elems.sort((a,b) => a - b);
    for (let i = 0; i < elems.length; i++) {
      if (elems[i] === target) {
        return elems[i+1];
      }
    }

    return undefined;
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
    //Set relative paragraph indices
    setPrevParagraphIndex(Math.max(getLargestLesserValue(paragraphIndices, curWordSequenceIndex), 0));
    setNextParagraphIndex(Math.min(getSmallestLargerValue(paragraphIndices, curWordSequenceIndex), textContent.length - 1));

    //Set relative sentence indices
    setPrevSentenceIndex(Math.max(getLargestLesserValue(sentenceIndices, curWordSequenceIndex), 0));
    setNextSentenceIndex(Math.min(getSmallestLargerValue(sentenceIndices, curWordSequenceIndex), textContent.length - 1));

    //Generate the new list of word sequence indices
    setWordSequenceIndices([]);
    const document = nlp(textContent);
    let newWordSequenceIndices: number[] = [];

    newWordSequenceIndices = generateWordSequenceIndicesFromIndex(textContentRef.current, curWordSequenceIndexRef.current, settings.panels.wordSequenceLength);
    setWordSequenceIndices(newWordSequenceIndices);

    //Set relative word sequence indices
    setPrevWordSequenceIndex(Math.max(getLargestLesserValue(newWordSequenceIndices, curWordSequenceIndex), newWordSequenceIndices[0]));
    const nextWordSeqIdx = Math.min(getSmallestLargerValue(newWordSequenceIndices, curWordSequenceIndex), textContent.length);
    setNextWordSequenceIndex(nextWordSeqIdx);

    //Set the new word sequence
    setCurWordSequence(textContent.slice(curWordSequenceIndex, nextWordSeqIdx));
  };

  const navigateForward = () => {
    if (curWordSequenceIndexRef.current < wordSequenceIndicesRef.current[wordSequenceIndicesRef.current.length - 1])
      setCurWordSequenceIndex(nextWordSequenceIndexRef.current);
  };

  const navigateBackward = () => {
    if (curWordSequenceIndexRef.current > wordSequenceIndicesRef.current[0])
      setCurWordSequenceIndex(prevWordSequenceIndexRef.current);
  };

  const navigateToPrevParagraph = () => {
    if (curWordSequenceIndexRef.current > paragraphIndicesRef.current[0])
      setCurWordSequenceIndex(prevParagraphIndexRef.current);
  };

  const navigateToNextParagraph = () => {
    if (curWordSequenceIndexRef.current < paragraphIndicesRef.current[paragraphIndicesRef.current.length - 1])
      setCurWordSequenceIndex(nextParagraphIndexRef.current);
  };

  const navigateToPrevSentence = () => {
    if (curWordSequenceIndexRef.current > sentenceIndicesRef.current[0])
      setCurWordSequenceIndex(prevSentenceIndexRef.current);
  };

  const navigateToNextSentence = () => {
  if (curWordSequenceIndexRef.current < sentenceIndicesRef.current[sentenceIndicesRef.current.length - 1])
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
    getLargestLesserValue,
    getSmallestLargerValue,
    generateWordSequenceIndicesFromIndex,
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
