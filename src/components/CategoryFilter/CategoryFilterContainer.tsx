import React, { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { isCategoryFilterVisibleSelector } from '../../store/reducers/UI';

import { loadItems } from '../../store/reducers/GroupContentSearchResults';

import { AppContext } from '../../contexts/AppContextProvider';

import CategoryFilter, { SelectedCategory } from './CategoryFilter';

const CategoryFilterContainer = () => {
    const dispatch = useDispatch();

    const { categorySchema, arcGISOnlineGroupData } = useContext(AppContext);

    const isVisible = useSelector(isCategoryFilterVisibleSelector);

    const categoryFilterOnChange = async (data: SelectedCategory) => {
        arcGISOnlineGroupData.updateSelectedCategory(
            data.title,
            data.subcategories
        );

        const results = await arcGISOnlineGroupData.search({
            start: 1,
            // num
        });

        dispatch(loadItems(results));
        // searchItems();
    };

    return categorySchema ? (
        <div
            style={{
                display: isVisible ? 'block' : 'none',
            }}
        >
            <CategoryFilter
                categorySchema={categorySchema}
                onChange={categoryFilterOnChange}
            />
        </div>
    ) : null;
};

export default CategoryFilterContainer;
