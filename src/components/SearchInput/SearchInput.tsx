import React, { useContext } from 'react';

import { SearchAutoComplete } from '../';

import { AppContext } from '../../contexts/AppContextProvider';

type Props = {
    isCategoryFilterVisible: boolean;
    toggleCategoryFilter: () => void;
    searchAutoCompleteOnChange: (val: string) => void;
};

const SearchInput: React.FC<Props> = ({
    isCategoryFilterVisible,
    toggleCategoryFilter,
    searchAutoCompleteOnChange,
}: Props) => {
    const { arcgisOnlineGroupId } = useContext(AppContext);

    return (
        <div
            style={{
                display: 'flex',
                alignContent: 'strech',
                alignItems: 'strech',
                border: '2px solid #efefef',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    flexShrink: 0,
                    paddingLeft: '0.5rem',
                }}
            >
                <SearchAutoComplete
                    groupId={arcgisOnlineGroupId}
                    onSelect={searchAutoCompleteOnChange}
                    placeholder={'Search and Filter Datasets'}
                    filters={'type:"web map"'}
                />
            </div>

            <div
                className="icon-right-padding-0"
                style={{
                    width: '50px',
                    borderLeft: '1px solid #efefef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                onClick={toggleCategoryFilter}
            >
                {
                    <span
                        className={`text-blue font-size-1 ${
                            isCategoryFilterVisible
                                ? 'icon-ui-up'
                                : 'icon-ui-down'
                        }`}
                    ></span>
                }
            </div>
        </div>
    );
};

export default SearchInput;
