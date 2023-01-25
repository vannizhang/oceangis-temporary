import React, { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
    isCategoryFilterVisibleSelector,
    isCategoryFilterVisibleToggled,
} from '../../store/reducers/UI';

import { loadItems } from '../../store/reducers/GroupContentSearchResults';

import SerachInput from './SearchInput';

import { AppContext } from '../../contexts/AppContextProvider';
import { MAX_QUERY_RESULTS } from '../../constants/ArcGIS';

const SearchInputContainer = () => {
    const dispatch = useDispatch();

    const { arcGISOnlineGroupData } = useContext(AppContext);

    const searchAutoCompleteOnChange = async (val: string) => {
        arcGISOnlineGroupData.updateSearchTerm(val);

        const results = await arcGISOnlineGroupData.search({
            start: 1,
            num: MAX_QUERY_RESULTS,
        });

        dispatch(loadItems(results));
    };

    const isCategoryFilterVisible = useSelector(
        isCategoryFilterVisibleSelector
    );

    return (
        <SerachInput
            isCategoryFilterVisible={isCategoryFilterVisible}
            toggleCategoryFilter={() => {
                dispatch(isCategoryFilterVisibleToggled());
            }}
            searchAutoCompleteOnChange={searchAutoCompleteOnChange}
        />
    );
};

export default SearchInputContainer;
