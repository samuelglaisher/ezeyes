import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';
import nlp from 'compromise';

export const usePanel = () => {
  const [indicesCalculated, setIndicesCalculated] = useState(false);
  const [prevParagraphIndex, setPrevParagraphIndex] = useState<number>(0);
  const [nextParagraphIndex, setNextParagraphIndex] = useState<number>(0);
  const [prevSentenceIndex, setPrevSentenceIndex] = useState<number>(0);
  const [nextSentenceIndex, setNextSentenceIndex] = useState<number>(0);
  const [prevWordSequenceIndex, setPrevWordSequenceIndex] = useState<number>(0);
  const [sentenceIndices, setSentenceIndices] = useState<number[]>([]);

  const {
    setCurWordSequence,
    textContent,
    curWordSequenceIndex,
    setCurWordSequenceIndex,
    nextWordSequenceIndex,
    setNextWordSequenceIndex,
    paragraphIndices,
    setParagraphIndices,
    wordSequenceIndices,
    setWordSequenceIndices,
    setWordIndices
  } = useContext(PanelContext);


  const currentTextContentRef = useRef('');
  const { settings } = useContext(SettingsContext);
  const speed = 1000 / (settings.panels.wpm.curWpm / 60);

  const getWordList = (words: string[], subtext: string) => {
    let wordList: string[] = [];
    let curIndex = 0;

    words.forEach((word: string) => {
      const index = subtext.indexOf(word, curIndex);
      if (index !== -1) {
        wordList.push(word);
        curIndex = index + word.length;
      }
    });

    return wordList;
  }

  /**
   * Generates a list of word sequences relative to the current index into the text content.
   * @param text - Input text
   * @param index - Starting index aligned on a word boundary and relative to the text content.
   */
  const generateWordSequenceIndicesFromIndex = useCallback((text: string, index: number, wordSeqLen: number) => {
    const wordSequenceIndices: number[] = [];
    let marker = index;

    let backtext = text.slice(0, index);
    const fronttext = text.slice(index, text.length)
    const words = nlp.tokenize(text).terms().out('array');
    const backwords = getWordList(words, backtext);
    const frontwords = getWordList(words, fronttext);

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
  }, [getWordList]);

  /**
   * Obtains the indices to every sentence, paragraph, and word sequence
   * when new text content is inserted into the application.
   */
  const calculateIndicesOnLoad = useCallback((textContent: string) => {
    const document = nlp(textContent);
    const sentences = document.sentences().out('array');
    const paragraphs = textContent.trim().split(/\n+/);
    const words = document.terms().out('array');

    let newSentenceIndices: number[] = [];
    let newParagraphIndices: number[] = [];
    let newWordSequenceIndices = [];
    let curIndex = 0;

    const wordIndices: number[] = [];
    words.forEach((word: string) => {
      const index = textContent.indexOf(word, curIndex);
      if (index !== -1) {
        wordIndices.push(index);
        curIndex = index + word.length;
      }
    });
    setWordIndices(wordIndices);

    curIndex = 0;
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

    console.time('generateWordSequenceIndicesFromIndex');
    newWordSequenceIndices = generateWordSequenceIndicesFromIndex(textContent, 0, settings.panels.wordSequenceLength);
    console.timeEnd('generateWordSequenceIndicesFromIndex');

    setSentenceIndices(newSentenceIndices);
    setParagraphIndices(newParagraphIndices);
    setWordSequenceIndices(newWordSequenceIndices);

    //In case we have leading spaces or tabs, set to the start of the first word sequence index!
    setCurWordSequenceIndex(newWordSequenceIndices[0]);

    setIndicesCalculated(true);
    currentTextContentRef.current = textContent;
  }, []);

  function getLargestLesserValue(elems: number[], target: number) {
    let max = -Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
      if (elems[i] < target && elems[i] > max) {
        max = elems[i];
      }
    }

    return max;
  }

  function getSmallestLargerValue(elems: number[], target: number) {
    let min = Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
      if (elems[i] > target && elems[i] < min) {
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
    //Set relative paragraph indices
    setPrevParagraphIndex(Math.max(getLargestLesserValue(paragraphIndices, curWordSequenceIndex), 0));
    setNextParagraphIndex(Math.min(getSmallestLargerValue(paragraphIndices, curWordSequenceIndex), textContent.length - 1));

    //Set relative sentence indices
    setPrevSentenceIndex(Math.max(getLargestLesserValue(sentenceIndices, curWordSequenceIndex), 0));
    setNextSentenceIndex(Math.min(getSmallestLargerValue(sentenceIndices, curWordSequenceIndex), textContent.length - 1));

    //Generate the new list of word sequence indices
    let newWordSequenceIndices: number[] = [];

    //If we custom navigated elsewhere
    const isCustomNavigation = curWordSequenceIndex !== prevWordSequenceIndex && curWordSequenceIndex !== nextWordSequenceIndex; 
 
    //Cache solution (drastically improves speeds by x100)
    if (!isCustomNavigation) {
      newWordSequenceIndices = wordSequenceIndices;
    } else {
      newWordSequenceIndices = generateWordSequenceIndicesFromIndex(textContent, curWordSequenceIndex, settings.panels.wordSequenceLength);
      setWordSequenceIndices(newWordSequenceIndices);
    }

    //Set relative word sequence indices
    setPrevWordSequenceIndex(Math.max(getLargestLesserValue(newWordSequenceIndices, curWordSequenceIndex), newWordSequenceIndices[0]));
    const nextWordSeqIdx = Math.min(getSmallestLargerValue(newWordSequenceIndices, curWordSequenceIndex), textContent.length);
    setNextWordSequenceIndex(nextWordSeqIdx);

    //Set the new word sequence
    setCurWordSequence(textContent.slice(curWordSequenceIndex, nextWordSeqIdx));
    currentTextContentRef.current = textContent;
  };

  const navigateForward = () => {
    if (curWordSequenceIndex < wordSequenceIndices[wordSequenceIndices.length - 1])
      setCurWordSequenceIndex(nextWordSequenceIndex);
  };

  const navigateBackward = () => {
    if (curWordSequenceIndex > wordSequenceIndices[0])
      setCurWordSequenceIndex(prevWordSequenceIndex);
  };

  const navigateToPrevParagraph = () => {
    if (curWordSequenceIndex > paragraphIndices[0])
      setCurWordSequenceIndex(prevParagraphIndex);
  };

  const navigateToNextParagraph = () => {
    if (curWordSequenceIndex < paragraphIndices[paragraphIndices.length - 1])
      setCurWordSequenceIndex(nextParagraphIndex);
  };

  const navigateToPrevSentence = () => {
    if (curWordSequenceIndex > sentenceIndices[0])
      setCurWordSequenceIndex(prevSentenceIndex);
  };

  const navigateToNextSentence = () => {
  if (curWordSequenceIndex < sentenceIndices[sentenceIndices.length - 1])
      setCurWordSequenceIndex(nextSentenceIndex);
  };

  const { togglePlayPause } = usePlaybackControl(navigateForward, speed);

  //If our overall text content has changed, initialize all index buffers AND update the relative indices
  useEffect(() => {
    console.log(textContent, currentTextContentRef.current)
    if (textContent != currentTextContentRef.current && indicesCalculated === false)
      calculateIndicesOnLoad(textContent);
  }, [textContent]);

  //Runs only initially after text content loaded in to generate index values
  //We need to do this because we can't move to the next word sequence and trigger the next effect without having the initial index values already populated.
  useEffect(() => {
    if (indicesCalculated) {
      console.time('calculateIndicesOnUpdate - init');
      calculateIndicesOnUpdate();
      console.timeEnd('calculateIndicesOnUpdate - init');
    }
  }, [indicesCalculated]);

  //Call update if word sequence index has changed
  useEffect(() => {
    //Update indices
    console.time('calculateIndicesOnUpdate');
    calculateIndicesOnUpdate();
    console.timeEnd('calculateIndicesOnUpdate');
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
  };
};
