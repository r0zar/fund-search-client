'use client';

import React, { useState, useRef } from "react";
import { UseSearchBoxProps } from "react-instantsearch";
import { MdSearch, MdClose } from "react-icons/md";
import { useSearchBox } from 'react-instantsearch';
import "./search-box.css";




export function CustomSearchBox(props: UseSearchBoxProps | any) {
    const { query, refine } = useSearchBox(props);
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef<HTMLInputElement>(null);

    const setQuery = (newQuery: string) => {
        setInputValue(newQuery);
        refine(newQuery);
    }

    const handleReset = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setQuery('');
        inputRef.current?.focus();
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        inputRef.current?.blur();
    }

    return (
        <div>
            <form
                action=""
                role="search"
                noValidate
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="flex justify-center"
            >
                <div className="flex bg-white w-min relative rounded-lg">
                    <MdSearch size={20} className="absolute left-2 top-2.5 submit-icon" />
                    <input
                        id='search-input'
                        className="px-8 py-2 w-80 rounded-lg focus:outline-none bg-white"
                        ref={inputRef}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder="Search for securities"
                        spellCheck={false}
                        maxLength={512}
                        value={inputValue}
                        onChange={(event) => setQuery(event.currentTarget.value)}
                        autoFocus
                        onKeyDown={(e: any) => {
                            if (e.key === 'Escape') {
                                props.setModalOpen(false);
                            }
                        }}
                    />
                    {inputValue && <MdClose
                        id='search-reset'
                        className='absolute right-2 top-2.5 reset-icon focus:outline-none cursor-pointer'
                        size={20}
                        tabIndex={0}
                        onClick={() => {
                            props.setModalOpen(false)
                            setQuery('')
                        }}
                        onKeyDown={(e: any) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                props.setModalOpen(false);
                                setQuery('');
                            }
                        }}
                    />}
                </div>
            </form>
        </div>
    );
}