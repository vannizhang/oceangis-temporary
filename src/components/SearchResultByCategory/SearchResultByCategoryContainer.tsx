import React, { useEffect, useMemo, useContext, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { activeWebmapSelector, setActiveItem } from '../../store/reducers/Map';

import {
    searchResultsSelector,
    searchResultsResponseSelector,
} from '../../store/reducers/GroupContentSearchResults';

import { IItem } from '@esri/arcgis-rest-types';

import { AppContext } from '../../contexts/AppContextProvider';

import SearchResultByCategory from './SearchResultByCategory';
import { CategorySchemaMainCategory } from '../../utils/category-schema-manager';

// type ItemsByCategory = {
//     [key: string]: IItem[];
// };

// const groupSearchResultsByCategory = (
//     searchResults: IItem[],
//     mainCategories: CategorySchemaMainCategory[]
// ): ItemsByCategory => {
//     const itemsByCategory: ItemsByCategory = {};

//     for (const category of mainCategories) {
//         itemsByCategory[category.title] = [];
//     }

//     for (const item of searchResults) {
//         const { groupCategories } = item;

//         for (const categoryStr of groupCategories) {
//             // the original groupCategories is a string looks like: "/Categories/Structures"
//             const mainCategory = categoryStr.split('/')[2];

//             if (itemsByCategory[mainCategory]) {
//                 itemsByCategory[mainCategory].push(item);
//             }
//         }
//     }

//     return itemsByCategory;
// };

type ItemsByCategory = {
    [key: string]: IItem[];
};

const groupSearchResultsByCategory = (
    searchResults: IItem[],
    mainCategories: CategorySchemaMainCategory[]
): ItemsByCategory => {
    const itemsByCategory: ItemsByCategory = {};

    for (const { title } of mainCategories) {
        itemsByCategory[title] = [];

        // for (const subcategory of categories) {
        //     itemsByCategory[title][subcategory.title] = [];
        // }
    }

    for (const item of searchResults) {
        const { groupCategories } = item;

        // if (item.title === 'National Bridge Inventory') {
        //     console.log(console.log(item));
        // }

        for (const categoryStr of groupCategories) {
            // the original groupCategories is a string looks like: "/Categories/Structures"
            const components = categoryStr.split('/');
            const mainCategory = components[2];
            // const subcategory = components[3];

            if (itemsByCategory[mainCategory]) {
                itemsByCategory[mainCategory].push(item);
            }
        }
    }

    return itemsByCategory;
};

type AccordionGroup4MainCategoryProps = {
    mainCategory: string;
    items: IItem[];
};

const AccordionGroup4MainCategory: React.FC<AccordionGroup4MainCategoryProps> = ({
    mainCategory,
    items,
}: AccordionGroup4MainCategoryProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const activeItem: IItem = useSelector(activeWebmapSelector);

    const getAccordions = () => {
        // return Object.keys(subCategories).map((subcategory) => {
        //     const items = subCategories[subcategory];

        //     return (
        //         <SearchResultByCategory
        //             key={subcategory}
        //             title={subcategory}
        //             items={items}
        //             activeItem={activeItem}
        //             onSelect={(item) => {
        //                 dispatch(setActiveItem(item));
        //             }}
        //             categoryLabelType={
        //                 mainCategory === 'NGDA Theme'
        //                     ? 'NGDA'
        //                     : 'Department or Agency'
        //             }
        //         />
        //     );
        // });

        return (
            <SearchResultByCategory
                key={mainCategory}
                title={mainCategory}
                items={items}
                activeItem={activeItem}
                onSelect={(item) => {
                    dispatch(setActiveItem(item));
                }}
                // categoryLabelType={
                //     mainCategory === 'NGDA Theme'
                //         ? 'NGDA'
                //         : 'Department or Agency'
                // }
            />
        );
    };

    return (
        <div>
            <div
                style={{
                    borderTop: '1px solid #efefef',
                    borderBottom: '1px solid #efefef',
                }}
                onClick={setIsOpen.bind(this, !isOpen)}
            >
                <div
                    style={{
                        padding: '.5rem 1rem',
                        cursor: 'pointer',
                    }}
                >
                    <span className="avenir-demi font-size-0">
                        {mainCategory}
                    </span>
                    <span
                        className={`right ${
                            isOpen ? 'icon-ui-up' : 'icon-ui-down'
                        }`}
                    ></span>
                </div>
            </div>

            {isOpen ? (
                <div
                    style={{
                        padding: '.25rem .5rem',
                        paddingBottom: '1rem',
                        // background: '#555'
                    }}
                >
                    {getAccordions()}
                </div>
            ) : null}
        </div>
    );
};

const SearchResultByCategoryContainer = () => {
    const { categorySchema } = useContext(AppContext);

    const searchResults: IItem[] = useSelector(searchResultsSelector);

    const itemsByCategory = useMemo(
        () =>
            groupSearchResultsByCategory(
                searchResults,
                categorySchema.categories
            ),
        [searchResults, categorySchema]
    );

    const getAccordionGroup4MainCategory = () => {
        if (!searchResults) {
            return null;
        }

        const mainCategories = Object.keys(itemsByCategory).sort((a, b) =>
            a.localeCompare(b)
        );

        // console.log(mainCategories);
        // console.log(itemsByCategory);

        return mainCategories.map((mainCategory) => {
            return (
                <AccordionGroup4MainCategory
                    key={mainCategory}
                    mainCategory={mainCategory}
                    items={itemsByCategory[mainCategory]}
                />
            );
        });
    };

    return (
        <div
            style={{
                border: '1px solid #efefef',
                borderBottom: 'none',
            }}
        >
            {getAccordionGroup4MainCategory()}
        </div>
    );
};

export default SearchResultByCategoryContainer;
