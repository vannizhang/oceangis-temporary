import React, { useState, createContext } from 'react';

import {
    getCategorySchema,
    CategorySchemaJSON,
    CategorySchemaDataItem,
} from '../utils/category-schema-manager';

import ArcGISOnlineGroupData from '../utils/arcgis-online-group-data';
import { AGOL_GROUP_ID, APP_ID } from '../constants/ArcGIS';
import { getValueFromHashParams } from '../utils/hash-params-manager/hashParamsManager';
import EsriOAuth from '../utils/Esri-OAuth';
import { setPortalData4MyFavItems } from '../utils/my-favorites/myFav';

type AppContextValue = {
    showMapOnly: boolean;
    arcgisOnlineGroupId: string;
    categorySchema: CategorySchemaDataItem;
    arcGISOnlineGroupData: ArcGISOnlineGroupData;
    esriOAuthUtils: EsriOAuth;
    // if app is hosted in an iframe
    inIframe: boolean;
};

type AppContextProviderProps = {
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

const isMapOnlyMode = getValueFromHashParams('mapOnly') as string;

const groupIdFromHashParam = getValueFromHashParams('groupId') as string;

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}: AppContextProviderProps) => {
    const [value, setValue] = useState<AppContextValue>();

    const init = async () => {
        try {
            const groupId = groupIdFromHashParam || AGOL_GROUP_ID;

            const categorySchemaItems = await getCategorySchema({
                agolGroupId: groupId,
            });
            // console.log(categorySchemaItems);

            const categorySchema = categorySchemaItems[0];
            // console.log(categorySchema);

            const arcGISOnlineGroupData = new ArcGISOnlineGroupData({
                groupId: groupId,
                categorySchema,
                queryParams: {
                    // contentType: 'webmap',
                    sortField: 'modified',
                },
            });

            const esriOAuthUtils = new EsriOAuth({
                appId: APP_ID,
            });

            const { credential, portal } = await esriOAuthUtils.init();

            if (credential && portal) {
                const { token } = credential;
                const { favGroupId } = esriOAuthUtils.getUserData();

                setPortalData4MyFavItems({
                    token,
                    favGroupId,
                });
            }

            const contextValue: AppContextValue = {
                showMapOnly: isMapOnlyMode === '1',
                arcgisOnlineGroupId: groupId,
                categorySchema,
                arcGISOnlineGroupData,
                esriOAuthUtils,
                inIframe: window.self !== window.top, // window.self !== window.top
            };

            setValue(contextValue);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        init();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {value ? children : null}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
