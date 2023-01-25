import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { activeWebmapSelector, setActiveItem } from '../../store/reducers/Map';

import {
    searchResultsSelector,
    searchResultsResponseSelector,
} from '../../store/reducers/GroupContentSearchResults';

import CardList, { CardListData } from './CardList';

import { IItem } from '@esri/arcgis-rest-types';
// import { SearchResponse } from '../../utils/arcgis-online-group-data';

interface Props {
    title: string;
    // data: IItem[];
    // itemCount?: number;
}

const CardListContainer: React.FC<Props> = ({
    title = '',
    // data = [],
    // itemCount = 0
}) => {
    const dispatch = useDispatch();

    const activeWebmap: IItem = useSelector(activeWebmapSelector);

    const searchResults: IItem[] = useSelector(searchResultsSelector);

    const searchResponse = useSelector(searchResultsResponseSelector);

    // const itemCount:number = useSelector(searchResultsCountSelector)

    const cardListData = useMemo((): CardListData[] => {
        return searchResults.map((item) => {
            return {
                data: item,
                isActiveItemOnMap: activeWebmap && activeWebmap.id === item.id,
            };
        });
    }, [searchResults, activeWebmap]);

    return (
        <CardList
            items={cardListData}
            itemCount={searchResponse?.total || cardListData.length || 0}
            title={title}
            viewBtnOnClick={(item) => {
                dispatch(setActiveItem(item));
            }}
        />
    );
};

export default CardListContainer;
