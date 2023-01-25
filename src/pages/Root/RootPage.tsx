import React, { useState, useContext } from 'react';

import {
    About,
    SiteNav,
    Sidebar,
    CardList,
    SearchInput,
    CategoryFilter,
    MapViewContainer,
    SearchResultByCategory,
} from '../../components';

import { AppContext } from '../../contexts/AppContextProvider';

const RootPage = () => {
    const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

    const { inIframe } = useContext(AppContext);

    return (
        <>
            {!inIframe ? (
                <SiteNav
                    siteName="Ocean GIS Map Explorer"
                    infoBtnOnClick={setShowAboutModal.bind(this, true)}
                />
            ) : null}

            <div
                style={{
                    position: 'absolute',
                    top: inIframe ? 0 : 61,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Sidebar>
                    <SearchInput />

                    {/* <CategoryFilter /> */}

                    <SearchResultByCategory />

                    {/* <CardList title={'Search Results'} /> */}
                </Sidebar>

                <MapViewContainer />
            </div>

            {showAboutModal ? (
                <About onClose={setShowAboutModal.bind(this, false)} />
            ) : null}
        </>
    );
};

export default RootPage;
