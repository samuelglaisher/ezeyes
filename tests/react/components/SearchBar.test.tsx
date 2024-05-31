import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import * as ipc from '../../../src/electron/ipc';
import { userEvent } from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { useSearchBar } from '../../../src/react/hooks/useSearchBar';
import { SearchBarContext, SearchBarContextType } from '../../../src/react/contexts/SearchBarContext';
import SearchBar from '../../../src/react/components/SearchBar';
import { Provider, darkTheme } from "@adobe/react-spectrum";

jest.mock('../../../src/react/hooks/useSearchBar');

beforeEach(() => {
	jest.clearAllMocks();
	jest.resetAllMocks();
	mockSearchBarContext.searchWord = "";
    mockSearchBarContext.term = "";
    (useSearchBar as jest.Mock).mockReturnValue({ searchFeature: mockSearchFeature, navUp: mockNavUp, closeSearch: mockClose });
});

const mockSearchBarContext: SearchBarContextType = {
    searchWord: "",
    setSearchWord: jest.fn(),
    term: "",
    setTerm: jest.fn(),
};

const mockSearchFeature = jest.fn();
const mockNavUp = jest.fn();
const mockClose = jest.fn();
const getById = queryByAttribute.bind(null, 'id');

describe('SearchBar component', () => {
    it('renders the search bar', () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBar /></Provider>);
        expect(getById(rendered.container, 'search-bar')).toBeInTheDocument();
    });

    it('renders search button', () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBar /></Provider>);
        expect(getById(rendered.container, 'search-button')).toBeInTheDocument();
    });

    it('renders traverse button button', () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBar /></Provider>);
        expect(getById(rendered.container, 'search-down')).toBeInTheDocument();
    });
    
    it('renders close button button', () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBar /></Provider>);
        expect(getById(rendered.container, 'search-close')).toBeInTheDocument();
    });
});

describe('component interactions', () => {
    it('search bar update', async () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBarContext.Provider value={mockSearchBarContext}><SearchBar /></SearchBarContext.Provider></Provider>);
        const search = getById(rendered.container, 'search-bar');
        userEvent.type(search, "test term");
        jest.spyOn(mockSearchBarContext, "setTerm");
        await new Promise<void>(res => setTimeout(() => {
            expect(mockSearchBarContext.setTerm).toHaveBeenCalled();
            res();
        }, 100));
    }, 10000);

    it('search button update', async () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBarContext.Provider value={mockSearchBarContext}><SearchBar /></SearchBarContext.Provider></Provider>);
        const search = getById(rendered.container, 'search-button');
        userEvent.click(search);
        await new Promise<void>(res => setTimeout(() => {
            expect(mockSearchFeature).toHaveBeenCalled();
            res();
        }, 100));
    }, 10000);

    it('down button update', async () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBarContext.Provider value={mockSearchBarContext}><SearchBar /></SearchBarContext.Provider></Provider>);
        const down = getById(rendered.container, 'search-down');
        userEvent.click(down);
        await new Promise<void>(res => setTimeout(() => {
            expect(mockNavUp).toHaveBeenCalled();
            res();
        }, 100));
    }, 10000);

    it('close button update', async () => {
        const rendered = render(<Provider theme={darkTheme}><SearchBarContext.Provider value={mockSearchBarContext}><SearchBar /></SearchBarContext.Provider></Provider>);
        const close = getById(rendered.container, 'search-close');
        userEvent.click(close);
        await new Promise<void>(res => setTimeout(() => {
            expect(mockClose).toHaveBeenCalled();
            res();
        }, 100));
    }, 10000);
});
