import {
    createSlice,
    createSelector,
    // PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import {
    RootState,
    // StoreDispatch,
    // StoreGetState
} from '../configureStore';

export type UIState = {
    // isSidebarVisible: boolean;
    isCategoryFilterVisible: boolean;
};

export const initialUIState = {
    // isSidebarVisible: true,
    isCategoryFilterVisible: true,
} as UIState;

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        // isSidebarVisibleToggled: (state) => {
        //     state.isSidebarVisible = !state.isSidebarVisible;
        // },
        isCategoryFilterVisibleToggled: (state) => {
            state.isCategoryFilterVisible = !state.isCategoryFilterVisible;
        },
    },
});

const { reducer } = slice;

export const {
    // isSidebarVisibleToggled,
    isCategoryFilterVisibleToggled,
} = slice.actions;

// export const isSidebarVisibleSelector = createSelector(
//     (state: RootState) => state.UI.isSidebarVisible,
//     (isSidebarVisible) => isSidebarVisible
// );

export const isCategoryFilterVisibleSelector = createSelector(
    (state: RootState) => state.UI.isCategoryFilterVisible,
    (isCategoryFilterVisible) => isCategoryFilterVisible
);

export default reducer;
