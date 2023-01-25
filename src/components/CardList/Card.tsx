import React from 'react';
import classnames from 'classnames';
import { stringFns } from 'helper-toolkit-ts';
import { IItem } from '@esri/arcgis-rest-types';

interface Props {
    title: string;
    link: string;
    description: string;
    itemId: string;
    imageUrl: string;
    item?: IItem;

    isActiveItemOnMap?: boolean;
    // isInCollection?: boolean;
    // isMyFav?:boolean;

    viewBtnOnClick: (item: IItem) => void;
    // toggleCollectBtnOnClick: (item:IItem)=>void;
    // toggleAsMyFavBtnOnClick: (item:IItem)=>void;

    categoryLabel?: string;
}

const RegularCard: React.FC<Props> = ({
    title,
    link,
    description,
    itemId,
    imageUrl,
    item,

    isActiveItemOnMap = false,
    // isInCollection=false,
    // isMyFav=false,

    viewBtnOnClick,
    categoryLabel,
}: // toggleCollectBtnOnClick,
// toggleAsMyFavBtnOnClick
Props) => {
    console.log(categoryLabel);

    return (
        <div
            className="card"
            style={{
                position: 'relative',
                height: '100%',
            }}
        >
            {/* <figure
                className="card-image-wrap"
                style={{
                    cursor: 'pointer',
                }}
                onClick={viewBtnOnClick.bind(this, item)}
            >
                <img className="card-image" src={imageUrl} />
            </figure> */}

            <div className="card-content">
                <div>
                    <div
                        style={{
                            maxWidth: 295,
                        }}
                    >
                        <p className="font-size--1 trailer-0">
                            <a href={link} target="_blank" rel="noreferrer">
                                {stringFns.trunc(title, 50, true)}
                            </a>
                        </p>

                        {categoryLabel ? (
                            <p className="font-size--3 trailer-quarter text-dark-gray">
                                {categoryLabel}
                            </p>
                        ) : null}
                    </div>

                    <p className="font-size--3 trailer-half">
                        {description
                            ? stringFns.trunc(description, 185, true)
                            : ''}
                    </p>
                </div>

                <div
                    style={{
                        // marginTop: 'auto',
                        // display: 'flex',
                        // flexDirection: 'row',
                        // flexWrap: 'nowrap',
                        // justifyContent: 'flex-end',
                        // alignContent: 'stretch',
                        // alignItems: 'stretch',
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                >
                    <div
                        className={classnames('btn text-center', {
                            'btn-clear': !isActiveItemOnMap,
                        })}
                        onClick={viewBtnOnClick.bind(this, item)}
                    >
                        View
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegularCard;
