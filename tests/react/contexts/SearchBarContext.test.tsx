import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { SearchBarProvider, SearchBarContext } from '../../../src/react/contexts/SearchBarContext';

const TestSearchBarContext = () => {
    const { searchWord, setSearchWord } = useContext(SearchBarContext);
    const { term, setTerm } = useContext(SearchBarContext);

    return (
        <>
            <div data-testid="searchTerm">{term}</div>
            <div data-testid="searchWord">{searchWord}</div>
            <button onClick={() => setTerm("test")}>Search Term</button>
            <button onClick={() => setSearchWord("update")}>Update Search</button>
        </>
    );
};

describe('FileManagerContext', () => {
    test('loading with default (no term/word)', () => {
        render(
            <SearchBarProvider>
                <TestSearchBarContext />
            </SearchBarProvider>
        );

        const currentTerm = screen.getByTestId('searchTerm').textContent as string;
        expect(currentTerm).toEqual("");
        const currentWord = screen.getByTestId('searchWord').textContent as string;
        expect(currentWord).toEqual("");
    });

    test('updates context value when setTerm is called', () => {
        render(
            <SearchBarProvider>
                <TestSearchBarContext />
            </SearchBarProvider>
        );

        const button = screen.getByRole('button', { name: /search term/i });
        act(() => {
            button.click();
        });

        const currentTerm = screen.getByTestId('searchTerm').textContent as string;
        expect(currentTerm).toEqual("test");
    });

    test('updates context value when setSearchWord is called', () => {
        render(
            <SearchBarProvider>
                <TestSearchBarContext />
            </SearchBarProvider>
        );

        const button = screen.getByRole('button', { name: /update search/i });
        act(() => {
            button.click();
        });

        const currentWord = screen.getByTestId('searchWord').textContent as string;
        expect(currentWord).toEqual("update");
    });
});
