import { combineReducers } from '@reduxjs/toolkit';

import { playlistReducer } from 'features/playlist/playlistSlice';
import { trackReducer } from 'features/track/trackSlice';

const rootReducer = combineReducers({
    playlist: playlistReducer,
    track: trackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
