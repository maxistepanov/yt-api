import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interfaces
import { VideoState } from '../../interfaces';

const trackSlice = createSlice({
    name: 'track',
    initialState: null,
    reducers: {
        set(state: any, action: PayloadAction<VideoState>): any {
            return action.payload;
        },
    },
    extraReducers: {},
});

const { actions: trackActions, reducer: trackReducer } = trackSlice;

export { trackActions, trackReducer };
