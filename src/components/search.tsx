import { Card, InputBase, List, ListItem, ListItemText, navigate } from ".";
import type { Dispatch, FC, SetStateAction } from "react";
import {
  Highlight,
  InstantSearch,
  PoweredBy,
  Snippet,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom";
import React, { createRef, useCallback, useState } from "react";
import type { Languages } from "../../config";
import type { SearchBoxProvided } from "react-instantsearch-core";
import { SearchOutlined } from "@material-ui/icons";
import algoliasearch from "algoliasearch/lite";
import { message } from "../i18n";
import { useClickOutside } from "../utils";

type HitsProps = {
  objectID: string;
  slug: string;
};

const Hits = connectHits<HitsProps>(({ hits }) => (
  <List>
    {hits.map((hit) => (
      <ListItem key={hit.objectID} button onClick={() => navigate(hit.slug)}>
        <ListItemText
          primary={
            <h4>
              <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
          }
          secondary={
            <div>
              <Snippet attribute="excerpt" hit={hit} tagName="mark" />
            </div>
          }
        />
      </ListItem>
    ))}
  </List>
));

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID as string,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY as string
);

interface TProps extends SearchBoxProvided {
  indexName: Languages;
  setFocus: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = connectSearchBox<TProps>(
  ({ refine, currentRefinement, indexName, setFocus }) => (
    <div className="flex items-center">
      <SearchOutlined />
      <InputBase
        className="transition-width duration-200"
        classes={{
          root: "w-16",
          focused: "w-24",
        }}
        placeholder={message[indexName]["search"]}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => {
          refine(event.target.value);
        }}
        onFocus={() => setFocus(true)}
        value={currentRefinement}
      />
    </div>
  )
);

export const Search: FC<{ indexName: string }> = ({ indexName }) => {
  const rootRef = createRef<HTMLDivElement>();
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState([] as any[] | undefined);

  useClickOutside(
    rootRef,
    useCallback(() => setFocus(false), [])
  );

  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox indexName={indexName as Languages} setFocus={setFocus} />
        {focus && query && query.length > 0 && (
          <Card className="absolute top-1 right-0 max-w-lg">
            <Hits />
            <PoweredBy className="flex justify-end text-lg font-medium" />
          </Card>
        )}
      </InstantSearch>
    </div>
  );
};
