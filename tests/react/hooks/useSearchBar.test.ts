import '@testing-library/jest-dom';
import { PanelContextType } from '../../../src/react/contexts/PanelContext';
import React from 'react';
import { SearchBarContext, SearchBarContextType } from '../../../src/react/contexts/SearchBarContext';
import { useSearchBar } from '../../../src/react/hooks/useSearchBar';
import { renderHook } from '@testing-library/react';
import * as ipc from '../../../src/electron/ipc';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';

beforeEach(() => {
	jest.clearAllMocks();
	jest.resetAllMocks();
  document.body.innerHTML = `
    <Flex id='find' gap="size-100" position={'absolute'} zIndex={1000} UNSAFE_style={{display: "none"}}>
        <TextField id='search-bar' aria-label='search' onChange={(e) => {setTerm(e)}}/>
        <ButtonGroup>
            <Button id="search-button" type="button" variant="secondary" onPress={searchWordUpdate}>Find</Button>
            <Button id="search-down" type="button" variant="secondary" onPress={navUp}><ChevronDownIcon/></Button>
            <Button id="search-close" type="button" variant="secondary" onPress={closeSearch}><CloseIcon/></Button>
        </ButtonGroup>
    </Flex>
  `;
});

console.error = jest.fn();

const mockSearchBarContext: SearchBarContextType = {
  searchWord: "",
  setSearchWord: jest.fn(),
  term: "",
  setTerm: jest.fn(), 
}

const mockPanelContext: PanelContextType = {
	curWordSequence: '',
	setCurWordSequence: jest.fn(),
	textContent: '',
	setTextContent: jest.fn(),
	isPlaying: false,
	setIsPlaying: jest.fn(),
	prevParagraphIndex: 0,
	setPrevParagraphIndex: jest.fn(),
	nextParagraphIndex: 0,
	setNextParagraphIndex: jest.fn(),
	prevSentenceIndex: 0,
	setPrevSentenceIndex: jest.fn(),
	nextSentenceIndex: 0,
	setNextSentenceIndex: jest.fn(),
	prevWordSequenceIndex: 0,
	setPrevWordSequenceIndex: jest.fn(),
	curWordSequenceIndex: 0,
	setCurWordSequenceIndex: jest.fn(),
	nextWordSequenceIndex: 0,
	setNextWordSequenceIndex: jest.fn(),
	formattedTextContent: React.createElement(''),
	setFormattedTextContent: jest.fn(),
	sentenceIndices: [],
	setSentenceIndices: jest.fn(),
	paragraphIndices: [],
	setParagraphIndices: jest.fn(),
	wordSequenceIndices: [],
	setWordSequenceIndices: jest.fn(),
	wordIndices: [],
	setWordIndices: jest.fn(),
	generateWordSequenceIndicesFromIndex: jest.fn(),
};

describe('search bar ui functions', () => {
	test('open search function', async () => {
    const {result} = renderHook(() => useSearchBar());
    result.current.searchFunction();
    const bar = document.getElementById('find');
    expect(bar?.style.display).toBe("block");
  });

  test('close search function', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockClose = jest.fn();
		jest.spyOn(ipc, 'closeSearchBar').mockImplementation(mockClose);
    result.current.searchFunction();
    const bar = document.getElementById('find');
    result.current.searchFunction();
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(bar?.style.display).toBe("none");
  });  
});

describe('search feature functions', () => {
	test('search term', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockFind = jest.fn();
		jest.spyOn(ipc, 'findPhrase').mockImplementation(mockFind);
    result.current.searchFeature("word");
    ipc.findPhrase("word", "search");
    expect(mockFind).toHaveBeenCalledTimes(1);
  });

  test('search term empty', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockFind = jest.fn();
		jest.spyOn(ipc, 'findPhrase').mockImplementation(mockFind);
    result.current.searchFeature("");
    expect(mockFind).toHaveBeenCalledTimes(0);
  });

  test('navigate to next search function', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockFind = jest.fn();
		jest.spyOn(ipc, 'findPhrase').mockImplementation(mockFind);
    result.current.navUp();
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith("", "next");
  });  

  test('navigate to next search function multiple times', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockFind = jest.fn();
		jest.spyOn(ipc, 'findPhrase').mockImplementation(mockFind);
    for(var i = 0; i < 5; i++){  
      result.current.navUp();
    }
    expect(mockFind).toHaveBeenCalledTimes(5);
  });

  test('search function with whitespace', async () => {
    const {result} = renderHook(() => useSearchBar());
    const mockFind = jest.fn();
		jest.spyOn(ipc, 'findPhrase').mockImplementation(mockFind);
    result.current.searchFeature("word and space    ");
    ipc.findPhrase("word and space    ", "search");
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith("word and space    ", "search");
  });
});

describe('search for phrase locations', () => {
	test('search phrase in text', async () => {
    const {result} = renderHook(() => useSearchBar());
    const val = result.current.searchFor("this is a sentence.", "this", 1);
    expect(val).toEqual([1]);
  });

  test('search phrase not in text', async () => {
    const {result} = renderHook(() => useSearchBar());
    const val = result.current.searchFor("this is a sentence.", "random", 1);
    expect(val).toEqual([]);
  });
});
