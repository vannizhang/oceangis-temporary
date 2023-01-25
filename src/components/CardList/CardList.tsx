import { IItem } from '@esri/arcgis-rest-types';
import React from 'react';
import {
    getThumbnailUrl,
    getAgolItemUrl,
} from '../../utils/arcgis-online-item-formatter';

import Card from './Card';

// import { AgolItem } from '../../../utils/arcgis-online-group-data';

export interface CardListData {
    data: IItem;
    // inCollection?: boolean;
    isActiveItemOnMap?: boolean;
    isMyFav?: boolean;
}

interface Props {
    title: string;
    items: CardListData[];
    itemCount: number;

    viewBtnOnClick: (item: IItem) => void;
    // toggleCollectBtnOnClick: (item:IItem)=>void;
    // toggleAsMyFavBtnOnClick: (item:IItem)=>void;
}

const CardList: React.FC<Props> = ({
    title = '',
    items = [],
    itemCount = 0,

    viewBtnOnClick,
}: // toggleCollectBtnOnClick,
// toggleAsMyFavBtnOnClick
Props) => {
    const [isHide, setIsHide] = React.useState<boolean>(false);

    const toggleList = () => {
        setIsHide(!isHide);
    };

    const getList = () => {
        const cards = items.map((item) => {
            const { data, isActiveItemOnMap } = item;

            const { title, snippet, id, thumbnail } = data;

            // console.log(data);

            const thumbnailUrl = getThumbnailUrl({
                itemId: id,
                thumbnail,
            });

            const agolItemUrl = getAgolItemUrl(id);

            return (
                <div key={`list-item-${id}`} className="block trailer-half">
                    <Card
                        title={title}
                        description={snippet}
                        link={agolItemUrl}
                        itemId={id}
                        imageUrl={thumbnailUrl}
                        item={data}
                        isActiveItemOnMap={isActiveItemOnMap}
                        // isInCollection={inCollection}
                        // isMyFav={isMyFav}

                        viewBtnOnClick={viewBtnOnClick}
                        // toggleCollectBtnOnClick={toggleCollectBtnOnClick}
                        // toggleAsMyFavBtnOnClick={toggleAsMyFavBtnOnClick}
                    />
                </div>
            );
        });

        return (
            <div className="card-list block-group block-group-2-up tablet-block-group-2-up phone-block-group-1-up">
                {cards}
            </div>
        );
    };

    return (
        <>
            <div
                className="leader-half trailer-half"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={toggleList}
            >
                {/* // toggle button  */}
                <div className="font-size--3">
                    {!isHide ? (
                        <span className="icon-ui-minus"></span>
                    ) : (
                        <span className="icon-ui-plus"></span>
                    )}
                </div>

                {/* //name of the list and count */}
                <span className="avenir-demi font-size--2">
                    {title} ({itemCount})
                </span>

                {/* // horizontal dicide line  */}
                <div
                    style={{
                        height: '1px',
                        background: '#ccc',
                        flexGrow: 2,
                        marginLeft: '.75rem',
                    }}
                ></div>
            </div>
            {!isHide ? getList() : null}
        </>
    );
};

export default CardList;
