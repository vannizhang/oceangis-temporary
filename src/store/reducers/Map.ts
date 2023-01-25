import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import {
    RootState,
    StoreDispatch,
    // StoreGetState
} from '../configureStore';

import { IItem } from '@esri/arcgis-rest-types';

import { updateItemIdInHash } from '../../utils/hash-params-manager/hashParamsManager';

type MapState = {
    activeWebmap: IItem;
    // mapCenter: string;
};

export const initialMapState = {
    activeWebmap: null,
} as MapState;

const slice = createSlice({
    name: 'map',
    initialState: initialMapState,
    reducers: {
        activeItemChanged: (state, action: PayloadAction<IItem>) => {
            state.activeWebmap = action.payload;
        },
    },
});

const { reducer } = slice;

const { activeItemChanged } = slice.actions;

export const setActiveItem = (item: IItem) => (
    dispatch: StoreDispatch
    // getState:StoreGetState
) => {
    updateItemIdInHash(item.id);
    dispatch(activeItemChanged(item));
};

// selector
export const activeWebmapSelector = createSelector(
    (state: RootState) => state.Map.activeWebmap,
    (activeWebmap) => activeWebmap
);

export default reducer;
