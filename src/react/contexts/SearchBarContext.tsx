import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchBarContextType {
    searchWord: string;
    setSearchWord: React.Dispatch<React.SetStateAction<string>>;
    term: string;
    setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: SearchBarContextType = {
    searchWord: "",
    setSearchWord: () => {},
    term: "",
    setTerm: () => {}
};

export const SearchBarContext = createContext<SearchBarContextType>(defaultContextValue);

export const SearchBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchWord, setSearchWord] = useState<string>(defaultContextValue.searchWord);
    const [term, setTerm] = useState<string>(defaultContextValue.term);

    return (
        <SearchBarContext.Provider value={{ searchWord, setSearchWord, term, setTerm }}>
            {children}
        </SearchBarContext.Provider>
    );
};
