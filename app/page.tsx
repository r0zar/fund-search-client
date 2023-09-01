'use client';

import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import React, { useCallback } from "react";
import {
    InstantSearch,
    Highlight,
    InfiniteHits,
    UseSearchBoxProps,
} from "react-instantsearch";
import "./page.css";
import { MdSearch, MdClose } from "react-icons/md";
import { useSearchBox } from 'react-instantsearch';

const searchClient = algoliasearch(
    "GLZSNNWVWG",
    "4738f41bcd261b41738d9605b99170c0"
);

type HitProps = {
    hit: AlgoliaHit<{
        ticker: string;
        name: string;
        exchange: string;
    }>;
};

function Hit({ hit }: HitProps) {
    return (
        <article className="grid grid-cols-3 w-full p-2 border-b focus:ring-2" tabIndex={0}>
            <Highlight hit={hit} attribute="name" highlightedTagName="b" />
            <Highlight hit={hit} attribute="ticker" highlightedTagName="b" />
            <span>{hit.exchange}</span>
        </article>
    );
}


function CustomSearchBox(props: UseSearchBoxProps | any) {
    const { query, refine } = useSearchBox(props);
    const [inputValue, setInputValue] = React.useState(query);
    const inputRef = React.useRef<HTMLInputElement>(null);

    function setQuery(newQuery: string) {
        setInputValue(newQuery);

        refine(newQuery);
    }

    return (
        <div>
            <form
                action=""
                role="search"
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (inputRef.current) {
                        inputRef.current.blur();
                    }
                }}
                onReset={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setQuery('');

                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
                className="flex justify-center"
            >
                <div className="flex bg-white w-min relative rounded-lg">

                    <MdSearch size={20} className="absolute left-2 top-2.5 submit-icon" />
                    <input
                        className="px-8 py-2 w-80 rounded-lg focus:outline-none bg-white"
                        ref={inputRef}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder="Search for securities"
                        spellCheck={false}
                        maxLength={512}
                        value={inputValue}
                        onChange={(event) => {
                            setQuery(event.currentTarget.value);
                        }}
                        autoFocus
                        onKeyDown={(e: any) => {  // This allows it to be "clickable" using Enter or Space
                            if (e.key === 'Escape') {
                                props.setModalOpen(false);
                            }
                        }}
                    />
                    <MdClose
                        className='absolute right-2 top-2.5 reset-icon focus:outline-none'
                        size={20}
                        tabIndex={0}
                        onClick={() => {
                            props.setModalOpen(false)
                            setQuery('')
                        }}
                        onKeyDown={(e: any) => {  // This allows it to be "clickable" using Enter or Space
                            if (e.key === 'Enter' || e.key === ' ') {
                                props.setModalOpen(false);
                                setQuery('');
                            }
                        }}
                    />
                </div>
            </form>
        </div>
    );
}


export default function App() {

    const [modalOpen, setModalOpen] = React.useState(false)

    const queryHook = useCallback((query: any, search: (arg: any) => void) => {
        if (query.length >= 2) {
            search(query);
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, []);

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="funds"
            routing={true}
            insights={true}
        >

            <CustomSearchBox
                queryHook={queryHook}
                setModalOpen={setModalOpen}
            />
            {modalOpen && (
                <div className="rounded-lg shadow-modal mt-4 p-4 border bg-white  max-h-[80vh] overflow-y-scroll">
                    <thead className="grid grid-cols-3 table-header p-2 text-secondary">
                        <div className="">Name</div><div>Ticker</div><div>Exchange</div>
                    </thead>
                    <InfiniteHits showPrevious={false} hitComponent={Hit} className="w-full border-0" />
                </div>
            )}
            <div className="fixed inset-0 -z-10" onClick={() => setModalOpen(false)}></div>
        </InstantSearch>
    );
}
