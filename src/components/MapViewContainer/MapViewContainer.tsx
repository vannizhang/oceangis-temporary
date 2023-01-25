import React, { useEffect, useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { AppContext } from '../../contexts/AppContextProvider';

import { SEARCH_WIDGET_CONTAINER_ID, SIDEBAR_WIDTH } from '../../constants/UI';

import { activeWebmapSelector, setActiveItem } from '../../store/reducers/Map';

import { MapView, SearchWidget } from '../ArcGIS';

import { TopNav, LegendWidget, LayerView } from '../';
import { IItem } from '@esri/arcgis-rest-types';

import {
    getValueFromHashParams,
    updateMapLocationInHash,
    MapCenterLocation,
} from '../../utils/hash-params-manager/hashParamsManager';

import queryItemsByIds from '../../utils/arcgis-online-group-data/queryItemsByIds';
import LayersToggleWidget from '../LayersToggleWidget/LayersToggleWidget';

const itemIdFromHashParam = getValueFromHashParams('itemId') as string;

const mapCenterFromHashParam = getValueFromHashParams('@') as MapCenterLocation;

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const {
        arcGISOnlineGroupData,
        showMapOnly,
        arcgisOnlineGroupId,
    } = useContext(AppContext);

    const activeItem: IItem = useSelector(activeWebmapSelector);

    const loadActiveItem = async () => {
        if (!activeItem) {
            let item: IItem;

            if (itemIdFromHashParam) {
                const results = await queryItemsByIds({
                    itemIds: [itemIdFromHashParam],
                    // groupId: arcgisOnlineGroupId,
                });

                item = results[0];
            } else {
                const response = await arcGISOnlineGroupData.search({
                    start: 1,
                    num: 1,
                });

                item = response?.results[0];
            }

            dispatch(setActiveItem(item));
        }
    };

    useEffect(() => {
        loadActiveItem();
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: !showMapOnly ? SIDEBAR_WIDTH : 0,
                right: 0,
            }}
        >
            {activeItem ? (
                <MapView
                    itemId={activeItem.id}
                    zoom={mapCenterFromHashParam?.zoom}
                    center={
                        mapCenterFromHashParam
                            ? [
                                  mapCenterFromHashParam.lon,
                                  mapCenterFromHashParam.lat,
                              ]
                            : null
                    }
                    onStationary={(mapCenter) => {
                        // dispatch()
                        updateMapLocationInHash(mapCenter);
                    }}
                >
                    <SearchWidget containerId={SEARCH_WIDGET_CONTAINER_ID} />

                    <LegendWidget />

                    {/* <LayerView item={activeItem} /> */}

                    <LayersToggleWidget />
                </MapView>
            ) : null}

            <TopNav />
        </div>
    );
};

export default MapViewContainer;
