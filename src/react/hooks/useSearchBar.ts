import { useEffect, useContext, useRef, Key } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { SearchBarContext } from '../contexts/SearchBarContext';
import { findPhrase, closeSearchBar } from '../../electron/ipc';

export const useSearchBar = () => {
    const { searchWord, setSearchWord } = useContext(SearchBarContext);
    const { textContent } = useContext(PanelContext);

    const searchFeature = (word: string) => {
        setSearchWord(word);
    };

    const searchFunction = () => {
        const element = document.getElementById('find');
        if (element.style.display === "block") {
            closeSearch();
        } else {
            startSearch();
        };
    };

    const startSearch = () => {
        const element = document.getElementById('find');
        element.style.display = "block";
    };

    const closeSearch = () => {
        closeSearchBar();
        const element = document.getElementById('find');
        element.style.display = "none";
    };

    const searchFor = (content: string, phrase: string, add: number): number[] => {
        const location = content.indexOf(phrase);
        if (location === -1) {
            return [];
        }
        // console.log(content.substring(location+phrase.length));
        // console.log(add, location, phrase.length);
        return [location+add, ...searchFor(content.substring(location+phrase.length), phrase, add+location+phrase.length)];
    }

    const navUp = () => {
        findPhrase(searchWord, "next");
    }

    useEffect(() => {
        console.log(searchWord);
        if (searchWord !== "") {
            // const locations = searchFor(textContent, searchWord, 0);
            findPhrase(searchWord, "search");
        }
    }, [searchWord]);

    return { searchFeature, navUp, closeSearch, searchFunction };
};