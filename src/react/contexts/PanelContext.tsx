import React, { createContext, useState, ReactNode } from 'react';

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
}

const defaultContextValue: PanelContextType = {
  curWordSequence: '',
  setCurWordSequence: () => {},
  textContent: `
    Brightly dressed in a red-and-white starry jacket, Melinda Tourangeau was waiting eagerly at Grill 603, a casual diner in small-town New Hampshire, for a US presidential candidate not named Donald Trump.

    Tourangeau, 57, who lives in Milford, was “reluctantly forced to vote for Trump” in 2016 and 2020, she said. “I had to leave my morals at the door.”

    But this time she is supporting Nikki Haley. “She has gone all over the state to meet people, and when she meets you, and when you meet her, you feel raised, you feel like you’re a better person after you’ve met her. And her platform is brilliant – clear, concise, cogent – and she intends to do everything she says. She’s the right candidate.”

    Whether this is a minority view, or indicative of tectonic plates shifting among Republicans in New Hampshire, will be put to the test in Tuesday’s first-in-the-nation primary election. It comes one week after Trump’s record victory over Ron DeSantis, the governor of Florida, and Haley, an ex-US ambassador to the UN, in the Iowa caucuses.

    For half the century, no candidate who won both Iowa and New Hampshire has failed to secure their party’s presidential nomination. Victory for Trump here would probably seal the deal and set up a rematch with Democrat Joe Biden in November.

    But if Iowa played to Trump’s strengths among evangelical Christians and rural conservatives, New Hampshire is a different proposition. Its voters pride themselves on an independent streak – the state motto is “Live free or die” – and are generally wealthier, more educated and less religious. Both states are about 90% white.

    Voters who are registered without a party affiliation make up about 40% of the electorate in New Hampshire and are eligible to cat a Republican primary ballot, which makes them more moderate than in Iowa. New voters can also register at the polls on Tuesday.

    For Trump, whose authoritarian language, criminal charges and brash populism play less well among college-educated voters, this represents something of an away game. Even in the Iowa suburbs last week, he won only a third of the votes.

    Haley has a more “Republican classic” image – less extreme on issues such as abortion, more hawkish on foreign policy – and has been barnstorming New Hampshire for months. Although her third place finish in Iowa blunted her momentum, and some opinion polls still show Trump well ahead in New Hampshire, others put Haley running neck and neck.  
  `,
  setTextContent: () => {},
  isPlaying: false,
  setIsPlaying: () => { },
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
  setFormattedTextContent: () => {}
};

export const PanelContext = createContext<PanelContextType>(defaultContextValue);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <PanelContext.Provider value={{
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
    }}>
      {children}
    </PanelContext.Provider>
  );
};

