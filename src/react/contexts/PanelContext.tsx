import React, { createContext, useState, ReactNode, useCallback, useEffect, useRef, useContext } from 'react';
import nlp from 'compromise';
import { SettingsContext } from './SettingsContext';

export interface PanelContextType {
  curWordSequence: string;
  setCurWordSequence: React.Dispatch<React.SetStateAction<string>>;
  textContent: string;
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  prevParagraphIndex: number;
  setPrevParagraphIndex: React.Dispatch<React.SetStateAction<number>>;
  nextParagraphIndex: number;
  setNextParagraphIndex: React.Dispatch<React.SetStateAction<number>>;
  prevSentenceIndex: number;
  setPrevSentenceIndex: React.Dispatch<React.SetStateAction<number>>;
  nextSentenceIndex: number;
  setNextSentenceIndex: React.Dispatch<React.SetStateAction<number>>;
  prevWordSequenceIndex: number;
  setPrevWordSequenceIndex: React.Dispatch<React.SetStateAction<number>>;
  curWordSequenceIndex: number;
  setCurWordSequenceIndex: React.Dispatch<React.SetStateAction<number>>;
  nextWordSequenceIndex: number;
  setNextWordSequenceIndex: React.Dispatch<React.SetStateAction<number>>;
  formattedTextContent: React.JSX.Element;
  setFormattedTextContent: React.Dispatch<React.SetStateAction<React.JSX.Element>>;
  sentenceIndices: number[];
  setSentenceIndices: React.Dispatch<React.SetStateAction<number[]>>;
  paragraphIndices: number[];
  setParagraphIndices: React.Dispatch<React.SetStateAction<number[]>>;
  wordSequenceIndices: number[];
  setWordSequenceIndices: React.Dispatch<React.SetStateAction<number[]>>;
  wordIndices: number[];
  setWordIndices: React.Dispatch<React.SetStateAction<number[]>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: PanelContextType = {
  curWordSequence: '',
  setCurWordSequence: () => {},
  textContent: `
  HUNTSVILLE, AL—Bereft of the sort of close companions who would intervene before he took such a drastic step, local man Bill Delaney had no one in his life to stop him from posting a lengthy video condemning the new film Ghostbusters: Frozen Empire, sources confirmed Friday. 
  According to insiders with knowledge of the situation, the 43-year-old’s life was completely devoid of loved ones who cared enough about him to step in before he hit record on a self-filmed YouTube rant arguing the many ways the new Ghostbusters allegedly betrayed his childhood. 
  Delaney reportedly encountered no resistance from a friend or parent at any point as he uploaded the 53-minute screed, leaving the unemployed man no reason to question whether or not it was a worthy focus of time and energy for himself or others. Sources also noted a demonstrable indifference from Delaney’s roommate, who simply shook his head and silently walked past after hearing the man vehemently insist from behind a closed door that “this isn’t the Slimer I grew up with.” 
  At press time, the man who had spoken off the cuff for nearly an hour on his deep-seated animosity toward a children’s movie was heard expressing annoyance that the video had only accumulated a few dozen views in its first hour online.`,
  setTextContent: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  prevParagraphIndex: 0,
  setPrevParagraphIndex: () => {},
  nextParagraphIndex: 0,
  setNextParagraphIndex: () => {},
  prevSentenceIndex: 0,
  setPrevSentenceIndex: () => {},
  nextSentenceIndex: 0,
  setNextSentenceIndex: () => {},
  prevWordSequenceIndex: 0,
  setPrevWordSequenceIndex: () => {},
  curWordSequenceIndex: 0,
  setCurWordSequenceIndex: () => {},
  nextWordSequenceIndex: 0,
  setNextWordSequenceIndex: () => {},
  formattedTextContent: <></>,
  setFormattedTextContent: () => {},
  sentenceIndices: [],
  setSentenceIndices: () => {},
  paragraphIndices: [],
  setParagraphIndices: () => {},
  wordSequenceIndices: [],
  setWordSequenceIndices: () => {},
  wordIndices: [],
  setWordIndices: () => {},
  speed: 10,
  setSpeed: () => {}
};

export const PanelContext = createContext<PanelContextType>(defaultContextValue);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [indicesCalculated, setIndicesCalculated] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [hasLoaded, setHasLoaded] = useState<number>(0);

  const { settings } = useContext(SettingsContext);

  const [curWordSequence, setCurWordSequence] = useState<string>(defaultContextValue.curWordSequence);
  const [textContent, setTextContent] = useState<string>(defaultContextValue.textContent);
  const [isPlaying, setIsPlaying] = useState<boolean>(defaultContextValue.isPlaying);
  const [prevParagraphIndex, setPrevParagraphIndex] = useState<number>(defaultContextValue.prevParagraphIndex);
  const [nextParagraphIndex, setNextParagraphIndex] = useState<number>(defaultContextValue.nextParagraphIndex);
  const [prevSentenceIndex, setPrevSentenceIndex] = useState<number>(defaultContextValue.prevSentenceIndex);
  const [nextSentenceIndex, setNextSentenceIndex] = useState<number>(defaultContextValue.nextSentenceIndex);
  const [prevWordSequenceIndex, setPrevWordSequenceIndex] = useState<number>(defaultContextValue.prevWordSequenceIndex);
  const [curWordSequenceIndex, setCurWordSequenceIndex] = useState<number>(defaultContextValue.curWordSequenceIndex);
  const [nextWordSequenceIndex, setNextWordSequenceIndex] = useState<number>(defaultContextValue.nextWordSequenceIndex);
  const [formattedTextContent, setFormattedTextContent] = useState<React.JSX.Element>(defaultContextValue.formattedTextContent);
  const [sentenceIndices, setSentenceIndices] = useState<number[]>(defaultContextValue.sentenceIndices);
  const [paragraphIndices, setParagraphIndices] = useState<number[]>(defaultContextValue.paragraphIndices);
  const [wordSequenceIndices, setWordSequenceIndices] = useState<number[]>(defaultContextValue.wordSequenceIndices);
  const [wordIndices, setWordIndices] = useState<number[]>(defaultContextValue.wordIndices);
  const [speed, setSpeed] = useState<number>(1000 / (settings.processing.wpm[settings.processing.wpm.type].current / 60));
  const [lastWordSequenceLength, setLastWordSequenceLength] = useState(settings.processing.wordSequenceLength);

  const currentTextContentRef = useRef('');
  const lastWordSequenceLengthRef = useRef(settings.processing.wordSequenceLength);

    /**
   * Generates a list of word sequences relative to the current index into the text content.
   * @param text - Input text
   * @param index - Starting index aligned on a word boundary and relative to the text content.
   */
    const generateWordSequenceIndicesFromIndex = (words: string[], text: string, index: number, wordSeqLen: number) => {
      const wordSequenceIndices: number[] = [];
      let marker = index;
      let backtext = text.slice(0, index);
      const fronttext = text.slice(index, text.length)
      let backwords = nlp.tokenize(backtext).terms().out('array');
      const frontwords = nlp.tokenize(fronttext).terms().out('array');
  
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

    const shouldRecalculate = curWordSequenceIndex !== prevWordSequenceIndex && 
                              curWordSequenceIndex !== nextWordSequenceIndex ||
                              settings.processing.wordSequenceLength !== lastWordSequenceLengthRef.current;

    if (shouldRecalculate) {
      newWordSequenceIndices = generateWordSequenceIndicesFromIndex(
        words, textContent, curWordSequenceIndex, settings.processing.wordSequenceLength
      );
      setWordSequenceIndices(newWordSequenceIndices);
      lastWordSequenceLengthRef.current = settings.processing.wordSequenceLength;
    } else {
      // Log for debugging purposes; you may remove this in production.
      console.log('Using cached word sequence indices.');
      newWordSequenceIndices = wordSequenceIndices;
      setWordSequenceIndices([...newWordSequenceIndices]);
    }

    //Cache solution (drastically improves speeds by x100)
    // if (!isCustomNavigation && settings.processing.wordSequenceLength === lastWordSequenceLength) {
    //   console.log('cached')
    //   newWordSequenceIndices = wordSequenceIndices;
    //   setWordSequenceIndices([...newWordSequenceIndices]);
    // } else {
    //   console.log('uncached')
    //   newWordSequenceIndices = generateWordSequenceIndicesFromIndex(words, textContent, curWordSequenceIndex, settings.processing.wordSequenceLength);
    //   setWordSequenceIndices(newWordSequenceIndices);
    // }

    //Set relative word sequence indices
    setPrevWordSequenceIndex(Math.max(getLargestLesserValue(newWordSequenceIndices, curWordSequenceIndex), newWordSequenceIndices[0]));
    const nextWordSeqIdx = Math.min(getSmallestLargerValue(newWordSequenceIndices, curWordSequenceIndex), textContent.length);
    setNextWordSequenceIndex(nextWordSeqIdx);

    setCurWordSequence(textContent.slice(curWordSequenceIndex, nextWordSeqIdx));
    currentTextContentRef.current = textContent;
  };

    /**
     * Obtains the indices to every sentence, paragraph, and word sequence
     * when new text content is inserted into the application.
     */
    const calculateIndicesOnLoad = (textContent: string) => {
      const document = nlp(textContent);
      const sentences = document.sentences().out('array');
      const paragraphs = textContent.trim().split(/\n+/);
      const words = document.terms().out('offset');
  
      //Saves having to calculate this a second time
      setWords(words);
  
      let newSentenceIndices: number[] = [];
      let newParagraphIndices: number[] = [];
      let newWordSequenceIndices = [];
      let curIndex = 0;
  
      const wordIndices: number[] = [];
      words.forEach((word: {text: string, terms: Object[], offset: {index: number, length: number, start: number}}) => {
        const index = textContent.indexOf(word.text, curIndex);
        if (index !== -1) {
          wordIndices.push(index);
          curIndex = index + word.text.length;
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
  
      newWordSequenceIndices = generateWordSequenceIndicesFromIndex(words, textContent, 0, settings.processing.wordSequenceLength);
  
      setSentenceIndices(newSentenceIndices);
      setParagraphIndices(newParagraphIndices);
      setWordSequenceIndices(newWordSequenceIndices);
  
      //In case we have leading spaces or tabs, set to the start of the first word sequence index!
      setCurWordSequenceIndex(newWordSequenceIndices[0]);
  
      setIndicesCalculated(true);
      currentTextContentRef.current = textContent;
    };

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
  
  const getContextValue = useCallback(
    () => ({
      curWordSequence, setCurWordSequence, 
      textContent, setTextContent, 
      isPlaying, setIsPlaying, 
      prevParagraphIndex, setPrevParagraphIndex,
      nextParagraphIndex, setNextParagraphIndex, 
      prevSentenceIndex, setPrevSentenceIndex, 
      nextSentenceIndex, setNextSentenceIndex, 
      prevWordSequenceIndex, setPrevWordSequenceIndex, 
      curWordSequenceIndex, setCurWordSequenceIndex, 
      nextWordSequenceIndex, setNextWordSequenceIndex,
      formattedTextContent, setFormattedTextContent,
      sentenceIndices, setSentenceIndices,
      paragraphIndices, setParagraphIndices,
      wordSequenceIndices, setWordSequenceIndices,
      wordIndices, setWordIndices,
      speed, setSpeed,
    }),
    [
      curWordSequence, setCurWordSequence, 
      textContent, setTextContent, 
      isPlaying, setIsPlaying, 
      prevParagraphIndex, setPrevParagraphIndex,
      nextParagraphIndex, setNextParagraphIndex, 
      prevSentenceIndex, setPrevSentenceIndex, 
      nextSentenceIndex, setNextSentenceIndex, 
      prevWordSequenceIndex, setPrevWordSequenceIndex, 
      curWordSequenceIndex, setCurWordSequenceIndex, 
      nextWordSequenceIndex, setNextWordSequenceIndex,
      formattedTextContent, setFormattedTextContent,
      sentenceIndices, setSentenceIndices,
      paragraphIndices, setParagraphIndices,
      wordSequenceIndices, setWordSequenceIndices,
      wordIndices, setWordIndices,
      speed, setSpeed
    ],
  )

    //If our overall text content has changed, initialize all index buffers
    useEffect(() => {
      if (textContent !== currentTextContentRef.current) {
        calculateIndicesOnLoad(textContent);
        setHasLoaded(hasLoaded + 1);
      }
    }, [textContent]);

    //If we detect that new text content has been loaded, calculate the relative indices
    //This allows newly loaded text to successfully recalculate word indices
    useEffect(() => {
      calculateIndicesOnUpdate();
      currentTextContentRef.current = textContent;
    }, [hasLoaded]);
  
    //Runs only initially after text content loaded in to generate index values
    //We need to do this because we can't move to the next word sequence and trigger the next effect without having the initial index values already populated.
    useEffect(() => {
      //Update indices
      calculateIndicesOnUpdate();
    }, [curWordSequenceIndex, settings.processing.wordSequenceLength]);

  return (
    <PanelContext.Provider value={getContextValue()}>
      {children}
    </PanelContext.Provider>
  );
};