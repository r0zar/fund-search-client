'use client';

import "./fund-search.css";
import React, { useCallback } from "react";
import { InstantSearch, InfiniteHits } from "react-instantsearch";
import { searchClient } from "@/lib/search";
import { Hit } from "@/components/search/Hit";
import { CustomSearchBox } from "@/components/search/CustomSearchBox";


export default function FundSearch() {

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

            <CustomSearchBox queryHook={queryHook} setModalOpen={setModalOpen} />
            {modalOpen && (
                <div id='search-results' className="rounded-lg shadow-modal mt-4 p-4 border bg-white  max-h-[80vh] overflow-y-scroll">
                    <thead className="grid grid-cols-3 table-header p-2 text-secondary">
                        <div>Name</div>
                        <div>Ticker</div>
                        <div>Exchange</div>
                    </thead>
                    <InfiniteHits showPrevious={false} hitComponent={Hit} className="w-full border-0 flex flex-col" />
                </div>
            )}
            <div className="fixed inset-0 -z-10" onClick={() => setModalOpen(false)}></div>
        </InstantSearch>
    );
}
