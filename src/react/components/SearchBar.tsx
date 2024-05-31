import React, { ChangeEvent, useContext, useEffect, useMemo, useRef } from 'react';
import { TextField, ButtonGroup, Button, Flex } from '@adobe/react-spectrum';
import ChevronUpIcon from '@spectrum-icons/workflow/ChevronUp';
import ChevronDownIcon from '@spectrum-icons/workflow/ChevronDown';
import CloseIcon from '@spectrum-icons/workflow/Close';
import { useSearchBar } from '../hooks/useSearchBar';
import { SearchBarContext } from '../contexts/SearchBarContext';

function SearchBar() {
    const { searchFeature, navUp, closeSearch } = useSearchBar();
    const { term, setTerm } = useContext(SearchBarContext);

    const searchWordUpdate = () => {
        searchFeature(term);
    }

    return (
        <Flex id='find' gap="size-100" position={'absolute'} zIndex={1000} UNSAFE_style={{display: "none"}}>
            <TextField id='search-bar' aria-label='search' onChange={(e) => {setTerm(e)}}/>
            <ButtonGroup>
                <Button id="search-button" type="button" variant="secondary" onPress={searchWordUpdate}>Find</Button>
                <Button id="search-down" type="button" variant="secondary" onPress={navUp}><ChevronDownIcon/></Button>
                <Button id="search-close" type="button" variant="secondary" onPress={closeSearch}><CloseIcon/></Button>
            </ButtonGroup>
        </Flex>
    );
};

export default SearchBar;
