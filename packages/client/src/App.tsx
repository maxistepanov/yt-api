import React from 'react';

// Components
import { Player } from './components/Player/Player';

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
        <div>
            <AudioContextProvider>
                <Player />
            </AudioContextProvider>
        </div>
    );
};

export default App;
