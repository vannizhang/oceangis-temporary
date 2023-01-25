import { IItem } from '@esri/arcgis-rest-types';
import React, { useState } from 'react';

import {
    getThumbnailUrl,
    getAgolItemUrl,
} from '../../utils/arcgis-online-item-formatter';

import Card from '../CardList/Card';

export type CategoryLabel = 'Department or Agency' | 'NGDA';

type Props = {
    title: string;
    items: IItem[];
    activeItem: IItem;
    onSelect: (item: IItem) => void;
    categoryLabelType: CategoryLabel;
};

const getCategoryLabel = (
    category: string,
    categoryLabelType: CategoryLabel
) => {
    if (!category) {
        return '';
    }

    const components = category.split('/');

    if (categoryLabelType === 'NGDA') {
        return 'NGDA Theme - ' + components[components.length - 1];
    }

    const department = components[components.length - 2].replace(
        'Department of ',
        ''
    );
    const agency = components[components.length - 1];

    return `${department}, ${agency}`;
};

const SearchResultByCategory: React.FC<Props> = ({
    title,
    items,
    activeItem,
    onSelect,
    categoryLabelType,
}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getCardList = () => {
        if (!isOpen || !items.length) {
            return null;
        }

        const cards = items.map((item) => {
            // const { data, isActiveItemOnMap } = item;

            const { title, snippet, id, thumbnail, groupCategories } = item;

            const isActiveItemOnMap = activeItem.id === id;

            const thumbnailUrl = getThumbnailUrl({
                itemId: id,
                thumbnail,
            });

            const agolItemUrl = getAgolItemUrl(id);

            const catgeory =
                categoryLabelType === 'Department or Agency'
                    ? groupCategories.filter((d: string) =>
                          d.includes('Department or Agency')
                      )[0]
                    : groupCategories.filter((d: string) =>
                          d.includes('NGDA')
                      )[0];

            const categoryLabel = getCategoryLabel(catgeory, categoryLabelType);

            return (
                <div key={`list-item-${id}`} className="block trailer-half">
                    <Card
                        title={title}
                        description={snippet}
                        link={agolItemUrl}
                        itemId={id}
                        imageUrl={thumbnailUrl}
                        item={item}
                        isActiveItemOnMap={isActiveItemOnMap}
                        viewBtnOnClick={onSelect}
                        categoryLabel={categoryLabel}
                    />
                </div>
            );
        });

        return (
            <div
                style={{
                    padding: '.75rem 0 .5rem',
                    margin: 0,
                    borderBottom: '1px solid #efefef',
                }}
                className="card-list block-group block-group-1-up tablet-block-group-1-up phone-block-group-1-up"
            >
                {cards}
            </div>
        );
    };

    return (
        <div>
            <div
                style={{
                    borderBottom: '1px solid #efefef',
                }}
                onClick={setIsOpen.bind(this, !isOpen)}
            >
                <div
                    style={{
                        padding: '.5rem 1rem',
                        opacity: items.length ? 1 : 0.5,
                        pointerEvents: items.length ? 'unset' : 'none',
                        cursor: items.length ? 'pointer' : 'unset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span className="avenir-demi font-size--1">
                        {title} ({items.length})
                    </span>
                    <span
                        className={`right ${
                            isOpen ? 'icon-ui-up' : 'icon-ui-down'
                        }`}
                    ></span>
                </div>
            </div>

            {getCardList()}
        </div>
    );
};

export default SearchResultByCategory;
