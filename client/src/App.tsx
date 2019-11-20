import React from 'react';

// Components
import { Player } from './components/Player/Player';

// Providers
import { AudioContextProvider } from './contexts/AudioContext';

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
