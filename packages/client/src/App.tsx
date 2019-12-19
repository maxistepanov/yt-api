import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css'; // or 'rsuite/dist/styles/rsuite-default.css'

// Components
import Player from 'components/Player/Player';

// Providers
import { AudioContextProvider } from './contexts/AudioContext';

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './store/rootReducer';

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

const App: React.FC = () => {
    return (
        <AudioContextProvider>
            <Player />
        </AudioContextProvider>
    );
};

export default App;
