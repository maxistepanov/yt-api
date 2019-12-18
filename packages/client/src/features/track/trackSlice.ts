import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interfaces
import { VideoState } from '../../interfaces';
import { playlistActions } from '../playlist/playlistSlice';

const trackSlice = createSlice({
    name: 'track',
    initialState: null,
    reducers: {
        set(state: any, action: PayloadAction<VideoState>): any {
            return {
                ...action.payload,
                active: true,
            };
        },
    },
    extraReducers: {
        [playlistActions.remove.toString()]: (
            state: any,
            action: PayloadAction<VideoState>,
        ) => {
            if (state.video_id === action.payload.video_id) {
                return null;
            }

            return state;
        },
    },
});

const { actions: trackActions, reducer: trackReducer } = trackSlice;

export { trackActions, trackReducer };
