import React, { useCallback, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    loadItems,
    loadMoreItems,
    searchResultsResponseSelector,
} from '../../store/reducers/GroupContentSearchResults';

import { AppContext } from '../../contexts/AppContextProvider';

import Sidebar from './Sidebar';
import { MAX_QUERY_RESULTS } from '../../constants/ArcGIS';

type Props = {
    children: React.ReactNode;
};

const SidebarContainer: React.FC = ({ children }: Props) => {
    const dispatch = useDispatch();

    const { arcGISOnlineGroupData, showMapOnly } = useContext(AppContext);

    const searchResponse = useSelector(searchResultsResponseSelector);

    const searchNextSetOfGroupContents = async () => {
        const nextStart = searchResponse?.nextStart || 1;

        if (nextStart === -1) {
            console.log('no more items to load');
            return;
        }

        const results = await arcGISOnlineGroupData.search({
            start: nextStart,
            num: 30,
        });

        dispatch(loadMoreItems(results));
    };

    const searchGroupContents = useCallback(async () => {
        const results = await arcGISOnlineGroupData.search({
            start: 1,
            num: MAX_QUERY_RESULTS,
        });
        // console.log(response)
        dispatch(loadItems(results));
    }, []);

    useEffect(() => {
        searchGroupContents();
    }, []);

    return !showMapOnly ? (
        <Sidebar scrollToBottomHandler={searchNextSetOfGroupContents}>
            {children}
        </Sidebar>
    ) : null;
};

export default SidebarContainer;
