import { Hit as AlgoliaHit } from "instantsearch.js";
import { Highlight } from "react-instantsearch";

type HitProps = {
    hit: AlgoliaHit<{
        ticker: string;
        name: string;
        exchange: string;
    }>;
};

export function Hit({ hit }: HitProps) {
    return (
        <article className="grid grid-cols-3 w-full p-2 border-b focus:ring-2" tabIndex={0}>
            <Highlight hit={hit} attribute="name" highlightedTagName="b" />
            <Highlight hit={hit} attribute="ticker" highlightedTagName="b" />
            <span>{hit.exchange}</span>
        </article>
    );
}