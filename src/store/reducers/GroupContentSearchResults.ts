import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

import { IItem } from '@esri/arcgis-rest-types';
import { SearchResponse } from '../../utils/arcgis-online-group-data';

type SearchResultsState = {
    itemsById: {
        [key: string]: IItem;
    };
    allIds: string[];
    response: Omit<SearchResponse, 'results'>;
};

export const initialSearchResultsState = {
    response: null,
    itemsById: {},
    allIds: [],
} as SearchResultsState;

const slice = createSlice({
    name: 'searchResults',
    initialState: initialSearchResultsState,
    reducers: {
        itemsLoaded: (state, action: PayloadAction<SearchResponse>) => {
            const {
                query,
                total,
                start,
                nextStart,
                num,
                results,
            } = action.payload;

            const allIds: string[] = [...state.allIds];

            const itemsById = {
                ...state.itemsById,
            };

            results.forEach((item) => {
                const { id } = item;
                itemsById[id] = item;
                allIds.push(id);
            });

            state.allIds = allIds;
            state.itemsById = itemsById;
            state.response = {
                query,
                total,
                start,
                nextStart,
                num,
            };
        },
        itemsReset: (state) => {
            state.allIds = [];
            state.itemsById = {};
            state.response = null;
        },
    },
});

const { reducer } = slice;

const { itemsLoaded, itemsReset } = slice.actions;

// load new list of items
export const loadItems = (response: SearchResponse) => (
    dispatch: StoreDispatch
    // getState:StoreGetState
): void => {
    batch(() => {
        dispatch(itemsReset());
        dispatch(itemsLoaded(response));
    });
};

// add more items to the existing list
export const loadMoreItems = (response: SearchResponse) => (
    dispatch: StoreDispatch
    // getState:StoreGetState
): void => {
    dispatch(itemsLoaded(response));
};

// selector
export const searchResultsSelector = createSelector(
    (state: RootState) => state.SearchResults.itemsById,
    (state: RootState) => state.SearchResults.allIds,
    (itemsById, allIds) => allIds.map((id) => itemsById[id])
);

export const searchResultsResponseSelector = createSelector(
    (state: RootState) => state.SearchResults.response,
    (response) => response
);

// export const searchResultsNextStartSelector = createSelector(
//     (state: RootState) => state.SearchResults.response,
//     (response) => response.nextStart
// );

export default reducer;
