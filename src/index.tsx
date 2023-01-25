import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

// import { setDefaultOptions } from 'esri-loader';

import { RootPage } from './pages';

(async () => {
    const preloadedState = getPreloadedState();

    ReactDOM.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppContextProvider>
                <RootPage />
            </AppContextProvider>
        </ReduxProvider>,
        document.getElementById('root')
    );
})();
