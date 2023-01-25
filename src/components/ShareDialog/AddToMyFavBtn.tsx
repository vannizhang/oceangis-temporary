import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeWebmapSelector } from '../../store/reducers/Map';

import { AppContext } from '../../contexts/AppContextProvider';

import {
    getMyFavItemIds,
    toggleAsMyFavItem,
} from '../../utils/my-favorites/myFav';

const AddToMyFavBtn = () => {
    // const dispatch = useDispatch();

    const activeWebmapItem = useSelector(activeWebmapSelector);

    const { esriOAuthUtils, inIframe } = React.useContext(AppContext);

    const [myFavItemIds, setMyFavItemIds] = React.useState<string[]>([]);

    const onClickHandler = async () => {
        try {
            const { id } = activeWebmapItem;

            if (myFavItemIds.indexOf(id) > -1) {
                const { baseUrl } = esriOAuthUtils.getUserData();
                const myFavPageUtl = `${baseUrl}/home/content.html?view=list&sortOrder=desc&sortField=modified#favorites`;
                // console.log('open item in my fav page', myFavPageUtl);
                window.open(myFavPageUtl, '_blank');
            } else {
                // new set of ids for my fav items
                const itemIds = await toggleAsMyFavItem(id);
                setMyFavItemIds(itemIds);
            }
        } catch (err) {
            console.error(err);

            if (err.isSignInRequired) {
                esriOAuthUtils.sigIn();
            }
        }
    };

    const getBtnLabel = () => {
        if (esriOAuthUtils.isSignedIn()) {
            const isActiveItemInMyFav = activeWebmapItem
                ? myFavItemIds.indexOf(activeWebmapItem.id) > -1
                : false;

            return isActiveItemInMyFav
                ? 'Open this in My Favorites'
                : 'Add this to My Favorites';
        }

        return 'Sign in and add this to My Favorites';
    };

    React.useEffect(() => {
        (async () => {
            const itemIds = await getMyFavItemIds();
            // console.log('myFavItems', itemIds)

            setMyFavItemIds(itemIds);
        })();
    }, []);

    return !inIframe ? (
        <div className="font-size--2 cursor-pointer" onClick={onClickHandler}>
            <span>{getBtnLabel()}</span>
        </div>
    ) : null;
};

export default AddToMyFavBtn;
